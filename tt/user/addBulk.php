<?php
//include('../../share/BE/base_header.php');
//include(BASE_APP . '/share/BE/secure/status_test.php');
include DBASE;
include TABLE;
include INSERT;
$conn = $GLOBALS['DB'];
$table='PDT77Uat_users';
$users_email=[
"sarah.raes@UGent.be",
"lieven.annemans@ugent.be",
"anitavandriel@hotmail.com",
"beavanistendael@hotmail.com"];

$users_name=[                  
"Sarah Raes",                     
"Lieven Annemans",                
"Anita Van Driel", 
"Bea Van Istendael" 
 ];
$user_display=[
    "Sarah R.",                     
    "Lieven A. UG",                
    "Anita V.D.", 
    "Bea V.I." 
];
$user_pw=[
    "sarah1e97",                     
    "lieven4c87",                
    "anita23c1", 
    "beavi3cdf" 
];
$time_req = date("Y-m-d H:i:s");

//password hash
//$pw_cryp=password_hash(trim($mod['pwd']),PASSWORD_DEFAULT);
// VALUES

$fields=['user_login','user_pass','user_nicename','user_email','user_registered','display_name'];
$l=sizeof($users_email);

for ($i=0; $i < $l; $i++) { 
    $upw=password_hash(trim($user_pw[$i]),PASSWORD_DEFAULT);
    $values=[$user_display[$i], $upw, $user_display[$i], $users_email[$i], $time_req, $users_name[$i]];
      
    echo 'User --> '. $users_name[$i];
     if(insertItem($fields, $values, $table, $conn)){
        echo ' added  <br/>';
     }else{
        echo  ' failed  <br/>';
     }
}

