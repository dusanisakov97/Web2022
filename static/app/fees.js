Vue.component("fees", {
	template: `
	<div class="ui container">
		<h1 class="ui centered grid header" style="padding:20px">Choose your ideal fee</h1>
		
		<div class="ui four cards">
		  <div class="card" v-for="f in fees">
		    <div class="content">
		      <div class="header">Elliot Fu</div>
		      <div class="ui centered centered grid">
		      	<div class="descriptoin column"> 
		      		{{f.price}}
		      	</div>
		      	
		        
		      </div>
		    </div>
		    <div class="ui bottom attached button">
		      <i class="shop icon"></i>
		      Buy
		    </div>
		  </div>
		  
		  
		</div>
	</div>
		
	`,
	data: function() {
		return {
			fees:[]
		}
	}, 
	mounted() {
		console.log("djole")
		axios.get("/fees").then(response => {
			this.fees = response.data;
		});
	}
})