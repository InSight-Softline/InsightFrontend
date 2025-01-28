import {LayoutDefault} from "../layouts/LayoutDefault.jsx";
import {useEffect, useMemo, useState} from "react";
import {CategoryList} from "../components/QuestionList/CategoryList.jsx";
import Title from "../components/Textareas/Title.jsx";
import api from "../api.js";
import {useNavigate, useParams} from "react-router-dom";
import {debounce} from "@mui/material";
import {handleApiError} from "../utils/handleApiError";
import {LoadingScreen} from "../components/LoadingState";
import {AlertWithMessage} from "../components/ErrorHandling";
import {useLoadingProgress} from "../components/LoadingState/useLoadingProgress";
import { useCallback } from "react";

/**
 * PerformAudit Component
 *
 * This component is responsible for displaying a list of questions retrieved from the backend
 * for a specific audit. It sorts the questions by category and id to achieve a consistent display.
 * It renders a `CategoryList` component that allows users to view, edit,
 * and submit responses for each question. It handles updating questions by passing modified data
 * back to the backend via a PATCH request.
 *
 * @component
 * @returns {JSX.Element} - The rendered `PerformAudit` component wrapped within `LayoutDefault`.
 */
export function PerformAudit() {
    const {auditId} = useParams();
    const [sortedQuestions, setSortedQuestions] = useState([]);
    const [progress, setProgress] = useState ([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [patchError, setPatchError] = useState(null);

    const loadingProgress = useLoadingProgress(loading);
    // Use the custom loading progress hook

    const labels = [0, 1, 2, 3, 4, 5, "N/A"];

    /**
     * Transforms an array of questions into a structured array of categories,
     * where each category contains its associated questions.
     *
     * @param {Array} questions - An array of question objects. Each object is expected to have the following structure:
     *                            {
     *                              id: number,
     *                              question: string,
     *                              points: number | null,
     *                              nA: boolean | null,
     *                              comment: string,
     *                              category: {
     *                                  id: number,
     *                                  name: string,
     *                                  deletedAt: null | string
     *                              }
     *                            }
     * @returns {Array} - A transformed array of categories. Each category has the following structure:
     *                    {
     *                      name: string,
     *                      id: number,
     *                      questions: [
     *                          {
     *                              id: number,
     *                              question: string,
     *                              points: number | null,
     *                              nA: boolean | null,
     *                              comment: string
     *                          },
     *                          ...
     *                      ]
     *                    }
     *
     * The function works as follows:
     * 1. Sorts the input questions by category ID and then by question ID to ensure consistent order.
     * 2. Groups the questions by their category. Each category contains a `questions` array with its associated questions.
     */
    const transformData = (questions) => {
        //sorts questions by category id and then by question id
        const sortedData = questions.sort((a, b) => {
            if (a.category.id === b.category.id) {
                return a.id - b.id;
            }
            return a.category.id - b.category.id;
        });

        //sorts questions in a new array of categories with questions
        return sortedData.reduce((acc, item) => {
            const existingCategory = acc.find(cat => cat.id === item.category.id);

            if (existingCategory) {
                // Add the question to the existing category
                existingCategory.questions.push({
                    id: item.id,
                    question: item.question,
                    points: item.points,
                    nA: item.nA,
                    comment: item.comment,
                });
            } else {
                // Create a new category and add the current question
                acc.push({
                    name: item.category.name,
                    id: item.category.id,
                    questions: [
                        {
                            id: item.id,
                            question: item.question,
                            points: item.points,
                            nA: item.nA,
                            comment: item.comment,
                        },
                    ],
                });
            }

            return acc; // Return the accumulator for the next iteration
        }, []);

    }

    /**
     * fetchProgress is a function that retrieves the current progress of an audit
     * from the backend API and updates the local state with the received data.
     * It is wrapped with the useCallback hook to ensure that the function remains
     * stable across re-renders unless the auditId changes.
     *
     * @type {function(): void}
     * - Makes an HTTP GET request to the API endpoint for fetching audit progress.
     * - Updates the progress state with the response data.
     * - Logs an error message to the console if the request fails.
     *
     * Dependencies:
     * - auditId: The ID of the audit whose progress is being fetched.
     */
    const fetchProgress = useCallback(() => {
        api.get(`/v1/audits/${auditId}/progress`)
            .then(response => {
                setProgress(response.data);
            })
            .catch(err => {
                console.error('Error fetching progress data:', err);
            });
    }, [auditId]);

    /**
     * useEffect hook that triggers the fetchProgress function whenever the auditId
     * or fetchProgress function reference changes. This ensures the latest progress
     * data is fetched and updated in the component.
     *
     * - auditId: The ID of the current audit, used as a dependency to re-fetch the progress
     *   data whenever it changes.
     * - fetchProgress: The callback function responsible for fetching and setting the progress data.
     *
     * This hook runs on the initial render and whenever the auditId or fetchProgress function changes.
     */
    useEffect(() => {
        fetchProgress();
    }, [auditId, fetchProgress]);

    /**
    * Sends a PATCH request to update a specific question's fields in the backend.
    *
    * @param {number} questionID - The ID of the question to update.
    * @param {rating[]} newRatings - An array of fields to update with their new values.
    * @returns {Promise<void>} - A promise resolving once the backend update is complete.
    */
    const patchQuestion = useMemo(()=>async (questionID, newRatings) => {
       // Transforming the ratings into a format suitable for a JSON Patch request
       const patchData = newRatings.map((destination) => ({
           op: "replace",
           path: `${destination.path}`,
           value: destination.value,
       }));
       try {
           await api.patch(`/v1/ratings/${questionID}`, patchData);
           fetchProgress();
           setPatchError(null); // Clear any previous patch errors
       } catch (err) {
           const errorMessage = handleApiError(err); // Use handleApiError
           setPatchError(errorMessage); // Set the error to display via AlertWithMessage
       }
   },[fetchProgress]);

    /**
     * A debounced function that sends a PATCH request to update a question's ratings or comment.
     * The request is delayed by 1000 milliseconds to prevent sending too many requests in quick
     * succession. The debounced function can be canceled to avoid unnecessary backend calls.
     *
     * @param {number} questionID - The ID of the question to update.
     * @param {Object[]} newRatings - An array of objects representing the paths and values to update.
     * @returns {Promise<void>} - A promise that resolves once the backend update is complete.
     */
    const debouncedPatchQuestion = useMemo(
        () =>
            debounce((questionID, newRatings) => {
                return patchQuestion(questionID, newRatings);
            }, 500),
        [patchQuestion],
    );

    /**
     * Handles the update of a question in the list. This function is triggered whenever a question's
     * rating or comment is modified. It updates the question locally and calls the debouncedPatchQuestion
     * function to send a request to the backend after a delay, ensuring that multiple rapid changes
     * are batched together.
     *
     * @param {question[]} updatedQuestions - The updated array of questions.
     * @param {question} updatedQuestion - The specific question that was modified.
     * @returns {void}
     */
    const handleQuestionUpdate = useMemo(() => (updatedQuestions, updatedQuestion) => {
        setSortedQuestions(updatedQuestions);
        debouncedPatchQuestion(updatedQuestion.id, [
            {path: "/na", value: updatedQuestion.nA},
            {path: "/points", value: updatedQuestion.points},
            {path: "/comment", value: updatedQuestion.comment}
        ]);
    }, [debouncedPatchQuestion]);




    useEffect(() => {
        setLoading(true);
        api.get(`/v1/audits/${auditId}/ratings`)
            .then(response => {
                setSortedQuestions(transformData(response.data));
                setError(null);
            })
            .catch((err) => {
                const errorMessage = handleApiError(err); // Use handleApiError
                setError(errorMessage);
            })
            .finally(() => setLoading(false));
    }, [auditId]);

    if (loading) {
        return <LoadingScreen progress={loadingProgress} message="Audit is loading..."/>;
    }

    if (error) {
        return <AlertWithMessage severity="error" title="Fehler" message={error}/>;
    }

    return (
        <LayoutDefault
            progress={progress.categoryProgress}
        >
            {patchError && <AlertWithMessage severity="error" title="Fehler" message={patchError} />}
            <Title>Audit durchführen</Title>
            <CategoryList
                categories={sortedQuestions}
                options={labels}
                onChange={handleQuestionUpdate}
            />
        </LayoutDefault>
    );
}
