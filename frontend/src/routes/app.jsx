import Search from '../views/Search/Search';
import TableList from '../views/TableList/TableList';
import Typography from '../views/Typography/Typography';
import SelectBuilding from '../views/SelectBuilding/SelectBuilding';

const appRoutes = [
  {
    path: '/typography',
    name: 'All Buildings',
    icon: 'pe-7s-home',
    component: Typography
  },
  {
    path: '/select',
    name: 'Select Building',
    icon: 'pe-7s-pin',
    component: SelectBuilding
  },
  // { path: "/table", name: "Table", icon: "pe-7s-note2", component: TableList }, // don't need this anymore
  { path: '/search', name: 'Search', icon: 'pe-7s-search', component: Search },
  { redirect: true, path: '/', to: '/table', name: 'Table' }
];

export default appRoutes;
