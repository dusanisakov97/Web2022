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

							<div class="ui bottom attached button" v-if="mode==='CUSTOMER'" v-on:click="buy(o)">
		      <i class="shop icon"></i>
		      Buy
		    </div>
						</div>
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
				image: null,
				coachID: "",
				sportsObjectID: ""
			},
			coaches: [],
			mode: ""
		}
	}, 
	beforeCreate: function() {
		this.id = this.$route.params.id;
		axios.get("/sports-object", { params: {
			id: this.id
		}}).then((response) => {
			this.sportsObject = response.data;
			this.training.sportsObjectID = this.id;
		});

		axios.get("/coaches").then(resonse => this.coaches = resonse.data);

		axios.get("/session").then((response) => {
				this.mode = response.data.role;
		});
	}, 
	methods: {
		buy(t) {
			axios.post("/customer/training", t).then((response) => {
				alert("Sucessfuly buy training!")
				window.location.href = "/#/customer-trainings";
			}).catch(() => {
				alert("You don't have training on your fee!")
			});
		},
	}
})