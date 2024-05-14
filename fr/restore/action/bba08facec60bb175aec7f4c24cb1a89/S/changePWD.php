<?php
include('../../../../../share/BE/base_header.php');

include DBASE;
include TABLE;
include INSERT;
include UPDATE;
include DELETE;
/* -----------------------
 * CREATE A PASSWOORD 60 CHARS
  ---------------------- */
  function createPassword($pwd){
    return password_hash($pwd, PASSWORD_DEFAULT);//60 char
}

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
    $bool=TRUE;
    if(sizeof($cred)>0){
        $bool = deleteManyRows('COOKIE', $cred['COOKIE'], 'PW_SESSION', $conn);
        $bool = deleteManyRows('UID', $cred['UID'], 'RESET_PWD', $conn);
    }
 
    return $bool; 
}

//-----------------------
function isTimedOut($request_time, $timeout) {
    // TIMEOUT BEREKENEN
    $currentDateTime = new DateTime();
    $requestDateTime = new DateTime($request_time);

    $interval = $currentDateTime->diff($requestDateTime);
    $minuts = diffMinutes($interval);

    return ($minuts > $timeout);
}

//---------------------------------
//1 lowercase   1 Uppercase  1 numeric min 8
function validPass($pw1, $pw2) {

    $pattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/u';
    $match = preg_match($pattern, $pw1);
    $equal = (trim($pw1) === trim($pw2));
    return(($match == 1) && $equal);
}

//--------------------------------

/* --------------------------
 *        VARS
  ------------------------- */
$conn = $GLOBALS['DB'];
$expired = TRUE;
$status = 'NOK';
$errors = array();
$resp = array();
$timeout = 10000; //minuten
/* --------------------------------------
 *  handle POST
  --------------------------------------- */

if (!isset($_POST['TOKEN'])) {
    echo ' INVALID REQUEST !!!';
    exit();
}
$pw1 = filter_var($_REQUEST['pwd'], FILTER_SANITIZE_SPECIAL_CHARS);
$pw2 = filter_var($_REQUEST['pwd1'], FILTER_SANITIZE_SPECIAL_CHARS);

$token = filter_var($_REQUEST['TOKEN'],FILTER_SANITIZE_SPECIAL_CHARS);

// CREDENTIALS if token OK
// .selectAllOnValue($field, $value, $table, $order, $conn)  
$credentials = selectAllOnValue('TOKEN', $token, 'RESET_PWD','',$conn);
//geen result
if(sizeof($credentials) > 0){
    $request_time = $credentials['DATUM'];
}
//$request_time = $credentials['DATUM'];

if (!$credentials || isTimedOut($request_time, $timeout)) {
    $expired = TRUE;
    $resp['PW'] = 'NO';
    $errors[]='Sorry, your session has expired';
} else {
    // proceed to change pwd
    if (validPass($pw1, $pw2)) {
        //updateMySQLPasswoord($field_name, $pwd, $id_field, $id_value, $table, $conn)
        //create password hash
        $pw_hash=createPassword($pw1);
        //$bool = updateMySQLPasswoord('PASSWORD', $pw1, 'USER_ID', $credentials['UID'], 'LA_USER', $conn);
        // updateOneField($field, $value, $id_field, $id_value, $table, $conn)
        $bool=updateOneField('user_pass', $pw_hash, 'ID', $credentials['UID'], 'PDT77Uat_users', $conn);
        if ($bool) {
            $expired = TRUE;
            $status = 'OK';
            $resp['PW'] = 'YES';
        }
    } else {
        $errors[] = 'Invalid password or paswords do not match!!!';
    }
}

///  IF EXPIRED   DELETE SESSION DATA AND TOKEN
if ($expired) {
    if (deletePWSession($credentials, $conn)) {
        $resp['INFO'] = 'Session Deleted';
    }
}


/* -----------------------------------------
 * Delete data request if expired 
  ----------------------------------------- */
$resp['STATUS'] = $status;
$resp['EXPIRED'] = $expired;
$resp['ERRORS'] = $errors;

header("Content-type:application/json");

echo json_encode($resp);

