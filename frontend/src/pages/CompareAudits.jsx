import React, { useState, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import { AuditDropdown } from "../components/CompareAudit/AuditDropdown.jsx";
import { AuditComparisonCard } from "../components/CompareAudit/AuditComparisonCard.jsx";
import api from "../api";
import Title from "../components/Textareas/Title.jsx";
import {TextField } from "@mui/material";
import { LoadingScreen } from "../components/LoadingState";
import { handleApiError } from "../utils/handleApiError";
import { useLoadingProgress } from "../components/LoadingState/useLoadingProgress";
import { AlertWithMessage } from "../components/ErrorHandling";

/**
 * CompareAudits component renders a page for comparing two audits.
 * The user can select a second audit to compare it with the currently selected audit.
 *
 * @component
 * @returns {JSX.Element} A page displaying a comparison of two audits with progress data and a radar chart.
 */
export function CompareAudits() {
    const { auditId } = useParams();
    const [selectedAudit, setSelectedAudit] = useState(null);
    const [secondAudit, setSecondAudit] = useState(null);
    const [allAudits, setAllAudits] = useState([]);
    const [filteredAudits, setFilteredAudits] = useState([]);
    const [filters, setFilters] = useState({ customer: "", date: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    /**
     * Fetches audit progress and category-specific progress data from the API.
     *
     * @param {number} auditId - The ID of the audit to fetch data for.
     * @param {Function} setAudit - State setter function for updating the audit data (selectedAudit or secondAudit).
     * @param {string} errorMessage - Error message to display if the API request fails.
     */
    const fetchAuditData = useCallback(async (auditId, setAudit, setError) => {
        try {
            const progressResponse = await api.get(`/v1/audits/${auditId}/progress`);
    
            let categoryProgress = (progressResponse.data.categoryProgress || []).map(category => ({
                categoryName: category.categoryName,
                currentCategoryProgress: category.currentCategoryProgress,
            }));
    
            // Platzhalterkategorien hinzufügen, wenn weniger als 3 vorhanden sind
            while (categoryProgress.length < 3) {
                categoryProgress.push({
                    categoryName: "", // Leerer Name für Platzhalter
                    currentCategoryProgress: 0, // Fortschritt auf 0 setzen
                });
            }
    
            const auditData = {
                id: auditId,
                name: allAudits.find(a => a.id === parseInt(auditId))?.name || `Audit ${auditId}`,
                overallProgress: progressResponse.data.currentAuditProgress || 0,
                categoryProgress: categoryProgress,
            };
    
            setAudit(auditData);
        } catch (error) {
            const errorMessage = handleApiError(error); // Use handleApiError
            setError(errorMessage);
        }
    }, [allAudits]);

    // Use the custom loading progress hook
    const loadingProgress = useLoadingProgress(loading);

    /**
     * Fetches the list of all available audits for selection.
     */
    useEffect(() => {
        setLoading(true);
        const fetchAllAudits = async () => {
            try {
                const response = await api.get('/v1/audits');
                setAllAudits(response.data);
                setFilteredAudits(response.data);
            } catch {
                setError("Fehler beim Laden der Audit-Liste.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllAudits();
    }, []);
    

    /**
     * Fetches data for the selected audit after all audits are loaded.
     */
    useEffect(() => {
        if (auditId && allAudits.length > 0) {
            fetchAuditData(
                auditId,
                setSelectedAudit,
                "Fehler beim Laden der Daten des ersten Audits."
            );
        }
    }, [auditId, allAudits, fetchAuditData]);

    const applyFilters = useCallback(() => {
        const { customer, date } = filters;
        const filtered = allAudits.filter(audit => {
            const matchesCustomer = customer ? audit.customer.toLowerCase().includes(customer.toLowerCase()) : true;
            const matchesDate = date ? audit.createdAt.startsWith(date) : true;
            return matchesCustomer && matchesDate;
        });
        setFilteredAudits(filtered);
    }, [filters, allAudits]);

    useEffect(() => {
        applyFilters();
    }, [filters, allAudits, applyFilters]);

    const handleAuditSelect = (audit) => {
        fetchAuditData(
            audit.id,
            setSecondAudit,
            "Fehler beim Laden der Daten des zweiten Audits."
        );
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    if (loading) {
        return <LoadingScreen progress={loadingProgress} message="Loading, please wait..." />;
    }

    return (
        <LayoutDefault>
                {error && <AlertWithMessage severity="error" title="Fehler" message={error} />}
                <Title>Audits vergleichen</Title>

                {/* Filter Inputs */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <TextField
                        label="Kunde"
                        value={filters.customer}
                        onChange={(e) => handleFilterChange("customer", e.target.value)}
                    />
                    <TextField
                        label="Datum"
                        type="date"
                        value={filters.date}
                        onChange={(e) => handleFilterChange("date", e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        color="primary"
                    />
                </div>

                {/* Dropdown for selecting the second audit */}
                <AuditDropdown
                    audits={filteredAudits.filter(audit => audit.id !== selectedAudit?.id)}
                    onAuditSelect={handleAuditSelect}
                />

                <div className="grid grid-cols-2 gap-6 mb-4">
                    {selectedAudit && (
                        <AuditComparisonCard
                            name={selectedAudit.name}
                            progress={selectedAudit.overallProgress}
                            categoryProgress={selectedAudit.categoryProgress}
                        />
                    )}
                    {secondAudit && secondAudit.name ? (
                        <AuditComparisonCard
                            name={secondAudit.name}
                            progress={secondAudit.overallProgress}
                            categoryProgress={secondAudit.categoryProgress}
                        />
                    ) : (
                        <div className="p-4 bg-gray-100 rounded shadow">
                            <p className="text-center text-m">Bitte ein zweites Audit auswählen</p>
                        </div>
                    )}
                </div>
        </LayoutDefault>
    );
}
