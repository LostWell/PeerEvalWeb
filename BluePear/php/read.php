<?php
$path    = 'questionnaires/';
$files = array_diff(scandir($path), array('.', '..'));

$result = "";
foreach ($files as $value) {
    $result .= $value . ",";
}
echo $result;
?>