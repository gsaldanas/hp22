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
$act_id=$current[0]['AC_ID'];
$table='ACT_USER';

$time_req = date("Y-m-d H:i:s");


$overzicht=selectAllManyConditions(['UID','AC_ID'], ['=','='], [$uid, $act_id], $table, 'DATUM DESC', $conn);


header("Content-type:application/json");
echo json_encode($overzicht);
exit(0);

