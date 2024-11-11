import {LayoutDefault} from "../layouts/LayoutDefault.jsx";
import { AuditGridItem } from "../components/AuditGrid/AuditGridItem.jsx";


export function Dashboard() {
    const audit = {
        id:1,
        name: "Audit-Name",
        customer: "Firmen-Name",
        date: "01.01.24",
    }
    return (
        <LayoutDefault>
            <div className="bg-green-200 w-full h-full">
                <AuditGridItem audit={audit}></AuditGridItem>
            </div>
        </LayoutDefault>
    )
}
export default Dashboard;