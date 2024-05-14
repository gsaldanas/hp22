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
$uid= filter_var($_POST['uid'],  FILTER_SANITIZE_SPECIAL_CHARS);
$email= filter_var($_POST['email'],  FILTER_SANITIZE_SPECIAL_CHARS);
$naam= filter_var($_POST['naam'],  FILTER_SANITIZE_SPECIAL_CHARS);

$table='PDT77Uat_users';

$time_req = date("Y-m-d H:i:s");

$order='';


$info=array();
// . set status user op 1
$update=updateRow(['user_email','display_name'], [$email,$naam], 'ID', $uid, $table, $conn);

if($update){
    $_SESSION['NAME']=$naam;
    $info['STATUS']=200;
    $info['INFO']='UPDATED';
}else{
    $info['STATUS']=500;
    $info['INFO']='error'; 
}
header("Content-type:application/json");
echo json_encode($info);
exit(0);