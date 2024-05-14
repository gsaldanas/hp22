<?php
include('../../../../share/BE/base_header.php');
include('../../../../share/BE/secure/is_user_alive.php');
include IS_POST;
include TABLE;
include DBASE;
//GET INFO NEDERLANDS
$conn = $GLOBALS['DB'];

$time_req = date("Y-m-d H:i:s");
$table='PDT77Uat_users';
$uid=$_SESSION['UID'];
$order='';
$data=selectFieldsOnCondition(['ID','user_email','display_name'], 'ID', '=', $uid, $table, $order, $conn);
header("Content-type:application/json");
echo json_encode($data);
exit(0);
