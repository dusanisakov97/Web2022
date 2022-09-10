Vue.component("my-object", {
	template: `
	<div class="ui container" >
		<div class="ui grid" v-if="sportsObjectID != null">
			<div class="eight wide column">
				<div class="ui one cards">
					<div class="card" v-if="sportsObject != null">
						<div class="image" v-if="sportsObject.image != null">
							<img :src="sportsObject.image">
						</div>
						<div class="content">
							<div class="header">{{sportsObject.name}}</div>
							<div class="meta">
							<a>{{sportsObject.type}}</a>
							</div>
							<div class="description">
							Location: {{sportsObject.location.street + ', ' + sportsObject.location.city + ', ' + sportsObject.location.zipCode}}
							</div>
						</div>
						<div class="extra content">
							<span class="right floated">
							<i class="check icon" v-if="sportsObject.working"></i>
							<i class="close	 icon" v-if="!sportsObject.working"></i>

							</span>
							<span v-if="sportsObject.averageMark !== 0">
							<i class="star icon"></i>
							{{sportsObject.averageMark}}
							</span>
							<span v-else>
							Nema ocena!
							</span>
						</div>
						<div class="extra content">
							<span class="right floated">
							<i class="time icon"></i>

							{{sportsObject.endWorking}}
							</span>
							<span>
							<i class="time icon"></i>
							{{sportsObject.startWorking}}
							</span>
						</div>
					</div>
				</div>

				
			</div>
			<div class="eight wide column">
				<div class="ui one cards">
					<form class="ui form card" v-on:submit.prevent="onSubmit" style="padding: 10px">
						<div class="ui centered grid field">
							<h1>Add training</h1>
						</div>
						<div class="field">
							<label>Name</label>
							<input type="text" name="first-name" placeholder="Name" v-model="training.name">
						</div>
						<div class="field">
							<label>Type:</label>
							<select name="last-name" placeholder="Type" v-model="training.type">
								<option value=""></option>
								<option value="Grupni treninzi">Grupni treninzi</option>
								<option value="Personalni treninzi">Personalni treninzi</option>
								<option value="Sauna">Sauna</option>
								<option value="Plivanje">Plivanje</option>
							</select>
						</div>
						<div class="field">
							<label>Duration</label>
							<input type="number" name="last-name" placeholder="Duration" v-model="training.duration">
						</div>
						<div class="field">
							<label>Type:</label>
							<select name="last-name" placeholder="Type" v-model="training.timeType">
								<option value="min">Minutes</option>
								<option value="hou">Hours</option>
							</select>
						</div>
						<div class="field">
							<label>Description</label>
							<input type="text" name="last-name" placeholder="Description" v-model="training.description">
						</div>
						<div class="field">
                            <label>Coach</label>
                            <select name="last-name" placeholder="Type" v-model="training.coachID" style="padding: 10px">
                            	<option :value="m.id" v-for="m in coaches">{{m.firstName + ' ' + m.lastName}}</option>
                        	</select>                        
						</div>

						<div class="field" v-if="training.image != null" style="padding: 20px">
							<div >
							<img class="preview" :src="training.image" height="200" width="200">
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

			<div class="ui cards" v-if="sportsObject !== null">
				<div class="card" v-for="o in sportsObject.trainings" :href="'#/single-object/' + o.id">
					<div class="image">
						<img :src="o.image">
					</div>
					<div class="content">
						<div class="header">{{o.name}}</div>
						<div class="meta">
						<a>{{o.type}}</a>
						</div>
						<div class="description">
						{{o.description}}
						</div>
					</div>
					
					<div class="extra content">
						<span class="right floated">

						
						</span>
						<span>
						<i class="time icon"></i>
						{{o.duration === 0 ? "No information" : o.duration}}
						</span>
					</div>
				</div>
			</div>
			
		</div>
		<div class="ui centered grid" v-if="sportsObjectID == null">
				<h2 class="ui h2" style="padding:30px">Menaget doesn't contains sports object!</h2>
		</div>
	</div>
		
	`,
	data: function() {
		return {
			coaches: [],
			sportsObject: null,
			sportsObjectID: null,
			training: {
				name: "",
				type: "",
				duration: 0,
				timeType: "min",
				description: "",
				image: null,
				coachID: "",
				sportsObjectID: ""
			},
		}
	},
	beforeCreate() {
		axios.get("/session").then((response) => {
			if(response.data) {
				this.mode = response.data.role;
				console.log(response.data);	
				this.sportsObjectID = response.data.sportsObjectID;
				if(this.sportsObjectID){
					axios.get("/sports-object", { params: {
						id: this.sportsObjectID
					}}).then((response) => {
						this.sportsObject = response.data;
					});
				}
			} else {
				this.mode = "";
			}
		});
		
	}, 
	mounted: function() {
		axios.get("/coaches").then(resonse => this.coaches = resonse.data);
	},
	methods: {
		onSubmit() {
			if (this.training.name.length < 4) {
				alert("Too short name!");
				return;
			}

			if (this.training.type.length < 4) {
				alert("Pick the type of training!");
				return;
			}

			if (parseInt(this.training.duration) > 0) {
				this.training.duration = this.training.duration + " " + this.training.timeType;
			}

			this.training.sportsObjectID = this.sportsObjectID;
			
			axios.post("/training", this.training).then((response) => {
				if(response.status === 201) {
					alert("Successful added training!");
					this.training = {
						name: "",
						type: "",
						duration: "",
						timeType: "min",
						description: "",
						image: null,
						coachID: "",
						sportsObjectID: ""
					}
					this.sportsObject = response.data;
				} 
			}).catch(() => {
				alert("Training with name already exists!");
			})
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
				this.training.image = response.data;
			});
		  },
	}
})