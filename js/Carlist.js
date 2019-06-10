
    (function(){

      var totalPrice,totalPrice_All,onSale,stosck,minus,add,value,value_all,goods,ids,idss,maxnum,thisValue;

      //本地存储商品的格式：[{"id":1,"parice":100,"number":2},{}{}...]
      //获取购物车商品的数据
      var car = new Car();
      var cartlist = car.getCar();
      //循环拼接tr便签
      var str = ``;
      for(var i = 0;i < cartlist.length;i++){
        str += `<tr id ="${cartlist[i].id}" class="tr_active" gcode="" stock="264">
                  <td width="57" class="td_sel"><a herf="javascript:;"></a></td>
                  <td width="148" class="tr_img">
                    <a herf="javascript:;"></a>
                    <img class= "td_img" src =${cartlist[i].img} title=${cartlist[i].title}/>
                  </td>
                  <!--商品-->
                  <td width="257" class="tr_title" style="text-align:left">
                    <a href ="javascript:;">${cartlist[i].title}</a>
                    <div class="fuwu">&nbsp;购买联想服务</div>
                  </td>
                  <!--规格-->
                  <td width="163" class="tr_speci" >
                  <!--单价-->
                  <td width="152" style="position:relative" class="td_prices">
                    <span class="price_dj">${cartlist[i].value}</span>
                  </td>
                  <!--数量-->
                  <td width="152">
                    <label class="but_box clearfix">
                      <input class= "but_minus" type="button" value="-">
                      <input id ="price_values" class="price_value" value = "${cartlist[i].number}" type="text" > 
                      <!-- <span>${cartlist[i].number}</span> style="ime-mode:disabled" -->
                      <input class= "but_add" maxnum = "${cartlist[i].maxnum}" type="button" value="+">
                    </label>
                  </td>
                  <!--总金额-->
                  <td width="152" class="price_zje">${returnFloat(cartlist[i].number*cartlist[i].value)}</td>
                  <td width="117" style="text-align:left">
                    <a href="javascript:;" class="price_btn btn-danger" onclick="delCar(${cartlist[i].id})">删除</a>
                    <a href="javascript:;" class="shoucang">移入收藏夹</a>
                  </td>
                </tr>`;       
                // document.getElementById('price_values').setAttribute("value",cartlist[i].number);
                // $("#price_values").attr("value",cartlist[i].number);
      }
      
      //把str放到tbody里面
      $("#tbody").html(str);
      //汇总总价格
      updatePrice();

      //处理点击事件逻辑
      (function(){
        //减号被点击时的逻辑-------------------------------------------------------------
        $('.but_minus').on('click',function(){
          //拿到id
          ids = $(this).parent().parent().parent().attr('id');
          idss = Number(ids);
          //拿到单价
          value = $(this).parent().parent().prev().children('span').text();//父级的父级的上一个兄弟的span子元素的文本，顺藤摸瓜，拿到金额--单价
          //拿到总金额
          $(this).parent().parent().next().text();//父级的父级的下一个兄弟的文本
          //拿到当前的金额数字
          minus = $(this).next().attr('value');
          minus--;
          if(minus <  1){
            minus = 1;
            $(this).next().attr('value',minus);
            value_all = returnFloat(value*minus);
            $(this).parent().parent().next().text(value_all);//更新总金额
          }else{
            $(this).next().attr('value',minus);
            value_all = returnFloat(value*minus);
            $(this).parent().parent().next().text(value_all);//更新总金额
            goods = {
              "id":idss,"number":1
            };
            car.removeCar(goods);//保存减减后的产品数量
          }
          if(minus >= 1){
            updatePrice();//更新总价格
          }
        });

        //加号被点击时的逻辑----------------------------------------------------------------
        $('.but_add').on('click',function(){
          //拿到id
          ids = $(this).parent().parent().parent().attr('id');
          idss = Number(ids);
          //拿到单价
          value = $(this).parent().parent().prev().children('span').text();//父级的父级的上一个兄弟的span子元素的文本，顺藤摸瓜，拿到金额--单价
          //拿到总金额
          $(this).parent().parent().next().text();//父级的父级的下一个兄弟的文本
          //拿到当前产品的限购数量
          maxnum = $(this).attr('maxnum');
          
          //拿到当前的金额数字
          add = $(this).prev().attr('value');
          add++;
          if(add > maxnum){
            add = maxnum;
            alert(`此产品限购${add}`)
            $(this).prev().attr('value',add);
            value_all = returnFloat(value*add);
            $(this).parent().parent().next().text(value_all);//更新总金额
          }else{
            $(this).prev().attr('value',add);
            value_all = returnFloat(value*add);
            $(this).parent().parent().next().text(value_all);//更新总金额
            goods = {
              "id":idss,"number":1
            };
            car.addCar(goods);//保存减减后的产品数量
          }
          if(add <= maxnum){
            updatePrice();//更新总价格
          }
        });

        //手动输入价格时的逻辑---------------------------------------------------
        $("#price_values").blur(function(){
          //拿到id
          ids = $(this).parent().parent().parent().attr('id');
          //拿到单价
          value = $(this).parent().parent().prev().children('span').text();//父级的父级的上一个兄弟的span子元素的文本，顺藤摸瓜，拿到金额--单价
          //拿到当前产品的限购数量
          maxnum = $(this).next().attr('maxnum');
          //拿到自己的值;
          thisValue =  $(this).val();
          console.log(maxnum);
          if(thisValue > maxnum){
            alert(`此商品限购数量为${maxnum}`);
            thisValue = 3;
          }
          if(thisValue < 1){
            thisValue = 1;
          }
          $(this).attr('value',thisValue);//更新自己的value值；

          value_all = returnFloat(value*thisValue);
          $(this).parent().parent().next().text(value_all);//更新总金额
          goods = {
            "id":idss,"number":thisValue
          };
          car.change(goods);
          updatePrice();//更新总价格
        });
      })();  
      
      
  })();


  function updatePrice(){
    var car = new Car();
    //获取总价格赋值
    totalPrice = car.getTotalPrice();
    //总价格
    $("#totalPrice").text(returnFloat(totalPrice));
    //优惠
    onSale = $("#onSale").text()
    //结算总价格
    totalPrice_All = parseFloat(totalPrice) - parseFloat(onSale);
    //转换成小数放到dom里面
    stosck = returnFloat(totalPrice_All);
    $("#totalPrice_All").text(stosck);
  }






















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
