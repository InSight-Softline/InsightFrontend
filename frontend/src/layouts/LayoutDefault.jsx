import {Children} from "react";
import { SidebarProvider } from "../contexts/SidebarContext.jsx";
import { Sidebar } from "../components/Layout/Sidebar.jsx";

export function LayoutDefault({children}){
    return (
        <SidebarProvider>
        <div className="flex h-screen">
            <aside className="transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-gray-200 overflow-hidden h-full">
            <Sidebar/>
            </aside>
            <main className="flex-1 h-full ${isOpen ? 'ml-64' : 'ml-16'">
                {Children.map(children, child => child)}
            </main>
        </div>
        </SidebarProvider>
    )
}