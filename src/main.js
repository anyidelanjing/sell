// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import sellers from './components/sellers/sellers';
import './common/stylus/index.styl';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.use(VueRouter);
// const goods = { template: '<div>good</div>' };
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/sellers', component: sellers },
  { path: '/', redirect: '/goods' }// 重新刷新项目时出现的内容为goods，不然默认是空白
];
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
