<?php
$servername = "localhost";
$username = "webuser";
$password = "za123123";
$dbname = "webuser";

$fir=$_POST['first'];
$sec=$_POST['second'];
$thi=$_POST['third'];
$for=$_POST['forth'];
$conn = mysql_connect($servername,$username,$password);

if(!$conn){
    die("连接失败：".mysql_error());
}

$sql = "INSERT INTO test (first,second,third,forth) VALUES ( '".$fir."', '".$sec."', '".$thi."', ".$for." )";

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