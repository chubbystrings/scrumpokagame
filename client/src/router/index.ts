import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Create from "../views/Create.vue";
import socket from "../services/socket.service";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Create,
  },

  {
    path: "/:id/join",
    name: "Join",
    beforeEnter: (to, from, next) => {
      let bool: boolean;
      socket.confirmRoom(to.params.id as string, (b) => {
        bool = b;
        if (!bool) {
           next('/');
        } else {
          next()
        }
      });
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "session" */ "../views/Join.vue"),
  },
  
  {
    path: "/:id",
    name: "Session",
    beforeEnter: (to, from, next) => {
      let bool: boolean;
      socket.confirmRoom(to.params.id as string, (b) => {
        bool = b;
        if (!bool) {
          return next('/');
        } 
        socket.confirmUser((confirm) => {
          if (confirm) {
            console.log(confirm)
            next()
          } else {
            next(`/${to.params.id}/join`)
          }
        })
      });
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "session" */ "../views/Session.vue"),
  },

  {
    path: '/:pathMatch(.*)*', //will match everything and put it under `$route.params.pathMatch`
    redirect: { name: 'Home' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
