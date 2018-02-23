<?php
//筛选文章

header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json;charset=utf-8');

$servername = "localhost";
$username = "webuser";
$password = "za123123";
$dbname = "webuser";

$blogtag = $_POST['tag'];
 
// 创建连接
$conn = mysql_connect($servername,$username,$password);

mysql_query("set character set 'utf8'");//读库  
mysql_query("set names 'utf8'");//写库
// Check connection
if(!$conn){
    die("连接失败：".mysql_error());
}
 
$sql = "SELECT * FROM blog_essay";

mysql_select_db($dbname);

$result = mysql_query($sql,$conn);

$arr = array();
 
//输出数据
while($row = mysql_fetch_array($result)) {
    $rowArr = explode(',',$row["tags"]);
    $res = in_array($blogtag,$rowArr);
    if($res){
        array_push($arr,array("title"=>$row["title"],"author"=>$row["author"],"desc"=>$row["description"],"imgUrl"=>$row["imgurl"],"tags"=>$row["tags"],"date"=>$row["update_time"],"id"=>$row["id"]));        
    }
}

$echoArr = json_encode($arr);

echo $echoArr;

mysql_close($conn);