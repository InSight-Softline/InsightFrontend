import { useState } from 'react';
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import ProgressBar from '../components/Charts/ProgressBar.jsx';
import CircularProgress from '../components/Charts/CircularProgress.jsx';
import BarChart from '../components/Charts/BarChart.jsx';

export function Evaluation() {

    // Daten später durch Backend erhalten?
    const [mainProgress, setMainProgress] = useState(75);
    const [categoryProgress, setCategoryProgress] = useState({
        1: { name: 'Kategorie 1', progress: 60 },
        2: { name: 'Kategorie 2', progress: 80 },
    });
    const [pointsDistribution, setPointsDistribution] = useState([3, 5, 2, 8, 4, 6]);
    const colors = ['#a50026', '#d73027', '#fdae61', '#d9ef8b', '#66bd63', '#006837'];

    return (
        <LayoutDefault>
            <div className="p-4 flex flex-col items-center">
                <div id="title">
                    <h1 className="text-center text-4xl m-6">Evaluation</h1>
                </div>

                <div id="result" className={"w-full flex flex-col justify-center items-center h-20 mb-6"}>
                    <div className={"text-center w-4/5"}>
                        <ProgressBar value={mainProgress} />
                    </div>
                    <p className={"text-center text-xl"}>Gesamtfortschritt</p>
                </div>

                <div id="categories" className="w-full grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {Object.keys(categoryProgress).map(categoryId => (
                        <div key={categoryId} className={"flex flex-col items-center"}>
                            <CircularProgress
                                value={categoryProgress[categoryId].progress}
                                size={60}
                            />
                            <p className={"text-center mt-2"}>{categoryProgress[categoryId].name}</p>
                        </div>
                    ))}
                </div>

                <div id="result_per_question" className={"max-w-full overflow-x-auto pb-10"}>
                    <BarChart data={pointsDistribution} colors={colors} />
                </div>
            </div>
        </LayoutDefault>
    );
}
