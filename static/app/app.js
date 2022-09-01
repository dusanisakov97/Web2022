const blancPage = {template: '<blank-page></blank-page>'}
const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: blancPage },
    
  ]
});

var app = new Vue({
  router,
  el: '#aplication',
});