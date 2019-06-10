  
  //监控滚动条
  (function(){
    $(window).scroll(function(){//滚动事件获取//判断滚动条高度
      var $scroll = $(document).scrollTop();
      if($scroll>0){//判断滚动条高度
        $(".header_box").css("display","none");
        $(".header_boxs").css("display","block");

      }else{
        $(".header_box").css("display","block");
        $(".header_boxs").css("display","none");
      }
  })
  })();
  //搜索框显隐切换
  (function(){
    $("#header_boxs").css("display","none");
    $("#search").on("click",function(){
      $("#header_box").hide();//渐渐隐藏
      $("#header_boxs").fadeTo(1000,1);//隐藏到出现
    });
    $("#searchs").on("click",function(){
      $("#header_box").fadeTo(1000,1);//
      $("#header_boxs").hide();;
    })
  })();
  
  
  
  
  (function(){
    //获取编辑的文章id，用于后续接口请求
    var search =  location.search
    // console.log(search);//?ProductPositio=0
    //使用正则获取search值的数字
    var reg = /\d+/;
    //使用match方法获取值，返回一个数组类
    var arr = search.match(reg),
    id = arr[0];//0
    // console.log(id);//0;
    //发送ajax请求返回数字到网页中;
    PromiseAjax({
      "method":"post",
      "url":"./php/blurb.php"
    }).then(function(res){
      var ress = res.replace(/^[\\]/g,'')
      var result = JSON.parse(ress);
      // 定义全局变量，防止变量提升
      var colorid;//记录商品【颜色】信息，
      colorid ?colorid:colorid = 0;
      var _me = this;
      var spec_meid;//记录商品【内存】信息，
      spec_meid?spec_meid:spec_meid = 0;
      var nc_index;//用于记录内存选项被点击时的下标
      var value;
          value?value:value = result[id].price*1;
      var titles,imgs,addprice,number;
      var bx_index,js_index,baoxian,tuijian;
      // baoxian?baoxian:baoxian = 0;
      // tuijian?tuijian:tuijian = 0;
      //默认初始价格----------------------！
      var price = document.getElementById("price");
      var prices ;//初始金额
      var pri_s;//产品数量
      var js_price;//记录推荐选件的金额
      var bx_price;//记录保险的金额
      var total_price;//记录总价格
      total_price?total_price:total_price = value;
      prices = result[id].price;//初始金额=====存储初始金额======================
      //设置默认价格--------------------------------------------------------------------
      price.innerHTML = result[id].price;

      //内存的class
      var spec_me = document.getElementsByClassName('spec_me');
      //返回值是字符串类型，通过replace方法去除反斜杠
      
      //
      var title =document.getElementsByClassName('title');
      //选择颜色
      var item_color = document.getElementsByClassName('item_color');
      //限量版本，预约信息倒计时、、截至时间
      var des = document.getElementsByClassName('des');
      //限量版本，预约信息倒计时、、定时器倒计时
      var djs = document.getElementsByClassName('djs');
      //6张小图
      var img_wrap = document.getElementsByClassName('img-wrap');
      //促销信息的div
      var sales_con = document.getElementsByClassName('sales_con');
      //赠品的class
      var item_zp_img = document.getElementsByClassName('item_zp_img');
      var item_zp_text= document.getElementsByClassName('item_zp_text');
      // <!-- 推荐服务/保险选项的class -->
      var service_name = document.getElementsByClassName('service_name');
      var service_price = document.getElementsByClassName('service_price');
      //推荐选件选择------------------读取信息到dom里面
      var text_normal = document.getElementsByClassName('text_normal');
      var item_big_img = document.getElementsByClassName('item_big_imgb');
      var tjxj_price = document.getElementsByClassName('tjxj_price');
      var tjxj_price_js = document.getElementsByClassName('tjxj_price_js');
      // var item_js =document.getElementsByClassName('item_js');
      var js_box = document.getElementsByClassName('js_box');
      var bx_box = document.getElementsByClassName('bx_box');
      //2、设置商品的副标题
      $(".subtitle").text(result[id].subtitle);
      //3、设置促销信息
      var str = ``;
        //判断促销信息的条数  pa pb有数据pc pd为空时；
        if(result[id].pb !== "" && result[id].pc == ""){
          str = `
        <div id="pc_promotion">
          <p>
            <span style="color:rgb(255,0,0)">${result[id].pa}</span>
          </p>
          <p style="text-indent:20px">
            <span style="color:rgb(255,0,0)">${result[id].pb}</span>
          </p> 
        </div>
        `;
        };
        //判断促销信息的条数  pa pb pc有数据pd为空时；
        if(result[id].pc !== "" && result[id].pd == ""){
          str = `
        <div id="pc_promotion">
          <p>
            <span style="color:rgb(255,0,0)">${result[id].pa}</span>
          </p>
          <p style="text-indent:20px">
            <span style="color:rgb(255,0,0)">${result[id].pb}</span>
          </p>
          <p style="text-indent:20px">
            <span style="color:rgb(255,0,0)">${result[id].pc}</span>
          </p>  
        </div>
        `;
        };
        //判断促销信息的条数  pa pb pc pd都有有数据时；
        if(result[id].pd !== ""){
          str = `
        <div id="pc_promotion">
          <p>
            <span style="color:rgb(255,0,0)">${result[id].pa}</span>
          </p>
          <p style="text-indent:20px">
            <span style="color:rgb(255,0,0)">${result[id].pb}</span>
          </p>
          <p style="text-indent:20px">
            <span style="color:rgb(255,0,0)">${result[id].pc}</span>
          </p>
          <p>
            <span style="color:rgb(255,0,0)">${result[id].pd}</span>
          </p>  
        </div>
        `;
        };
      sales_con[id].innerHTML = str;

      //4、赠品
      item_zp_img[id].setAttribute("src",result[id].item_zp_img);//图片的src
      item_zp_text[id].innerHTML = result[id].item_zp_text;//title内容
      item_zp_text[id].setAttribute("title",result[id].item_zp_text);//title信息
    
      //5、闪购信息与颜色选择绑定出现
      des[id].innerHTML = result[id].des;
      djs[id].innerHTML = result[id].djs;
      //6、【 颜色选择 】
        for( var item_colors = 0;item_colors <item_color.length;item_colors++){
          item_color[item_colors].innerHTML = result[item_colors].color;
        };
        //---页面渲染判断给【那个颜色加边框】--------------------促销闪购信息只有1、3配置有
        if(result[id].colorid == 0){
          $("#item_colora").addClass('redboder');//一开始是黑色有红边框
          $(".des").css("display","none");//初始状态默认是none
          $(".djs").css("display","none");//初始状态默认是none
        }else{
          $("#item_colorb").addClass('redboder');//被点击后colorid的值被修改为1-----重载页面变为蓝色有
          $(".des").css("display","block");//初始状态默认是none
          $(".djs").css("display","block");//初始状态默认是none
        }

      //颜色选择----哪个按钮被点击就给哪个按钮添加红色边框，另外的按钮消除边框
      $("#item_colora").on('click',function(){
        $("#item_colora").toggleClass('redboder');
        $("#item_colorb").removeClass('redboder');
        colorid = 0;//改变值保存状态
        // $.post('./php/blurb_edit.php',{"colorid": colorid,"spec_meid": spec_meid,"id":id},function(res){
        //   if(res.code == 200){
        //     location.reload();
        //   }
        // },'json');
        //更换图片
        for(var img_wrapsa = 0 ,img_wrapsas = id;img_wrapsa < img_wrap.length;img_wrapsa++){
          img_wrap[img_wrapsa].setAttribute("src",result[img_wrapsas].imga);
          img_wrapsas++;
        };
        //大图控制，首次默认第一个
        $("#img_max").attr('src',result[id].imgmaxa);
        $(".demo_li_list").on("click",function(){
          $("#img_max").attr('src',result[$(this).index()].imgmaxa);
        });

        //1、黑色默认标题
        $(".title").text(result[spec_meid].titlea);
      });
      // 蓝色被点击后出现闪购信息，通过colorid的值判断重载默认无---闪购信息---        哪个按钮被点击就给哪个按钮添加红色边框，另外的按钮消除边框
      $("#item_colorb").on('click',function(){
        $("#item_colorb").toggleClass('redboder');
        $("#item_colora").removeClass('redboder');
        colorid = 4;//改变值保存状态
        
        // $.post('./php/blurb_edit.php',{"colorid": colorid,"spec_meid": spec_meid,"id":id},function(res){
        
        // },'json');
        //更换图片
        for(var img_wrapsb = 0 ,img_wrapsbs = id;img_wrapsb < img_wrap.length;img_wrapsb++){
          img_wrap[img_wrapsb].setAttribute("src",result[img_wrapsbs].imgb);
          img_wrapsbs++;
        };
        //大图控制，首次默认第一个
        $("#img_max").attr('src',result[spec_meid].imgmaxb);
        $(".demo_li_list").on("click",function(){
          $("#img_max").attr('src',result[$(this).index()].imgmaxb);
        });

        //2、蓝色色默认标题
        $(".title").text(result[spec_meid].titleb);
      });
        //给页面放入信息-------img_wrapsa/b:class的下标0---------img_wrapsas/bs：获取id的得到数据库的下标--------------------------------
        if(colorid == 0){
          for(var img_wrapsa = 0 ,img_wrapsas = id;img_wrapsa < img_wrap.length;img_wrapsa++){
            img_wrap[img_wrapsa].setAttribute("src",result[img_wrapsas].imga);
            img_wrapsas++;
          };
          //大图控制，首次默认第一个
          $("#img_max").attr('src',result[id].imgmaxa);
          $(".demo_li_list").on("click",function(){
            $("#img_max").attr('src',result[$(this).index()].imgmaxa);
          });

          //1、黑色默认标题
          $(".title").text(result[spec_meid].titlea);
        }else{
          for(var img_wrapsb = 0 ,img_wrapsbs = id;img_wrapsb < img_wrap.length;img_wrapsb++){
            img_wrap[img_wrapsb].setAttribute("src",result[img_wrapsbs].imgb);
            img_wrapsbs++;
          };
          //大图控制，首次默认第一个
          $("#img_max").attr('src',result[id].imgmaxb);
          $(".demo_li_list").on("click",function(){
            $("#img_max").attr('src',result[$(this).index()].imgmaxb);
          });

          //2、蓝色色默认标题
          $(".title").text(result[spec_meid].titleb);
        }

      
      //内存项目选择-------------------------------------------------------------------
      
      //内存选择
      for(var spec_mes = 0;spec_mes < spec_me.length;spec_mes++){
        spec_me[spec_mes].innerHTML = result[spec_mes].spec_me;
      };
      //页面渲染---判断给那个【内存选项】选择加红色边框
      if(result[id].spec_meid == 0){
        spec_me[0].classList.add("redboder");
      };
      if(result[id].spec_meid == 1){
        spec_me[1].classList.add("redboder");
      };
      if(result[id].spec_meid == 2){
        spec_me[2].classList.add("redboder");
      };
      if(result[id].spec_meid == 3){
        spec_me[3].classList.add("redboder");
      };

      $(".spec_me").on('click',function(){
        
        //点击则获得红色选取边框class属性
        $(this).addClass("redboder");
        $(this).siblings().removeClass("redboder");
        //获取被点击的内存配置类型，计算总价格
        // //同时修改页面顶部title
        if($(this).index() == 1){
          $("#price_data").text(1);
          if(baoxian){
            value = result[id].price*1 + bx_price;
          }
          if(tuijian){
            value = result[id].price*1 + js_price;
          }
          if(baoxian && tuijian){
            value = result[id].price*1 + bx_price + js_price;
          }else{
            value = result[id].price*1
          }
          //保存单价
          total_price = value;
          $("#price").text(value);//不同的内存----不同的价格赋值给

          $('#into_jss').removeClass("hidden");//移除推荐选项class【显示推荐选择】

          nc_index = $(this).index();//把值暂存给nc_index 计算后再赋值
          spec_meid = (nc_index -1);//内存选项被点击后，保存被点击的信息---spec_meid ==== 0

          if(colorid == 0){
            $(".title").text(result[spec_meid].titlea)[id];//【更换页面黑色标题】
          }else{
            $(".title").text(result[spec_meid].titleb)[id];//【更换页面黑色标题】
          }
          
          // $.post('./php/blurb_edit.php',{"colorid": colorid,"spec_meid": spec_meid,"id":id},function(res){
          //   if(res.code == 200 || res.code == -1){
          //     location.reload();
          //   }
          // },'json');
        };
        if($(this).index() == 2){
          $("#price_data").text(1);
          if(baoxian){
            value = result[id].price*1 + result[Number(id)+1].price*1 +  bx_price;
          }
          if(tuijian){
            value = result[id].price*1 + result[Number(id)+1].price*1 +  js_price;
          }
          if(baoxian && tuijian){
            value = result[id].price*1 + result[Number(id)+1].price*1 +  bx_price + js_price;
          }else{
            value = result[id].price*1 + result[Number(id)+1].price*1
          }
           //保存单价
          total_price = value;
          $("#price").text(returnFloat(value));//不同的内存----不同的价格赋值给
          $('#into_jss').addClass("hidden");//给推荐选项添加class【隐藏推荐选择】

          nc_index = $(this).index();//把值暂存给nc_index 计算后再赋值
          spec_meid = (nc_index -1);//内存选项被点击后，保存被点击的信息---spec_meid ==== 1

          if(colorid == 0){
            $(".title").text(result[spec_meid].titlea)[id];//【更换页面黑色标题】
          }else{
            $(".title").text(result[spec_meid].titleb)[id];//【更换页面黑色标题】
          }
          //发送存储请求并重新渲染页面
          // $.post('./php/blurb_edit.php',{"colorid": colorid,"spec_meid": spec_meid,"id":id},function(res){
          //   if(res.code == 200 || res.code == -1){
          //     location.reload();
          //   }
          // },'json');
        };
        if($(this).index() == 3){
          $("#price_data").text(1);
          if(baoxian){
            value = result[id].price*1 + result[Number(id)+2].price*1 +  bx_price;
          }
          if(tuijian){
            value = result[id].price*1 + result[Number(id)+2].price*1 +  js_price;
          }
          if(baoxian && tuijian){
            value = result[id].price*1 + result[Number(id)+2].price*1 +  bx_price + js_price;
          }else{
            value = result[id].price*1 + result[Number(id)+2].price*1
          }
          // 保存单价
          total_price = value;
          $("#price").text(returnFloat(value));///不同的内存----不同的价格赋值给

          $('#into_jss').removeClass("hidden");//移除推荐选项class【显示推荐选择】

          nc_index = $(this).index();//把值暂存给nc_index 计算后再赋值
          spec_meid = (nc_index -1);//内存选项被点击后，保存被点击的信息---spec_meid ==== 2

          if(colorid == 0){
            $(".title").text(result[spec_meid].titlea)[id];//【更换页面黑色标题】
          }else{
            $(".title").text(result[spec_meid].titleb)[id];//【更换页面黑色标题】
          }

          //发送存储请求并重新渲染页面
          // $.post('./php/blurb_edit.php',{"colorid":colorid,"spec_meid":spec_meid,"id":id},function(res){
          //   if(res.code == 200 || res.code == -1){
          //     location.reload();
          //   }
          // },'json');
        };
        if($(this).index() == 4){
          $("#price_data").text(1);
          if(baoxian){
            value = result[id].price*1 + result[Number(id)+3].price*1 +  bx_price;
          }
          if(tuijian){
            value = result[id].price*1 + result[Number(id)+3].price*1 +  js_price;
          }
          if(baoxian && tuijian){
            value = result[id].price*1 + result[Number(id)+3].price*1 +  bx_price + js_price;
          }else{
            value = result[id].price*1 + result[Number(id)+3].price*1
          }
          // 保存单价
          total_price = value;
          $("#price").text(returnFloat(value));///不同的内存----不同的价格赋值给

          $('#into_jss').addClass("hidden");//给推荐选项添加class【隐藏推荐选择】

          nc_index = $(this).index();//把值暂存给nc_index 计算后再赋值
          spec_meid = (nc_index -1);//内存选项被点击后，保存被点击的信息---spec_meid ==== 3

          if(colorid == 0){
            $(".title").text(result[spec_meid].titlea)[id];//【更换页面黑色标题】
          }else{
            $(".title").text(result[spec_meid].titleb)[id];//【更换页面黑色标题】
          }

           //发送存储请求并重新渲染页面
          // $.post('./php/blurb_edit.php',{"colorid":colorid,"spec_meid":spec_meid,"id":id},function(res){
          //   if(res.code == 200 || res.code == -1){
          //     location.reload();
          //   }
          // },'json');
        };
      });
      
      //<!-- 保险选项放到dom中 -->------------------------------------------
      for(var service_prices = 0;service_prices < service_name.length;service_prices++){
        service_name[service_prices].innerHTML = result[service_prices].service_name;
        service_price[service_prices].innerHTML = result[service_prices].service_price;
      }
      
      $(".bx_box").on('click',function(){
        //点击则获得红色选取边框class属性
        $(this).addClass("redboder");
        $(this).siblings().removeClass("redboder");
        if($(this).index == 1){
          bx_index = $(this).index;
          baoxian = (bx_index - 1);

          bx_price = result[baoxian].service_price;
        }
        if($(this).index == 2){
          bx_index = $(this).index;
          baoxian = (bx_index - 1);

          bx_price = result[baoxian].service_price;
        }
      });
      //<!-- 推荐选件选择a --------------------------------------------------------->
      for(var spec_mes = 0;spec_mes <text_normal.length;spec_mes++){
        text_normal[spec_mes].innerHTML = result[spec_mes].text_normal;
        item_big_img[spec_mes].setAttribute("src",result[spec_mes].item_big_img);
        tjxj_price[spec_mes].innerHTML = result[spec_mes].tjxj_price;
        tjxj_price_js[spec_mes].innerHTML = result[spec_mes].tjxj_price_js;
      };
      
      $(".js_box").on('click',function(){
        //点击则获得红色选取边框class属性
        $(this).addClass("redboder");
        $(this).siblings().removeClass("redboder");
        if($(this).index == 1){
          js_index = $(this).index;
          tuijian = (js_index - 1);

          js_price = result[tuijian].tjxj_price;
        }
        if($(this).index == 2){
          js_index = $(this).index;
          tuijian = (js_index - 1);

          js_price = result[tuijian].tjxj_price;
        }
        if($(this).index == 3){
          js_index = $(this).index;
          tuijian = (js_index - 1);

          js_price = result[tuijian].tjxj_price;
        }
      });

      //设置默认情况下购物车的数量-------------------------------
      
      $("#price_data").text(1);
      $("#price_minus").on('click',function(){
        pri_s = parseInt($("#price_data").text());
        pri_s -= 1;
        if(pri_s < 1){
          pri_s = 1;
          $("#price_data").text(pri_s);
        }else{
          $("#price_data").text(pri_s);
          total_price -= value;
          $("#price").text(returnFloat(total_price));
        }
      });
      $("#price_add").on('click',function(){
        pri_s = parseInt($("#price_data").text());
        pri_s += 1;
        if(pri_s > result[id].maxnum){
          alert(`此产品限购${result[id].maxnum}`);
          pri_s = result[id].maxnum;
          $("#price_data").text(pri_s);
          
        }else{
          $("#price_data").text(pri_s);
          total_price += value;
          $("#price").text(returnFloat(total_price));
        }
      });

      // total_price = prices;

      // price.innerText = total_price;

    /* 本地存储存商品的格式：
    [{"id":1,"price":100,"number":2},{},{},..] 
    加入购物车*/
    // var number = parseInt($("#price_data").text());
    // var addprice =  parseInt(price.innerHTML);

    

    console.log(value);
    $("#blurb_carlist").on('click',function(){
      titles = $(".title").text();//标题
      imgs = $(".img-wrap").attr("src");//图片路径
      // addprice =  parseFloat($("#price").text());
      number = parseFloat($("#price_data").text());
      //商品加入购物车
      goods = {"id":spec_meid+colorid,"title":titles,"price":value,"number":number,"img":imgs,"value":value,"maxnum":result[id].maxnum};
      var car = new Car();
      car.addCar(goods);//加入购物车
      window.open("./Carlist.html?id="+spec_meid );
    })
    
      //四舍五入强制保留两位小数方法：
      
      function returnFloat(value){
        var value= (Math.round(parseFloat(value)*100)/100);
        var xsd=value.toString().split(".");
        if(xsd.length==1){
        value=value.toString()+".00";
        return value;
        }
        if(xsd.length>1){
          if(xsd[1].length<2){
          value=value.toString()+"0";
          }
          return value;
        }
      }
    });
  })();
  


