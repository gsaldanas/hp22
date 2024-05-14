<?php
include('../../../../share/BE/base_header.php');
include('../../../../share/BE/secure/is_user_alive.php');
include IS_POST;
include DBASE;
include DELETE;
//GET INFO NEDERLANDS
$conn = $GLOBALS['DB'];
/* --------------------------
 * POST VARS
 * ---------------------- */
$aui_id= filter_var($_POST['aui'],  FILTER_SANITIZE_SPECIAL_CHARS);
$table='ACT_USER';
$uid=$_SESSION['UID'];

$time_req = date("Y-m-d H:i:s");

$order='';
$field='AUI_ID';
$delete=deleteRow($field, $aui_id, $table, $conn);

if($delete){
    $info['STATUS']=200;
    $info['INFO']='Entry deleted';
}else{
    $info['STATUS']=500;
    $info['INFO']='SERVER error '; 
}
header("Content-type:application/json");
echo json_encode($info);
exit(0);