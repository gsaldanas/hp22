<?php
include('../../../../share/BE/base_header.php');
include('../../../../share/BE/secure/is_user_alive.php');
include IS_POST;
include TABLE;
include DBASE;
include INSERT;
include UPDATE;
//GET INFO NEDERLANDS
$conn = $GLOBALS['DB'];
/* --------------------------
 * POST VARS
 * ---------------------- */
$table='PDT77Uat_users';
$uid=$_SESSION['UID'];

$time_req = date("Y-m-d H:i:s");

$order='';


$info=array();
// . set status user op 1
$update=updateOneField('user_status', 1, 'ID', $uid, $table, $conn);

if($update){
    $info['STATUS']=200;
    $info['INFO']='UPDATED';
}else{
    $info['STATUS']=500;
    $info['INFO']='error'; 
}
header("Content-type:application/json");
echo json_encode($info);
exit(0);