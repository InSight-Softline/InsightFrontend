import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import LinearProgressWithLabel from "../components/Charts/ProgressBar.jsx";
import CircularProgressWithLabel from "../components/Charts/CircularProgress.jsx";
import CustomBarChart from "../components/Charts/BarChart.jsx";
import Title from "../components/Textareas/Title.jsx";
import api from "../api";
import { LoadingScreen } from "../components/LoadingState";
import { AlertWithMessage } from "../components/ErrorHandling";
import { handleApiError } from "../utils/handleApiError";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import { useLoadingProgress } from "../components/LoadingState/useLoadingProgress";

/**
 * Evaluation component fetches audit data and displays it as a series of progress indicators,
 * including an overall progress bar, circular progress indicators for each category,
 * and a bar chart representing question ratings.
 *
 * @component
 * @returns {JSX.Element} A layout component rendering the evaluation details.
 */
export function Evaluation() {
    // Extract audit ID from the route parameters to dynamically load audit data
    const { auditId } = useParams();

    /**
     * overallProgress - Represents the overall completion percentage of the audit.
     * categoryProgress - Array of objects representing each category's progress as a percentage.
     * State variables for progress and error handling
     */
    const [overallProgress, setOverallProgress] = useState(0);
    const [categoryProgress, setCategoryProgress] = useState([]);

    /**
     * Array representing the distribution of question ratings:
     * [count of 0 points, count of 1 point, ..., count of 5 points, count of "nA"].
     */
    const [ratingDistribution, setRatingDistribution] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Define color codes for the bar chart, where the last color (black) represents "nA"
    const colors = ["#a50026", "#d73027", "#fdae61", "#d9ef8b", "#66bd63", "#006837", "#000000"];
    const navigate = useNavigate();


    // Use the custom loading progress hook
    const loadingProgress = useLoadingProgress(loading);

    /**
     * Fetches data from the backend:
     * - Progress data for overall and categories (`/progress` endpoint).
     * - Ratings distribution data (`/ratings` endpoint).
     */
    useEffect(() => {
        setLoading(true);
        api.get(`/v1/audits/${auditId}/progress`)
            .then(response => {
                setOverallProgress(response.data.currentAuditProgress || 0);
                setCategoryProgress(response.data.categoryProgress || []);
            })
            .catch((err) => {
                // Use the handleApiError utility function to generate a user-friendly error message
                const errorMessage = handleApiError(err);
                console.error("Error loading progress data:", err);
                setError(errorMessage);
            })

        // Fetch ratings data
        api.get(`/v1/audits/${auditId}/ratings`)
            .then(response => {
                // Initialize distribution array: [0, 1, 2, 3, 4, 5, "nA"]
                const distribution = [0, 0, 0, 0, 0, 0, 0];
                response.data.forEach(rating => {
                    if (rating.na === true) {
                        // If the question is explicitly marked as "nA"
                        distribution[6]++;
                    } else if (rating.points !== null) {
                        // If the question has a specific rating (0-5)
                        distribution[rating.points]++;
                    } else {
                        // If the question is unanswered
                        distribution[6]++;
                    }
                });
                setRatingDistribution(distribution);
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
        return <LoadingScreen progress={loadingProgress} message="Loading evaluation data..." />;
    }

    // Render error message
    if (error) {
        return <AlertWithMessage severity="error" title="Error" message={error} />;
    }

    return (
        <LayoutDefault>
            <div className="p-4 flex flex-col items-center">
                <Title>Evaluation</Title>

                {/* Overall Progress Bar */}
                <div
                    data-cy={"ProgressBar"}
                    id="result"
                    className="w-full flex flex-col justify-center items-center h-20 mb-6"
                >
                    <Box className="text-center" sx={{ width: "80%" }}>
                        <LinearProgressWithLabel value={overallProgress} />
                    </Box>
                    <p className="text-center text-xl">Gesamtfortschritt</p>
                </div>

                {/* Category Progress Circular Charts */}
                <div className="w-full grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {categoryProgress.map(category => (
                        <div  data-cy={"CircularChart"} key={category.categoryName} className="flex flex-col items-center">
                            <CircularProgressWithLabel value={category.currentCategoryProgress} label={category.categoryName} size={60} />
                        </div>
                    ))}
                </div>

                {/* Question Count by Rating Bar Chart */}
                <div data-cy={"BarChart"} className="max-w-full overflow-x-auto pb-10">
                    <CustomBarChart
                        data={ratingDistribution} // Pass the rating distribution directly
                        colors={colors}
                    />
                </div>

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
