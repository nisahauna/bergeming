import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddPost from "../views/AddPost.vue";
import Post from "../views/Post.vue";
import EditPost from "../views/EditPost.vue";
import Timeline from "../views/Timeline.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/AddJournal",
    name: "AddJournal",
    component: AddPost,
  },
  {
    path: "/post/view/:id",
    name: "post",
    component: Post,
  },
  {
    path: "/edit-post/:id",
    name: "edit-post",
    component: EditPost,
  },
  {
    path: "/Timeline",
    name: "Timeline",
    component: Timeline,
  },
  {
    path: "/:datecode",
    name: "postsByDate",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
