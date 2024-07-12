import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { useParams } from "react-router-dom";
import LinearProgressWithLabel from "../../components/LinearProgressWithLabel";
import CircularProgressWithLabel from "../../components/CircularProgressWithLabel";
import useFetchAuditRatings from "../../hooks/useFetchAuditRatings";
import './Evaluation.css'; 

function Evaluation() {
  const { auditId } = useParams();
  const {
    loading,
    error,
    categoryProgress,
    mainProgress,
    pointsDistribution,
  } = useFetchAuditRatings(auditId);

  if (loading) {
    return <p>Laden...</p>;
  }

  if (error) {
    return <p>Fehler: {error.message}</p>;
  }


  const colors = [
    "#a50026",
    "#d73027",
    "#fdae61",
    "#d9ef8b",
    "#66bd63",
    "#006837",
  ];

  return (
    <div>
      <div id="title">
        <h1 className="evaluation-title">Evaluation</h1>
      </div>

      <div id="result" className="result-container">
        <Box className="linear-progress-box">
          <LinearProgressWithLabel />
        </Box>
        <p className="overall-progress-text">Gesamtfortschritt</p>
      </div>

      <div id="categories" className="categories-container">
        {Object.keys(categoryProgress).map((categoryId) => (
          <div key={categoryId} className="category-progress">
            <CircularProgressWithLabel
              value={categoryProgress[categoryId].progress}
              className="circular-progress"
            />
            <p className="text-center">{categoryProgress[categoryId].name}</p>
          </div>
        ))}
      </div>

      <div id="result_per_question" className="result-per-question-container">
        <BarChart
          series={[{ data: pointsDistribution }]}
          width={1200}
          height={350}
          xAxis={[
            {
              scaleType: "band",
              data: [0, 1, 2, 3, 4, 5],
              colorMap: {
                type: "ordinal",
                values: [0, 1, 2, 3, 4, 5],
                colors: colors,
                unknownColor: "#050505",
              },
              label: "erreichte Punkte",
            },
          ]}
          yAxis={[
            {
              label: "Anzahl Fragen",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Evaluation;
