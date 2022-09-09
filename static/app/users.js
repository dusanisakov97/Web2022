Vue.component("users", {
	template: `
	<div class="ui container">
		<div class="ui form">
			<div class="three fields">
				<div class="field">
					<label>First name</label>
					<input type="text" placeholder="First Name" v-model="search.firstName" v-on:input="onSearch">
				</div>
				<div class="field">
					<label>Last name</label>
					<input type="text" placeholder="Last Name" v-model="search.lastName" v-on:input="onSearch">
				</div>
				<div class="field">
					<label>Username:</label>
					<input type="text" placeholder="Username" v-model="search.username" v-on:input="onSearch">
				</div>
			</div>
		</div>

		<div class="ui form">
			<div class="three fields">
				
				<div class="field">
					<label>Sort</label>
					<select type="text" v-model="search.sort" v-on:change="onSearch">
						<option value="0">Random</option>
						<option value="4">Decreasing by First Name</option>
						<option value="5">Decreasing by Last Name</option>
						<option value="6">Decreasing by Username</option>
						<option value="1">Increasing by First Name</option>
						<option value="2">Increasing by Last Name</option>
						<option value="3">Increasing by Username</option>

					</select>
				</div>
				<div class="field">
					<label>Role</label>
					<select type="text" v-model="search.role" v-on:change="onSearch">
						<option value="">All</option>
						<option value="ADMIN">Admin</option>
						<option value="CUSTOMER">Customer</option>
						<option value="MANAGER">Manager</option>
						<option value="COACH">Coach</option>
					</select>
				</div>
				<div class="field" v-if="search.role==='CUSTOMER' && false">
					<label>Type (Customer)</label>
					<select type="text" v-model="search.type" v-on:change="onSearch">
						<option value="">All</option>
						<option value="GOLD">Gold</option>
						<option value="SILVER">Silver</option>
						<option value="BRONZE">Bronze</option>
					</select>
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
				username: "",
				role: "",
				type: "",
				sort: 0
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
				console.log(this.search);
				if(this.search.role !== "" && user.role !== this.search.role){
					continue;
				}

				this.showUsers.push(user);
			}


				if (this.search.sort == 1) {
					this.showUsers.sort((a, b) => {
					  let fa = a.firstName;
					  let fb = b.firstName;
					  if (fa < fb) {
						return -1;
					  }
					  if (fa > fb) {
						return 1;
					  }
					  return 0;
					});
				} else if (this.search.sort == 2) {
					this.showUsers.sort((a, b) => {
						let fa = a.lastName;
						let fb = b.lastName;
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });


				} else if (this.search.sort == 3) {
					this.showUsers = this.showUsers.sort((a, b) => {
						let fa = a.username;
						let fb = b.username;
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });

					  console.log(this.showUsers)

				}else if (this.search.sort == 4) {
					this.showUsers.sort((a, b) => {
						let fb = a.firstName;
						let fa = b.firstName;
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });


				}else if (this.search.sort == 5) {
					this.showUsers.sort((a, b) => {
						let fb = a.lastName;
						let fa = b.lastName;
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });


				}else if (this.search.sort == 6) {
					this.showUsers.sort((a, b) => {
						let fb = a.username;
						let fa = b.username;
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });

				}


			
		}, 
	}, 
})