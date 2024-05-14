<?php
if ($_SERVER['SCRIPT_FILENAME'] == __FILE__) {
    exit(0);
}
if (!isset($_SESSION)) {
    session_start();
}
if(!isset( $_SESSION['UID_A'])){
    session_destroy();
    $to_user=array();
    $to_user['ACCESS']='DENY';
    header("Content-type:application/json");
    echo json_encode($to_user);
    exit();
};
$table='USER_MODS';
$uid=$_SESSION['UID_A'];
$key1='uid';
$key2='mid';
if(existEntryDualKey($key1, $key2, $uid, $module, $table, $conn)){
    //do nothing
}else{
    session_destroy();
    $to_user=array();
    $to_user['ACCESS']='DENY';
    header("Content-type:application/json");
    echo json_encode($to_user);
    exit();
}