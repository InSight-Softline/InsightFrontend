import React from "react";
import ProgressBar from "../Charts/ProgressBar.jsx";
import RadarChart from "../Charts/RadarChart";
import DownloadWrapper from "../Charts/DownloadWrapper.jsx";

/**
 * AuditComparisonCard component displays detailed comparison data for a single audit.
 * Includes overall progress as a progress bar and category-specific progress in a radar chart.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name of the audit.
 * @param {number} props.progress - The overall progress of the audit in percentage.
 * @param {Array} props.categoryProgress - Array of category progress data, each containing:
 *    - {string} categoryName: The name of the category.
 *    - {number} currentCategoryProgress: The progress percentage for the category.
 * @returns {JSX.Element} A card displaying the audit comparison details.
 */
export function AuditComparisonCard({ name, progress, categoryProgress }) {
    const labels = categoryProgress?.map(category => category.categoryName) || [];
    const data = categoryProgress?.map(category => category.currentCategoryProgress) || [];

    return (
        <div className="p-4 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">{name}</h2>

            <div className="mb-4">
                <ProgressBar value={progress} />
                <p className="text-center text-sm mt-2">Gesamtfortschritt</p>
            </div>

            <DownloadWrapper>
            <div data-cy={"RadarChart"} className="w-full flex justify-center">
                {labels.length > 0 && data.length > 0 ? (
                    <RadarChart labels={labels} currentData={data} width={50} height={50} />
                ) : (
                    <p className="text-sm text-gray-500">Keine Daten für Kategorien verfügbar</p>
                )}
            </div>
            </DownloadWrapper>
        </div>
    );
}