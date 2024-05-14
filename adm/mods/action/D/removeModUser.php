<?php
include('../../../../share/BE/base_header.php');
include IS_POST;
include TABLE;
include DBASE;
include DELETE;
include_once('../S/mod.php');
$conn = $GLOBALS['DB'];
//Is alive and has mod access.
include_once(BASE_APP . '/share/BE/secure/accessAdm.php');

/* --------------------------
 * POST VARS
 * ---------------------- */
$umid = filter_var($_POST['umid'],  FILTER_SANITIZE_SPECIAL_CHARS);
$uid = filter_var($_POST['uid'],  FILTER_SANITIZE_SPECIAL_CHARS);
// VARS
$to_user = array();
$to_user['uid']=$uid;
$time_req = date("Y-m-d H:i:s");

$table_mods_user='USER_MODS';
$delete=deleteRow('UM_ID', $umid, $table, $conn);

if($delete){
    $to_user['INFO']='Module verwijderd van user ';
}

header("Content-type:application/json");
echo json_encode($to_user);
exit(0);