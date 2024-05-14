<?php
include('../../../../share/BE/base_header.php');
include('../../../../share/BE/secure/is_user_alive.php');
include IS_POST;
include TABLE;
include DBASE;
include INSERT;
//GET INFO NEDERLANDS
$conn = $GLOBALS['DB'];
/* --------------------------
 * POST VARS
 * ---------------------- */
$table='NO_ACTIVITY';
$uid=$_SESSION['UID'];

$time_req = date("Y-m-d H:i:s");

$order='';


$info=array();
$exist_user=existEntryInTable('UID', $uid, $table, $conn);

if(!$exist_user){
$insert=insertItem(['UID','DATUM'], [$uid, $time_req], $table, $conn) ;
}
if($insert){
    $info['STATUS']=200;
    $info['INFO']='UPDATED';
}else{
    $info['STATUS']=500;
    $info['INFO']='error or user data exist.'; 
}
header("Content-type:application/json");
echo json_encode($info);
exit(0);