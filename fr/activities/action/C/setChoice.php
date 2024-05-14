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
$act_id= filter_var($_POST['act_id'],  FILTER_SANITIZE_SPECIAL_CHARS);
$table='MY_ACTIVITY';
$uid=$_SESSION['UID'];

$time_req = date("Y-m-d H:i:s");

$order='';
$field='AC_ID';
$value=$act_id;

$info=array();
//Set all activities inactief
$sql='UPDATE MY_ACTIVITY SET ACTIEF=0 WHERE UID='.$uid; 
$query = $conn->prepare($sql);
$ok=$query->execute();

//check of activity reeds gekozen,the set actief.
if($ok){
    //existEntryDualKey($key1, $key2, $val1, $val2, $table, $conn) 
    $exist=existEntryDualKey('AC_ID', 'UID', $act_id, $uid, $table, $conn) ;
    if($exist){
        //selectAllManyConditions($cond_fields, $cond_arr, $cond_values, $table, $order, $conn)
        $entry=selectAllManyConditions(['UID','AC_ID'], ['=','='], [$uid, $act_id], $table, $order, $conn);
        $info['ENTRY']=$entry;
      
        $uac_id=$entry[0]['UAC_ID'];
        $info['INFO']='update';
        $info['UAC_ID']=$uac_id;
        //updateOneField($field, $value, $id_field, $id_value, $table, $conn)
        $update=updateOneField('ACTIEF', 1, 'UAC_ID', $uac_id, $table, $conn);
        if($update){
        $info['STATUS']=200;
        }
    }
}

if(!$exist){

//insertItem($fields_arr, $values_arr, $table, $conn)
$bool=insertItem(['UID','AC_ID','ACTIEF','DATUM'],[$uid, $value,1,$time_req], $table, $conn);
$info['INFO']='item inserted';
$info['STATUS']=200;
}
//$info=selectAllOnValue($field, $value, $table, $order, $conn);

header("Content-type:application/json");
echo json_encode($info);
exit(0);

