$(function(){
        var a=false;
        var b=false;
        var c=false;
        
        $("#username").blur(function(){
            if($(this).val().length == 0) {
                $("#errorname").html("手机号不能为空");
                a=false;
            }
            else{
                var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
                if(!reg.test($(this).val())) {
                    $("#errorname").html("手机格式不正确");
                    a=false;
                }
                else{
                    $("#errorname").html("");
                    a=true;
                }
            }
        });
        $("#password").blur(function() {
            if($(this).val().length == 0) {
                $("#errorpassword").html("密码不能为空");
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
        $("#confirm").blur(function() {
            if($(this).val().length == 0) {
                $("#errorconfirm").html("");
                c=false;
            }
            else {
                if($(this).val() != $("#password").val()) {
                    $("#errorconfirm").html("与密码输入不一致");
                    c=false;
                }
                else {
                    $("#errorconfirm").html("");
                    c=true;
                }
            }
            });
        $("#submit").click(function() {
            var username=$("#username").val();
            var password=$("#password").val();
            if(a && b && c ){
                $("form").submit();
                $.ajax({
          "type":"post",//请求方法
          "url":"./php/zhuche.php",
          "cache":false,
          "data":{"username":username,"password":password}, 
          "dataType":"json",
          "success":function(res){
            console.log(res);
            console.log(res);
            if(res.code == 0){

            }else{
                alert("该用户已被注册")
            }
            if(res.code == 200){
              
              location.href = "";
            }else{
              alert("注册成功")
              location.href="./lenovo.html?v=hualihushuaode"
            }
          }
          });
            }
            else{
                alert("验证不通过");
                return false;
            }
        });
    });


  
    