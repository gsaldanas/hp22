<?php
include('../../../../share/BE/base_header.php');
include IS_POST;
include TABLE;
include DBASE;
include_once('../S/mod.php');

$conn = $GLOBALS['DB'];
//Is alive and has mod access.
include_once(BASE_APP . '/share/BE/secure/accessAdm.php');

$uid = filter_var($_POST['uid'],  FILTER_SANITIZE_SPECIAL_CHARS);
$to_user = array();
$time_req = date("Y-m-d H:i:s");

$table = 'APP_ADMIN';
$order = '';

$user = selectAllOnValue('A_ID', $uid, $table, $order, $conn);

$user['pass'] = '****';
$table_m = 'USER_MODS';
$_mods = array();
$is_array = FALSE;
//** indien een module moet de response in een array gezet worden */
$mods = selectAllOnValue('uid', $uid, $table_m, $order, $conn);
if (sizeof($mods) > 0) {

    foreach ($mods as $k => $v) {
        if (is_array($v)) {
            $is_array = TRUE;
            break;
        }
    }

    if ($is_array) {
        $user['MODS'] = $mods;
    } else {
        $_mods[] = $mods;
        $user['MODS'] = $_mods;
    }
}else{
    $user['MODS']=$mods;
}
header("Content-type:application/json");
echo json_encode($user);
exit(0);
