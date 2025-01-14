import React from "react";
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {LayoutDefault} from "../layouts/LayoutDefault.jsx";
import LinearProgressWithLabel from '../components/Charts/ProgressBar.jsx';
import RadarChart from '../components/Charts/RadarChart.jsx';
import {LoadingScreen} from "../components/LoadingState";
import {AlertWithMessage} from "../components/ErrorHandling";
import {handleApiError} from "../utils/handleApiError";
import Title from '../components/Textareas/Title.jsx';
import api from '../api';
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {useLoadingProgress} from "../components/LoadingState/useLoadingProgress";
import DownloadWrapper from "../components/Charts/DownloadWrapper.jsx";

/**
 * Evaluation component fetches audit data and displays it as a series of progress indicators,
 * including overall progress bars and a radar chart representing category progress details.
 *
 * @component
 * @returns {JSX.Element} A layout component rendering the evaluation details.
 */
export function Evaluation() {
    // Extract audit ID from the route parameters to dynamically load audit data
    const {auditId} = useParams();

    /**
     * currentAuditProgress - Progress for answered questions (excludes n.a.).
     * overallAuditProgress - Progress for all questions (excludes n.a.).
     * categoryProgress - Array of objects representing each category's progress details.
     */
    const [currentAuditProgress, setCurrentAuditProgress] = useState(0);
    const [categoryProgress, setCategoryProgress] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    // Use the custom loading progress hook
    const loadingProgress = useLoadingProgress(loading);

    /**
     * Fetches audit progress data from the backend when the component mounts or when auditId changes.
     * Sets the state values for currentAuditProgress, overallAuditProgress, and categoryProgress
     * based on the retrieved data.
     */
    useEffect(() => {
        setLoading(true);
        api.get(`/v1/audits/${auditId}/progress`)
            .then(response => {
                const { currentAuditProgress, categoryProgress } = response.data;
                setCurrentAuditProgress(currentAuditProgress);
                setCategoryProgress(categoryProgress || []);
            })
            .catch((err) => {
                // Use the handleApiError utility function to generate a user-friendly error message
                const errorMessage = handleApiError(err);
                console.error("Error loading ratings data:", err);
                setError(errorMessage);
            })
            .finally(() => setLoading(false));
    }, [auditId]);

    // Render loading screen
    if (loading) {
        return <LoadingScreen progress={loadingProgress} message="Loading evaluation data..."/>;
    }

    // Render error message
    if (error) {
        return <AlertWithMessage severity="error" title="Error" message={error}/>;
    }

    return (
        <LayoutDefault>
            <div className="p-4 flex flex-col items-center max-w-5xl mx-auto">
                <Title>Evaluation</Title>

                <DownloadWrapper>
                    {/* Current Audit Progress Bar */}
                    <div
                        data-cy={"CurrentProgressBar"}
                        className="w-full flex flex-col justify-center items-center h-20 mb-6">

                        <Box className="text-center" sx={{width: '80%'}}>
                            <LinearProgressWithLabel value={currentAuditProgress}/>
                        </Box>
                        <p className="text-center text-xl">Gesamtbewertung</p>
                    </div>
                </DownloadWrapper>

                {/* Radar Chart */}
                <DownloadWrapper>
                <div data-cy={"RadarChart"} className="w-full flex justify-center">
                    <RadarChart
                        labels={categoryProgress.map(category => category.categoryName)}
                        currentData={categoryProgress.map(category => category.currentCategoryProgress)}
                        width={50}
                        height={50}
                    />
                </div>
                </DownloadWrapper>

                {/* Audit vergleichen Button */}
                <div className="flex justify-end mr-8">
                    <Button
                        onClick={() => navigate(`/compare-audits/${auditId}`)}
                        variant="contained"
                    >
                        Audit vergleichen
                    </Button>
                </div>


            </div>
        </LayoutDefault>
    );
}
