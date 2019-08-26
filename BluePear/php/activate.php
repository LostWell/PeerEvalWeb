<?php
$str = $_POST['name'];
$result = file_put_contents('active.txt', $str);
if ($result != FALSE){
    echo "true";
} else{
    echo "false";
}
?>