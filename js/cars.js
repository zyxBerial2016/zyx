
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


  function delCar(id){
    var car = new Car();
    if(!confirm('确认删除?')){//弹窗函数
      return;
    }
    car.delGoods(id);
    updatePrice();//更新总价格
    location.reload();//重新加载
  }

  
        // (function(){
      //   for(var j = 0,k;j < $('.price_zje').length;j++){
      //     k = parseFloat($('.td_prices').text())*parseFloat($("#price_values").attr('value'));
      //     $('.price_zje').text(k);
      //   }
      // })();