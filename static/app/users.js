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
		  
		  
		</div>
	</div>

	`,
	data: function() {
		return {
			users: [],
		}
	},
	beforeCreate() {
		axios.get("/admin/users").then((response) => {
			this.users = response.data;
		});
	}
})