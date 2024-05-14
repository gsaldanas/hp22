<?php
include('../../../../share/BE/base_header.php');
include('../../../../share/BE/secure/is_user_alive.php');
include IS_POST;
include TABLE;
include DBASE;
include INSERT;
include UPDATE;
//save activitie
$conn = $GLOBALS['DB'];
/* --------------------------
 * POST VARS
 * ---------------------- */
$act_id= filter_var($_POST['act_id'],  FILTER_SANITIZE_SPECIAL_CHARS);
$keer= filter_var($_POST['keer'],  FILTER_SANITIZE_SPECIAL_CHARS);
$minuten= filter_var($_POST['minuut'],  FILTER_SANITIZE_SPECIAL_CHARS);
$activity= filter_var($_POST['name_act'],  FILTER_SANITIZE_SPECIAL_CHARS);
$lapsus= filter_var($_POST['timelapse'],  FILTER_SANITIZE_SPECIAL_CHARS);

$table='ACT_USER';
$uid=$_SESSION['UID'];

$time_req = date("Y-m-d H:i:s");

$order='';


$info=array();
// . set status user op 1
$insert=insertItem(['UID','AC_ID','FREQUENCY','TIME','ACT_NAME','TIMELAPSE','DATUM'], [$uid, $act_id, $keer,$minuten,$activity,$lapsus,$time_req], $table, $conn) ;
if($insert){
    $info['STATUS']=200;
    $info['INFO']='ACTION REGISTERED';
}else{
    $info['STATUS']=500;
    $info['INFO']='SERVER error '; 
}
header("Content-type:application/json");
echo json_encode($info);
exit(0);