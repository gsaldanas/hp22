<?php
include('../../../../share/BE/base_header.php');
include IS_POST;
include TABLE;
include DBASE;
include_once('../S/mod.php');

$conn = $GLOBALS['DB'];
//Is alive and has mod access.
include_once(BASE_APP . '/share/BE/secure/accessAdm.php');

$mod_id = filter_var($_POST['mid'],  FILTER_SANITIZE_SPECIAL_CHARS);
$to_user = array();
$time_req = date("Y-m-d H:i:s");

$table='MICRO_APP';
$order='';

$one_mod= selectAllOnValue('MA_ID', $mod_id, $table, $order, $conn);

header("Content-type:application/json");
echo json_encode($one_mod);
exit(0);