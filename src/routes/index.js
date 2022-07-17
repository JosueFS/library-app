import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = () => import('@/views/Home.vue');

Vue.use(VueRouter);

const defaultRoutes = [
  {
    path: "/inicio",
    component: Home,
    meta: {
      // forAuth: true,
      title: "Home"
    },
  },
  {
    path: "/favoritos",
    component: Home,
    meta: {
      forAuth: true,
      title: "Favoritos"
    },
  },
  {
    path: "/devolver",
    component: Home,
    meta: {
      forAuth: true,
      title: "Devolver"
    },
  },
  {
    path: "/doar-livro",
    component: Home,
    meta: {
      forAuth: true,
      title: "Doar Livro"
    },
  },
  {
    path: "*",
    redirect: "/inicio"
  },
]

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
/* webpackChunkName: "about" */
const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    ...defaultRoutes
  ],
});

export default router;
