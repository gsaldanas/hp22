<?php
include('../../../../share/BE/base_header.php');
include IS_POST;
include TABLE;
include DBASE;
include_once('../S/mod.php');

$conn = $GLOBALS['DB'];
//Is alive and has mod access.
include_once(BASE_APP . '/share/BE/secure/accessAdm.php');

$to_user = array();
$time_req = date("Y-m-d H:i:s");

$table='APP_ADMIN';
$order='';
$fields_array=['A_ID','vnaam','naam'];

$users=selectFields($fields_array, $table, $order, $conn);

//mods user
//selectAllOnValue($field, $value, $table, $order, $conn) 
$l=sizeof($users);
$field_m='uid';
$table_m='USER_MODS';
for ($i=0;$i < $l; $i++) { 
    $users[$i]['MODS']=selectAllOnValue($field_m, $users[$i]['A_ID'], $table_m, $order, $conn); 
}

header("Content-type:application/json");
echo json_encode($users);
exit(0);