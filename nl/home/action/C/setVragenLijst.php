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
$v_id=filter_var($_POST['v_id'],FILTER_SANITIZE_SPECIAL_CHARS);
$v_name=filter_var($_POST['v_name'],FILTER_SANITIZE_SPECIAL_CHARS);
$table='MY_V_LIJST';//MY_V_LIJST
$uid=$_SESSION['UID'];

$time_req = date("Y-m-d H:i:s");

$order='';
//chech toch als lijst reeds bestaat TODO

$info=array();
// insertItem($fields_arr, $values_arr, $table, $conn) 
$insert=insertItem(['U_ID','V_ID','V_L_NAME','DATUM_BEGIN'], [$uid, $v_id, $v_name,$time_req], $table, $conn); 

if($insert){
    $info['STATUS']=200;
    $info['INFO']='VRAGEN LIJST STARTED';
}else{
    $info['STATUS']=500;
    $info['INFO']='error'; 
}
header("Content-type:application/json");
echo json_encode($info);
exit(0);