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
<!--TODO: inset our log                            -->
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
                                <small>Sign Up</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="User Name"
                                            :error="invalidInfo"
                                            @focus="invalidInfo=''"
                                            v-model="userName"
                                            addon-left-icon="ni ni-badge">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Full Name"
                                            v-model="fullName"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            v-model="email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model="password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <div class="text-muted font-italic">
                                </div>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="create_account">Create account</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import router from "../router";

export default {
        beforeCreate() {
        if(localStorage.getItem("token") != null) {
            if (localStorage.getItem("token") != null) {
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
                    if (data.valid)
                        router.push("home");

                })
                .catch(function (error) {
                    console.log(error);
                });

            }
        }
    },
     data(){
        return{
            userName :"",
            fullName: "",
            email:"",
            password: "",
            invalidInfo: "",
        }
    },
    methods:
    {
        create_account()
        {
            const vu = this;
            if (this.ValidateEmail(this.email) && (this.userName.indexOf(" ") === -1) && this.fullName.length !=0 && this.password.length != 0)
            {
                axios.get('http://localhost:80/webproject/signin.php', {
                    params:
                        {
                            username: this.userName,
                            fullname: this.fullName,
                            email: this.email,
                            password: this.password
                        }
                })
                    .then(function (response) {
                        let data = response.data;
                        if(data.valid)
                        {
                            router.push("home");
                            localStorage.setItem("username",data.username);
                            localStorage.setItem("token",data.token);

                        }
                        else
                        {
                            vu.invalidInfo = data.message;
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else {
                this.invalidInfo = "need more infomations";
            }
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
