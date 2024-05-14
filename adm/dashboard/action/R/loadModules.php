<?php
include('../../../../share/BE/base_header.php');
if (!isset($_SESSION)) {
    session_start();

    if (!isset($_SESSION['ALIVE_A'])) {
        session_destroy();
        $to_user['STATUS'] = 'TIMEOUT';
        header("Content-type:application/json");
        echo json_encode($to_user);
        exit(0);
    }
}
include IS_POST;
include TABLE;
include DBASE;
$conn = $GLOBALS['DB'];
$to_user = array();
$time_req = date("Y-m-d H:i:s");

$table_app = 'MICRO_APP';
$table_mod = 'USER_MODS';
$order = '';
$mods_user = array();
//$mods_all['user']=$_SESSION['UID_A'];

$mods_all = selectAllOnValue('uid', $_SESSION['UID_A'], $table_mod, $order, $conn);
//echo 'size:'. sizeof($mods_all).'<br/>';
//print_r($mods_all);
$l = sizeof($mods_all);
$is_array = FALSE;
if ($l > 0) {
    foreach ($mods_all as $k => $v) {
        if (is_array($v)) {
            $is_array = TRUE;
            break;
        }
    }//foreach
    if ($is_array) {
        for ($i = 0; $i < $l; $i++) {
            $mods_user[] = selectAllOnValue('MA_ID', $mods_all[$i]['mid'], $table_app, $order, $conn);
        }
    } else {
        $mods_user[] =selectAllOnValue('MA_ID', $mods_all['mid'], $table_app, $order, $conn);
    }
}
header("Content-type:application/json");
echo json_encode($mods_user);
exit(0);
