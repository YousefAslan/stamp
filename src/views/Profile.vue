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
                    <div class="px-lg-4 px-2">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-lazy="userURL" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                    <div >
                                        <base-button class="btn-sm mb-3" @click="showSettings = true">
                                            Settings
                                        </base-button>
                                        <modal :show.sync="showSettings"
                                               body-classes="p-0"
                                               modal-classes="modal-dialog-centered modal-sm">
                                            <card type="secondary" shadow
                                                  header-classes="bg-white pb-5"
                                                  body-classes="px-lg-5 py-lg-5"
                                                  class="border-0">
                                                <template>
<!--TODO: inset upload image here-->
                                                    <div class="text-center">
                                                        <form>
<!--                                                            <img @click="getimage" style="border-radius: 100px; width: 200px; height: 200px;" src="https://i.stack.imgur.com/34AD2.jpg">-->
                                                            <div class="text-center">
<!--                                                                <input type="file" @change="updateUploadedImg()" id="folder" accept="image/*" >-->
                                                                <label class="btn btn-primary btn-sm mr-0 mb-0">
                                                                    Select Photo <input type="file" @change="updateUploadedImg()" id="folder" accept="image/*" hidden>
                                                                </label>
                                                                {{uploadImgName}}
                                                                <base-button @click="submitFile()" type="primary" class="my-2 mb-3">Update Profile Picture</base-button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </template>
                                                <template>

                                                    <form role="form">
                                                        <base-input alternative
                                                                    class="mb-3"
                                                                    placeholder="Full name"
                                                                    v-model="newFullName"
                                                                    addon-left-icon="fa fa-user"
                                                                    :error="errorMsg"
                                                                    @focus="errorMsg=''">
                                                        </base-input>
                                                        <base-input alternative
                                                                    type="password"
                                                                    v-model="oldPassword"
                                                                    :error="passErrorMsg"
                                                                    placeholder="Old Password"
                                                                    @focus="passErrorMsg=''"
                                                                    addon-left-icon="ni ni-lock-circle-open">
                                                        </base-input>
                                                        <base-input alternative
                                                                    type="password"
                                                                    v-model="newPassword"
                                                                    @focus="passErrorMsg=''"
                                                                    placeholder="New Password"
                                                                    addon-left-icon="ni ni-lock-circle-open">
                                                        </base-input>
                                                        <div class="text-center">
                                                            <base-button @click="updateInformation()" type="primary" class="my-2">Update Your information</base-button>
                                                        </div>
                                                    </form>
                                                </template>
                                            </card>
                                        </modal>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <a href="JavaScript:Void(0)" style="color: #525f7f;">
                                            <span class="heading" @click="popFollower()" >{{followersNumber}}</span>
                                        </a>
                                        <span class="description">Followers</span>
                                    </div>
                                    <div>
                                        <a href="JavaScript:Void(0)" style="color: #525f7f;">
                                            <span class="heading" @click="popFollowing()">{{followingNumber}}</span>
                                        </a>
                                        <span class="description">Following</span>
                                    </div>
                                    <div>
                                        <span class="heading">{{numberOfPosts}}</span>
                                        <span class="description">Posts</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-1 mt-md-5">
                            <h3>{{userName}} <!-- name -->
                            </h3>
                            <div class="h5 font-weight-300">
                                <i class="ni location_pin mr-2"></i>{{fullName}}
                            </div>
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
            ></person-item-list>
        </b-modal>
        <b-modal id="FollowingModal" title="Following" hide-footer centered>
            <person-item-list v-for="user in Following"
                              :key="user.username"
                              :propName="user.username"
                              :url="user.imgURL"
                              :checkFollow="false"
                              v-on:numberOfFollowerChanged="checkFollowing"
            ></person-item-list>
        </b-modal>
    </div>
