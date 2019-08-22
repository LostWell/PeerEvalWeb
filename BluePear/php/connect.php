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


if($_POST['job'] == "signin_manager"){
    $user = $_POST['username'];
    $pass = $_POST['password'];

    /* create a prepared statement */
    if ($stmt = $conn->prepare("SELECT password FROM managers WHERE BINARY username = ?")) {

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
} elseif ($_POST['job'] == "signin_peer"){
    $user = $_POST['username'];
    $pass = $_POST['password'];

    /* create a prepared statement */
    if ($stmt = $conn->prepare("SELECT password FROM peers WHERE BINARY username = ?")) {

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
} elseif ($_POST['job'] == "change_manager"){
    $user = $_POST['username'];
    $oldpass = $_POST['oldpassword'];
    $newpass = $_POST['newpassword'];

    $stmt = $conn->prepare("UPDATE managers SET password=? WHERE BINARY username=? AND password=?");
    $stmt->bind_param("sss", $newpass, $user, $oldpass);
    $stmt->execute();
    $count = $stmt->affected_rows;
    if($count > 0){
        echo "true";
    } else{
        echo "false";
    }
    $stmt->close();
} elseif ($_POST['job'] == "change_peer"){
    $user = $_POST['username'];
    $oldpass = $_POST['oldpassword'];
    $newpass = $_POST['newpassword'];

    $stmt = $conn->prepare("UPDATE peers SET password=? WHERE BINARY username=? AND password=?");
    $stmt->bind_param("sss", $newpass, $user, $oldpass);
    $stmt->execute();
    $count = $stmt->affected_rows;
    if($count > 0){
        echo "true";
    } else{
        echo "false";
    }
    $stmt->close();
} elseif ($_POST['job'] == "check_members"){
    $user = $_POST['username'];

    $stmt = $conn->prepare("SELECT username FROM peers WHERE BINARY username=?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->bind_result($result);

    /* fetch value */
    $stmt->fetch();
    if ($result != null){
        echo "true";
    } else{
        echo "false";
    }

    /* close statement */
    $stmt->close();
}


/* close connection */
$conn->close();