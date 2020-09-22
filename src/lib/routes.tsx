import { Router } from "react-router"

import App from '../App'
import Home from '../pages/home'
import Edit from '../pages/edit'

const routes = {
    path: '/',
    component: App,
    childRoutes: [
      { path: 'home', component: Home },
      { path: 'edit', component: Edit },
    ]
}
export default routes;
