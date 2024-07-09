import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {BarChart} from '@mui/x-charts/BarChart';
import LinearProgress from '@mui/material/LinearProgress';


function Evaluation() {

    let progress = 70;


    // Setup function progress bar
    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{width: '100%', mr: 1}}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{minWidth: 35}}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
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

    const colors = ['#a50026', '#d73027', '#fdae61', '#d9ef8b', '#66bd63', '#006837'];

    return (
        <div className="ml-64 mt-16 p-4">
            <div id="title">
                <h1 className="text-center text-4xl m-6">Evaluation</h1>
            </div>

            <div id="result" className={"flex flex-col justify-center items-center h-20"}>
                <Box className={"text-center"} sx={{width: '80%'}}>
                    <LinearProgressWithLabel value={progress}/>
                </Box>
                <p className={"text-center text-xl"}>Gesamtfortschritt</p>
            </div>

            <div id="categories" className={"flex flex-wrap justify-center gap-4 mb-8"}>
                <div className={"ml-6 m-8 text-center"}>
                    <CircularProgressWithLabel value={progress} className={"size-60 mb-2"}/>
                    <p className={"text-center"}>Kategorie 1</p>
                </div>
                <div className={"ml-6 m-8 text-center"}>
                    <CircularProgressWithLabel value={progress} className={"size-60"}/>
                    <p className={"text-center"}>Kategorie 2</p>
                </div>
                <div className={"ml-6 m-8 text-center"}>
                    <CircularProgressWithLabel value={progress} className={"size-60"}/>
                    <p className={"text-center"}>Kategorie 3</p>
                </div>
                <div className={"ml-6 m-8 text-center"}>
                    <CircularProgressWithLabel value={progress} className={"size-60"}/>
                    <p className={"text-center"}>Kategorie 4</p>
                </div>
                <div className={"ml-6 m-8 text-center"}>
                    <CircularProgressWithLabel value={progress} className={"size-60"}/>
                    <p className={"text-center"}>Kategorie 5</p>
                </div>
                <div className={"ml-6 m-8 text-center"}>
                    <CircularProgressWithLabel value={progress} className={"size-60"}/>
                    <p className={"text-center"}>Kategorie 6</p>
                </div>
            </div>

            <div id="result_per_question" className={"flex flex-row justify-center items-center"}>
                <BarChart
                    series={[
                        {data: [4, 2, 8, 4, 1, 3]},
                    ]}
                    width="100%"
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
        </div>


    )
}

export default Evaluation;