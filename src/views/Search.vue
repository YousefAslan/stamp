<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
                <card shadow class="card-profile mt--500" style="margin-top: -350px;" no-body>
                    <div class="px-4">
                        <div class="text-center mt-5 mb-5">
                            <div class=" text-center">
                                <div class="row justify-content-center">
<!--                                    <div class="row justify-content-center">-->
                                        <div class="col-lg-9">
                                    <base-input alternative @input="setTimer" v-model="search" placeholder="Search" addon-left-icon="ni ni-zoom-split-in"></base-input>
                                    <person-item-list v-for="person in result" class="mb-3"
                                                      :key="person.personName"
                                                      :propName="person.personName"
                                                      :url="person.url"
                                                      :checkFollow="true"
                                    ></person-item-list>
                                        </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </card>
            </div>
        </section>
    </div>
</template>

<script>
    import PostGeneric from "../components/PostGeneric";
    import personItemList from "../components/personItemList";
    import router from "../router";
    export default {
        components: {personItemList, PostGeneric},
        name: "Search",
        beforeCreate(){
            const vu = this;
            if(localStorage.getItem("token") != null)
            {
                axios.get('http://localhost:80/webproject/validtoken.php', {
                    params:
                        {
                            username: localStorage.getItem("username"),
                            token: localStorage.getItem("token"),
                        }
                })
                    .then(function (response) {
                        let data = response.data;
                        if(! data.valid)
                        {
                            router.push('Login');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }else {
                router.push('Login');
            }
        },
        data(){
            return{
                search:"",
                timerId: null,
                result:[]
            }

            },
        methods:{
            setTimer()
            {
                if (this.search ==="" || this.search === " ")
                {
                    this.result.length = 0;
                }
                if (this.timerId === null)
                {
                    this.timerId = setTimeout(() =>this.getResults(),400)
                    console.log("set new timer ")
                }
                else {
                    clearTimeout(this.timerId);
                    this.timerId = setTimeout(() =>this.getResults(),400);
                    console.log("reset timer ")
                }

            },
            getResults(){
                // console.log("hello")
                clearTimeout(this.timerId);
                this.timerId = null;
                if (this.search !=="" && this.search !== " ")
                {
                    const vu = this;
                    axios.get('http://localhost:80/webproject/search.php', {
                        params:
                            {
                                username: localStorage.getItem("username"),
                                token: localStorage.getItem("token"),
                                searchedSubName: this.search
                            }
                    })
                        .then(function (response) {
                            let data = response.data;
                            console.log(data);
                            if(data.valid)
                            {
                                vu.result = data.result
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                else
                {
                    this.result.length = 0
                }
            }
        }
    }
</script>

<style scoped>

</style>