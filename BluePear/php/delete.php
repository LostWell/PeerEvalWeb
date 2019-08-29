<?php
$files = explode (",", $_POST['checkboxes']);
$result = "true";
foreach($files as $value) {
    if($value != ""){
        if (!unlink("questionnaires/".$value)) {
          $result = "false";
        } else {
          $result = "true";
        }
    }
}
echo $result;
?>