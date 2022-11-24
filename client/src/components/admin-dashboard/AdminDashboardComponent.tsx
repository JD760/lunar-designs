import "./AdminDashboardComponent.css";

// populate with props for the dashboard component
interface AdminDashboardProps {}

// export the function as a module to be used in other files
export default function AdminDashboardComponent (props: AdminDashboardProps) {
    return(
        <div className="dashboard-container">
            <div className="dashboard-navbar">
                <div className="stats nav-item">Stats</div>
                <div className="orders nav-item">Orders</div>
                <div className="users nav-item">Users</div>
            </div>
            <div className="dashboard-page">
                Page
            </div>
        </div>
    )
}
