import {LayoutDefault} from "../layouts/LayoutDefault.jsx";
import {useEffect, useState} from "react";
import {QuestionList} from "../components/QuestionList/QuestionList.jsx";
import {CategoryList} from "../components/QuestionList/CategoryList.jsx";
import Title from "../components/Textareas/Title.jsx";
import api from "../api.js";
import {useParams} from "react-router-dom";
import {CategoryListItem} from "../components/QuestionList/CategoryListItem.jsx";

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
    // Extracting the audit ID from the URL parameters using React Router's `useParams` hook
    const { auditId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [sortedQuestions, setSortedQuestions] = useState([]);

    const labels = [0, 1, 2, 3, 4, 5, "N/A"];
    // const backendData = [
    //     {
    //         category: { id: 1, name: "VPN", deletedAt: null },
    //         id: 76,
    //         comment: "hi",
    //         points: 3,
    //         nA: false,
    //         question: "VPN id76 Frage 2?"
    //     },
    //     {
    //         category: { id: 1, name: "VPN", deletedAt: null },
    //         id: 44,
    //         comment: "",
    //         points: null,
    //         nA: true,
    //         question: "VPN id44 Frage 1?"
    //     },
    //     {
    //         category: { id: 2, name: "Network", deletedAt: null },
    //         id: 80,
    //         comment: "",
    //         points: 2,
    //         nA: false,
    //         question: "Network id80 Frage 5?"
    //     },
    //     {
    //         category: { id: 2, name: "Network", deletedAt: null },
    //         id: 24,
    //         comment: "Schlecht",
    //         points: null,
    //         nA: null,
    //         question: "Network id24 Frage 4?"
    //     },
    //     {
    //         category: { id: 2, name: "Network", deletedAt: null },
    //         id: 11,
    //         comment: "Noch schlechter",
    //         points: 1,
    //         nA: false,
    //         question: "Network id 11 Frage 3?"
    //     }
    // ];

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
        const transformedData = sortedData.reduce((acc, item) => {
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
                        }
                    ]
                });
            }

            return acc; // Return the accumulator for the next iteration
        }, []);

        return transformedData;
    }

    /**
     * Fetches questions from the backend for the current audit on component mount
     * or when the audit ID changes.
     * It updates the `questions` state with the retrieved data.
     */    
    useEffect(() => {
        api.get(`/v1/audits/${auditId}/ratings`)
            .then(response => {
                setQuestions(response.data);
                setSortedQuestions(transformData(response.data));
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, [auditId]);

    /**
     * Handles the update of a question in the list. This function is triggered when a question's
     * rating, comment, or applicability is modified. It updates the question locally and sends
     * the change to the backend.
     *
     * @param {question[]} updatedQuestions - The updated array of questions.
     * @param {question} updatedQuestion - The specific question that was modified.
     * @returns {Promise<void>} - A promise resolving once the backend update is complete.
     */
    const handleQuestionUpdate = async (updatedQuestions, updatedQuestion) => {
        setSortedQuestions(updatedQuestions);
        await patchQuestion(updatedQuestion.id, [
            {path: "/na", value: updatedQuestion.nA},
            {path: "/points", value: updatedQuestion.points},
            {path: "/comment", value: updatedQuestion.comment}
        ]);
    }

    /**
     * Sends a PATCH request to update a specific question's fields in the backend.
     *
     * @param {number} questionID - The ID of the question to update.
     * @param {rating[]} newRatings - An array of fields to update with their new values.
     * @returns {Promise<void>} - A promise resolving once the backend update is complete.
     */
    const patchQuestion = async (questionID, newRatings) => {
        // Transforming the ratings into a format suitable for a JSON Patch request
        const patchData = newRatings.map((destination) => ({
            op: "replace",
            path: `${destination.path}`,
            value: destination.value,
        }));
        api.patch(`/v1/ratings/${questionID}`, patchData)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    };

    return (
        <LayoutDefault>
            <Title>Audit durchführen</Title>
            <CategoryList
                categories={sortedQuestions}
                options={labels}
                onChange={handleQuestionUpdate}
            />
        </LayoutDefault>
    )
}
