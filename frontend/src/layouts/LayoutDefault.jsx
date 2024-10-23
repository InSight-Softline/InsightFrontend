import {DashboardSidebar} from "../components/DashboardSidebar/DashboardSidebar.jsx";
import {Children} from "react";

export function LayoutDefault({children}){
    return (
        <div className="grid grid-cols-12 h-screen w-screen">
            <aside className="col-span-2">
                <DashboardSidebar></DashboardSidebar>
            </aside>
            <main className="col-span-10 h-full">
                {Children.map(children, child => child)}
            </main>
        </div>
    )
}