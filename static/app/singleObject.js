Vue.component("single-object", {
	template: `
		<div class="ui container" v-if="sportsObject != null">
			<div class="ui grid">
				<div class="eight wide column">
					<div class="ui one cards">
						<div class="card">
							<div class="image">
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
						<form class="ui form card" v-on:submit.prevent="submit" style="padding: 10px">
							<div class="ui centered grid field">
								<h1>Add training</h1>
							</div>
							<div class="field">
								<label>Name</label>
								<input type="text" name="first-name" placeholder="Name" v-model="training.name">
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
								<label>Last name</label>
								<input type="text" name="last-name" placeholder="Last name" v-model="training.type">
							</div>
							
							<div class="ui field centered grid"> 
								<button class="ui button" type="submit">Submit</button>
							</div>
						</form>
			    	</div>
				</div>
				
	 		</div>
		</div>
		
	`,
	data: function() {
		return {
			id : this.$route.params.id,
			sportsObject: null,
			training: {
				name: "",
				type: "",
				duration: "",
				timeType: "",
				description: "",
				image: "",
				coachID: "",
			}
		}
	}, 
	beforeCreate: function() {
		this.id = this.$route.params.id;
		axios.get("/sports-object", { params: {
			id: this.id
		}}).then((response) => {
			this.sportsObject = response.data;
		})
	}, 
	onSubmit() {

	}
})