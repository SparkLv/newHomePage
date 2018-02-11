<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json;charset=utf-8');

$servername = "localhost";
$username = "webuser";
$password = "za123123";
$dbname = "webuser";

$id = $_POST['id'];
$title=$_POST['title'];
$content=$_POST['content'];
$update_time=$_POST['update_time'];
$conn = mysql_connect($servername,$username,$password);

mysql_query("set character set 'utf8'");//读库  
mysql_query("set names 'utf8'");//写库

if(!$conn){
    die("连接失败：".mysql_error());
}

$sql = "UPDATE blog_essay SET title = '".$title."',content = '".$content."',update_time = '".$update_time."' WHERE id = ".$id;

mysql_select_db($dbname);

$retval = mysql_query($sql,$conn);

if(!$retval){
    die('Could not enter data: ' . mysql_error());
}
else{
    echo json_encode(array("desc"=>"Entered data successfully"));
}

mysql_close($conn);
?>