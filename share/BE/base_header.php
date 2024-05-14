<?php
if($_SERVER['SCRIPT_FILENAME']== __FILE__){
    exit(0);
}
error_reporting(E_ALL);
ini_set('display_errors',1);
date_default_timezone_set('Europe/Brussels');
ini_set('session.gc_maxlifetime', 7200);
session_set_cookie_params(7200); 
include('/var/www/vhosts/happiness22.be/base.php');
define('BASE_APP', DOC_ROOT.'/app');