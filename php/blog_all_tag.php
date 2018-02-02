<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "webuser";
$password = "za123123";
$dbname = "webuser";
 
// 创建连接
$conn = mysql_connect($servername,$username,$password);
// Check connection
if(!$conn){
    die("连接失败：".mysql_error());
}
 
$sql = "SELECT * FROM blog_tags";

mysql_select_db($dbname);

$result = mysql_query($sql,$conn);

$arr = array();
 
//输出数据
while($row = mysql_fetch_array($result)) {
    array_push($arr,array("id"=>$row["id"],"name"=>$row["name"],"color"=>$row["color"]));
}

$echoArr = json_encode($arr);

echo $echoArr;

mysql_close($conn);