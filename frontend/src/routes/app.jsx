import Search from '../views/Search/Search';
// import TableList from '../views/TableList/TableList';
// import Typography from '../views/Typography/Typography';
import SelectBuilding from '../views/SelectBuilding/SelectBuilding';
import AllBuildings from "../views/AllBuildings/AllBuildings";
// import UserProfile from "../views/UserProfile/UserProfile";

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
        redirect: true,
        path: '/',
        to: '/search',
        name: 'Search',
    }
];

export default appRoutes;
