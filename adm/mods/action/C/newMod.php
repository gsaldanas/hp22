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
$mod['mod_id'] = filter_var($_POST['mod_id'],  FILTER_SANITIZE_SPECIAL_CHARS);
$mod['mod_name'] = filter_var($_POST['naam_mod'],  FILTER_SANITIZE_SPECIAL_CHARS);
$mod['mod_img'] = filter_var($_POST['img_mod'],  FILTER_SANITIZE_SPECIAL_CHARS);
$mod['mod_path'] = filter_var($_POST['path_mod'],  FILTER_SANITIZE_SPECIAL_CHARS);
$mod['mod_desc'] = filter_var($_POST['desc_mod'],  FILTER_SANITIZE_SPECIAL_CHARS);
$mod['mod_dev'] = filter_var($_POST['dev_mod'],  FILTER_SANITIZE_SPECIAL_CHARS);

// VARS
$to_user = array();
$time_req = date("Y-m-d H:i:s");

// DB
$table='MICRO_APP';
$fields=getTableFieldsName($table, $conn);

// VALUES

$values=array();

$values[]=NULL;
$values[]=$mod['mod_name'];
$values[]=$mod['mod_desc'];
$values[]=$mod['mod_path'];
$values[]=$mod['mod_img'];
$values[]=$mod['mod_dev'];
$values[]=$time_req;

$bool=insertItem($fields, $values, $table, $conn);

if($bool){
    $to_user['INFO']='Module toegevoegd';
}else{
    $to_user['INFO']='kon module niet toevoegen, probeer opnieuw aub';
}
header("Content-type:application/json");
echo json_encode($to_user);
exit(0);