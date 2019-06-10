  

//封装购物车的商品操作方法
function Car(){
};

//获取购物车的所有产品
  Car.prototype.getCar = function(){
    //因为可能没有数据，所以默认设置一个空数组
    var cartlist = JSON.parse( localStorage.getItem('cartlsit')) || [];
    return cartlist;
  };
//判断购物车是否有相同的产品
  Car.prototype.hasGoods = function(id){
    //获取本地存储的商品数据，进行判断是否有相同商品（用于判断购物车加产品），有返回true，否则返回false
    var cartlist = this.getCar();
    for(var i = 0;i < cartlist.length;i++){
      if(cartlist[i].id === id){
        return true;
      }
    }
    return false;//没有直接结束
  }

//本地存储存商品的格式：[{"id":1,"price":100,"number":2},{},{},..] 
//添加商品到购物车
  Car.prototype.addCar = function(goods){
    //1.取出商品//获取购物车的所有产品
    var cartlist = this.getCar(); 
    //2.判断是否有相同的商品，有则直接累加数量，否则直接加入
    if(this.hasGoods(goods.id)){
      //有则加数量
      for(var i = 0;i < cartlist.length;i++){
        if(cartlist[i].id === goods.id){
          cartlist[i].number += goods.number;//商品在原来的数量上进行累加
          if(cartlist[i].number > cartlist[i].maxnum){
            for(var j = 0;j <= cartlist[i].maxnum;j++){
              cartlist[i].number--;
              if(cartlist[i].number == cartlist[i].maxnum){
                break;//完成计算跳出for循环
              }
            }
          }
          break;//完成计算跳出for循环
        }
      }
    }else{
      //购物车原来没有产品。直接加入
      cartlist.push(goods);
    }
    //3.把产品重新存储到本地储存
    localStorage.setItem('cartlsit',JSON.stringify(cartlist));
  }

//减少购物车的产品
  Car.prototype.removeCar = function(goods){
    //1.取出商品//获取购物车的所有产品
    var cartlist = this.getCar(); 
    //找出指定的产品进行减减
      for(var i = 0;i < cartlist.length;i++){
        if(cartlist[i].id === goods.id){
          cartlist[i].number -= goods.number;//商品在原来的数量上减减
          break;//完成计算跳出for循环
        }
      }
    //3.把产品重新存储到本地储存
    localStorage.setItem('cartlsit',JSON.stringify(cartlist));
  }

//获取购物车商品的总价
  Car.prototype.getTotalPrice = function(){
    var cartlist = this.getCar();
    var totalPrice = 0.00;
    for(var i = 0;i < cartlist.length;i++){
      totalPrice += cartlist[i].price*cartlist[i].number;
    }
    return totalPrice;
  }

//删除产品
  Car.prototype.delGoods = function(id){
    var cartlist = this.getCar();
    for(var i = 0;i < cartlist.length;i++){
      if(cartlist[i].id == id){
        //删除指定的商品
        cartlist.splice(i,1);
        break;
      }
    }
    //再把商品写入到本地存储
    localStorage.setItem('cartlsit',JSON.stringify(cartlist));
  }

  Car.prototype.change = function(goods){
      //1.取出商品//获取购物车的所有产品
      var cartlist = this.getCar(); 
      //找出指定的产品进行减减
        for(var i = 0;i < cartlist.length;i++){
          if(cartlist[i].id === goods.id){
            cartlist[i].number = goods.number;//赋值---/修改
            break;//完成计算跳出for循环
          }
        }
      //3.把产品重新存储到本地储存
      localStorage.setItem('cartlsit',JSON.stringify(cartlist));
  }