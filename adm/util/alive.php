<?php
include('../../share/BE/base_header.php');
include IS_POST;
include TABLE;
include DBASE;
$pathmod = filter_var($_POST['pathname'],  FILTER_SANITIZE_SPECIAL_CHARS);
include_once(DOC_ROOT . $pathmod . 'action/S/mod.php');
$conn=$GLOBALS['DB'];
if (!isset($_SESSION)) {
    session_start();
}
$to_user = array();

//$to_user['MOD']=$module;
//$to_user['PATH']=$pathmod;

if (!isset($_SESSION['ALIVE_A'])) {
    session_destroy();
    $to_user['STATUS'] = 'TIMEOUT';
} else {
  //  $to_user['S']=$_SESSION;
    if (existEntryDualKey('uid','mid', $_SESSION['UID_A'], $module, 'USER_MODS', $conn)) {
        $to_user['STATUS'] = 'ALIVE';
    }else{
        session_destroy();
        $to_user['STATUS'] ="TIMEOUT";
        $to_user['ACCESS']='DENY';
    }
}
header("Content-type:application/json");
echo json_encode($to_user);
exit();
