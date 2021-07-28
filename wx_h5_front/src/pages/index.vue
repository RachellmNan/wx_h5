<template>
    <div class="index">
        <img src="../assets/img/header.png" class="header"/>
        <div class="user" v-if="Userinfo ">{{Userinfo.nickname}}</div>
        <div class="btn-group">
            <button class="btn">分享</button>
            <button class="btn btn-primary">充值</button> 
            <button class="btn ">活动详情</button>
        </div>
    </div>
</template>

<script>
import API from '../api'
export default {
    name:'index',
    data(){
        return {
            Userinfo:null
        }
    },
    methods:{
        async getUserInfo(){
            let res = await this.axios.get(API.getUserInfo)
            this.Userinfo = res.data
        },
        async getJsSdk(){
            await this.axios.get(`/api/wechat/jssdk?url=${location.href}`)
        }
    },
    mounted(){
        if(this.$cookie.get('openid')){
            this.getUserInfo()
        }
    }
}
</script>

<style>
.index{
    background: #ffc93a;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.header{
    width: 100%;
    height: 6.24rem;
}
.btn-group{
    padding-top: .34rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.user{
    text-align: center;
    font-size: .4rem;
}
</style>