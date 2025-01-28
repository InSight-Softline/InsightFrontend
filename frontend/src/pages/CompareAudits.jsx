import React, { useState, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import { AuditDropdown } from "../components/CompareAudit/AuditDropdown.jsx";
import { AuditComparisonCard } from "../components/CompareAudit/AuditComparisonCard.jsx";
import api from "../api";
import Title from "../components/Textareas/Title.jsx";

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

    /**
     * Fetches audit progress and category-specific progress data from the API.
     *
     * @param {number} auditId - The ID of the audit to fetch data for.
     * @param {Function} setAudit - State setter function for updating the audit data (selectedAudit or secondAudit).
     * @param {string} errorMessage - Error message to display if the API request fails.
     */
    const fetchAuditData = useCallback(async (auditId, setAudit, errorMessage) => {
        try {
            const progressResponse = await api.get(`/v1/audits/${auditId}/progress`);
            console.log("API Response:", progressResponse.data);

            const auditData = {
                id: auditId,
                name: allAudits.find(a => a.id === parseInt(auditId))?.name || `Audit ${auditId}`,
                overallProgress: progressResponse.data.currentAuditProgress || 0,
                categoryProgress: (progressResponse.data.categoryProgress || []).map(category => ({
                    categoryName: category.categoryName,
                    currentCategoryProgress: category.currentCategoryProgress,
                })),
            };

            console.log("Processed Audit Data:", auditData);

            setAudit(auditData);
        } catch (err) {
            console.error(errorMessage, err);
            setError(errorMessage);
        }
    }, [allAudits]);

    /**
     * Fetches the list of all available audits for selection.
     */
    useEffect(() => {
        const fetchAllAudits = async () => {
            try {
                const response = await api.get('/v1/audits');
                setAllAudits(response.data);
                setFilteredAudits(response.data);
            } catch {
                setError("Fehler beim Laden der Audit-Liste.");
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

    return (
        <LayoutDefault>
                <Title>Audits vergleichen</Title>

                {/* Filter Inputs */}
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Kunde"
                        value={filters.customer}
                        onChange={(e) => handleFilterChange("customer", e.target.value)}
                        className="border rounded px-4 py-2"
                    />
                    <input
                        type="date"
                        value={filters.date}
                        onChange={(e) => handleFilterChange("date", e.target.value)}
                        className="border rounded px-4 py-2"
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
                            <p className="text-center text-sm">Bitte ein zweites Audit auswählen</p>
                        </div>
                    )}
                </div>
        </LayoutDefault>
    );
}
