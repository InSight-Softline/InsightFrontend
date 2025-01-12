import React, { useState, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import { AuditDropdown } from "../components/CompareAudit/AuditDropdown.jsx";
import { AuditComparisonCard } from "../components/CompareAudit/AuditComparisonCard.jsx";
import api from "../api";
import Title from "../components/Textareas/Title.jsx";

/**
 * CompareAudits Component
 * 
 * Ermöglicht Benutzern, zwei Audits anhand ihrer Fortschritts- und Bewertungsdaten zu vergleichen.
 * Filteroptionen sind verfügbar, um die Dropdown-Liste der Audits nach Kunde und Datum einzuschränken.
 * 
 * @returns {JSX.Element} Die gerenderte CompareAudits-Seite.
 */
export function CompareAudits() {
    const { auditId } = useParams();
    const [selectedAudit, setSelectedAudit] = useState(null);
    const [secondAudit, setSecondAudit] = useState(null);
    const [allAudits, setAllAudits] = useState([]);
    const [filteredAudits, setFilteredAudits] = useState([]);
    const [filters, setFilters] = useState({ customer: "", date: "" });
    const [error, setError] = useState(null);

    // Fetch all audits
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

    // Fetch audit data
    const fetchAuditData = useCallback(async (auditId, setAudit, errorMessage) => {
        try {
            const progressResponse = await api.get(`/v1/audits/${auditId}/progress`);
            const auditName = allAudits.find(a => a.id === parseInt(auditId))?.name || `Audit ${auditId}`;
            const categoryProgressArray = (progressResponse.data.categoryProgress || []).map(category => ({
                name: category.categoryName,
                progress: category.currentCategoryProgress,
            }));

            const auditData = {
                id: auditId,
                name: auditName,
                overallProgress: progressResponse.data.currentAuditProgress || 0,
                categoryProgress: categoryProgressArray,
            };

            const ratingsResponse = await api.get(`/v1/audits/${auditId}/ratings`);
            const distribution = [0, 0, 0, 0, 0, 0, 0];
            ratingsResponse.data.forEach(rating => {
                if (rating.na === true) {
                    distribution[6]++;
                } else if (rating.points !== null) {
                    distribution[rating.points]++;
                } else {
                    distribution[6]++;
                }
            });

            setAudit({ ...auditData, distribution });
        } catch {
            setError(errorMessage);
        }
    }, [allAudits]);

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
            <div className="max-w-6xl mx-auto px-4">
                <Title>Audits vergleichen</Title>

                {/* Filter Inputs */}
                <div className="flex flex-wrap gap-4 mb-6">
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

                <div className="grid grid-cols-2 gap-6">
                    {selectedAudit && (
                        <AuditComparisonCard
                            name={selectedAudit.name}
                            progress={selectedAudit.overallProgress}
                            categories={selectedAudit.categoryProgress}
                            distribution={selectedAudit.distribution}
                        />
                    )}
                    {secondAudit && (
                        <AuditComparisonCard
                            name={secondAudit.name}
                            progress={secondAudit.overallProgress}
                            categories={secondAudit.categoryProgress}
                            distribution={secondAudit.distribution}
                        />
                    )}
                </div>
            </div>
        </LayoutDefault>
    );
}
