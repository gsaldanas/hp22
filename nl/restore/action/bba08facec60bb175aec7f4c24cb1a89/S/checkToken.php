<?php
include('../../../../../share/BE/base_header.php');

include DBASE;
include TABLE;
include INSERT;
include UPDATE;
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
    $bool = deleteManyRows('COOKIE', $cred['COOKIE'], 'PW_SESSION', $conn);
    $bool = deleteManyRows('UID', $cred['UID'], 'RESET_PWD', $conn);
    return $bool;
}

/* --------------------------
 *        VARS
  ------------------------- */
$conn = $GLOBALS['DB'];
$expired = TRUE;
$errors='NO';
$resp = array();
$timeout = 15; //minuten
/* --------------------------------------
 *  handle POST
  --------------------------------------- */

if (!isset($_POST['TOKEN'])) {
    echo ' INVALID REQUEST !!!';
    exit();
}

$token = filter_var($_REQUEST['TOKEN'], FILTER_SANITIZE_SPECIAL_CHARS);
// CREDENTIALS 
// .selectAllOnValue($field, $value, $table, $order, $conn)  
$credentials = selectAllOnValue('TOKEN', $token, 'RESET_PWD','',$conn);
//geen result
if(sizeof($credentials) > 0){
    $request_time = $credentials['DATUM'];
}
//$request_time = $credentials['DATUM'];

if (!$credentials) {
    $expired = TRUE;
    $errors='INVALID CREDENTIALS';
} else {
 // TIMEOUT BEREKENEN
    $currentDateTime = new DateTime();
    $requestDateTime = new DateTime($request_time);

    $interval = $currentDateTime->diff($requestDateTime);
    $minuts = diffMinutes($interval);

    if ($minuts > $timeout) {
        $expired = TRUE;
        // delete session data
        if(!deletePWSession($credentials, $conn)){
             $errors='error removing session data';
        }
    } else {
        $expired = FALSE;
    }
}
$resp['EXPIRED']=$expired;
$resp['ERRORS']=$errors;

header("Content-type:application/json");

echo json_encode($resp);

