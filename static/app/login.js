Vue.component("login", {
	template: `
		<div class="ui three column centered grid">
			    <div class="column">
					<form class="ui form" v-on:submit.prevent="submit">
					<div class="ui centered grid field">
						<h1>Login</h1>
					</div>
		  				<div class="field">
		   					 <label>Username</label>
		    				 <input type="text" name="first-name" placeholder="Username" v-model="user.username">
		  				</div>
		  				<div class="field">
						    <label>Password</label>
						    <input type="text" name="last-name" placeholder="Password" v-model="user.password">
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
				username: "",
				password: ""
			}
		}
	}, 
	methods:  {
		submit: function() {
			if (this.user.username.length < 4) {
				alert("Too short username!");
				return;
			}
			if (this.user.password.length < 4) {
				alert("Too short password!");
				return;
			}
			
			axios.post("/login", this.user).then((response) => {
				console.log(response);
				if(response.status === 200) {
					alert("Successful login!");
					window.location.href = "/#/home";
				} 
			}).catch(() => {
				alert("User with username already exists!");
			})		}
	}
})