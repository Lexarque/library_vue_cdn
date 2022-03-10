// Route Configuration
var api_url = "http://localhost:8000/api";

var router = 
    [{
        path: "/",
        name: "Home",
        component: httpVueLoader("src/components/Home.vue")
    },
    {
        path: "/Book",
        name: "Book",
        component: httpVueLoader("src/components/Book.vue")
    }
];

var routes = new VueRouter({routes: router, base : "/"});

// Instance Vue

var app = new Vue({
    el : "#app", // Vue Element, el = element
    components: {
        "home": httpVueLoader("src/components/Home.vue"),
        "apps": httpVueLoader("src/components/Apps.vue"),
        "login": httpVueLoader("src/components/Login.vue"),
    },
    data: {
        users:{
            id: '',
            name: '',
            username: '',
            email: '',
            role: '',
        },
        componentName: '',
        router: 'routes',
        TokenCheck: function(){
            //Check if cookies has token
            if(this.$cookies.isKey('Authorization')){
                //Token Validation
                let token = {
                    headers : {
                        "Authorization" : "Bearer " + this.$cookies.isKey('Authorization') 
                    }
                }
                axios.get(api_url + '/getAuth', token).then(res => {
                    if(res.data.status === 1){
                        //Load apps components
                        this.componentName = "apps";
                        this.id = "res.data.data.user.id";
                        this.name = "res.data.data.user.name";
                        this.username = "res.data.data.user.username";
                        this.role = "res.data.data.user.role";
                    }else{
                        this.componentName = "login";
                    }
                });
            }else{
                // if token not found redirect to login
                this.componentName = "login";
            }
        },
    },
    mounted(){
        this.TokenCheck();
    }
});