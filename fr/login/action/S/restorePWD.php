<?php
include('../../../../share/BE/base_header.php');

include DBASE;
include TABLE;
include INSERT;
include UPDATE;
include DELETE;

/* ---------------------
 *  Create headers
  ------------------- */

function makeHeaders($from)
{
    $headers = 'From: ' . $from . "\r\n";
    //$headers .= 'Reply-To: ' . $reply_email . "\r\n";
    $headers .= 'Content-Type: text/html; charset=ISO-8859-1' . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();
    return $headers;
}

/* -------------------
 *   DECREMENT PROBES
  -------------------- */
function decrementProbes($val, $aantal, $conn)
{
    $new_aantal = $aantal - 1;
    // updateOneField($field, $value, $id_field, $id_value, $table, $conn)
    return (updateOneField('PROBES', $new_aantal, 'COOKIE', $val, 'PW_SESSION', $conn));
}
/* -------------------
 * MAIN
  -------------------- */

if (!isset($_POST['TOKEN'])) {
    echo 'no post data';
    exit();
}

/* ---------------------
 *  vars
  ------------------- */
$resp = array();
$Credentials = array();
$today = date("Y-m-d H:i:s");
$conn = $GLOBALS['DB'];
$status = FALSE;
$uid = 0;
/* ---------------------
 * Retrieve post data
  ------------------- */
//FILTER_VALIDATE_EMAIL
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL, FILTER_SANITIZE_EMAIL);
$token = filter_var($_POST['TOKEN'],  FILTER_SANITIZE_SPECIAL_CHARS);
$cookie = filter_var($_POST['COOKIE'], FILTER_SANITIZE_SPECIAL_CHARS);
/* -----------------------------
 * mail gegevens
  ------------------------- */
$from = 'noreply@happiness22.be';

$subject = 'Demander un nouveau mot de passe';

$message= '<h3>Demander un nouveau mot de passe</h3>';

$message .= '  Cliquez sur le lien pour changer votre mot de passe <br>';

/* -----------------------------------
 *  Check of mail bestaat
  ------------------------------------ */
//existEntryInTable($field, $value, $table, $conn)
$existMail = existEntryInTable('user_email', $email, 'PDT77Uat_users',  $conn);

if ($existMail) {
    //getValueField($search, $field, $value, $table, $conn) 
    $uid = getValueField('ID', 'user_email', $email, 'PDT77Uat_users', $conn);
    //selectAllOnValue($field, $value, $table, $order, $conn)  
    $Credentials = selectAllOnValue('TOKEN', $token, 'PW_SESSION', '', $conn);
    /* ---------------------
     * MAIL
      ------------------------- */

    $to = $email;
    $token_restore = bin2hex(openssl_random_pseudo_bytes(24)); //48 bits 
    $folder = '/app/fr/restore/action/bba08facec60bb175aec7f4c24cb1a89';
    $script = '/restore.html?token=' . $token_restore;
    // // insertItem($fields_arr, $values_arr, $table, $conn)
    $bool = insertItem(['UID', 'TOKEN', 'COOKIE', 'DATUM', 'EXPIRED'], [$uid, $token_restore, $cookie, $today, 1], 'RESET_PWD', $conn);

    $link_restore = 'https://' . $_SERVER['SERVER_NAME'] . $folder . $script;
    $message .= $link_restore;

    if ($bool) {
        $status = mail($to, $subject, $message, makeHeaders($from));
    }
}
/* -----------------------------------
 *  email bestaat niet
  ------------------------------------ */ 

  else {
    $aantal_probes = getValueField('PROBES', 'TOKEN', $token, 'PW_SESSION', $conn);
    if ($aantal_probes == 0) {
        //deleteManyRows($item_field, $item_value, $table, $conn) 
        $bool = deleteManyRows('COOKIE', $cookie, 'PW_SESSION', $conn);

        if ($bool) {
            $resp['MAIL_STATUS'] = 'NOK';
            $resp['MAX_PROBES'] = TRUE;
        }
    } else {
        $bool = decrementProbes($cookie, $aantal_probes, $conn);
        $resp['MAIL_STATUS'] = 'NOK';
        $resp['MAX_PROBES'] = FALSE;
    }
}

if ($status) {
    $resp['MAIL_STATUS'] = 'OK';
    $resp['MAX_PROBES'] = FALSE;
}

/* ---------------------
 *  Response
  ------------------- */


$resp['CRED'] = $Credentials;

header("Content-type:application/json");

echo json_encode($resp);
