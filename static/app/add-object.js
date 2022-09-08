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
                        <div class="field">
                            <label>Manager</label>
                            <select name="last-name" placeholder="Type" v-model="sportsObject.managerID" style="padding: 10px">
                            <option :value="m.id" v-for="m in managers">{{m.firstName + ' ' + m.lastName}}</option>
                        </select>                        </div>
                        
                        <div class="field" v-if="sportsObject.image !== null" style="padding: 20px">
                            <div >
                            <img class="preview" :src="sportsObject.image" height="200" width="200">
                            </div>
					    </div>
                        <div class="btn  btn-sm  w-25">
                            <input type="file" @change="uploadImage" name="image" id="image" accept="image/*"/>
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
                endWorking: "",
                managerID: "",
			},
            managers: []
		}
	}, mounted() {
        console.log("pozvali su ")
        axios.get("/managers/sports-object").then(response => this.managers = response.data);
    },
	methods: {
		submit: function() {
			if (this.sportsObject.name.length < 4) {
				alert("Too short name!");
				return;
			}
			if (this.sportsObject.type.length < 4) {
				alert("Too short type!");
				return;
			}
			if (this.sportsObject.working.length === "") {
				alert("Pick does object work!");
				return;
			}
			if (this.sportsObject.location.street.length < 4) {
				alert("Too short street!");
				return;
			}
			if (this.sportsObject.location.city.length < 2) {
				alert("Too short city!");
				return;
			}
            if (this.sportsObject.location.city.zipCode <= 0) {
				alert("Zip code must be positiv number!");
				return;
			}
            if (this.sportsObject.startWorking.length === "") {
				alert("Pick the start working time!");
				return;
			}
            if (this.sportsObject.endWorking === "") {
				alert("Pick the end wotking time!");
				return;
			}
            if (this.sportsObject.endWorking === "") {
				alert("Pick the end wotking time!");
				return;
			}
			if (this.sportsObject.image.length == "") {
				alert("Upload the image!");
				return;
			}

			
			axios.post("/sports-object", this.sportsObject).then((response) => {
				if(response.status === 201) {
					alert("Successful added new sports object!");
					window.location.href = "/#/home";
				} 
			});
		},
        uploadImage(event) {
            var img = event.target.files[0];
            var formData = new FormData();
            formData.append("image", img);
    
            axios.post('/image', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(response => {
                      this.sportsObject.image = response.data;
            });
          },


	}
})