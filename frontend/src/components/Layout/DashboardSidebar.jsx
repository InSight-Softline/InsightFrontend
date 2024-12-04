import {Link} from "react-router-dom";

export function DashboardSidebar(){
    return (
        <nav className="flex flex-col gap-2 bg-gray-200 h-full w-full p-4">
            <Link 
                to="/dashboard" 
                className="flex justify-center items-center border border-gray-400 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 transition-colors"
            >
                Dashboard
            </Link>
        </nav>
    )
}