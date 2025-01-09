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
        api
            .get("/v1/audits", {
                params: {
                    search: debouncedCustomerName?.length ? debouncedCustomerName : undefined,
                },
            })
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((err) => {
                const errorMessage = handleApiError(err);
                setError(errorMessage);
            })
    }, [debouncedCustomerName]);

    if (loading) {
        return <LoadingScreen progress={loadingProgress} message="Loading, please wait..." />;
    }

    if (error) {
        return <AlertWithMessage severity="error" title="Error" message={error} />;
    }

    return (
        <LayoutDefault>
            <div className="w-full h-full p-5">
                <Title>Dashboard</Title>
                <TextField id="outlined-basic" label="Suche" variant="outlined" onChange={handleCustomerFilterChange} />
                <AuditGrid data={data} loading={loading} error={error} />
            </div>
        </LayoutDefault>
    );
}
