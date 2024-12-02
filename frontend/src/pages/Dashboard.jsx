import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import AuditGrid from "../components/AuditGrid/AuditGrid.jsx";
import { useState, useEffect } from "react";
import api from "../api.js";

export function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* fetching data from backend */
  useEffect(() => {
    api
      .get("/v1/audits")
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
  }, []);

  if (loading) {
    return <p>Laden...</p>;
  }

  return (
    <LayoutDefault>
      <div className="bg-white-200 w-full h-full">
        <h1 className="text-center text-2xl mb-6">Dashboard</h1>
        <AuditGrid data={data} loading={loading} error={error} />
      </div>
    </LayoutDefault>
  );
}
