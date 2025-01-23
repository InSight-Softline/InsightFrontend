import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import AuditGrid from "../components/AuditGrid/AuditGrid.jsx";
import { useState, useEffect, useMemo } from "react";
import api from "../api.js";
import { debounce, TextField } from "@mui/material";
import Title from "../components/Textareas/Title.jsx";
import { LoadingScreen } from "../components/LoadingState";
import { handleApiError } from "../utils/handleApiError";
import { useLoadingProgress } from "../components/LoadingState/useLoadingProgress";
import { AlertWithMessage } from "../components/ErrorHandling";

export function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
     
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const debouncedSearchUpdate = useMemo(
        () =>
            debounce((value) => {
                setDebouncedSearchTerm(value);
            }, 300),
        []
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedSearchUpdate(e.target.value);
    };

    // Use the custom loading progress hook
    const loadingProgress = useLoadingProgress(loading);

    // Load data initial Render
    useEffect(() => {
        setLoading(true);
        api
            .get("/v1/audits", {
                params: {
                    sortBy: "createdAt",
                    sortDirection: "desc",
                },
            })
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((err) => {
                setError(handleApiError(err));
            })
            .finally(() => setLoading(false));
    }, []);

    // Filter data based on the search
    useEffect(() => {
        
        api
            .get("/v1/audits", {
                params: {
                    search: debouncedSearchTerm?.length ? debouncedSearchTerm : undefined,
                    sortBy: "createdAt",
                    sortDirection: "desc",
                },
            })
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((err) => {
                setError(handleApiError(err));
            });
    }, [debouncedSearchTerm]);

    if (loading) {
        return <LoadingScreen progress={loadingProgress} message="Loading, please wait..." />;
    }

    return (
        <LayoutDefault>
            <div className="w-full h-full p-5">
                <Title>Dashboard</Title>
                <TextField id="outlined-basic" label="Suche" variant="outlined" value={searchTerm} onChange={handleSearchChange} />
                {error && <AlertWithMessage severity="error" title="Fehler" message={error} />}
                <AuditGrid data={data} loading={loading} error={error} />
            </div>
        </LayoutDefault>
    );
}