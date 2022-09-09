Vue.component("home", {
	template: `
	<div class="ui container">
		<div class="ui form">
			<div class="four fields">
				<div class="field">
					<label>Name</label>
					<input type="text" placeholder="Name" v-model="search.name" v-on:input="onSearch">
				</div>
				<div class="field">
					<label>Type</label>
					<input type="text" placeholder="Type" v-model="search.type" v-on:input="onSearch">
				</div>
				<div class="field">
					<label>Location</label>
					<input type="text" placeholder="Location" v-model="search.location" v-on:input="onSearch">
				</div>
				<div class="field">
					<label>Min average mark</label>
					<input type="number" placeholder="Min" v-model="search.minAverageMark" v-on:input="onSearch">
				</div>
				<div class="field">
					<label>Max average mark</label>
					<input type="number" placeholder="Max" v-model="search.maxAverageMark" v-on:input="onSearch">
				</div>
			</div>

			<div class="three fields">
				
				<div class="field">
					<label>Sort</label>
					<select type="text" v-model="search.sort" v-on:change="onSearch">
						<option value="">Random</option>
						<option value="4">Decreasing by Name</option>
						<option value="5">Decreasing by Location</option>
						<option value="6">Decreasing by Average Mark</option>
						<option value="1">Increasing by Name</option>
						<option value="2">Increasing by Location</option>
						<option value="3">Increasing by Average Mark</option>
					</select>
				</div>
				<div class="field">
					<label>Role</label>
					<select type="text" v-model="search.role" v-on:change="onSearch">
						<option value="">All</option>
						<option value="1">Teretana</option>
                        <option value="2">Bazen</option>
                        <option value="3">Sportski centar</option>
                        <option value="4">Plesni studio</option>
					</select>
				</div>
				<div class="field">
					<label>Type (Customer)</label>
					<select type="text" v-model="search.working" v-on:change="onSearch">
						<option value="">All</option>
						<option value="1">Work</option>
						<option value="2">No Work</option>
					</select>
				</div>
			</div>
		</div>
		<div class="ui link cards">
			<a class="card" v-for="o in showSportsObjects" :href="'#/single-object/' + o.id">
				<div class="image">
					<img :src="o.image">
				</div>
				<div class="content">
					<div class="header">{{o.name}}</div>
					<div class="meta">
					<a>{{o.type}}</a>
					</div>
					<div class="description">
					Location: {{o.location.street + ', ' + o.location.city + ', ' + o.location.zipCode}}
					</div>
				</div>
				<div class="extra content">
					<span class="right floated">
					<i class="check icon" v-if="o.working"></i>
					<i class="close	 icon" v-if="!o.working"></i>

					</span>
					<span>
					<i class="star icon"></i>
					{{o.averageMark}}
					</span>
				</div>
				<div class="extra content">
					<span class="right floated">
					<i class="time icon"></i>

					{{o.endWorking}}
					</span>
					<span>
					<i class="time icon"></i>
					{{o.startWorking}}
					</span>
				</div>
			</a>
		</div>
	</div>

		
	`,
	data: function() {
		return {
			mode: "",
			sportsObjects: [],
			showSportsObjects: [],
			search: {
				name: "",
				type: "",
				location: "",
				minAverageMark: null,
				maxAvarageMark: null,
				working: "",
				role: "",
				sort: ""
			}
		}
	},
	mounted(){
		axios.get("/sports-objects").then((response) => {
			this.sportsObjects = response.data;
			this.showSportsObjects = response.data;
		});
	},
	methods: {
		onSearch: function(){
			this.showSportsObjects = [];
			for(var o of this.sportsObjects) {
				if(o.name.toLowerCase().indexOf(this.search.name.trim()) === -1) {
					continue;
				}

				if(o.type.toLowerCase().indexOf(this.search.type.trim()) === -1) {
					continue;
				}
				const location = o.location.street + ', ' + o.location.city + ', ' + o.location.zipCode;
				if(location.toLowerCase().indexOf(this.search.location.trim()) === -1) {
					continue;
				}
				if(this.search.role !== "" && o.type !== this.search.role){
					continue;
				}

				this.showSportsObjects.push(o);
			}


			// if (this.search.sort == 1) {
			// 		this.showSportsObjects.sort((a, b) => {
			// 		  let fa = a.firstName;
			// 		  let fb = b.firstName;
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
			// 			let fa = a.lastName;
			// 			let fb = b.lastName;
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
			// 			let fa = a.username;
			// 			let fb = b.username;
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
			// 			let fb = a.firstName;
			// 			let fa = b.firstName;
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
			// 			let fb = a.lastName;
			// 			let fa = b.lastName;
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
			// 			let fb = a.username;
			// 			let fa = b.username;
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