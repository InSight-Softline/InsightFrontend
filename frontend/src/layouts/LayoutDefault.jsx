import {DashboardSidebar} from "../components/Layout/DashboardSidebar.jsx";
import {Children} from "react";
import { Header } from "../components/Layout/Header.jsx";
import {Footer} from "../components/Layout/Footer.jsx";

export function LayoutDefault({children}){
    return (
        <div className="flex flex-col h-screen overflow-scroll">
            <Header />
            <div className="flex flex-1 mt-16">
                <aside className="w-64 h-[calc(100vh-4rem)] bg-gray-200 p-4 shadow-md fixed">
                    <DashboardSidebar></DashboardSidebar>
                </aside>
                <main className="flex-1 ml-64 bg-gray-100 pb-24">
                    {Children.map(children, (child) => child)}
                </main>
            </div>
            <Footer />
        </div>
    )
}