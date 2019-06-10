<?php
header("Content-Type: text/html;charset=utf-8");

//请求服务器
mysql_connect('127.0.0.1','root','root');
// 函数执行一条 MySQL 查询。
mysql_query("use lenovo");

//1.定义sql语句；语句用于从表中选取数据。结果被存储在一个结果表中（称为结果集）
$sql = "select * from blurbs";
$result = mysql_query($sql);
$rows = [];
  //从结果集中取得一行作为关联数组。
while ($row = mysql_fetch_assoc($result)) {
  $rows[] = $row;
}
//输出返回给调用此php文件的duixiang//当中文转译出现问题时，echo json_encode返回值需要加声明：JSON_UNESCAPED_UNICODE（中文不转为unicode ，对应的数字 256）;
echo json_encode($rows,256);
?>