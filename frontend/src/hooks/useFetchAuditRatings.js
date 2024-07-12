// src/hooks/useFetchAuditRatings.js
import { useState, useEffect } from "react";
import api from "../service/api";
import { useParams } from "react-router-dom";

const useFetchAuditRatings = () => {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryProgress, setCategoryProgress] = useState({});
  const [mainProgress, setMainProgress] = useState(0);
  const [pointsDistribution, setPointsDistribution] = useState(
    new Array(6).fill(0)
  );
  const { auditId } = useParams();

  useEffect(() => {
    api
      .get(`/v1/audits/${auditId}/ratings`)
      .then((response) => {
        const data = response.data || [];
        setResponseData(data);
        setLoading(false);

        const totalQuestions = data.length;
        const maxScore = totalQuestions * 5;

        const actualScore = data.reduce((acc, rating) => {
          return acc + (rating.points || 0);
        }, 0);

        const calculatedProgress = Math.round((actualScore / maxScore) * 100);

        setMainProgress(calculatedProgress);

        const categoryScores = {};
        data.forEach((rating) => {
          const categoryId = rating.category.id;
          const categoryName = rating.category.name;

          if (!categoryScores[categoryId]) {
            categoryScores[categoryId] = {
              name: categoryName,
              totalPoints: 0,
              maxPoints: 0,
              questionCount: 0,
            };
          }

          categoryScores[categoryId].totalPoints += rating.points || 0;
          categoryScores[categoryId].maxPoints += 5;
          categoryScores[categoryId].questionCount += 1;
        });

        const calculatedCategoryProgress = {};
        Object.keys(categoryScores).forEach((categoryId) => {
          const category = categoryScores[categoryId];
          calculatedCategoryProgress[categoryId] = {
            name: category.name,
            progress: Math.round(
              (category.totalPoints / category.maxPoints) * 100
            ),
          };
        });

        setCategoryProgress(calculatedCategoryProgress);

        const distribution = data.reduce((acc, rating) => {
          const points = rating.points || 0;
          acc[points] = (acc[points] || 0) + 1;
          return acc;
        }, new Array(6).fill(0));

        setPointsDistribution(distribution);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      });
  }, [auditId]);

  return { responseData, loading, error, categoryProgress, mainProgress, pointsDistribution };
};

export default useFetchAuditRatings;
