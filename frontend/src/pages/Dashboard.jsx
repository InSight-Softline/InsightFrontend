import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import AuditGrid from "../components/AuditGrid/AuditGrid.jsx";
import { useState, useEffect, useMemo } from "react";
import api from "../api.js";
import { Input, debounce, TextField } from "@mui/material";
import Title from "../components/Textareas/Title.jsx";
import { LoadingScreen } from "../components/LoadingState";
import { AlertWithMessage } from "../components/ErrorHandling";
import { handleApiError } from "../utils/handleApiError";
import { useLoadingProgress } from "../components/LoadingState/useLoadingProgress";

export function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [customerName, setCustomerName] = useState("");

    const [debouncedCustomerName, setDebouncedCustomerName] = useState(customerName);

    const debouncedCustomerUpdate = useMemo(
        () =>
            debounce((value) => {
                setDebouncedCustomerName(value);
            }, 300),
        [setDebouncedCustomerName],
    );

    const handleCustomerFilterChange = (e) => {
        setCustomerName(e.target.value);
        debouncedCustomerUpdate(e.target.value);
    };

    // Use the custom loading progress hook
    const loadingProgress = useLoadingProgress(loading);

    useEffect(() => {
        setLoading(true);
        api
            .get("/v1/audits")
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((err) => {
                // Use the helper function
                const errorMessage = handleApiError(err);
                setError(errorMessage);
            })
            .finally(() => setLoading(false));
    }, []);


    // Fetch data from backend
    useEffect(() => {
        setLoading(true);
        api
            .get("/v1/audits", {
                params: {
                    customer: debouncedCustomerName?.length ? debouncedCustomerName : undefined,
                    sortBy: "createdAt",
                    sortDirection: "desc",
                },
            })
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((err) => {
                // Use the helper function
                setError(handleApiError(err));
                setData([]); 
            })
            .finally(() => setLoading(false));

    }, [debouncedCustomerName]);
    if (loading) {
        return <LoadingScreen progress={loadingProgress} message="Loading, please wait..." />;
    }
    return (
        <LayoutDefault>
            <div className="w-full h-full p-5">
                <Title>Dashboard</Title>
                <h2 className="font-bold">Filter</h2>
                <TextField id="outlined-basic" label="Kundenname" variant="outlined" onChange={handleCustomerFilterChange} />
                {error && <AlertWithMessage severity="error" title="Fehler" message={error} />} {/* Fehleranzeige */}
                <AuditGrid data={data} loading={loading} error={error} />
            </div>
        </LayoutDefault>
    );
}