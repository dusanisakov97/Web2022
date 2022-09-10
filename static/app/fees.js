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
			  <div class="ui centered centered grid">
								<div class="descriptoin column"> 
									Months: {{f.months}}
								</div>
							</div>
		    </div>
			
		    <div class="ui bottom attached button" v-on:click="selectFee(f)">
		      <i class="shop icon"></i>
		      Choose
		    </div>
		  </div>  
		</div>

		<div v-if="selectedFee != null">
			<h1 class="ui centered grid header" style="padding:20px">Choose your ideal fee</h1>

			<div class="ui three column centered grid">
			    <div class="column">
					<div class="ui one cards">
						<div class="card">
						<div class="content">
							<div class="header">{{selectedFee.name}}</div>
							<div class="ui centered centered grid">
								<div class="descriptoin column"> 
									{{selectedFee.price}}RSD
								</div>
							</div>
							<div class="ui centered centered grid">
								<div class="descriptoin column"> 
									Number of trainings: {{selectedFee.trainings}}
								</div>
							</div>
							<div class="ui centered centered grid">
								<div class="descriptoin column"> 
									Months: {{selectedFee.months}}
								</div>
							</div>
						</div>
						<div class="ui bottom attached button" v-on:click="buy">
		      <i class="shop icon"></i>
		      Pay
		    </div>
				
						</div>  
					</div>
			    </div>
			</div>

		</div>


	</div>
		
	`,
	data: function() {
		return {
			fees:[],
			selectedFee: null,
		}
	}, 
	mounted() {
		axios.get("/fees").then(response => {
			this.fees = response.data;
		});
	},
	methods: {
		selectFee(fee) {
			this.selectedFee = fee;
		},
		buy() {
			axios.post("/customer/fee", this.selectedFee).then(response => {
				window.location.href = "/#/profile"
				alert("Successfuly shopping!");
			}).catch(() => {
				window.location.href="/#/login";
				alert("Inspire your session. Please login again!");
			})
		}
	}
})