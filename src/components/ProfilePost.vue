<template>
    <div>
        <div class=" pading" id="pading">
            <!-- <img class ="img" src="https://images.unsplash.com/photo-1573378905544-246a32f9ab6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"> -->
            <img @click="$emit('myEvent',url)" class="img" :src="url"> 
            <!-- emit an evnt and list to it at profile to request the comments and otherr data -->
            <hr id="hrID">
            <p class="lead none">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>

        </div>
    </div>
</template>
<script>
export default {
    name: "Profile-Post",
    props:['url','caption'],
}
</script>
<style scoped>
 .img{
        /* padding-right: 10px;
        padding-left: 10px; */
        width: 100%;
        /* height: 500px; */
        /* align-items: center; */
        margin-bottom: 10px;
        border-radius: 5px;
    }
    #pading{
        padding: 2rem;
        background-color: #EFF4F7;
         box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 5px;
        margin-bottom: 25px; 
    }
    .none
    {
        text-align: left;
        font-size: 1.0rem;
        /* line-height: 1px; */
    }
    #hrID{
        /* margin-top:  */
    }

</style>