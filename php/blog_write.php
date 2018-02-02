<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "webuser";
$password = "za123123";
$dbname = "webuser";

$title=$_POST['title'];
$author=$_POST['author'];
$content=$_POST['content'];
$descript=$_POST['desc'];
$tags=$_POST['tags'];
$create_time=$_POST['create_time'];
$update_time=$_POST['update_time'];
$conn = mysql_connect($servername,$username,$password);

if(!$conn){
    die("连接失败：".mysql_error());
}

$sql = "INSERT INTO blog_essay (title,author,description,tags,content,create_time,update_time) VALUES ( '".$title."', '".$author."','".$descript."','".$tags."', '".$content."', '".$create_time."','".$update_time."' )";

mysql_select_db($dbname);

$retval = mysql_query($sql,$conn);

if(!$retval){
    die('Could not enter data: ' . mysql_error());
}
else{
    echo "Entered data successfully\n";
}

mysql_close($conn)
?>