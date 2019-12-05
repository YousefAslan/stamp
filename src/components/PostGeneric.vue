<template>
    <div>
        <div class="mb-lg-3 mb-2 p-lg-4 p-md-3 p-2 bg-secondary text-left Post">
            <div v-if="userVisable">
                <a href="javascript:void(0)" @click="testing">
                    <img class="mb-2" style="border-radius: 50%; width: 50px;height: 50px;" :src="ownerURL" alt="Avatar">
                </a>
                <span class="pl-lg-2 pb-lg-1" >
                    <a style="color: #525f7f;" href="javascript:void(0)" @click="testing">
                        {{ownerName}}
                    </a>
                </span>
            </div>

            <img @click="pop()" class="w-100 mb-1 img" :src="url">
            <i class="mt-1 ml-1" @click="toggleLike()" v-bind:class="[liked ? 'fa fa-heart' : 'fa fa-heart-o']" style="font-size:24px; color: #ee5162;"></i>
            <span class="ml-1 mb-2">{{likesNumber}}</span>
            <p class="none m-1">{{caption}}</p>
        </div>

        <b-modal :id="id.toString()" size="lg" title="Large Modal" ok-only hide-footer>
            <template v-slot:modal-title>
                <a style="color: #525f7f;" href="javascript:void(0)" @click="testing">
                    <img style="margin-bottom:10px; border-radius: 50%; width: 50px;height: 50px;"
                     :src="ownerURL"
                     alt="Avatar">
                </a>
                <span style="padding-left: 10px; padding-top:15px;">
                    <a style="color: #525f7f;" href="javascript:void(0)" @click="testing">
                        {{ownerName}}
                    </a>
                </span>
            </template>
            <div>
                <img class="w-100 mb-1 img" :src=url>
                <i class="mt-1 ml-1" @click="toggleLike()" v-bind:class="[liked ? 'fa fa-heart' : 'fa fa-heart-o']" style="font-size:24px; color: #ee5162;"></i>
                <span class="ml-1 mb-2">{{likesNumber}}</span>
<!--                <hr class="m-1">-->
                <p class="lead none m-2">{{caption}}</p>
                <div class="container-fluid input-group justify-content-between px-0">
                    <div class="row container-fluid mx-0 px-0">
                        <div class="input-group mb-3 col-lg-11 col-12 mx-0 pr-lg-1 px-0">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default"><i class="fa fa-comment"></i></span>
                            </div>
                            <input type="text" class="form-control pl-2" aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-default" v-model="comment"
                                   placeholder="Share your opinion...">
                        </div>
                        <div class="col-12 col-lg-1 mx-0 pl-lg-1 px-0">
                            <button @click="addComment()" type="button" class="btn btn-primary btn-md btn-block">
                                <i class="fa fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <hr class="m-3">
                <template v-for="comm in comments" inline-template>
                    <div class="d-flex bg-secondary rounded mt-2 mb-3 comment">
                        <div class="pr-2 pl-2 align-top pt-2 mr-1">
                            <a style="color: #525f7f;" href="javascript:void(0)" @click="commentProfile(comm.userName)">
                                <img class="mt-2 mr-1" :src=comm.userURL alt="Avatar" style=" border-radius: 50%; width: 50px;height: 50px;" >
                            </a>
                        </div>
                        <div class="p-2 align-self-center">
                            <div class="row">
                                <span class="lead mt-1">
                                     <a class="font-weight-normal" style="color: #525f7f;" href="javascript:void(0)" @click="commentProfile(comm.userName)">
                                        {{comm.userName}}
                                    </a>
                                </span>
                            </div>
                            <div class="row mr-1">
                                <p class="mb-0">{{comm.commentText}}</p>
                            </div>
                        </div>
                    </div>
                </template>
<!--                <div class="input-group">-->
<!--                    <div class="input-group mb-3">-->
<!--                        <div class="input-group-prepend">-->
<!--                            <span class="input-group-text" id="inputGroup-sizing-default">Comment</span>-->
<!--                        </div>-->
<!--                        <input type="text" class="form-control" aria-label="Sizing example input"-->
<!--                               aria-describedby="inputGroup-sizing-default" v-model="comment">-->
<!--                    </div>-->
<!--                    <button @click="addComment()" type="button" class="btn btn-primary btn-md btn-block">Comment</button>-->
<!--                </div>-->
            </div>
            <template v-slot:modal-ok >Close</template>
        </b-modal>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Post-Generic",
        created()
        {
            this.getlikes()
            this.getComments()
        },
        props: {
            id: {
                required: true,
                type: Number
            },
            url:{
                required: true,
                type: String
            },
            userVisable:{
                required: true,
                type: Boolean
            },
            caption:{
                required: true,
                type: String
            },
            ownerName:{
                required: true,
                type: String
            },
            ownerURL:{
                type: String
            },
        },
        data(){
          return {
              comment:"",
              liked: false,
              likesNumber: 0,
              comments:[
              ]
          }
        },
        methods:{
            pop(){
                this.$bvModal.show(this.id.toString());
            },
            addComment(){
                const vu = this;
                axios.get('http://localhost:80/webproject/addComment.php', {
                    params:
                        {
                            username: localStorage.getItem("username"),
                            token: localStorage.getItem("token"),
                            id: this.id,
                            comment: this.comment
                        }
                })
                    .then(function (response) {
                        let data = response.data;
                        if(data.valid)
                        {
                            let com = {
                                commentText: data.commentText,
                                userName: data.userName,
                                userURL: data.userURL,
                            }
                            vu.comments.splice(0,0,com);
                            // vu.comments.push(com);
                            vu.comment = "";
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getComments(){
                const vu = this;
                axios.get('http://localhost/webproject/getComments.php', {
                    params:
                        {
                            username: localStorage.getItem("username"),
                            token: localStorage.getItem("token"),
                            postId: this.id
                        }
                })
                    .then(function (response) {
                        let data = response.data;
                        if(data.valid)
                        {
                            if (data.comments.length != 0)
                            {

                                vu.comments = vu.comments.concat(data.comments);
                            }
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getlikes(){
                const vu = this;
                axios.get('http://localhost/webproject/getLikes.php', {
                    params:
                        {
                            username: localStorage.getItem("username"),
                            token: localStorage.getItem("token"),
                            postId: this.id
                        }
                })
                    .then(function (response) {
                        let data = response.data;
                        if(data.valid)
                        {
                            vu.likesNumber = data.likesNumber;
                            vu.liked = data.liked;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            toggleLike()
            {
                const vu = this;
                axios.get('http://localhost/webproject/getLikes.php', {
                    params:
                        {
                            username: localStorage.getItem("username"),
                            token: localStorage.getItem("token"),
                            postId: this.id,
                            like: (!(this.liked)).toString()
                        }
                })
                    .then(function (response) {
                        let data = response.data;
                        if(data.valid)
                        {
                            vu.likesNumber = data.likesNumber;
                            vu.liked = data.liked;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            testing()
            {
                router.push({ name: 'user', params: { id: this.ownerName } })
            },
            commentProfile(username)
            {
                router.push({ name: 'user', params: { id: username } })
            }
        }

    }
</script>

<style scoped>
    .Post{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.09), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
        border-radius: 5px;
    }
    .img{
        border-radius: 5px;
    }
    .comment{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
    }
</style>