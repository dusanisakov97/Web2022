Vue.component("customer-trainings", {
	template: `
	<div class="ui cards container" v-if="user !== null">
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
			
	`,
	data: function() {
		return {
			user: null,
			history: []
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

	},
})