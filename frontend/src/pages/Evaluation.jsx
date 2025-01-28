import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import LinearProgressWithLabel from "../components/Charts/ProgressBar.jsx";
import RadarChart from "../components/Charts/RadarChart.jsx";
import { LoadingScreen } from "../components/LoadingState";
import Title from "../components/Textareas/Title.jsx";
import { AlertWithMessage } from "../components/ErrorHandling";
import { CustomAlert } from "../components/ErrorHandling/CustomAlert";
import { handleApiError } from "../utils/handleApiError";
import api from "../api";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useLoadingProgress } from "../components/LoadingState/useLoadingProgress";
import DownloadWrapper from "../components/Charts/DownloadWrapper.jsx";

/**
 * Evaluation component fetches audit data and displays it as a series of progress indicators,
 * including overall progress bars and a radar chart representing category progress details.
 *
 * @component
 * @returns {JSX.Element} A layout component rendering the evaluation details.
 */
export function Evaluation() {
    const { auditId } = useParams();

    /**
     * currentAuditProgress - Progress for answered questions (excludes n.a.).
     * overallAuditProgress - Progress for all questions (excludes n.a.).
     * categoryProgress - Array of objects representing each category's progress details.
     */
    const [currentAuditProgress, setCurrentAuditProgress] = useState(0);
    const [categoryProgress, setCategoryProgress] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
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

                const augmentedCategories = [...categoryProgress];

                while (augmentedCategories.length < 3) {
                    augmentedCategories.push({
                        categoryName: "",
                        currentCategoryProgress: 0, // Fortschritt für Platzhalter auf 0 setzen
                    });
                }

                setCurrentAuditProgress(currentAuditProgress);
                setCategoryProgress(augmentedCategories);
            })
            .catch((err) => {
                // Use the handleApiError utility function to generate a user-friendly error message
                const errorMessage = handleApiError(err);
                console.error("Error loading ratings data:", err);
                setError(errorMessage);
            })
            .finally(() => setLoading(false));
    }, [auditId]);

    /**
     * Handle the export audit button click.
     *
     * Creates an anchor element, sets the download attribute to trigger the download
     * of the exported questions as a PDF file, and simulates a click to start the download/shows the
     * PDF file in preview mode.
     */
    const handleExportClick = async () => {
        const exportUrl = (import.meta.env.VITE_BACKEND_URL || "/api") + `/v1/audits/${auditId}/export`;

        try {
            const response = await fetch(exportUrl);

            if (!response.ok) {
                throw new Error("Fehler beim Export des Audits.");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Audit_${auditId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setSuccessMessage("Das Audit wurde erfolgreich exportiert.");
            setErrorMessage(null); 
        } catch (error) {
            setErrorMessage(error.message || "Ein unbekannter Fehler ist aufgetreten.");
            setSuccessMessage(null); 
        }
    };

    // Render loading screen
    if (loading) {
        return <LoadingScreen progress={loadingProgress} message="Daten werden geladen..." />;
    }

    return (
        <LayoutDefault>
            {error && <AlertWithMessage severity="error" title="Fehler" message={error} />} {/* Fehleranzeige */}
            <Title>Evaluation</Title>

            {/* Fehler-Alert */}
            <CustomAlert
                show={!!errorMessage}
                severity="error"
                message={errorMessage}
                onClose={() => setErrorMessage(null)}
                sx={{
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    border: "1px solid #f5c6cb",
                }}
            />

            {/* Erfolgs-Alert */}
            <CustomAlert
                show={!!successMessage}
                severity="success"
                message={successMessage}
                onClose={() => setSuccessMessage(null)}
            />

            {/* Current Audit Progress Bar */}
            <div
                data-cy={"CurrentProgressBar"}
                className="w-full flex flex-col justify-center items-center mt-2">

                <Box className="text-center" sx={{ width: "80%" }}>
                    <LinearProgressWithLabel value={currentAuditProgress} />
                </Box>
                <p className="text-center text-xl">Gesamtbewertung</p>
            </div>

            {/* Radar Chart */}
            <DownloadWrapper>
                <div data-cy={"RadarChart"} className="w-full flex justify-center">
                    <RadarChart
                        labels={categoryProgress.map((category) => category.categoryName)}
                        currentData={categoryProgress.map((category) => category.currentCategoryProgress)}
                        width={100}
                        height={60}
                    />
                </div>
            </DownloadWrapper>

            <div className="flex justify-center space-x-4">
                <Button
                    onClick={() => navigate(`/compare-audits/${auditId}`)}>
                    Audit vergleichen
                    </Button>
                <Button
                    data-cy="ExportAuditButton"
                    onClick={handleExportClick}
                >
                    Audit Exportieren
                </Button>
            </div>
        </LayoutDefault>
    );
}