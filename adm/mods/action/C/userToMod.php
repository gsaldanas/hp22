
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
$mod['mid'] = filter_var($_POST['mid'],  FILTER_SANITIZE_SPECIAL_CHARS);

// VARS
$to_user = array();
$time_req = date("Y-m-d H:i:s");

// DB
$table = 'USER_MODS';

//user has module?

$key1 = 'uid';
$val1 = $mod['uid'];
$key2 = 'mid';
$val2 = $mod['mid'];

$hasModule = existEntryDualKey($key1, $key2, $val1, $val2, $table, $conn);

if ($hasModule) {
    $to_user['INFO'] = 'User heeft deze module al!! ';
} else {

    $fields = getTableFieldsName($table, $conn);

    $mod_naam=getValueField('ma_naam','MA_ID', $mod['mid'], 'MICRO_APP', $conn);
    // VALUES
    $values = array();

    $values[] = NULL;
    $values[] = $mod['uid'];
    $values[] = $mod['mid'];
    $values[] = $mod_naam;
    $values[] = $time_req;

    $bool = insertItem($fields, $values, $table, $conn);

    if ($bool) {
        $to_user['INFO'] = 'Module aan user toegevoegd';
    } else {
        $to_user['INFO'] = 'kon module niet toevoegen aan user, probeer opnieuw aub';
    }
}
header("Content-type:application/json");
echo json_encode($to_user);
exit(0);
