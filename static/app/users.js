Vue.component("users", {
	template: `
	<div class="ui container">
		<div class="ui form">
			<div class="four fields">
				<div class="field">
					<label>First name</label>
					<input type="text" placeholder="First Name" v-model="search.firstName">
				</div>
				<div class="field">
					<label>Last name</label>
					<input type="text" placeholder="Last Name" v-model="search.lastName">
				</div>
				<div class="field">
					<label>Username:</label>
					<input type="text" placeholder="Username" v-model="search.username">
				</div>
				<div class="field">
					<label>&nbsp;</label>
					<button type="buttom" class="ui green button" v-on:click="onSearch">Search </button>
				</div>
			</div>
		</div>




		<div class="ui four cards">
		  <div class="card" v-for="u in showUsers">
		    <div class="content">
		      <div class="header">{{u.firstName + ' ' + u.lastName}}</div>
		      <div class="meta">
		        <a>{{u.role}}</a>
		      </div>
		      
		    </div>
		    <div class="extra content">
				<div class="ui field">
					<span class="right floated">
						<i class="birthday icon"></i>
						{{u.birthday}}
					</span>
					<span>
						<i class="user icon"></i>
						{{u.gender}}
					</span>
				</div>
		    </div>
			<div class="ui field centered grid" style="padding:20px" v-if="mode == 'ADMIN' && u.role != 'ADMIN'"> 
					<button class="ui red button" type="button" v-on:click="deleteUser(u)">Delete</button>
				</div>
		  </div>
		  
		  
		</div>
	</div>

	`,
	data: function() {
		return {
			users: [],
			mode: null,
			search: {
				firstName: "",
				lastName: "",
				username: ""
			},
			showUsers: []
		}
	},
	beforeCreate() {
		axios.get("/session").then(response => this.mode = response.data.role);
		axios.get("/admin/users").then((response) => {
			this.users = response.data;
			this.showUsers = response.data;
		});
	},
	methods: {
		deleteUser(user) {
			console.log("newi problem")
			axios.delete("/user", {
				params: {
					id: user.id
				}
			}).then(() => {
				alert("User deleted!")
				axios.get("/admin/users").then((response) => {
					this.users = response.data;
				});
			});
		},
		onSearch() {
			this.showUsers = [];

			for(var user of this.users) {
				if(user.firstName.toLowerCase().indexOf(this.search.firstName.trim()) === -1) {
					continue;
				}

				if(user.lastName.toLowerCase().indexOf(this.search.lastName.trim()) === -1) {
					continue;
				}

				if(user.username.toLowerCase().indexOf(this.search.username.trim()) === -1) {
					continue;
				}

				this.showUsers.push(user);
			} 
		}
	}, 
})