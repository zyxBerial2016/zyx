//导航区开始
//弹出隐藏的搜索框
$('.icon_d').click(function () {
  $('.nav_l').hide();
  $('.search').fadeTo('show',0.6);
  });
//隐藏搜索框
$('.icn_a').click(function () {
  $('.search').hide();
  $('.nav_l').fadeTo('show',0.6);
  });
/*——————————————————————————————————————————————————————————————————————————————————————————————*/
//一级导航划过
$('.nav_a').children().hover(function(){
  $('.nn_nav').css('display','block');
},function(){
  $('.nn_nav').css('display','none');
})//第一个

//二级导航小标题划过
$('.nn_nav').hover(function(){
  $(this).css('display','block');
},function(){
  $(this).css('display','none');
})

$('.nn_nav_1').children().hover(function(){
  $(this).parent().siblings().css('display','none');
  $(this).parent().siblings().eq($(this).index()).css('display','block');
},function(){

})
/* ———————————————————————————————————————————————————————————————————————————— */
// 主体内容导航
$('.ico_l').mouseover(function(){
  //console.log($(this).parent().parent().index());
  var ff = $(this).parents('.show_1').find('.x_show');
  ff.eq($(this).parent().parent().index()).css('display','block').parent().siblings().children(".x_show").css('display','none');
})
/*———————————————————————————————————————————————————————————————————————————————*/
//气球消失动画
$(function(){
  setTimeout(function(){
  $('.balloon').fadeOut();
  },2000)
  });
/*———————————————————————————————————————————————————————————————————————————————*/
//轮播图开始
var index = 0;
//定时器，每2秒执行1次
var timer = setInterval(autoPlay,1500);

// banner轮播图
function autoPlay(){
  index++;
  $("#imgbox > li").eq(index).fadeIn().siblings().fadeOut();
  $("ol > li").eq(index).addClass('current').siblings().removeClass('current');
  //判断下标是否越界
  if(index == $("#imgbox > li").length - 1){
    index = -1; 
  }
}
// 左箭头翻页
$(".btn_l").click(function(){  
  clearInterval(timer);
  index -=2;
  // console.log(index);
  if(index ==-11){
    index=7;
  }
  autoPlay();
});

// 右箭头翻页
$(".btn_r").click(function(){   
  clearInterval(timer);
  //console.log(index);
  if(index ==9){
    index=0;
  }
  autoPlay();
});

//鼠标划过图片画面静止。
$("#imgbox").hover(function(){
  //1.静止轮播图 2、获取当前对应的index索引显示对应的图片
  clearInterval(timer);
},function(){
  //开启定时器
  timer = setInterval(autoPlay, 1500);
});

//鼠标划过指定小圈
$("ol > li").hover(function(){
  //鼠标悬浮
  //轮播图不可以在走动，清除定时器
  clearInterval(timer);
  //获取当前所在的索引
  index = $(this).index() -1;
  autoPlay();
}),(function(){
  timer = setInterval(autoPlay,1500);
});

/*——————————————————————————————————————————————————————————————————————————————————————————————*/