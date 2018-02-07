<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json;charset=utf-8');
$servername = "localhost";
$username = "webuser";
$password = "za123123";
$dbname = "webuser";
 
// 创建连接
$conn = mysql_connect($servername,$username,$password);

mysql_query("set character set 'utf8'");//读库  
mysql_query("set names 'utf8'");//写库
// Check connection
if(!$conn){
    die("连接失败：".mysql_error());
}
 
$sql = "SELECT * FROM book_tags";

mysql_select_db($dbname);

$result = mysql_query($sql,$conn);

$arr = array();
 
//输出数据
while($row = mysql_fetch_array($result)) {
    array_push($arr,array("id"=>$row["id"],"name"=>$row["name"],"color"=>$row["color"],"type"=>$row["type"]));
}

$echoArr = json_encode($arr);

echo $echoArr;

mysql_close($conn);