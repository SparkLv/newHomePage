<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json;charset=utf-8');

$servername = "localhost";
$username = "webuser";
$password = "za123123";
$dbname = "webuser";

$title=$_POST['title'];
$author=$_POST['author'];
$content=$_POST['content'];
$descript=$_POST['desc'];
$imgurl=$_POST['imgurl'];
$tags=$_POST['tags'];
$create_time=$_POST['create_time'];
$update_time=$_POST['update_time'];
$conn = mysql_connect($servername,$username,$password);

mysql_query("set character set 'utf8'");//读库  
mysql_query("set names 'utf8'");//写库

if(!$conn){
    die("连接失败：".mysql_error());
}

$sql = "INSERT INTO blog_essay (title,author,description,imgurl,tags,content,create_time,update_time) VALUES ( '".$title."', '".$author."','".$descript."','".$imgurl."','".$tags."', '".$content."', '".$create_time."','".$update_time."' )";

mysql_select_db($dbname);

$retval = mysql_query($sql,$conn);

if(!$retval){
    die('Could not enter data: ' . mysql_error());
}
else{
    echo json_encode(array("desc"=>"Entered data successfully"));
}

mysql_close($conn)
?>