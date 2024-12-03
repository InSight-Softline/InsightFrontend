import React, {useEffect, useState, useRef} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {BarChart} from '@mui/x-charts/BarChart';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import api from "../api.js";
import {useParams} from "react-router-dom";
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import { ButtonGroup } from '@mui/material';

function Evaluation() {
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryProgress, setCategoryProgress] = useState({});
    const {auditId} = useParams();

    console.log(auditId);

    const [mainProgress, setMainProgress] = useState(0);
    const [pointsDistribution, setPointsDistribution] = useState(new Array(6).fill(0));

    useEffect(() => {
        api.get(`/v1/audits/${auditId}/ratings`)
            .then(response => {
                console.log(response);
                const data = response.data || [];
                setResponseData(data);
                setLoading(false);

                const totalQuestions = data.length;

                const actualProgress = data.filter((question) => {
                    if((question.points != null) || (question.nA == true)) {
                        return true;
                    }
                });

                const calculatedProgress = Math.round((actualProgress.length / totalQuestions) * 100);

                setMainProgress(calculatedProgress);

                // Berechnung des Fortschritts für jede Kategorie
                const categoryScores = {};
                data.forEach(rating => {
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

                    categoryScores[categoryId].totalPoints += (rating.points || 0);
                    categoryScores[categoryId].maxPoints += 5;
                    categoryScores[categoryId].questionCount += 1;
                });

                const calculatedCategoryProgress = {};
                Object.keys(categoryScores).forEach(categoryId => {
                    const category = categoryScores[categoryId];
                    calculatedCategoryProgress[categoryId] = {
                        name: category.name,
                        progress: Math.round((category.totalPoints / category.maxPoints) * 100)
                    };
                });

                setCategoryProgress(calculatedCategoryProgress);

                // Berechnung der Punkteverteilung
                const distribution = data.reduce((acc, rating) => {
                    const points = rating.points;
                    acc[points] = (acc[points]) + 1;
                    return acc;
                }, new Array(6).fill(0));

                console.log("Points Distribution:", distribution);
                setPointsDistribution(distribution);

            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError(err);
                setLoading(false);
            });
    }, [auditId]);

    if (loading) {
        return <p>Laden...</p>;
    }

    if (error) {
        return <p>Fehler: {error.message}</p>;
    }

    // Setup function progress bar
    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{width: '100%', mr: 1}}>
                    <LinearProgress variant="determinate" value={mainProgress} {...props} />
                </Box>
                <Box sx={{minWidth: 35}}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
                </Box>
            </Box>
        );
    }

    // Setup progress circle
    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{position: 'relative', display: 'inline-flex'}}>
                <CircularProgress variant="determinate" {...props} size={80}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    //Evalution Graph Component
    const EvaluationGraph = React.forwardRef((props, ref) => (
        <div ref={ref}>
            <BarChart
                series={[
                    {data: pointsDistribution},
                ]}
                width="900"
                height={350}
                xAxis={[
                    {
                        scaleType: 'band',
                        data: [0, 1, 2, 3, 4, 5],
                        colorMap: {
                            type: 'ordinal',
                            values: [0, 1, 2, 3, 4, 5],
                            colors: colors,
                            unknownColor: "#050505",
                        },
                        label: 'erreichte Punkte',
                    },
                ]}
                yAxis={[
                    {
                        label: 'Anzahl Fragen',
                    },
                ]}
            />
    </div>
    ));

    function ExportingGraph() {
        const componentRef = useRef();
        return (
            <Box 
                sx = {{
                    display:'flex',
                    justifyContent:'space-around',
                    margin:4,
                }}
            >
                <ButtonGroup
                    variant="outlined"
                    color="error">
                    <Button 
                        onClick={() => {
                            exportComponentAsJPEG(componentRef);
                        }}
                    >Export as JPEG</Button>
                    <Button 
                        onClick={() => {
                            exportComponentAsPDF(componentRef);
                        }}
                    >Export as PDF</Button>
                    <Button 
                        onClick={() => {
                            exportComponentAsPNG(componentRef);
                        }}
                    >Export as PNG</Button>
                </ButtonGroup>
            </Box>
        );
    }


    const colors = ['#a50026', '#d73027', '#fdae61', '#d9ef8b', '#66bd63', '#006837'];

    return (
        <div className="p-4 flex flex-col items-center">
            <div id="title">
                <h1 className="text-center text-4xl m-6">Evaluation</h1>
            </div>

            <div id="result" className={"w-full flex flex-col justify-center items-center h-20 mb-6"}>
                <Box className={"text-center"} sx={{width: '80%'}}>
                    <LinearProgressWithLabel value={mainProgress}/>
                </Box>
                <p className={"text-center text-xl"}>Gesamtfortschritt</p>
            </div>

            <div id="categories" className="w-full grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Object.keys(categoryProgress).map(categoryId => (
                    <div key={categoryId} className={"flex flex-col items-center"}>
                        <CircularProgressWithLabel
                            value={categoryProgress[categoryId].progress} className={"size-60 mb-2"}/>
                        <p className={"text-center mt-2"}>{categoryProgress[categoryId].name}</p>
                    </div>
                ))}
            </div>

            <div id="result_per_question"
                 className={"max-w-full overflow-x-auto pb-10"}
                 >
                <EvaluationGraph/>
                <ExportingGraph/>
            </div>
        </div>
    );
}

export default Evaluation;