</template>
<script>
import PostGeneric from "../components/PostGeneric";
import personItemList from "../components/personItemList";
import modal from "../components/Modal";
import router from "../router";
export default {
    components: {personItemList, PostGeneric,modal},
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
                    if(data.valid)
                    {
                        vu.getBasicInfo();
                        vu.getPosts();
                        vu.getFollowing();
                        vu.getFollowers();
                    }
                    else
                    {
                        router.push('Login');
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
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
        return {
            userName:"",
            fullName:"",
            userEmail:"",
            userURL:"",
            notAllPosts: true,
            offsetOfPosts:0,
            numberOfPosts: 0,
            followersNumber:0,
            followingNumber:0,
            showSettings: false,
            newFullName:"",
            oldPassword:"",
            newPassword:"",
            errorMsg:"",
            passErrorMsg:"",
            uploadImgName:'',
            file:null,
            Followers:[
                {
                    username: "salah",
                    fullname: "salah badawi"
                },
                {
                    username: "yousef",
                    fullname: "yousef aslan"
                }
            ],
            Following:[
            ],
            posts: [

            ]
        };
    },
    methods:
    {
        getBasicInfo() {
            const vu = this;
            axios.get('http://localhost:80/webproject/profile.php', {
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
                        vu.userName = data.username;
                        vu.fullName = data.fullname;
                        vu.userEmail = data.email;
                        vu.userURL = data.userURL;
                        vu.numberOfPosts = data.numberOfPosts;
                        vu.followersNumber = data.followersNumber;
                        vu.followingNumber = data.followingNumber;
                    }


                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getPosts() {
            console.log("from get posts profile");
            const vu = this;
            axios.get('http://localhost/webproject/getProfilePosts.php', {
                params:
                    {
                        username: localStorage.getItem("username"),
                        token: localStorage.getItem("token"),
                        offset: vu.offsetOfPosts
                    }
            })
                .then(function (response) {
                    let data = response.data;
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
        getFollowing() {
            const vu = this;
            axios.get('http://localhost/webproject/getFollowing.php', {
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
                        vu.Following = data.Following
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        getFollowers() {
            const vu = this;
            axios.get('http://localhost/webproject/getFollowers.php', {
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
            // this.getFollowing();
        },
        updateInformation(){
            if (this.fullName !== this.newFullName && this.newFullName !== "")
            {
                //todo: send axios request to the server to update information else dont send
                const vu = this;
                axios.get('http://localhost/webproject/updateFullName.php', {
                    params:
                        {
                            username: localStorage.getItem("username"),
                            token: localStorage.getItem("token"),
                            newfullname: this.newFullName
                        }
                })
                    .then(function (response) {
                        let data = response.data;
                        console.log(data)
                        if(data.valid)
                        {
                            vu.fullName = data.newFullName;
                            vu.newFullName = data.newFullName;
                        }
                        else
                        {
                            vu.errorMsg ="unable to change your name"
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                        vu.errorMsg ="unable to change your name"
                    });
            }
            else {
                this.errorMsg ="unable to change your name"
            }
            if (this.oldPassword !== "" && this.newPassword !== "")
            {
                const vu = this;
                axios.get('http://localhost/webproject/updatePassword.php', {
                    params:
                        {
                            username: localStorage.getItem("username"),
                            token: localStorage.getItem("token"),
                            oldpassword: this.oldPassword,
                            newpassword: this.newPassword
                        }
                })
                    .then(function (response) {
                        let data = response.data;
                        console.log(data)
                        if(data.valid)
                        {
                            console.log("password changed")
                            alert("Password changed")
                        }
                        else
                        {
                            vu.passErrorMsg += "Cant update your password";
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                        vu.passErrorMsg += "Cant update your password";
                    });
            }
        },
        updateUploadedImg()
        {
            var e = document.getElementById("folder");
            var files = e.files;
            console.log(e.value);
            var name ="";
            for (var i = 0; i < files.length; i++) {
                name = files[i].name;
                var type = files[i].type;
                console.log(type.includes("image"));
                if (type.includes("image"))
                {
                    this.uploadImgName = name;
                    this.file = files[0];
                    console.log(this.file)
                    console.log(this.file.toString());
                }
                else
                {
                    this.uploadImgName ="";
                    this.file = null;
                }
            }
        },
        submitFile(){
            const vu = this;
            let formData = new FormData();
            if (this.file !== null)
            {
                formData.append('file', this.file);
                // formData.append("caption", this.uploadCaption);
                formData.append("username", localStorage.getItem("username"));
                formData.append("token", localStorage.getItem("token"));
                axios.post('http://localhost:80/webproject/uploadProfileImg.php',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    },
                ).then(function (response) {
                    console.log(response.data);
                    let data =response.data;
                    if (data.valid)
                    {
                        console.log("Your profile Picture was updated successfully")
                        vu.userURL = data.ownerURL;
                        vu.uploadImgName= "";
                        vu.file=null;
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
    },
};
</script>
<style scoped>

</style>
