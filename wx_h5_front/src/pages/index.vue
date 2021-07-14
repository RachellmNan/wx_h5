<template>
    <div class="index">
        <img src="../assets/img/header.png" class="header"/>
        <div class="btn-group">
            <button class="btn">分享</button>
            <button class="btn btn-primary">充值</button> 
            <button class="btn ">活动详情</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'index',
    mounted(){
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa9045987c27c5cc0&redirect_uri=https%3A%2F%2Fm.abc.com%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
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
</style>