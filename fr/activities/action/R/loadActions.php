<?php
include('../../../../share/BE/base_header.php');
include('../../../../share/BE/secure/is_user_alive.php');
include IS_POST;
include TABLE;
include DBASE;
//GET INFO NEDERLANDS
$conn = $GLOBALS['DB'];
/* --------------------------
 * POST VARS
 * ---------------------- */
$taal = filter_var($_POST['taal'],  FILTER_SANITIZE_SPECIAL_CHARS);
$table='ACTIVITEITEN_FR';
if($taal == 'FR'){
$table='ACTIVITEITEN_FR';
}

$time_req = date("Y-m-d H:i:s");

$order='';

$info= SelectAll($table, $order, $conn);
header("Content-type:application/json");
echo json_encode($info);
exit(0);
