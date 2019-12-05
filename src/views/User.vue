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
                <card shadow class="card-profile mt--300" no-body>
                    <div class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-lazy="personURL" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                    <button @click="toggleFollow()" class="btn btn-sm btn-primary mr-0 my-auto" >{{followed? "unfollow":"follow"}}</button>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">  <!--//number of freinds photos and Comments -->
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <a href="JavaScript:void(0)" style="color: #525f7f;">
                                            <span class="heading" @click="popFollower()" >{{followersNumber}}</span>
                                        </a>
                                        <span class="description">Followers</span>
                                    </div>
                                    <div>
                                        <a href="JavaScript:void(0)" style="color: #525f7f;">
                                            <span class="heading" @click="popFollowing()">{{followingNumber}}</span>
                                        </a>
                                        <span class="description">Following</span>
                                    </div>
                                    <div>
                                        <!-- //TODO: take data from database-->
                                        <span class="heading">{{numberOfPosts}}</span>
                                        <span class="description">Posts</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5">
                            <h3>{{personName}} <!-- name -->
                                <!--                                <span class="font-weight-light">, 27</span>-->
                            </h3>
                            <div class="h5 font-weight-300"><i class="ni location_pin mr-2"></i>{{fullName}}</div>
                            <!--                            <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer</div>-->
                            <!--                            <div><i class="ni education_hat mr-2"></i>University of Computer Science</div>-->
                        </div>
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">

                                    <Post-Generic v-for="post in posts" :key="post.id"
                                                  :id="post.id"
                                                  :url="post.url"
                                                  :userVisable="false"
                                                  :caption="post.caption"
                                                  :ownerURL="post.ownerURL"
                                                  :ownerName="post.ownerName"
                                    ></Post-Generic>
                                    <a href="javascript:void(0)" v-if="notAllPosts" @click="getPosts">Show more</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
        <b-modal id="FollowersModal" title="Followers" hide-footer centered>
            <person-item-list v-for="user in Followers"
                              :key="user.username"
                              :propName="user.username"
                              :url="user.imgURL"
                              :checkFollow="true"
                              v-on:numberOfFollowerChanged="checkFollowing"
                              v-on:theURLChanged="loadThePage()"
            ></person-item-list>
        </b-modal>
        <b-modal id="FollowingModal" title="Following" hide-footer centered>
            <person-item-list v-for="user in Following"
                              :key="user.username"
                              :propName="user.username"
                              :url="user.imgURL"
                              :checkFollow="true"
                              v-on:numberOfFollowerChanged="checkFollowing"
                              v-on:theURLChanged="loadThePage()"
            ></person-item-list>
        </b-modal>
    </div>
</template>

