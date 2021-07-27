<template>

  <div id="app">
    this is app
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/css/common.css'
import './assets/css/base.css'
import API from './api'
import wx from 'weixin-js-sdk'
import util from './utils'
export default {
  name: 'App',
    methods:{
      // 检查用户是否授权过
      async checkUserAuth(){
          console.log('22')
          let openid = this.$cookie.get('openid')
          if(!openid){
              window.location.href = API.wechatRedirect
          }else{
              this.getWechatConfig()
          }
      },
      // 获取微信配置信息
      getWechatConfig(){
          console.log('进入config')
        //   this.axios.get(API.wechatConfig+'?url='+location.href.split('#')[0]).then((response)=>{
        //       let res = response.data
        //       if(res.code == 0){
        //           let data = res.data
        //           wx.config({
        //               debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //               appId: data.appId, // 必填，公众号的唯一标识
        //               timestamp: data.timestamp, // 必填，生成签名的时间戳
        //               nonceStr: data.nonceStr, // 必填，生成签名的随机串
        //               signature: data.signature,// 必填，签名
        //               jsApiList: data.jsApiList // 必填，需要使用的JS接口列表
        //           });
        //           wx.ready(()=>{
        //               util.initShareInfo()
        //           })
        //       }
        //   })
      } 
    },
    mounted(){
        this.checkUserAuth()
        // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa9045987c27c5cc0&redirect_uri=http%3A%2F%2Fm.imooc.com%2F%23%2Ftest&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
    }
}
</script>

<style>

</style>
