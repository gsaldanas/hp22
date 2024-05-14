<?php
if (!isset($_SESSION)) {
    session_start();
}
$to_user = array();

if (!isset($_SESSION['ALIVE_A'])) {
    session_destroy();
    $to_user['STATUS'] = 'TIMEOUT';
}else{
    $to_user['STATUS']='ALIVE';
}
header("Content-type:application/json");
echo json_encode($to_user);
exit(0);
