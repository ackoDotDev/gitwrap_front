/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Repository from "views/Repository.js";
import Repositories from "views/Repositories.js";
import UserPage from "views/User.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    menu: true
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    menu: true
  },
  {
    path: "/repositories",
    name: "Repositories",
    icon: "nc-icon nc-tile-56",
    component: Repositories,
    layout: "/admin",
    menu: true
  },
  {
    path: "/repository",
    name: "Repository",
    icon: "nc-icon nc-caps-small",
    component: Repository,
    layout: "/admin",
    menu: false
  },
];
export default routes;
