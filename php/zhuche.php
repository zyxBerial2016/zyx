<?php
  //连接数据库
  sleep(2);
mysql_connect('127.0.0.1','root','root');
mysql_query("use lenovo");
$username =$_POST['username'];
$password = $_POST['password'];
//定义sql语句:语句索引表中的所有数据，数据存储在一个结果集中
$sql = "select * from sz123 where account='$username' and password='$password'";
$result = mysql_query($sql);
//
$row = mysql_fetch_assoc($result);
  if($row){
    $response = ['code'=>'200','message'=>'该用户已被注册'];
  }else{
    mysql_query("insert into sz123(account,password) values('$_REQUEST[username]','$_REQUEST[password]')");//往表格插入数据
    $response = ['code'=>'0','message'=>'注册成功'];
  }
echo json_encode($response);


?>