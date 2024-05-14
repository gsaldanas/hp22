<?php //UPDATE
include('../../../../share/BE/base_header.php');
include IS_POST;
include TABLE;
include DBASE;
include UPDATE;
include_once('../S/mod.php');
$conn = $GLOBALS['DB'];
//Is alive and has mod access.
include_once(BASE_APP . '/share/BE/secure/accessAdm.php');

/* --------------------------
 * POST VARS
 * ---------------------- */
$mod = array();
$uid = filter_var($_POST['uid'],  FILTER_SANITIZE_SPECIAL_CHARS);
$pwd = filter_var($_POST['pwd1'],FILTER_SANITIZE_SPECIAL_CHARS);

// VARS
$to_user = array();
$time_req = date("Y-m-d H:i:s");

// DB
$table='APP_ADMIN';
$encrypted=password_hash(trim($pwd),PASSWORD_DEFAULT);
$bool=updateOneField('pass', $encrypted, 'A_ID', $uid, $table, $conn);
if($bool){
    $to_user['INFO']='Wachtwoord gewijzigd';
}else{
    $to_user['INFO']='kon wachtwoord niet wijzigen, probeer opnieuw aub';
}
header("Content-type:application/json");
echo json_encode($to_user);
exit(0);