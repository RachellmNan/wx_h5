export default {
    initShareInfo(wx){
        let shareInfo = {
            title:'分享和支付课程',
            desc: '欢迎学习分享和支付课程',
            link: 'http://m.imooc.com/#/index',
            imgUrl: ''
        }
        wx.onMenuShareTimeline(shareInfo)
        wx.onMenuShareAppMessage(shareInfo)
        wx.onMenuShareQQ(shareInfo)
        wx.onMenuShareQZone(shareInfo)
        // wx.updateAppMessageShareData(shareInfo)
        // wx.updateTimelineShareData(shareInfo)
        // wx.chooseWXPay(shareInfo)
    }
}