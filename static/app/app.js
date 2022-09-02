const blancPage = {template: '<blank-page></blank-page>'}
const customerRegistration = {template: '<customer-registration></customer-registration>'}
const login = {template: '<login></login>'}
const home = {template: '<home></home>'}


const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: home },
    { path: '/login', component: login },
    { path: '/customer-registration', component: customerRegistration },
    { path: '/home', component: home },

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