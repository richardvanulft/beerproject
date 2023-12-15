import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createMetaManager } from 'vue-meta';
import App from './App.vue';
import store from './store';
import MainPage from './components/main/MainPage.vue';
import BeerList from './components/main/BeerList.vue';
import AboutPage from './components/main/AboutPage.vue';
import ContactPage from './components/main/ContactPage.vue';
import BeerInfo from './components/BeerInfo.vue';
import Login from './components/accounts/login.vue';
import Register from './components/accounts/register.vue';
import SEO from './components/main/SEO.vue';
import Profile from './components/accounts/ProfilePage.vue';

const routes = [
  { path: '/', component: MainPage },
    { path: '/beers', component: BeerList },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },
  { path: '/beers/:id', name: "BeerInfo", component: BeerInfo },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profile', component:Profile},
  {path: '/SEO', component: SEO },
];

const cookies = document.cookie.split(';');
const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));

if (userCookie) {
  const userData = JSON.parse(userCookie.split('=')[1]);
  store.commit('user/setUser', userData);
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(createMetaManager());
app.mount('#app');