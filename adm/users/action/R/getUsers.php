<?php
include('../../../../share/BE/base_header.php');
include IS_POST;
include TABLE;
include DBASE;
include_once('../S/mod.php');

$conn = $GLOBALS['DB'];
//Is alive and has mod access.
include_once(BASE_APP . '/share/BE/secure/accessAdm.php');

$to_user = array();
$time_req = date("Y-m-d H:i:s");

$table='APP_ADMIN';
$order='';
$users=SelectAll($table, $order, $conn);
//ofuscate encrypted pw
$l=sizeof($users);
for ($i=0; $i < $l; $i++) { 
    $users[$i]['pass']='****';
}

header("Content-type:application/json");
echo json_encode($users);
exit(0);