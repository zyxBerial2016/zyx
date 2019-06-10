
//页面加载完成之后立即请求服务端获取数据//注：这里使用原生ajax-get请求
(function(){
  (function(){
    //new 请求创建ajax对象；
    var xhr = new XMLHttpRequest()||new ActiveXObject('Microsoft.XMLHTTP');
    //2.监听ahax状态的改变
    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        //获取业务逻辑
        var res = xhr.responseText;
        //获取请求回来的数据调用业务逻辑函数；
        result(res);
      }
    };
    //3.建立一个get请求
    xhr.open('get','./php/demo.php',true);
    //4.发送http链接
    xhr.send(null);
  })();
  //获取数据后的业务逻辑  //将获取到的数据添加到html中
  function result(res){
    // console.log(res);//返回值带有正斜杠\
    //返回值是字符串类型，通过replace方法去除反斜杠
    var ress = res.replace(/[\\]/g,'')
    // console.log(ress);//成功消除反斜杠
    var result = JSON.parse(ress);
    // console.log(result);成功输出数组
    //获取dom对象class数组集合
    var code = document.getElementsByClassName('code');
    var img_wrap = document.getElementsByClassName('img-wrap'); 
    var title = document.getElementsByClassName('title')
    var subtitle = document.getElementsByClassName('subtitle');
    var price = document.getElementsByClassName('price');
    //获取类名为code的小标为0的元素的ProductPositio属性的值；
    var ProductPositio = code[0].getAttribute('ProductPositio');
    console.log(ProductPositio);//0
    console.log(code);
    //根据获取到的属性值进行赋值
    for(ProductPositio;ProductPositio < code.length;ProductPositio++){
      
      //设置img的src
      img_wrap[ProductPositio].setAttribute("src",result[ProductPositio].img);
      //设置商品的title信息
      $(code[ProductPositio]).children(".title").html(result[ProductPositio].title);
      $(code[ProductPositio]).children(".subtitle").html(result[ProductPositio].subtitle);
      $(code[ProductPositio]).children(".price").html(result[ProductPositio].price);
      //设置商品的href跳转信息;设置跳转的时候带编号过去
      code[ProductPositio].setAttribute("href","./blurb.html?ProductPositio="+ProductPositio);

      // 以下借误不要
      // if(result[ProductPositio].title !== ""|| result[ProductPositio].subtitle !==""||  result[ProductPositio].price !==""){
      //   //设置商品的title显示
      //   title[ProductPositio].innerHTML = result[ProductPositio].title;
      //   //设置商品的副标题
      //   subtitle[ProductPositio].innerHTML = result[ProductPositio].subtitle;
      //   //设置商品的价格信息
      //   price[ProductPositio].children[0].innerHTML = result[ProductPositio].price;
      // }

      
    };
  };
  
})();









//时间多的时候再写一个封装写入方式

//   var params = {
//     "subscript":"下标",
//     "code":"数据",
//     "src":{"src1":"srca1","src2":"srcb2",}
//   };

// function Assign(params){

//   for(params.subscript;params.subscript < params.code.length;params.subscript){
//     params.img_wrap[ProductPositio].setAttribute("src",result[ProductPositio].img);

//   };
// }