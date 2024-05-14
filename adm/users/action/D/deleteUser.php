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
$uid = filter_var($_POST['uid'],  FILTER_SANITIZE_SPECIAL_CHARS);

// VARS
$to_user = array();
$time_req = date("Y-m-d H:i:s");

// DB
$table='APP_ADMIN';
$table_mods_user='USER_MODS';
$delete=deleteRow('A_ID', $uid, $table, $conn);

if($delete){
    $to_user['INFO']='User verwijderd ';
    $del_from_mods=deleteManyRows('uid', $uid, $table_mods_user, $conn);
    if($del_from_mods){
        $to_user['INFO'].=' en ook van module lijst!';
    }
}

header("Content-type:application/json");
echo json_encode($to_user);
exit(0);