//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    item:0,
    tab:0,
    playlist:[{
      id:1,
      title:'玄武之死',
      singer:'黎允文',
      src:'https://isure.stream.qqmusic.qq.com/C400002MIiSk3m0nse.m4a?guid=7583848318&vkey=F7F7D81BA00A03FCA67DE02E947B02D1FE3D1428A06E46DFC5D15A8AFBB8043FF139030D2261874E5844442BE5E89CF61C14AD7522D1C8B5&uin=0&fromtag=66',
      coverImgUrl:'https://y.gtimg.cn/music/photo_new/T002R300x300M000002hjNNE2TooAe.jpg?max_age=2592000'
    },{
      id:2,
      title:'Without U',
      singer:'Sergio',
      src:'https://isure.stream.qqmusic.qq.com/C400004gVyzF0D1PPf.m4a?guid=7583848318&vkey=C00D57CCD855E6D5704D40B9822A50ED0C490648D60D1396A3EBA7E4CEC0ED8AD6DA2DFB0198D63D52A9C14ADE36B24952DA3E2FA6003AC6&uin=1404&fromtag=66',
      coverImgUrl:'https://y.gtimg.cn/music/photo_new/T002R300x300M000003meScq4WJVQ6.jpg?max_age=2592000'
    },{
      id:3,
      title:'美丽的神话',
      singer:'金喜善 (김희선) _ 成龙',
      src:'https://ws.stream.qqmusic.qq.com/C400000k9jj51TOfNy.m4a?guid=7583848318&vkey=93F834E15D82C647D6F70FC2F041A4F14A6DDE88980E937AB8505F2902F29279D8A1AA6A01C993D7FC7383F89F06607886FFF564CB399EC6&uin=1404&fromtag=66',
      coverImgUrl:'https://y.gtimg.cn/music/photo_new/T002R300x300M0000023YRbq0UUpdn.jpg?max_age=2592000'
    },{
      id:4,
      title:'Daisuke',
      singer:'横田商会',
      src:'https://ws.stream.qqmusic.qq.com/C400004NHvoq4bezhA.m4a?guid=7583848318&vkey=A81B529A13DD1495BF9443BDB058643655A3E15076F7C1DD2D0F3A09AD6535DFD7E7FA71377D33F32401A64C01BCDC77F5DC9454BF9702ED&uin=1404&fromtag=66',
      coverImgUrl:'https://y.gtimg.cn/music/photo_new/T002R300x300M000000bdyFf1DKofx.jpg?max_age=2592000'
    },{
      id:5,
      title:'Pokemon Ü',
      singer:'It`s different',
      src:'https://ws.stream.qqmusic.qq.com/C400003ly9LE18HHpK.m4a?guid=7583848318&vkey=95F33B78BD5859D44EB3CCE9E3379E8AD03FC104FD5B82F60C5D943B40028373927B039737FEE4EE3CD1CB2A58FDEFA24469112C88F7D258&uin=1404&fromtag=66',
      coverImgUrl:'https://y.gtimg.cn/music/photo_new/T002R300x300M0000045liZB2NGp3I.jpg?max_age=2592000'
    },{
      id:6,
      title:'Alone',
      singer:'Marshmello',
      src:'https://isure.stream.qqmusic.qq.com/C400001T5sEj19MXkW.m4a?guid=7583848318&vkey=3AFD758874007AA3E8A30220F23AAC19B789BB4787D5CE4497D7AE29C90FA77BB96C2A4FAD0668085755962CD802FD7DFACE3DFDEA119FF9&uin=1404&fromtag=66',
      coverImgUrl:'https://y.gtimg.cn/music/photo_new/T002R300x300M000000SBmte03ICax.jpg?max_age=2592000'
    }
  ],
  state:'paused',
  playIndex:0,
  play:{
    currentTime:'00:00',
    duration:'00:00',
    percent:0,
    title:'',
    singer:'',
    coverImgUrl:'/images/test.jpg'
  }
  },
  audioCtx:null,
  onReady:function(){
    this.audioCtx=wx.createInnerAudioContext();
    var that=this;
    //播放失败检测
    this.audioCtx.onError(function(){
      console.log('播放失败'+that.audioCtx.src);
    })
    //播放完成自动换下一曲
    this.audioCtx.onEnded(function(){
      that.next();
    })
    //自动更新播放进度
    this.audioCtx.onPlay(function(){})
    this.audioCtx.onTimeUpdate(function(){
      that.setData({
        'play.duration':that.formatTime(that.audioCtx.duration),
        'play.currentTime':that.formatTime(that.audioCtx.currentTime),
        'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100
      })
    })
    //默认选择第一曲
    this.setMusic(0);
  },
  formatTime:function(time){
    var minute=Math.floor(time/60)%60;
    var second=Math.floor(time)%60;
    return (minute <10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
  },
  setMusic:function(index){
    var music=this.data.playlist[index];
    this.audioCtx.src=music.src;
    this.setData({
      playIndex:index,
      'play.title':music.title,
      'play.singer':music.singer,
      'play.coverImgUrl':music.coverImgUrl,
      'play.currentTime':'00:00',
      'play.duration':'00:00',
      'play.percent':0
    });
  },
  changeItem:function(e){
    this.setData({
      item:e.target.dataset.item
    })
  },
  changeTab:function(e){
    this.setData({
      tab:e.detail.current
    })
  },
  changePage:function(e){
    this.setData({
      tab:e.currentTarget.dataset.page,
      item:e.currentTarget.dataset.page
    })
  },
  play:function(){
    this.audioCtx.play();
    this.setData({state:'running'})
  },
  pause:function(){
    this.audioCtx.pause();
    this.setData({state:'paused'})
  },
  next:function(){
    var index=this.data.playIndex>=this.data.playlist.length-1 ? 0:this.data.playIndex + 1;
    var that=this;
    this.setMusic(index);
    if(this.data.state==="running"){
      this.play();
    }
    this.audioCtx.onCanplay(function(){
      that.setData({
        'play.duration':that.formatTime(that.audioCtx.duration),
      })
    })
  },
  slideChange:function(e){
    var that=this;
    var second=e.detail.value*this.audioCtx.duration/100;
    this.audioCtx.seek(second);
    this.audioCtx.onSeeked(function(){
      that.setData({
        'play.duration':that.formatTime(that.audioCtx.duration),
        'play.currentTime':that.formatTime(that.audioCtx.currentTime),
        'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100
      })
    })
  },
  change:function(e){
    this.setMusic(e.currentTarget.dataset.index);
    this.play();
  }
})
