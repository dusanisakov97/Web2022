Vue.component("coach-trainings", {
	template: `

	<div class="ui container">
		<div class="ui form">
			<div class="three fields">
				<div class="field">
					<label>Name Sports object</label>
					<input type="text" placeholder="Name" v-model="search.name" v-on:input="onSearch">
				</div>
				<div class="field">
					<label>Start date</label>
					<input type="date" placeholder="Min" v-model="search.startDate" v-on:input="onSearch">
				</div>
				<div class="field">
					<label>End date</label>
					<input type="date" placeholder="Max" v-model="search.EndDate" v-on:input="onSearch">
				</div>
			</div>

			<div class="three fields">
				
				<div class="field">
					<label>Sort</label>
					<select type="text" v-model="search.sort" v-on:change="onSearch">
						<option value="">Random</option>
						<option value="4">Decreasing by Name</option>
						<option value="5">Decreasing by Date</option>
						<option value="1">Increasing by Name</option>
						<option value="2">Increasing by Date</option>
					</select>
				</div>
				<div class="field">
					<label>Role</label>
					<select type="text" v-model="search.role" v-on:change="onSearch">
						<option value="">All</option>
						<option value="Teretana">Teretana</option>
						<option value="Bazen">Bazen</option>
						<option value="Sportski centar">Sportski centar</option>
						<option value="Plesni studio">Plesni studio</option>
					</select>
				</div>
			
			</div>
		</div>



		<div class="ui cards" v-if="user !== null">
			<div class="card" v-for="o in history">
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

				<div class="extra content">
					
					<span>
					<i class="home icon"></i>
					{{o.sportsObject.name}}
					</span>
				</div>
				
				
			</div>
		</div>
	</div>
	
			
	`,
	data: function() {
		return {
			user: null,
			history: [],
			trainings: [],
			search: {
				name: "",
				startDate: "",
				endDate: "",
				sort: "",
				role: ""

			},
			allHistory: []
		}
	}, 
	async created() {
		await axios.get("/session").then((response) => {
			this.user = response.data;
			axios.get("/coach/training").then(response => {
				this.trainings = response.data;
				for(var i in this.trainings) {
					axios.get("/sports-object", {
							params: {
								id: this.trainings[i].sportsObjectID
							}
						}).then(response => {
							this.history.push({...this.trainings[i], "sportsObject" : response.data});
						})
					}
			
			});

				
		});
		this.allHistory = this.history


	}, methods: {
		onSearch: function(){
			console.log(this.search);
			this.history = [];
			for(var o of this.allHistory) {
				if(o.sportsObject.name.toLowerCase().indexOf(this.search.name.trim()) === -1) {
					continue;
				}

				if(this.search.startDate !== "" && o.date < this.search.startDate){
					continue;
				}
				if(this.search.endDate !== "" && o.endDate > this.search.endDate){
					continue;
				}

			

				// if(this.search.working != "" && String(this.search.working) !== String(o.working)) {
				// 	continue;
				// }

			
				

				this.history.push(o);
			}

			// if (this.search.sort === "") {
				
			// } else if (this.search.sort == 1) {
			// 		this.showSportsObjects.sort((a, b) => {
			// 		  let fa = a.name;
			// 		  let fb = b.name;
			// 		  if (fa < fb) {
			// 			return -1;
			// 		  }
			// 		  if (fa > fb) {
			// 			return 1;
			// 		  }
			// 		  return 0;
			// 		});
			// } else if (this.search.sort == 2) {
			// 		this.showSportsObjects.sort((a, b) => {
			// 			let fa = a.location.street + ', ' + a.location.city + ', ' + a.location.zipCode;
			// 			let fb = b.location.street + ', ' + b.location.city + ', ' + b.location.zipCode;
						
			// 			if (fa < fb) {
			// 			  return -1;
			// 			}
			// 			if (fa > fb) {
			// 			  return 1;
			// 			}
			// 			return 0;
			// 		  });


			// 	} else if (this.search.sort == 3) {
			// 		this.showSportsObjects = this.showUsers.sort((a, b) => {
						
			// 			let fa = a.averageMark;
			// 			let fb = b.averageMark;
			// 			if (fa < fb) {
			// 			  return -1;
			// 			}
			// 			if (fa > fb) {
			// 			  return 1;
			// 			}
			// 			return 0;
			// 		  });

			// 		  console.log(this.showUsers)

			// 	}else if (this.search.sort == 4) {
			// 		this.showSportsObjects.sort((a, b) => {
			// 			let fb = a.name;
			// 			let fa = b.name;
			// 			if (fa < fb) {
			// 			  return -1;
			// 			}
			// 			if (fa > fb) {
			// 			  return 1;
			// 			}
			// 			return 0;
			// 		  });


			// 	}else if (this.search.sort == 5) {
			// 		this.showSportsObjects.sort((a, b) => {
			// 			let fb = a.location.street + ', ' + a.location.city + ', ' + a.location.zipCode;
			// 			let fa = b.location.street + ', ' + b.location.city + ', ' + b.location.zipCode;
			// 			if (fa < fb) {
			// 			  return -1;
			// 			}
			// 			if (fa > fb) {
			// 			  return 1;
			// 			}
			// 			return 0;
			// 		  });


			// 	}else if (this.search.sort == 6) {
			// 		this.showSportsObjects.sort((a, b) => {
			// 			let fa = a.averageMark;
			// 			let fb = b.averageMark;
			// 			if (fa < fb) {
			// 			  return -1;
			// 			}
			// 			if (fa > fb) {
			// 			  return 1;
			// 			}
			// 			return 0;
			// 		  });

			// 	}
		}
	}
	
})