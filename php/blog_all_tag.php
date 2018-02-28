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

$arr = array();

//it标签

$sql = "SELECT * FROM it_tags";

mysql_select_db($dbname);

$result = mysql_query($sql,$conn);
 
//输出数据
while($row = mysql_fetch_array($result)) {
    array_push($arr,array("id"=>$row["id"],"name"=>$row["name"],"color"=>$row["color"],"type"=>$row["type"]));
}

//essay标签

$sql2 = "SELECT * FROM essay_tags";

mysql_select_db($dbname);

$result2 = mysql_query($sql2,$conn);
 
//输出数据
while($row2 = mysql_fetch_array($result2)) {
    array_push($arr,array("id"=>$row2["id"],"name"=>$row2["name"],"color"=>$row2["color"],"type"=>$row2["type"]));
}

//book标签

$sql3 = "SELECT * FROM book_tags";

mysql_select_db($dbname);

$result3 = mysql_query($sql3,$conn);
 
//输出数据
while($row3 = mysql_fetch_array($result3)) {
    array_push($arr,array("id"=>$row3["id"],"name"=>$row3["name"],"color"=>$row3["color"],"type"=>$row3["type"]));
}

$echoArr = json_encode($arr);

echo $echoArr;

mysql_close($conn);