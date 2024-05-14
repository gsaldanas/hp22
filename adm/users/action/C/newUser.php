<?php
include('../../../../share/BE/base_header.php');
include IS_POST;
include TABLE;
include DBASE;
include INSERT;
include_once('../S/mod.php');
$conn = $GLOBALS['DB'];
//Is alive and has mod access.
include_once(BASE_APP . '/share/BE/secure/accessAdm.php');

/* --------------------------
 * POST VARS
 * ---------------------- */
$mod = array();
$mod['uid'] = filter_var($_POST['uid'],  FILTER_SANITIZE_SPECIAL_CHARS);
$mod['email'] = filter_var($_POST['email'],  FILTER_SANITIZE_SPECIAL_CHARS);
$mod['vnaam'] = filter_var($_POST['vnaam_user'],  FILTER_SANITIZE_SPECIAL_CHARS);
$mod['naam'] = filter_var($_POST['naam_user'],  FILTER_SANITIZE_SPECIAL_CHARS);
$mod['pwd'] = filter_var($_POST['pwd1'],  FILTER_SANITIZE_SPECIAL_CHARS);

// VARS
$to_user = array();
$time_req = date("Y-m-d H:i:s");

// DB
$table='APP_ADMIN';
$fields=getTableFieldsName($table, $conn);

//password hash
$pw_cryp=password_hash(trim($mod['pwd']),PASSWORD_DEFAULT);
// VALUES

$values=array();

$values[]=NULL;
$values[]=trim($mod['email']);
$values[]=trim($mod['vnaam']);
$values[]=trim($mod['naam']);
$values[]=$pw_cryp;
$values[]=NULL ;//token
$values[]='user';
$values[]=NULL ;// last login
$values[]=$time_req;

$bool=insertItem($fields, $values, $table, $conn);

if($bool){
    $to_user['INFO']='User toegevoegd';
}else{
    $to_user['INFO']='kon user niet toevoegen, probeer opnieuw aub';
}
header("Content-type:application/json");
echo json_encode($to_user);
exit(0);