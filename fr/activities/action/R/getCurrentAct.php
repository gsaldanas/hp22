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
$uid=$_SESSION['UID'];
$current=selectAllManyConditions(['UID','ACTIEF'], ['=','='], [$uid, 1], 'MY_ACTIVITY', '', $conn);
$info=array();
if(sizeof($current) == 0){
    header("Content-type:application/json");
    echo json_encode($info);
    exit(0); 
}
$act_id=$current[0]['AC_ID'];
$table='ACTIVITEITEN_FR';

$time_req = date("Y-m-d H:i:s");
//$info=$current;
$order='';
$field='AC_ID';
$value=$act_id;
$info=selectAllOnValue($field, $value, $table, $order, $conn);
header("Content-type:application/json");
echo json_encode($info);
exit(0);

