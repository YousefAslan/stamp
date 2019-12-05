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
                <card shadow class="card-profile mt--500" style="margin-top: -350px" no-body>
                    <div class="px-lg-4 px-2">
                        <div class="text-center mt-5 ">
                            <div class=" text-center">
                                <div class="row justify-content-center">
                                    <div class="col-lg-9">
                                        <div class="uploadArea bg-secondary mb-lg-3 mb-2 p-lg-4 p-md-3 p-3">
                                            <p class="text-left mb-1">Create Post</p>
                                            <textarea v-model="uploadCaption" class="form-control " id="exampleFormControlTextarea1" rows="2" style="resize:none;"></textarea>
                                            <div  class="text-left card-profile-actions py-0 mt-lg-3 mt-3 p-0">
                                                <label class="btn btn-primary btn-sm mr-0 mb-0">
                                                     Select Photo <input type="file" @change="updateUploadedImg()" id="folder" accept="image/*" hidden>
                                                </label>
                                                {{uploadImgName}}
                                                <button @click="submitFile()" class="btn btn-primary btn-sm float-md-right float-lg-right float-xl-right ">Upload</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-1 py-1 text-center">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <Post-Generic v-for="post in posts"
                                                  :key="post.id"
                                                  :id="post.id"
                                                  :url="post.url"
                                                  :userVisable="true"
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
    </div>
</template>
<script>
    import PostGeneric from "../components/PostGeneric";
    import router from "../router";
    export default {
        components: {PostGeneric},
        beforeCreate(){
            const vu = this;
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
                        console.log(data);
                        if(data.valid)
                        {
                            vu.getPosts();
                        }
                        else
                        {
                            localStorage.removeItem("token");
                            localStorage.removeItem("username");
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
            return {
                uploadImgName:'',
                uploadCaption:"",
                file:null,
                notAllPosts: true,
                offsetOfPosts: 0,
                posts: [
                ]
            };
        },
        methods:
            {
                updateUploadedImg()
                {
                    var e = document.getElementById("folder");
                    var files = e.files;
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
                        formData.append("caption", this.uploadCaption);
                        formData.append("username", localStorage.getItem("username"));
                        formData.append("token", localStorage.getItem("token"));
                        axios.post('http://localhost:80/webproject/uploadPost.php',
                            formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                },
                            },
                        ).then(function (response) {
                            console.log(response.data);
                            let data =response.data;
                            if (data.valid === true)
                            {
                                let to_append ={
                                    id: data.id,
                                    url: data.url,
                                    liked: data.liked,
                                    dataLiked: data.likesNumber,
                                    caption: data.caption,
                                    ownerName: data.ownerName,
                                    ownerURL: data.ownerURL,

                                }
                                vu.posts.splice(0,0,to_append);
                                vu.uploadImgName=""
                                vu.uploadCaption=""
                                vu.file=null;
                            }
                        })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                },
                getPosts()
                {
                    const vu = this;
                    axios.get('http://localhost/webproject/getHomePosts.php', {
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
                                    if (data.posts.length < 10)
                                        vu.notAllPosts = false;
                                }
                                else
                                    vu.notAllPosts = false;
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
    };
</script>
<style scoped>
    .uploadArea{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.09), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
        border-radius: 5px;
    }


</style>
