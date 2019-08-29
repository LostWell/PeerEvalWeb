<?php
$path    = 'evaluations/';
$result = "";
$fi = new FilesystemIterator($path, FilesystemIterator::SKIP_DOTS);


if(iterator_count($fi) != 0){
    $files = array_diff(scandir($path), array('.', '..'));

    foreach ($files as $value) {
        $result .= $value . ",";
    }
    
} else{
    $result = "false";
}
echo $result;
?>