<script>
    import PostGeneric from "../components/PostGeneric";
    import personItemList from "../components/personItemList";
    import router from "../router";
    export default {
        name: "User",
        components: {personItemList, PostGeneric},
        props:['id'],

        created() {
            console.log("before create user")
            this.before();
            // const vu = this;
            // if(localStorage.getItem("token") != null)
            // {
            //     // console.log('id',this.$route.params.id)
            //     if (localStorage.getItem('username') === this.$route.params.id)
            //     {
            //         router.push("../profile")
            //     }
            //     axios.get('http://localhost:80/webproject/validtoken.php', {
            //         params:
            //             {
            //                 username: localStorage.getItem("username"),
            //                 token: localStorage.getItem("token"),
            //             }
            //     })
            //         .then(function (response) {
            //             let data = response.data;
            //             if(data.valid)
            //             {
            //                 vu.getBasicInfo();
            //                 vu.getPosts();
            //                 vu.getFollowing();
            //                 vu.getFollowers();
            //             }
            //             else
            //             {
            //                 localStorage.removeItem("token");
            //                 localStorage.removeItem("username");
            //                 router.push("../login")
            //             }
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //         });
            //
            // }else {
            //     router.push("../login")
            // }
        },
        data(){
            return {
                personName:"",
                fullName:"",
                userEmail:"",
                notAllPosts: true,
                offsetOfPosts:0,
                numberOfPosts: 0,
                followersNumber:0,
                followingNumber:0,
                personURL:'',
                followed: false,
                Followers:[
                ],
                Following:[
                ],
                posts: [
                ]
            };
        },
        methods:
            {
                getBasicInfo()
                {
                    console.log("mjenj");
                    const vu = this;
                    axios.get('http://localhost:80/webproject/userProfile.php', {
                        params:
                            {
                                username: localStorage.getItem("username"),
                                token: localStorage.getItem("token"),
                                personname: this.$route.params.id,
                            }
                    })
                        .then(function (response) {
                            let data = response.data;
                            if(data.valid)
                            {
                                console.log(data);
                                vu.personName = data.personName;
                                vu.fullName = data.fullName;
                                vu.personURL = data.personURL;
                                vu.numberOfPosts = data.numberOfPosts;
                                vu.followersNumber = data.followersNumber;
                                vu.followingNumber = data.followingNumber;
                                vu.followed = data.followed;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                getPosts()
                {
                    //todo: change it
                    console.log("from get posts profile");
                    const vu = this;
                    axios.get('http://localhost/webproject/getUserPosts.php', {
                        params:
                            {
                                username: localStorage.getItem("username"),
                                token: localStorage.getItem("token"),
                                personName: this.$route.params.id,
                                offset: vu.offsetOfPosts
                            }
                    })
                        .then(function (response) {
                            let data = response.data;
                            console.log(data);
                            if(data.valid)
                            {
                                if (data.posts.length != 0)
                                {
                                    vu.posts = vu.posts.concat(data.posts);
                                    vu.offsetOfPosts = vu.posts.length;
                                }
                                else
                                {
                                    vu.notAllPosts = false;
                                }
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                getFollowing()
                {
                    const vu = this;
                    axios.get('http://localhost/webproject/getUserFollowing.php', {
                        params:
                            {
                                username: localStorage.getItem("username"),
                                token: localStorage.getItem("token"),
                                personName: this.$route.params.id,
                            }
                    })
                        .then(function (response) {
                            let data = response.data;
                            console.log(data);
                            if(data.valid)
                            {
                                vu.Following = data.Following
                                console.log(vu.Following);
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                },
                getFollowers()
                {
                    const vu = this;
                    axios.get('http://localhost/webproject/getUserFollowers.php', {
                        params:
                            {
                                username: localStorage.getItem("username"),
                                token: localStorage.getItem("token"),
                                personName: this.$route.params.id,
                            }
                    })
                        .then(function (response) {
                            let data = response.data;
                            console.log(data);
                            if(data.valid)
                            {
                                vu.Followers = data.Followers
                                console.log(vu.Followers);
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                },
                popFollower(){
                    this.$bvModal.show("FollowersModal");
                },
                popFollowing(){
                    this.getFollowing();
                    this.$bvModal.show("FollowingModal");
                },
                checkFollowing(){
                    this.getBasicInfo();
                    this.getFollowers();
                    this.getFollowing();
                },
                toggleFollow()
                {
                    const vu = this;
                    axios.get('http://localhost/webproject/followUnfollowPerson.php', {
                        params:
                            {
                                username: localStorage.getItem("username"),
                                token: localStorage.getItem("token"),
                                person: this.$route.params.id,
                                follow: !(this.followed)
                            }
                    })
                        .then(function (response) {
                            let data = response.data;
                            // console.log(data);
                            if(data.valid)
                            {
                                vu.followed = data.followed;
                                vu.getFollowing();
                                vu.getFollowers();
                                vu.getBasicInfo();
                                vu.$emit('numberOfFollowerChanged')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                loadThePage()
                {
                    this.$bvModal.hide("FollowingModal");
                    this.$bvModal.hide("FollowersModal");
                    this.before();
                },
                before()
                {
                    const vu = this;
                    if(localStorage.getItem("token") != null)
                    {
                        // console.log('id',this.$route.params.id)
                        if (localStorage.getItem('username') === this.$route.params.id)
                        {
                            router.push("../profile")
                        }
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
                                {
                                    vu.getBasicInfo();
                                    vu.posts.length =0;
                                    vu.offsetOfPosts =0;
                                    vu.getPosts();
                                    vu.getFollowing();
                                    vu.getFollowers();
                                }
                                else
                                {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("username");
                                    router.push("../login")
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    }else {
                        router.push("../login")
                    }
                }
            },

    }
</script>

<style scoped>

</style>