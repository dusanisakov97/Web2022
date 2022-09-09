Vue.component("manager-registration", {
	template: `
		<div class="ui three column centered grid">
			    <div class="column">
					<form class="ui form" v-on:submit.prevent="submit">
					<div class="ui centered grid field">
						<h1>Form for add manager</h1>
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
		   					 <label>Username</label>
		    				 <input type="text" placeholder="Username" v-model="user.username">
		  				</div>
		  				<div class="field">
						    <label>Password</label>
						    <input type="password" placeholder="Password" v-model="user.password">
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
							<button class="ui button" type="submit">Submit</button>
						</div>
					</form>
			    </div>
		</div>
		
	`,
	data: function() {
		return {
			user: {
				firstName: "",
				lastName: "",
				username: "",
				password: "",
				birthday: "",
				gender: ""
			}
		}
	}, 
	methods: {
		submit: function() {
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
			if (this.user.birthday.length < 4) {
				alert("Pick the date");
				return;
			}
			if (this.user.gender.length == 0) {
				alert("Pick the gender!");
				return;
			}
			
			axios.post("/manager", this.user).then((response) => {
				console.log(response);
				if(response.status === 201) {
					alert("Successful added manager!");
					window.location.href = "/#/users";
				} 
			}).catch(() => {
				alert("User with username already exists!");
			})
		}
	}
})