<?php
sleep(2);
//请求服务器
mysql_connect('127.0.0.1','root','root');
//发出一条数据库查询
mysql_query("use lenovo");

// $username = $_GET['username'];
$num2 = $_POST['num2'];
$num1 = $_POST['num1'];
//定义sql语句:语句索引表中的所有数据，数据存储在一个结果集中
$sql = "select * from sz123 where account='$num1'  and password='$num2'";
$result = mysql_query($sql);
//
$row = mysql_fetch_assoc($result);
  if($row){
    $response = ['code'=>'200','message'=>'登陆成功'];
  }else{
    $response = ['code'=>'0','message'=>'登陆失败'];
  }
echo json_encode($response,64);

?>