<?php
include('../../../../share/BE/base_header.php');
include('../../../../share/BE/secure/is_user_alive.php');
include IS_POST;
include TABLE;
include DBASE;
//GET INFO NEDERLANDS
$conn = $GLOBALS['DB'];

$time_req = date("Y-m-d H:i:s");
$table='VRAGENLIJST_FR';
$field='V_ACTIVE';
$value='1';
$order='';

$info=selectAllOnValue($field, $value, $table, $order, $conn);
$status=getValueField('user_status', 'ID', $_SESSION['UID'], 'PDT77Uat_users', $conn) ;
$info['STATUS_V']=$status;
$info['NAME']=$_SESSION['NAME'];
header("Content-type:application/json");
echo json_encode($info);
exit(0);
