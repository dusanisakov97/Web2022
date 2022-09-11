Vue.component("customer-trainings", {
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
					<input type="date" placeholder="Max" v-model="search.endDate" v-on:input="onSearch">
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
				<div class="extra content">
					
					<span>
					<i class="calendar icon"></i>
					{{o.date}}
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
				console.log(this.user)
			});
			
			for(t of this.user.history) {
					console.log(t)
					await axios.get("/sports-object", {
							params: {
								id: t.sportsObjectID
							}
						}).then(response => {
							t.sportsObject = response.data;
							this.history.push(t);
						}
							)
				}
		
		this.allHistory = this.history;
		console.log(this.allHistory);

	} ,methods: {
		onSearch: function(){
			console.log(this.search);
			this.history = [];
			for(var o of this.allHistory) {
				if(o.sportsObject.name.toLowerCase().indexOf(this.search.name.trim()) === -1) {
					continue;
				}

				if(this.search.startDate !== "" && new Date(o.date) < new Date(this.search.startDate)){
					continue;
				}
				if(this.search.endDate !== "" && new Date(o.date) > new Date(this.search.endDate)){
					continue;
				}

				if(this.search.role !== "" && this.search.role != o.sportsObject.type){
					continue;
				}
				

				this.history.push(o);
			}

			if (this.search.sort === "") {
				
			} else if (this.search.sort == 1) {
					this.history.sort((a, b) => {
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
					this.history.sort((a, b) => {
						let fa = a.date;
						let fb = b.date;
						
						if (fa < fb) {
						  return -1;
						}
						if (fa > fb) {
						  return 1;
						}
						return 0;
					  });


				} else if (this.search.sort == 4) {
					this.history.sort((a, b) => {
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
					this.history.sort((a, b) => {
						let fb = a.date;
						let fa = b.date;
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
	}, 
})