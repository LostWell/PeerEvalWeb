<?php
$result = "true";

$files = glob("evaluations/*"); // get all file names

if(count($files) != 0){
    foreach($files as $file){ // iterate files
        if(is_file($file)){
            if (!unlink($file)) {
                  $result = "false";
                } else {
                  $result = "true";
            }
        }
    }
}else{
    $result = "true";
}
echo $result;
?>