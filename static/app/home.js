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
						<option value="Teretana">Teretana</option>
                        <option value="Bazen">Bazen</option>
                        <option value="Sportski centar">Sportski centar</option>
                        <option value="Plesni studio">Plesni studio</option>
					</select>
				</div>
				<div class="field">
					<label>Working</label>
					<select type="text" v-model="search.working" v-on:change="onSearch">
						<option value="">All</option>
						<option value="true">Work</option>
						<option value="false">No Work</option>
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
					<span v-if="o.averageMark !== 0">
					<i class="star icon"></i>
					{{o.averageMark}}
					</span>
					<span v-else>
					Nema ocena!
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
				minAverageMark: "",
				maxAverageMark: "",
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
			console.log(this.search);
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

				if(this.search.minAverageMark !== "" && parseInt(o.averageMark) < parseInt(this.search.minAverageMark)){
					continue;
				}

				if(this.search.maxAvarageMark !== "" && parseInt(o.averageMark) > parseInt(this.search.maxAverageMark)){
					continue;
				}

				if(this.search.working != "" && String(this.search.working) !== String(o.working)) {
					continue;
				}

			
				

				this.showSportsObjects.push(o);
			}

			if (this.search.sort === "") {
				
			} else if (this.search.sort == 1) {
					this.showSportsObjects.sort((a, b) => {
					  let fa = a.name;
					  let fb = b.name;
					  if (fa < fb) {
						return -1;
					  }
					  if (fa > fb) {
						return 1;
					  }
					  return 0;
					});
			} else if (this.search.sort == 2) {
					this.showSportsObjects.sort((a, b) => {
						let fa = a.location.street + ', ' + a.location.city + ', ' + a.location.zipCode;
						let fb = b.location.street + ', ' + b.location.city + ', ' + b.location.zipCode;
						
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });


				} else if (this.search.sort == 3) {
					this.showSportsObjects = this.showUsers.sort((a, b) => {
						
						let fa = a.averageMark;
						let fb = b.averageMark;
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });

					  console.log(this.showUsers)

				}else if (this.search.sort == 4) {
					this.showSportsObjects.sort((a, b) => {
						let fb = a.name;
						let fa = b.name;
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });


				}else if (this.search.sort == 5) {
					this.showSportsObjects.sort((a, b) => {
						let fb = a.location.street + ', ' + a.location.city + ', ' + a.location.zipCode;
						let fa = b.location.street + ', ' + b.location.city + ', ' + b.location.zipCode;
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });


				}else if (this.search.sort == 6) {
					this.showSportsObjects.sort((a, b) => {
						let fa = a.averageMark;
						let fb = b.averageMark;
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });

				}
		}
	}
	
})