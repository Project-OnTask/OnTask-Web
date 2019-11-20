import React from 'react';
import { withRouter} from 'react-router-dom'

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Group = React.lazy(() => import('./views/Group'));
const Profile = React.lazy(() => import('./views/Profile'));
const Settings = React.lazy(() => import('./views/Settings'));
const OutlookExtract = React.lazy(() => import('./views/OutlookCodeExtract'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/groups/:gid', exact: true,name: 'Group', component: withRouter(Group) },
  { path: '/users/:id', exact: true, name: 'User Details', component: Profile },
  { path: '/settings', exact: true, name: 'Settings', component: Settings },
  { path: '/outlook', exact: true, name: 'Outlook Code', component: OutlookExtract }
];

export default routes;
