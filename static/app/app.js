const blancPage = {template: '<blank-page></blank-page>'}
const customerRegistration = {template: '<customer-registration></customer-registration>'}
const coachRegistration = {template: '<coach-registration></coach-registration>'}
const managerRegistration = {template: '<manager-registration></manager-registration>'}

const login = {template: '<login></login>'}
const fees = {template: '<fees></fees>'}
const users = {template: '<users></users>'}
const home = {template: '<home></home>'}
const profile = {template: '<profile></profile>'}
const addObject = {template: '<add-object></add-object>'}
const singleObject = {template: '<single-object></single-object>'}
const myObject = {template: '<my-object></my-object>'}
const customerTrainings = {template: '<customer-trainings></customer-trainings>'}
const coachTrainings = {template: '<coach-trainings></coach-trainings>'}


const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: home },
    { path: '/login', component: login },
    { path: '/customer-registration', component: customerRegistration },
    { path: '/coach-registration', component: coachRegistration},
    { path: '/manager-registration', component: managerRegistration},
    { path: '/home', component: home },
    { path: '/users', component: users },
    { path: '/fees', component: fees },
    { path: '/profile', component: profile },
	{ path: '/add-object', component: addObject },
	{ path: '/single-object/:id', component: singleObject},
	{ path: '/my-object', component: myObject},
	{ path: '/customer-trainings', component: customerTrainings},
	{ path: '/coach-trainings', component: coachTrainings},


  ]
});

var app = new Vue({
  	router,
  	el: '#aplication',
	data: function(){
		return {
			mode: ""	
		};
	},
  	beforeMount() {
		axios.get("/session").then((response) => {
			if(response.data) {
				this.mode = response.data.role;
			} else {
				this.mode = "";
			}
		});
	},
	updated() {
		axios.get("/session").then((response) => {
			if(response.data) {
				this.mode = response.data.role;
			} else {
				this.mode = "";
			}
		});
	},
	methods: {
		logout: function() {
			axios.get("/logout").then(() => {
				this.mode == "";
				alert("Successful logout!");
				window.location.href = "#/login";
			})
		}
	}
});