Vue.component("single-object", {
	template: `
		<div class="ui container" v-if="sportsObject != null">
			<div class="ui grid">
				<div class="four wide column">
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
				<div class="twelve wide column"></div>
				
	 		</div>
		</div>
		
	`,
	data: function() {
		return {
			id : this.$route.params.id,
			sportsObject: null
		}
	}, 
	beforeCreate: function() {
		this.id = this.$route.params.id;
		axios.get("/sports-object", { params: {
			id: this.id
		}}).then((response) => {
			this.sportsObject = response.data;
		})
	}
})