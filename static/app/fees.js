Vue.component("fees", {
	template: `
	<div class="ui container">
		<h1 class="ui centered grid header" style="padding:20px">Choose your ideal fee</h1>
		
		<div class="ui four cards">
		  <div class="card" v-for="f in fees">
		    <div class="content">
		      <div class="header">{{f.name}}</div>
		      <div class="ui centered centered grid">
		      	<div class="descriptoin column"> 
		      		{{f.price}}RSD
		      	</div>
		      </div>
			  <div class="ui centered centered grid">
		      	<div class="descriptoin column"> 
		      		Number of trainings: {{f.trainings}}
		      	</div>
		      </div>
		    </div>
		    <div class="ui bottom attached button" v-on:click="buy(f)">
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
		axios.get("/fees").then(response => {
			this.fees = response.data;
		});
	},
	methods: {
		buy(fee) {
			axios.post("/customer/fee", fee).then(response => {
				window.location.href = "/#/my-fee"
				alert("Successfuly shopping!");
			}).catch(() => {
				window.location.href="/#/login";
				alert("Inspire your session. Please login again!");
			})
		}
	}
})