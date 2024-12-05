import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import LinearProgressWithLabel from '../components/Charts/ProgressBar.jsx';
import RadarChart from '../components/Charts/RadarChart.jsx';
import Title from '../components/Textareas/Title.jsx';
import api from '../api';
import Box from "@mui/material/Box";

/**
 * Evaluation component fetches audit data and displays it as a series of progress indicators,
 * including overall progress bars and a radar chart representing category progress details.
 *
 * @component
 * @returns {JSX.Element} A layout component rendering the evaluation details.
 */
export function Evaluation() {
    // Extract audit ID from the route parameters to dynamically load audit data
    const { auditId } = useParams();

    /**
     * currentAuditProgress - Progress for answered questions (excludes n.a.).
     * overallAuditProgress - Progress for all questions (excludes n.a.).
     * categoryProgress - Array of objects representing each category's progress details.
     */
    const [currentAuditProgress, setCurrentAuditProgress] = useState(0);
    const [overallAuditProgress, setOverallAuditProgress] = useState(0);
    const [categoryProgress, setCategoryProgress] = useState([]);

    /**
     * Fetches audit progress data from the backend when the component mounts or when auditId changes.
     * Sets the state values for currentAuditProgress, overallAuditProgress, and categoryProgress
     * based on the retrieved data.
     */
    useEffect(() => {
        api.get(`/v1/audits/${auditId}/progress`)
            .then(response => {
                const { currentAuditProgress, overallAuditProgress, categoryProgress } = response.data;

                setCurrentAuditProgress(currentAuditProgress);
                setOverallAuditProgress(overallAuditProgress);
                setCategoryProgress(categoryProgress || []);
            })
            .catch(error => console.error("Error loading evaluation data:", error));
    }, [auditId]);

    return (
        <LayoutDefault>
            <div className="p-4 flex flex-col items-center">
                <Title>Evaluation</Title>

                {/* Current Audit Progress Bar */}
                <div data-cy={"CurrentProgressBar"} className="w-full flex flex-col justify-center items-center h-20 mb-6">
                    <Box className="text-center" sx={{ width: '80%' }}>
                        <LinearProgressWithLabel value={currentAuditProgress} />
                    </Box>
                    <p className="text-center text-xl">Current Audit Progress</p>
                </div>

                {/* Overall Audit Progress Bar */}
                <div data-cy={"OverallProgressBar"} className="w-full flex flex-col justify-center items-center h-20 mb-6">
                    <Box className="text-center" sx={{ width: '80%' }}>
                        <LinearProgressWithLabel value={overallAuditProgress} />
                    </Box>
                    <p className="text-center text-xl">Overall Audit Progress</p>
                </div>

                {/* Radar Chart */}
                <div data-cy={"RadarChart"} className="w-full max-w-4xl">
                    <RadarChart
                        labels={categoryProgress.map(category => category.categoryName)}
                        currentData={categoryProgress.map(category => category.currentCategoryProgress)}
                        overallData={categoryProgress.map(category => category.overallCategoryProgress)}
                    />
                </div>
            </div>
        </LayoutDefault>
    );
}
