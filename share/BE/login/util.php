<?php
if ($_SERVER['SCRIPT_FILENAME'] == __FILE__) {  //magic constant fullpath and filename
    exit(0);
}
// USER CREDENTIALS
function hasValidCredentials($credentials,$user, $fields){
    $pw=password_verify($credentials[$fields['user_pw']],$user[$fields['db_pw']]);
    $uname=($credentials[$fields['user_uname']] == $user[$fields['db_uname']]);
    return($uname && $pw);
}
//  CREATE SESSION
function createUserSession($user,$fields){
    if(!isset($_SESSION)){
        session_start();
    }
    $_SESSION['ALIVE']=200;
    $_SESSION['UID']=$user[$fields['uid']];
    $_SESSION['NAME']=$user[$fields['dname']];
    $_SESSION['STAMP']=time();
    return($_SESSION);
}
//  CREATE SESSION  admin
function createAdminSession($user,$fields){
    if(!isset($_SESSION)){
        session_start();
    }
    $_SESSION['ALIVE_A']=200;
    $_SESSION['UID_A']=$user[$fields['uid']];
    $_SESSION['NAME_A']=$user[$fields['fname']]. ' '.$user[$fields['lname']];
    $_SESSION['STAMP_A']=time();
    return($_SESSION);
}
// Login aanmelding
function saveLoginDatum($uid,$datum, $table, $conn){
    //TODO
}