<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" :to="homeLink" >
                <img src="img/brand/Untitled-4.png" alt="logo">
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <a href="javascript:void(0)">
                        <router-link slot="brand" class="navbar-brand mr-lg-5" :to="homeLink" >
                            <img src="img/brand/blue.png">
                        </router-link>

                    </a>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>
<!--            <ul class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto">-->
<!--                <li class="nav-item" >-->
<!--                    <a class="nav-link nav-link-icon" @click="toSearch" href="javascript:void(0)"-->
<!--                       rel="noopener" data-toggle="tooltip" title="Star us on Github">-->
<!--                        <i class="fa fa-search" aria-hidden="true"></i>-->
<!--                        <span class="nav-link-inner&#45;&#45;text d-lg-none">Search</span>-->
<!--                    </a>-->
<!--                </li>-->
<!--                <base-dropdown tag="li" class="nav-item">-->
<!--                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">-->
<!--                        <i class="fa fa-align-right" aria-hidden="true"></i>-->
<!--                        <span class="nav-link-inner&#45;&#45;text d-lg-none">Settings</span>-->
<!--                    </a>-->
<!--                    <router-link to="/home" class="dropdown-item">Home</router-link>-->
<!--                    <router-link to="/profile" class="dropdown-item">Profile</router-link>-->
<!--                    <router-link to="/search" class="dropdown-item">Search</router-link>-->
<!--                    <a class="dropdown-item" href="javascript:void(0)" @click="logout">Logout</a>-->
<!--                </base-dropdown>-->
<!--            </ul>-->
        </base-nav>
    </header>
</template>

<script>
    import BaseNav from "@/components/BaseNav";
    import BaseDropdown from "@/components/BaseDropdown";
    import CloseButton from "@/components/CloseButton";
    import router from "../router"
    export default {
        name: "AppHeader2",
        components: {
            BaseNav,
            CloseButton,
            BaseDropdown
        },
        computed:{
            homeLink(){
                if (localStorage.getItem('token')){
                    return "/home"
                }else{
                    return "/"
                }
            },
        },
        methods:{
            logout()
            {
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                router.push('Login');
            },
            toSearch()
            {
                router.push('/search');
                // to="/search"
            }
        }
    }
</script>

<style scoped>

</style>