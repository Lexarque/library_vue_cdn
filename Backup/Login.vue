<template>
    <div>
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                        {{ message }}
                                        <form v-on:submit.prevent="Login" method="post">
                                            <div class="form-floating mb-3">
                                                <input v-model="email" class="form-control" id="email" type="text" placeholder="email" />
                                                <label for="email">Email</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input v-model="password" class="form-control" id="inputPassword" type="password" placeholder="Password" />
                                                <label for="inputPassword">Password</label>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <input type="submit" value="Login" class="btn btn-primary" @click="Login()">
                                            </div>
                                        </form>
                                    <div class="card-footer text-center py-3">
                                        <div class="small"><a href="#">Need an account? Sign up!</a></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
module.exports =  {
    data: function(){
        return {
            email: "",
            password: "",
            message: "",
        }
    },
    methods: {
        Login: function(){
            this.message = "Please Wait..."; //alert notif
            //mapping data
            let form = {
                "email": this.email,
                "password": this.password
            }
            axios.post(api_url + '/login', form)
            .then(res => {
                if(res.data.status == 1){
                    
                    this.message = 'login success'; //alert
                    
                    // Check if cookies has token
                    if(this.$cookies.isKey('Authorization')){
                        this.$cookies.remove('Authorization');
                    }

                    //Saving token to cookies
                    this.$cookies.set("Authorization", res.data.token)
                    this.componentName = "apps"
                    location.reload()
                } else {
                    this.message = res.data.error;
                }
            });
        },
    }
}
</script>