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
		}
	}, 
	async created() {
		await axios.get("/session").then((response) => {
				this.user = response.data;
				for(var i in this.user.history) {
				axios.get("/sports-object", {
						params: {
							id: this.user.history[i].sportsObjectID
						}
					}).then(response => this.history.push({...this.user.history[i], "sportsObject" : response.data}))
				}
		});

	},methods: {
		onSearch: function(){

		}
	}
})