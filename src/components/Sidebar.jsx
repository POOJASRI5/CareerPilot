import {
    LayoutDashboard,
    Briefcase,
    PlusCircle,
    FileText,
    CalendarDays,
    Sparkles
} from "lucide-react";

import { NavLink } from "react-router-dom";


function Sidebar() {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/",
            icon: LayoutDashboard
        },
        {
            name: "Applications",
            path: "/view",
            icon: Briefcase
        },
        {
            name: "Add Application",
            path: "/add",
            icon: PlusCircle
        },
        {
            name: "Resume Versions",
            path: "/resume",
            icon: FileText
        },
        {
            name: "Interviews",
            path: "/interviews",
            icon: CalendarDays
        },
        {
            name: "AI Cover Letter",
            path: "/cover-letter",
            icon: Sparkles
        }
    ];


    return (
        <aside className="sidebar">

            <div className="logo">

                <Briefcase size={20} />

                <div>

                    <strong>
                        CareerPilot
                    </strong>

                    <small>
                        Job Tracker
                    </small>

                </div>

            </div>


            <nav>

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            className="nav-item"
                        >

                            <Icon size={17} />

                            <span>
                                {item.name}
                            </span>

                        </NavLink>

                    );

                })}

            </nav>

        </aside>
    );
}


export default Sidebar;