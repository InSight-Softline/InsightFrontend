import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { BarChart } from '@mui/x-charts/BarChart';
import LinearProgress from '@mui/material/LinearProgress';
import api from "../api.js";
import { useParams } from "react-router-dom";
import Title from './components/Title';
import Text from './components/Text';

function Evaluation() {
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryProgress, setCategoryProgress] = useState({});
    const { auditId } = useParams();
    const [mainProgress, setMainProgress] = useState(0);
    const [pointsDistribution, setPointsDistribution] = useState(new Array(6).fill(0));

    useEffect(() => {
        api.get(`/v1/audits/${auditId}/ratings`)
            .then(response => {
                const data = response.data || [];
                setResponseData(data);
                setLoading(false);

                const totalQuestions = data.length;
                const maxScore = totalQuestions * 5;

                const actualScore = data.reduce((acc, rating) => acc + (rating.points || 0), 0);
                const calculatedProgress = Math.round((actualScore / maxScore) * 100);
                setMainProgress(calculatedProgress);

                const categoryScores = {};
                data.forEach(rating => {
                    const categoryId = rating.category.id;
                    const categoryName = rating.category.name;

                    if (!categoryScores[categoryId]) {
                        categoryScores[categoryId] = {
                            name: categoryName,
                            totalPoints: 0,
                            maxPoints: 0,
                        };
                    }

                    categoryScores[categoryId].totalPoints += (rating.points || 0);
                    categoryScores[categoryId].maxPoints += 5;
                });

                const calculatedCategoryProgress = {};
                Object.keys(categoryScores).forEach(categoryId => {
                    const category = categoryScores[categoryId];
                    calculatedCategoryProgress[categoryId] = {
                        name: category.name,
                        progress: Math.round((category.totalPoints / category.maxPoints) * 100),
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
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [auditId]);

    if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
    if (error) return <Text>Fehler: {error.message}</Text>;

    return (
        <div className="p-4 flex flex-col items-center">
            <Title>Evaluation</Title>

            <div id="result" className="w-full flex flex-col justify-center items-center h-20 mb-6">
                <Box className="text-center" sx={{ width: '80%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress variant="determinate" value={mainProgress} sx={{ width: '100%', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">{`${Math.round(mainProgress)}%`}</Typography>
                    </Box>
                </Box>
                <Text customStyles="text-center text-xl">Gesamtfortschritt</Text>
            </div>

            <div id="categories" className="w-full grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Object.keys(categoryProgress).map(categoryId => (
                    <div key={categoryId} className="flex flex-col items-center">
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress variant="determinate" value={categoryProgress[categoryId].progress} size={80} />
                            <Box sx={{
                                top: 0, left: 0, bottom: 0, right: 0, position: 'absolute',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Typography variant="caption" component="div" color="text.secondary">
                                    {`${Math.round(categoryProgress[categoryId].progress)}%`}
                                </Typography>
                            </Box>
                        </Box>
                        <Text customStyles="text-center mt-2">{categoryProgress[categoryId].name}</Text>
                    </div>
                ))}
            </div>

            <div id="result_per_question" className="max-w-full overflow-x-auto pb-10">
                <BarChart
                    series={[{ data: pointsDistribution }]}
                    width={900}
                    height={350}
                    xAxis={[{
                        scaleType: 'band', data: [0, 1, 2, 3, 4, 5],
                        colorMap: { type: 'ordinal', values: [0, 1, 2, 3, 4, 5], colors: ['#a50026', '#d73027', '#fdae61', '#d9ef8b', '#66bd63', '#006837'] },
                        label: 'erreichte Punkte',
                    }]}
                    yAxis={[{ label: 'Anzahl Fragen' }]}
                />
            </div>
        </div>
    );
}

export default Evaluation;
