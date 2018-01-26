<?php
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
 
$sql = "SELECT * FROM test";

mysql_select_db($dbname);

$result = mysql_query($sql,$conn);

$arr = array();
 
//输出数据
while($row = mysql_fetch_array($result)) {
    array_push($arr,array("first"=>$row["first"],"second"=>$row["second"],"third"=>$row["third"],"forth"=>$row["forth"]));
}

$echoArr = json_encode($arr);

echo $echoArr;

mysql_close($conn);

// $first = $_POST['first'];
// $second = $_POST['second'];

// $re0 = array(
//     'first'=>$first,
//     'second'=>$second
// )

// $re = json_encode($re0)

// echo $re

?>