// Route Configuration
var api_url = "http://localhost:8000/api";
var image_url = "http://localhost:8000/";

var router = 
    [{
        path: "/",
        name: "Home",
        component: httpVueLoader("src/components/Home.vue")
    },
    {
        path: "/login",
        name: "Login",
        component: httpVueLoader("src/components/Login.vue")
    },
    // {
    //     path: "/register",
    //     name: "Register",
    //     component: httpVueLoader("src/components/Register.vue")
    // },
    {
        path: "/book",
        name: "Book",
        component: httpVueLoader("src/components/Book.vue")
    },
    {
        path:"/students",
        name: "Students",
        component: httpVueLoader("./src/components/Students.vue")
    },
    {
        path:"/borrow",
        name: "Borrow",
        component: httpVueLoader("./src/components/Borrow.vue")
    },
    {
        path:"/return",
        name: "Return",
        component: httpVueLoader("./src/components/Return.vue")
    }
];

const routes = new VueRouter({routes: router, base : "/"});

// Instance Vue

var app = new Vue({
    el : "#app", // Vue Element, el = element
    components: {
        "home": httpVueLoader("src/components/Home.vue"),
        "apps": httpVueLoader("src/components/Apps.vue"),
        "students": httpVueLoader("src/components/Students.vue"),
        "login": httpVueLoader("src/components/Login.vue"),
        // "register": httpVueLoader("src/components/Register.vue"),
    },
    data: {
        user:{
            id: '',
            name: '',
            username: '',
            email: '',
            role: '',
        },
        componentName: '',
    },
    router: routes,
    methods: {
        TokenCheck: function(){
            //Check if cookies has token
            if(this.$cookies.isKey('Authorization')){
                //Token Validation
                let token = {
                    headers : {
                        "Authorization" : "Bearer " + this.$cookies.get('Authorization') 
                    }
                }
                axios.get(api_url + '/getAuth', token).then(res => {
                    if(res.data.status === 1){
                        this.componentName = "apps";
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