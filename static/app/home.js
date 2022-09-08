Vue.component("home", {
	template: `
	<div class="ui container">
		<div class="ui link cards">
			<a class="card" v-for="o in sportsObjects" :href="'#/object/' + o.id">
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
			sportsObjects: []
		}
	},
	mounted(){
		axios.get("/sports-objects").then(response => this.sportsObjects = response.data);
	},
	
})