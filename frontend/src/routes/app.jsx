import SelectBuilding from '../views/Search/Search';
import UserProfile from '../views/UserProfile/UserProfile';
import TableList from '../views/TableList/TableList';
import Typography from '../views/Typography/Typography';
import Icons from '../views/Icons/Icons';
import Maps from '../views/Maps/Maps';
import Notifications from '../views/Notifications/Notifications';
import Upgrade from '../views/Upgrade/Upgrade';

const appRoutes = [
    // { path: "/user", name: "Equipment", icon: "pe-7s-user", component: UserProfile },
    { path: "/typography", name: "All Buildings", icon: "pe-7s-home", component: Typography },
    { path: "/maps", name: "Select Building", icon: "pe-7s-pin", component: SelectBuilding },
    { path: "/table", name: "Table", icon: "pe-7s-note2", component: TableList },
    { path: "/search", name: "Search", icon: "pe-7s-search", component: SelectBuilding },
    // { path: "/typography", name: "Typography", icon: "pe-7s-news-paper", component: Typography },
    // { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
    // { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
    // { path: "/notifications", name: "Notifications", icon: "pe-7s-bell", component: Notifications },
    // { redirect: true, path:"/", to:"/dashboard", name: "Search" }
];

export default appRoutes;
