
(function(){
  var a=false;
  var b=false;
  $("#num1").blur(function(){
      var num1=$("#num1").val();
      if($(this).val().length == 0) {
          $("#errorname").html("!用户名不能为空");
          a=false;
      }
      else{
          var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
          if(!reg.test($(this).val())) {
              $("#errorname").html("!手机格式不正确");
              a=false;
          }
          else{
              $("#errorname").html("");
              a=true;
          }
      }

    });
  $("#num1").blur(function() {
      if($(this).val().length == 0) {
          $("#errorpassword").html("!密码不能为空");
          b=false;
      }
      else{
          var reg = /^[0-9a-zA-Z]{6,15}$/;
          if(!reg.test($(this).val())) {
              $("#errorpassword").html("6-15个英文字母或数字");
              b=false;
          }
          else{
              $("#errorpassword").html("");
              b=true;
          }
      }
  });
  $("#submit").click(function() {
      var num1=$("#num1").val()
      var num2 = $("#num1").val();
      if(a && b ){
        $.ajax({
    "type":"post",//请求方法
    "url":"./php/index.php",
    "cache":false,
    "data":{"num1":num1,"num2":num2}, 
    "dataType":"json",
    "success":function(res){
      // console.log(res);
      console.log(1111111111111);
      if(res.code == 200){
        alert("登陆成功")
        location.href = "./lenovo.html?id=hualihushaode";
        // window.location.reload()
      }else{
      alert("密码或用户名错误")
      }
    }
    });
  }
  else{
    alert("登陆失败密码或用户名错误");
      return false;
  }
});
})();  







// 注册





  // $(function(){
  //       var a=false;
  //       var b=false;
  //       $("#num1").blur(function(){
  //           var num1=$("#num1").val();
  //           if($(this).val().length == 0) {
  //               $("#errorname").html("!用户名不能为空");
  //               a=false;
  //           }
  //           else{
  //               var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
  //               if(!reg.test($(this).val())) {
  //                   $("#errorname").html("!手机格式不正确");
  //                   a=false;
  //               }
  //               else{
  //                   $("#errorname").html("");
  //                   a=true;
  //               }
  //           }
  //           // $.ajax({
  //           //         "type":"get",  //请求方法
  //           //         "url":"index.php", //请求的地址
  //           //         "cache":false, //false不缓存
  //           //         "data":{"num1":num1}, //请求的参数           // "num1="+num1+"&num2="+num2
  //           //         'dataType':'json', //指定服务器响应的数据类型
  //           //         "success":function(res){ //success成功回调函数  res是后台响应回来的值
  //           //             console.log(res);
  //           //         },
                 
  //           //  });
    
  //       });
  //       $("#num2").blur(function() {
  //           if($(this).val().length == 0) {
  //               $("#errorpassword").html("!密码不能为空");
  //               b=false;
  //           }
  //           else{
  //               var reg = /^[0-9a-zA-Z]{6,15}$/;
  //               if(!reg.test($(this).val())) {
  //                   $("#errorpassword").html("6-15个英文字母或数字");
  //                   b=false;
  //               }
  //               else{
  //                   $("#errorpassword").html("");
  //                   b=true;
  //               }
  //           }
  //       });
  //       $("#submit").click(function() {
  //         // _this.prop('disabled',true);
  //           // var submit=$("#submit").val();
  //            var num1=$("#num1").val()
  //           var num2 = $("#num2").val();
  //           if(a && b ){
  //             $.ajax({
  //         "type":"post",//请求方法
  //         "url":"index.php",
  //         "cache":false,
  //         "data":{"num1":num1,"num2":num2}, 
  //         "dataType":"json",
  //         "success":function(res){
  //           // _this.prop('disabled',false);
  //           // 不传data过去的操作
  //           // for(var i = 0;i < res.length;i++){
  //           //   if(res[i].account == num1 && res[i].password == num2){
  //           //     $("#bug1").css("display","none");
  //           //     alert("登陆成功");
  //           //     break;
  //           //   }else{
  //           //     $("#bug1").css("display","block");
  //           //   }
  //           // }
  //           //传data过去的操作
  //           console.log(res);
  //           console.log(res);
  //           if(res.code == 200){
  //             $("#bug1").css("display","none");
  //             location.href = "http://www.baidu.com";
  //           }else{
  //             $("#bug1").css("display","block");
  //           }
  //         }
  //         // beforeSend:function(){
  //         //   $("#denglu").html('登录中...');
  //         //   dlzt = layer.load(2,{
  //         //     shade:[0.5,'#ccc'],//0.1透明度的白色背景
  //         //     shadeClose:true
  //         //   });
  //         // },
  //         // complete:function(){
  //         //   $("#denglu").html("登陆");
  //         //   _this.css("background-color","#0505f3");
  //         //   layer.close(dlzt);
  //         // }
  //         });
  //       }
  //     });



                // $("form").submit();
          //     $.ajax({
          //       "type":"get",//请求方法
          //       "url":"./index.php",
          //       "cache":false,
          //       "data":{"num1":num1,"num2":num2}, 
          //       "dataType":"json",
          //       "success":function(res){
          //           // _this.prop('disabled',false);
          //           // console.log(res);
          //           console.log(1);
          //           if(res.code == 200){
          //             location.href = "./zhuche.html";
          //           }else{
          //             $("#bug1").css("display","block");
          //           }
          //         }
          //       });
          //   }else{
          //     alert("登陆失败");
          //     return false;
          
        
    });    
    
