<?php
include('../../../share/BE/base_header.php');
include(BASE_APP . '/share/BE/login/util.php');
include IS_POST;
include TABLE;
include DBASE;
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
$fields['db_pw'] = 'user_pass';
$fields['user_uname'] = 'email';
$fields['db_uname'] = 'user_email';
$fields['uid'] = 'ID';
$fields['dname'] = 'display_name'; //display name
$table = 'PDT77Uat_users';
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
    //proced to login
    $S = createUserSession($user, $fields);
    //feedback to delete
   // $to_user['SESSION'] = $S;

    if ($S['ALIVE'] == 200) {
      $to_user['STATUS'] = 202; //ACCEPTED
      $to_user['INFO'] = 'Accepted';
    } else {
      $to_user['STATUS'] = 406;
      $to_user['INFO'] = 'Not acceptable';
    }
  } else {
    $to_user['STATUS']=401;
    $to_user['INFO'] = 'Foute credentials';
  }
} else {
  $to_user['STATUS'] = 401;
  $to_user['INFO'] = 'No user';
}
header("Content-type:application/json");
echo json_encode($to_user);
exit(0);
