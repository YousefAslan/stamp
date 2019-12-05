<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <img src="img/brand/Untitled-1.png">
<!-- TODO: inset our log here-->
<!--                            <div class="text-muted text-center mb-3">-->
<!--                                <small>Sign in with</small>-->
<!--                            </div>-->
<!--                            <div class="btn-wrapper text-center">-->
<!--                                <base-button type="neutral">-->
<!--                                    <img slot="icon" src="img/icons/common/github.svg">-->
<!--                                    Github-->
<!--                                </base-button>-->

<!--                                <base-button type="neutral">-->
<!--                                    <img slot="icon" src="img/icons/common/google.svg">-->
<!--                                    Google-->
<!--                                </base-button>-->
<!--                            </div>-->
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Sign In</small>
                            </div>
                            <form role="form" >
                                <base-input alternative
                                            :error="invalidEmailOrPassword"
                                            class="mb-3"
                                            v-model="email"
                                            placeholder="Email"
                                            @focus="invalidEmailOrPassword=''"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative required
                                            type="password"
                                            placeholder="Password"
                                            v-model="password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
<!--                                <base-checkbox>-->
<!--                                    Remember me-->
<!--                                </base-checkbox>-->
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="sign_in_check" >Sign In</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="javascript:void(0)" class="text-light">
<!--TODO: Salah want to implement it-->
<!--                                <small>Forgot password?</small>-->
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <router-link to="/register">
                                <a  class="text-light" >
                                    <small style="font-color: white;">Create new account</small>
                                </a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import router from "../router";

export default {
    beforeCreate() {
        if(localStorage.getItem("token") != null)
        {
            console.log("there is token");
            axios.get('http://localhost:80/webproject/validtoken.php', {
            params: 
            {
                username: localStorage.getItem("username"),
                token: localStorage.getItem("token"),
            }
            })
            .then(function (response) {
                let data = response.data;
                if(data.valid)
                    router.push("home");
                
            })
            .catch(function (error) {
                console.log(error);
            });

        }
    },
    data(){
        return{
            email :"",
            password: "",
            invalidEmailOrPassword:"",
            visible: true,

        }
    },
    methods:{
    sign_in_check()
    {
        const vu = this;
        let valid = this.ValidateEmail(this.email);
        if(valid)
        {
            axios.get('http://localhost:80/webproject/login.php', {
            params: 
            {
                Email: this.email,
                Password: this.password,
            }
            })
            .then(function (response) {
                let data = response.data;
                if(data.valid)
                {
                    localStorage.setItem("username",data.username);
                    localStorage.setItem("token",data.token);
                    router.push("home");
                }
                else
                {
                    vu.invalidEmailOrPassword ="invalid email or password";
                    valid = false;
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        if(!valid)
        {
            this.invalidEmailOrPassword ="invalid email or password";
        };   
    },
    ValidateEmail(mail) 
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        return (false)
    },
    },
};
</script>
<style>
</style>
