Vue.component("add-object", {
	template: `
		<div class="ui three column centered grid">
			    <div class="column">
					<form class="ui form" v-on:submit.prevent="submit">
					<div class="ui centered grid field">
						<h1>New Sports Object:</h1>
					</div>
						<div class="field">
		   					 <label>Name</label>
		    				 <input type="text" name="name" placeholder="Name" v-model="sportsObject.name">
		  				</div>
		  				<div class="field">
						    <label>Type:</label>
                            <select name="last-name" placeholder="Type" v-model="sportsObject.type">
                                <option>Teretana</option>
                                <option>Bazen</option>
                                <option>Sportski centar</option>
                                <option>Plesni studio</option>
                            </select>
                        </div>
		  				<div class="field">
		   					 <label>Status (working)</label>
		    				 <input type="checkbox" placeholder="Username" v-model="sportsObject.working">
		  				</div>
		  				<div class="field">
						    <label>Street</label>
						    <input type="text" placeholder="Street" v-model="sportsObject.location.street">
						</div>
						<div class="field">
		   					 <label>City</label>
		    				 <input type="text" placeholder="City"  v-model="sportsObject.location.city">
		  				</div>
                        <div class="field">
                            <label>Zip Code</label>
                            <input type="text" v-model="sportsObject.location.zipCode">
                        </div>
                        <div class="field">
                            <label>Start Working</label>
                            <input type="time" v-model="sportsObject.startWorking">
                        </div>
                        <div class="field">
                            <label>End Working</label>
                            <input type="time" v-model="sportsObject.endWorking">
                        </div>
                        <select name="last-name" placeholder="Type" v-model="sportsObject.managerID">
                            <option value="m.id" v-for="m in managers">{{m.firstName + ' ' + m.lastName}}</option>
                           
                        </select>

						<div class="ui field centered grid"> 
							<button class="ui button" type="submit">Submit</button>
						</div>
					</form>
			    </div>
		</div>
		
		
	`,
	data: function() {
		return {
			sportsObject: {
				name: "",
				type: "",
				working: "",
				location: {
                    street: "",
                    city: "",
                    zipCode: 0

                },
				image: "",
                startWorking: "",
                endWorking: ""
			},
            managers: []
		}
	}, mounted() {
        axios.get("/managers/sports-object").then(response => this.managers = response.data);
    },
	methods: {
		submit: function() {
			// if (this.user.firstName.length < 4) {
			// 	alert("Too short first name!");
			// 	return;
			// }
			// if (this.user.lastName.length < 4) {
			// 	alert("Too short last name!");
			// 	return;
			// }
			// if (this.user.username.length < 4) {
			// 	alert("Too short username!");
			// 	return;
			// }
			// if (this.user.password.length < 4) {
			// 	alert("Too short password!");
			// 	return;
			// }
			// if (this.user.birthday === null) {
			// 	alert("Pick the date");
			// 	return;
			// }
			// if (this.user.gender.length == 0) {
			// 	alert("Pick the gender!");
			// 	return;
			// }
			
			axios.post("/sports-object", this.sportsObject).then((response) => {
				if(response.status === 201) {
					alert("Successful added new sports object!");
					window.location.href = "/#/home";
				} 
			}).catch(() => {
				alert("User with username already exists!");
			})
		}
	}
})