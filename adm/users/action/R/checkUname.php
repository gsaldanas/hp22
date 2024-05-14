<?php
include('../../../../share/BE/base_header.php');
include IS_POST;
include TABLE;
include DBASE;
include_once('../S/mod.php');

$conn = $GLOBALS['DB'];
//Is alive and has mod access.
include_once(BASE_APP . '/share/BE/secure/accessAdm.php');

$email = filter_var($_POST['email'],  FILTER_SANITIZE_SPECIAL_CHARS);
$to_user = array();
$time_req = date("Y-m-d H:i:s");

$table='APP_ADMIN';
$order='';
$field='email';
$value=$email;
if(existEntryInTable($field, $value, $table, $conn) ){
             $to_user['RESP']='NOK';
}else{
             $to_user['RESP']='OK';
}

header("Content-type:application/json");
echo json_encode($to_user);
exit(0);