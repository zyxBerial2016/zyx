<?php
header("Content-Type: text/html;charset=utf-8");
mysql_connect('127.0.0.1','root','root');
mysql_query("use lenovo");


//1.接受post参数
$id = $_POST['id'];
$colorid = $_POST['colorid'];
$spec_meid = $_POST['spec_meid'];
//2.编写编辑入库的sql语句
$sql = "update blurbs set colorid = '$colorid',spec_meid = '$spec_meid' where id=$id";
mysql_query($sql);
//3.判断结果，响应json数据
$num = mysql_affected_rows();
if($num > 0){
  $response = ['code'=>'200','message'=>'编辑成功'];
}else{
  $response = ['code'=>'-1','message'=>'编辑失败'];
}

echo json_encode($response,256);

?>