import {LayoutDefault} from "../layouts/LayoutDefault.jsx";
import AuditGrid from "../components/AuditGrid/AuditGrid.jsx";
import {useState, useEffect, useMemo} from "react";
import api from "../api.js";
import {Input, debounce, TextField} from "@mui/material";

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
    }

    /* fetching data from backend */
    useEffect(() => {
        api
            .get("/v1/audits", {
                params: {
                    customer: debouncedCustomerName?.length ? debouncedCustomerName : undefined,
                }
            })
            .then((response) => {
                console.log(response);
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError(err);
                setLoading(false);
            });
    }, [debouncedCustomerName]);

    if (loading) {
        return <p>Laden...</p>;
    }

    return (
        <LayoutDefault>
            <div className="w-full h-full p-5">
                <h1 className="text-center text-2xl mb-6">Dashboard</h1>
                <h2 className="font-bold">Filter</h2>
                <TextField id="outlined-basic" label="Kundenname" variant="outlined" onChange={handleCustomerFilterChange}/>
                <AuditGrid data={data} loading={loading} error={error}/>
            </div>
        </LayoutDefault>
    );
}
