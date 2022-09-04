const blancPage = {template: '<blank-page></blank-page>'}
const customerRegistration = {template: '<customer-registration></customer-registration>'}
const coachRegistration = {template: '<coach-registration></coach-registration>'}
const managerRegistration = {template: '<manager-registration></manager-registration>'}

const login = {template: '<login></login>'}
const fees = {template: '<fees></fees>'}
const users = {template: '<users></users>'}
const home = {template: '<home></home>'}
const profile = {template: '<profile></profile>'}


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