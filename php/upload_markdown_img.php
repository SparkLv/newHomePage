<?php
    header("Access-Control-Allow-Origin: *");
    $imgname = $_FILES['img']['name'];
    $tmp = $_FILES['img']['tmp_name'];
    $filepath = '../photo/markdownimg/';
    if(move_uploaded_file($tmp,$filepath.$imgname)){
        $path = "http://sparklv.cn".substr($filepath,2).$imgname;
        $url = array(url=>$path,desc=>"上传成功");
        $res_url = json_encode($url);
        header('Content-Type:application/json');
        echo $res_url;
    }else{
        echo "上传失败";
    }
?>