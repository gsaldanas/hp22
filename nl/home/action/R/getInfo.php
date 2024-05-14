<?php
include('../../../../share/BE/base_header.php');
include('../../../../share/BE/secure/is_user_alive.php');
include IS_POST;
include TABLE;
include DBASE;
//GET INFO NEDERLANDS
$conn = $GLOBALS['DB'];

$time_req = date("Y-m-d H:i:s");
$table='VRAGENLIJST';
$field='V_ACTIVE';
$value='1';
$order='';
$domain=$_SERVER['SERVER_NAME'];
$info=selectAllOnValue($field, $value, $table, $order, $conn);
$status=getValueField('user_status', 'ID', $_SESSION['UID'], 'PDT77Uat_users', $conn) ;
$my_Vlist=selectAllOnValue('U_ID', $_SESSION['UID'], 'MY_V_LIJST', '', $conn);
$info['STATUS_V']=$status;
$info['V_LIST']=$my_Vlist;
$info['NAME']=$_SESSION['NAME'];
$info['DOMAIN']=$domain;
header("Content-type:application/json");
echo json_encode($info);
exit(0);
