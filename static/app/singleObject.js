Vue.component("single-object", {
	template: `
		<div class="ui container">
			<div class="">


			</div>
		</div>
		
	`,
	data: function() {
		return {
			id : "",
		}
	}, 
	mounted: function() {
		this.id = this.$route.params.id;
		axios.get("/sports-object", { params: {
			id: this.id
		}}).then((response) => {
			this.sportsObject = response.data;
		})
	}
})