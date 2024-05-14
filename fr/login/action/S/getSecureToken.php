<?php
include('../../../../share/BE/base_header.php');

include DBASE;
include TABLE;
include INSERT;
include DELETE;

//---------------------------
function diffMinutes($diff) {

    $y = $diff->y * 525600;
    $m = $diff->m * 43200;
    $d = $diff->d * 1440;
    $u = $diff->h * 60;
    $m = $diff->i;

    return ($y + $m + $d + $u + $m);
}

//------------------------
function deletePWSession($cred, $conn) {
    //deleteMany($item_field, $item_value, $table, $conn)
    //deleteManyRows($item_field, $item_value, $table, $conn) 
    $bool = deleteManyRows('COOKIE', $cred['COOKIE'], 'PW_SESSION', $conn);
    $bool = deleteManyRows('UID', $cred['UID'], 'RESET_PWD', $conn);
    return $bool;
}

/* --------------------
 * main
  ------------------ */

if (!isset($_POST['csrf_req'])) {
    echo 'no post data';
    exit();
}
$conn = $GLOBALS['DB'];
$resp = array();
$today = date("Y-m-d H:i:s");

$is_reload = FALSE;
$bool = FALSE;
$IP = $_SERVER['REMOTE_ADDR'];
$C = $_COOKIE['PHPSESSID'];
$myToken = bin2hex(openssl_random_pseudo_bytes(24)); //48 bits 

/* --------------------------------------------------
 *  CHECK OF USER RELOAD DE PAG  same cookie
  ------------------------------------------------ */
  // existEntryInTable($field, $value, $table, $conn)
//$existCookie = existEntryInTable($conn, 'PW_SESSION', 'COOKIE', $C);
$existCookie = existEntryInTable('COOKIE',$C, 'PW_SESSION', $conn);
if ($existCookie) {
    // getValueField($search, $field, $value, $table, $conn)
    $myToken = getValueField('TOKEN', 'COOKIE', $C, 'PW_SESSION', $conn);
    $is_reload = TRUE;
    $bool = TRUE;
}
/* --------------------------------------------------
 *  bewaar info user in database als geen sessie is
  ------------------------------------------------ */
if (!$is_reload) {
    // insertItem($fields_arr, $values_arr, $table, $conn)
    $bool = insertItem( [ 'IP', 'COOKIE', 'TOKEN', 'DATUM'],[$IP,$C,$myToken,$today] ,'PW_SESSION', $conn); //$conn = $GLOBALS['DB'];
}
if ($bool) {
    $resp['STATUS'] = 'OK';
} else {
    $resp['STATUS'] = 'ERROR';
}

$resp['TOKEN'] = $myToken;
$resp['C'] = $C;

header("Content-type:application/json");

echo json_encode($resp);
