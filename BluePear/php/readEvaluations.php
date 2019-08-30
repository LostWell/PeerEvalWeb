<?php
$path    = 'evaluations/';
$files = array_diff(scandir($path), array('.', '..'));

$result = "";
foreach ($files as $value) {
    $result .= $value . ",";
}
$result .= file_get_contents("active.txt");
echo $result;
?>