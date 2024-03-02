const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			
			],
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				
				try{
					let actions=getActions()
					// fetching data from the backend
					const data = await actions.getApi("/hello","GET")
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
			
				//reset the global store
				setStore({ demo: demo });
			},
			getApi: async (endpoint, method="GET", body=null)=>{
				try {
					let params={method}
					if(body!=null){
						params.headers={
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin":"*"
						}
						params.body=JSON.stringify(body)
					}
					const response = await fetch(process.env.BACKEND_URL +"api"+endpoint, params);
					if(!response.ok){
						console.error(response.statusText)
						return {error:response.statusText}
					}
					let json = await response.json();
					return json;
				  } catch (error) {
					console.error('Error:', error);
				  }
				},
			login: async (email,password)	=>{
				
				let actions=getActions()
				const dat =await actions.getApi("/login","POST",{email,password})
				if(dat.error){
					return false
				}
				setStore({token:dat.token})
				localStorage.setItem("accessToken",dat.token)
				return true				


			},
			loadSession: ()=>{
				let token=localStorage.getItem("accessToken")
				setStore({token})
			},
			signUp: async (email,password)=>{
				
					let actions=getActions()
					const res= await actions.getApi("/signup","POST", {email,password})
					if(res.ok){
						console.log("Usuario registrado")
						return true

					}
					else{
						console.log("error")
						return false

					}

			

			}		
		}
	};
};

export default getState;
