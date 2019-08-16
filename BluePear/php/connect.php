<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bluepear";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if($_POST['job'] == "signin"){
    $user = $_POST['username'];
    $pass = $_POST['password'];

    /* create a prepared statement */
    if ($stmt = $conn->prepare("SELECT password FROM managers WHERE username=?")) {

        /* bind parameters for markers */
        $stmt->bind_param("s", $user);

        /* execute query */
        $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($dbpass);

        /* fetch value */
        $stmt->fetch();

        if ($dbpass == $pass){
            echo "true";
        } else{
            echo "false";
        }

        /* close statement */
        $stmt->close();
    }
} elseif ($_POST['job'] == "change"){
    $user = $_POST['username'];
    $oldpass = $_POST['oldpassword'];
    $newpass = $_POST['newpassword'];

    $stmt = $conn->prepare("UPDATE managers SET password=? WHERE username=? AND password=?");
    $stmt->bind_param("sss", $newpass, $user, $oldpass);
    if($stmt->execute()){
        echo "true";
    } else{
        echo "false";
    }
    $stmt->close();
}


/* close connection */
$conn->close();