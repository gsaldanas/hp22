<?php
include('../../../../share/BE/base_header.php');
include IS_POST;
include TABLE;
include DBASE;
include DELETE;
include_once('../S/mod.php');
$conn = $GLOBALS['DB'];
//Is alive and has mod access.
include_once(BASE_APP . '/share/BE/secure/accessAdm.php');

/* --------------------------
 * POST VARS
 * ---------------------- */
$mid = filter_var($_POST['mid'],  FILTER_SANITIZE_SPECIAL_CHARS);

// VARS
$to_user = array();
$time_req = date("Y-m-d H:i:s");

// DB
$table='MICRO_APP';
$table_mods_user='USER_MODS';
$delete=deleteRow('MA_ID', $mid, $table, $conn);

if($delete){
    $to_user['INFO']='Module verwijderd ';
    $del_from_user=deleteManyRows('mid', $mid, $table_mods_user, $conn);
    if($del_from_user){
        $to_user['INFO'].=' en ook van alle users!';
    }
}

header("Content-type:application/json");
echo json_encode($to_user);
exit(0);