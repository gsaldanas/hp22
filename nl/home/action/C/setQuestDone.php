<?php
include('../../../../share/BE/base_header.php');
include('../../../../share/BE/secure/is_user_alive.php');
include IS_POST;
include TABLE;
include DBASE;
include INSERT;
include UPDATE;
//GET INFO NEDERLANDS
$conn = $GLOBALS['DB'];
/*------------
* . HELPER
------------*/
function getVraagId($id, $conn)
{
    $sql = "SELECT T_ID FROM MY_V_LIJST WHERE U_ID = " . $id . " AND DATUM_END IS NULL";
    $stmt = $conn->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$result) {
        return FALSE;
    } else {
        return ($result['T_ID']);
    }
}
/* --------------------------
 * POST VARS
 * ---------------------- */
$table = 'PDT77Uat_users';
$uid = $_SESSION['UID'];

$time_req = date("Y-m-d H:i:s");

$order = '';


$info = array();
// . set status user op 1
$update = updateOneField('user_status', 1, 'ID', $uid, $table, $conn);
$vr_id =getVraagId($uid, $conn);
    $update_my_vragen = updateOneField('DATUM_END', $time_req, 'T_ID', $vr_id, 'MY_V_LIJST', $conn);
if ($update) {
    $info['STATUS'] = 200;
    $info['INFO'] = 'UPDATED';
} else {
    $info['STATUS'] = 500;
    $info['INFO'] = 'error';
}
header("Content-type:application/json");
echo json_encode($info);
exit(0);
