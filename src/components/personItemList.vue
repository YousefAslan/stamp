<template>
    <div class=" bg-secondary mb-2 p-1   personList">
        <div class="d-flex card-body p-2">
            <a href="javascript:void(0)" @click="testing"><img class='rounded-circle' style='height: 50px;' :src="personURL"></a>
            <div class="d-flex w-100 ml-2" >
                <h5 class=" my-auto ml-0" ><a style="color: #525f7f;" href="javascript:void(0)" @click="testing">{{name}}</a></h5>
            </div>
            <button @click="toggleFollow" class="btn btn-sm btn-primary mr-0 my-auto" v-if="notTheUser()" >{{followed? "unfollow":"follow"}}</button>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        created()
        {
            if (this.checkFollow == true)
            {
                const vu = this;
                axios.get('http://localhost/webproject/getFollowedPerson.php', {
                    params:
                        {
                            username: localStorage.getItem("username"),
                            token: localStorage.getItem("token"),
                            person: this.propName
                        }
                })
                    .then(function (response) {
                        let data = response.data;
                        if(data.valid)
                        {
                            vu.followed = data.followed;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        name: "person-item-list",
        props:{
            propName:{
                required: true,
                type: String
            },
            url:{
                required: true,
                type: String
            },
            propFollowed:{
                default: true,
                type: Boolean
            },
            checkFollow:{
                default: false,
                type: Boolean
            }
        },
        data(){
            return {
                name: this.propName,
                followed: this.propFollowed,
                personURL: this.url
            }
        },
        methods:{
            toggleFollow()
            {
                const vu = this;
                axios.get('http://localhost/webproject/followUnfollowPerson.php', {
                    params:
                        {
                            username: localStorage.getItem("username"),
                            token: localStorage.getItem("token"),
                            person: this.propName,
                            follow: !(this.followed)
                        }
                })
                    .then(function (response) {
                        let data = response.data;
                        if(data.valid)
                        {
                            vu.followed = data.followed;
                            vu.$emit('numberOfFollowerChanged')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            testing()
            {
                router.push({ name: 'user', params: { id: this.name } })
                this.$emit("theURLChanged")
            },
            notTheUser()
            {
                if (this.name !== localStorage.getItem('username'))
                {
                    return true;
                }
                else return false
            }
        }
    }
</script>
<style scoped>
    .personList{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    }
</style>