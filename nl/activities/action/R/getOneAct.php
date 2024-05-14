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
$act_id= filter_var($_POST['id'],  FILTER_SANITIZE_SPECIAL_CHARS);
$table='ACTIVITEITEN';

$time_req = date("Y-m-d H:i:s");

$order='';
$field='AC_ID';
$value=$act_id;
$info=selectAllOnValue($field, $value, $table, $order, $conn);
header("Content-type:application/json");
echo json_encode($info);
exit(0);

