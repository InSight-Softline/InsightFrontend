import { AuditGridItem } from "../components/AuditGrid/AuditGridItem.jsx";
import {LayoutDefault} from "../layouts/LayoutDefault.jsx";

export function Dashboard() {
    const audit = {
        id:1,
        name: "klaus",
        customer: "Ikea",
    }
    return (
        <LayoutDefault>
            <div className="bg-green-200 w-full h-full">
                <AuditGridItem audit={audit}></AuditGridItem>
            </div>
        </LayoutDefault>
    )
}