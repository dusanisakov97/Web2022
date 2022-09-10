Vue.component("profile", {
	template: `
		<div class="ui three column centered grid" v-if="user != null">
			    <div class="column">
					<form class="ui form" v-on:submit.prevent="submit">
					<div class="ui centered grid field">
						<h1>Profile</h1>
					</div>
						<div class="field">
		   					 <label>Username</label>
		    				 <input type="text" placeholder="Username" v-model="user.username" disabled>
		  				</div>
						<div class="field">
		   					 <label>First name</label>
		    				 <input type="text" name="first-name" placeholder="First name" v-model="user.firstName">
		  				</div>
		  				<div class="field">
						    <label>Last name</label>
						    <input type="text" name="last-name" placeholder="Last name" v-model="user.lastName">
						</div>
		  				
		  				<div class="field">
						    <label>Password</label>
						    <input type="text" placeholder="Password" v-model="user.password">
						</div>
						<div class="field">
		   					 <label>Birthday</label>
		    				 <input type="date" v-model="user.birthday">
		  				</div>
		  				<div class="field">
						    <label>Gender</label>
						    <select name="last-name" placeholder="Password" v-model="user.gender">
						    	<option>Muski</option>
						    	<option>Zenski</option>
						    </select>
						</div>
						<div class="ui field centered grid"> 
							<button class="ui button" type="submit">Update</button>
						</div>
						<div class="ui field centered grid"> 
							<button class="ui button" type="button" v-on:click="reset">Reset</button>
						</div>
					</form>
			    </div>
		</div>
		
	`,
	data: function() {
		return {
			user: null,
			copyUser: null
		}
	}, 
	beforeCreate: function() {
		axios.get("/session").then(response => {
			this.user = response.data;
			this.copyUser = JSON.parse(JSON.stringify(this.user));
		})
	},
	methods: {
		reset: function(event) {
			event.preventDefault();
			this.user = JSON.parse(JSON.stringify(this.copyUser));
			console.log(this.user);
			console.log(this.copyUser);
		}, 
		submit: function(event) {
			if (this.user.firstName.length < 4) {
				alert("Too short first name!");
				return;
			}
			if (this.user.lastName.length < 4) {
				alert("Too short last name!");
				return;
			}
			if (this.user.username.length < 4) {
				alert("Too short username!");
				return;
			}
			if (this.user.password.length < 4) {
				alert("Too short password!");
				return;
			}
			if (this.user.birthday === null) {
				alert("Pick the date");
				return;
			}
			if (this.user.gender.length == 0) {
				alert("Pick the gender!");
				return;
			}
			
			axios.put("/user", this.user).then((response) => {
				if(response.status === 200) {
					alert("Updated informations!");
				} 
			});
		}
	}
})