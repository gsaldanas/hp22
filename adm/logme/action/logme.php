<?php
include('../../../share/BE/base_header.php');
include(BASE_APP . '/share/BE/login/util.php');
include IS_POST;
include TABLE;
include DBASE;
include UPDATE;
//CREDENTIALS
/* --------------------------
 * POST VARS
 * ---------------------- */
$credentials = array();
$credentials['email'] = filter_var($_POST['email'],  FILTER_SANITIZE_SPECIAL_CHARS);
$credentials['password'] = filter_var($_POST['password'],  FILTER_SANITIZE_SPECIAL_CHARS);

//fields 
$fields = array();
$fields['user_pw'] = 'password';
$fields['db_pw'] = 'pass';
$fields['user_uname'] = 'email';
$fields['db_uname'] = 'email';
$fields['uid'] = 'A_ID';
$fields['fname'] = 'vnaam';
$fields['lname'] = 'naam';
$table = 'APP_ADMIN';
//TODO need to add token en last login field.
$conn = $GLOBALS['DB'];
$to_user = array();
$time_req = date("Y-m-d H:i:s");
/* - - - - - - - - - - - - - - - - - - - -
 *    CHECK USER CREDENTIALS
 * - - - - - - - - - - - - - - - - - - - */
$user = selectAllOnValue($fields['db_uname'], $credentials[$fields['user_uname']], $table, '', $conn);

//CASE username is in database
if (sizeof($user) != 0) {
  //check credentials
  if (hasValidCredentials($credentials, $user, $fields)) {
    // proced to login
    $S=createAdminSession($user,$fields);
    //$to_user['SESSION']=$S;
    if($S['ALIVE_A'] == 200){
      $to_user['STATUS']=202; //accepted
      //update last login
      $bool=updateOneField('last_login', $time_req, 'A_ID', $user['A_ID'], $table, $conn); 
      if($bool){
        $to_user['LLOGIN']='updated';
      }else{
        $to_user['LLOGIN']='last login not updated';
      }
    }else{
      $to_user['STATUS']=406;
    }
  } else {
    $to_user['STATUS'] = 401;
  }
} else {
    $to_user['STATUS']= 401;
}
header("Content-type:application/json");
echo json_encode($to_user);
exit(0);