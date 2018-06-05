import Search from '../views/Search/Search';
// import TableList from '../views/TableList/TableList';
// import Typography from '../views/Typography/Typography';
import SelectBuilding from '../views/SelectBuilding/SelectBuilding';
import AllBuildings from "../views/AllBuildings/AllBuildings";
// import UserProfile from "../views/UserProfile/UserProfile";
import UserManual from "../views/UserManual/UserManual";

const appRoutes = [
    {
        path: '/all-building',
        name: 'All Buildings',
        icon: 'graph-icon',
        component: AllBuildings,
    },
    {
        path: '/select',
        name: 'Select Building',
        icon: 'select-icon',
        component: SelectBuilding,
    },
    {
        path: '/search',
        name: 'Search',
        icon: 'search-icon',
        component: Search,
    },
    {
        path: '/user-guide',
        name: 'User Guide',
        icon: 'help-icon',
        component: UserManual,
    },
    {
        redirect: true,
        path: '/',
        to: '/all-building',
        name: 'All Buildings',
    }
];

export default appRoutes;
