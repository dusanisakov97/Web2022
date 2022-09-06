Vue.component("users", {
	template: `
	<div class="ui container">
		<div class="ui four cards">
		  <div class="card" v-for="u in users">
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
			mode: null
		}
	},
	beforeCreate() {
		axios.get("/session").then(response => this.mode = response.data.role);
		axios.get("/admin/users").then((response) => {
			this.users = response.data;
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
		}
	}
})