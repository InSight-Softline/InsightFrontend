import { useState, useEffect } from 'react';
import api from "../service/api.js";
import { useParams } from "react-router-dom";

const useFetchAuditData = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auditId } = useParams();

  useEffect(() => {
    api.get(`/v1/audits/${auditId}/ratings`)
      .then(response => {
        console.log(response);
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      });
  }, [auditId]);

  return { questions, loading, error, setQuestions, setLoading, setError };
};

export default useFetchAuditData;
