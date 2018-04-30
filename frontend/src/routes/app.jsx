import Search from '../views/Search/Search';
import TableList from '../views/TableList/TableList';
import Typography from '../views/Typography/Typography';
import SelectBuilding from '../views/SelectBuilding/SelectBuilding';

const appRoutes = [
  {
    path: '/typography',
    name: 'All Buildings',
    icon: 'pe-7s-home',
    component: Typography,
  },
  {
    path: '/select',
    name: 'Select Building',
    icon: 'pe-7s-pin',
    component: SelectBuilding,
  },
  {
    path: '/search',
    name: 'Search',
    icon: 'pe-7s-search',
    component: Search,
  },
  {
    redirect: true,
    path: '/',
    to: '/search',
    name: 'Search',
  },
];

export default appRoutes;
