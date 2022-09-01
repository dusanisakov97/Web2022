Vue.component("blank-page", {
	template: `
		<div>
			Blanc Page </br>
			Server Response : {{text}}
		</div>
		
	`,
	data: function() {
		return {
			text: ""
		}
	}, 
	mounted: function() {
		axios.get("/test").then(response => {
			console.log(response);
			this.text = response.data;
		})
	}
})