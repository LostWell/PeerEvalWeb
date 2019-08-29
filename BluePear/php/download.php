<?php
$path    = 'evaluations/';
$result = "";
$fi = new FilesystemIterator($path, FilesystemIterator::SKIP_DOTS);


if(iterator_count($fi) != 0){
    $files = array_diff(scandir($path), array('.', '..'));

    for($x=0; $x < count($files); $x++) {
        if($x != count($files)-1){
            $result .= $files[$x] . ",";
        }else{
            $result .= $files[$x];
        }
    }
} else{
    $result = "false";
}
echo $result;
?>