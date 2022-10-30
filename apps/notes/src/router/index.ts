import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import TokenService from '../services/token.service';
import AuthService from '../services/auth.service';
import { LoginResInterface } from '@snider/api-interfaces';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { authorize: [] },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const token = TokenService.hasToken();
  console.log(TokenService.hasToken(), TokenService.getToken());

  if (authorize) {
    if (!token) {
      // not logged in, try to refresh access token.
      AuthService.refresh()
        .then((payload: LoginResInterface) => {
          TokenService.setToken(payload.accessToken);
        })
        .catch((err: any) => {
          console.error(err);
        });
      // refresh failed, redirect to login page with the return url
      return next({ path: '/login', query: { returnUrl: to.path } });
    }
  }

  next();
});

export default router;
