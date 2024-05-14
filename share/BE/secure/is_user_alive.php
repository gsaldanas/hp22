<?php
if ($_SERVER['SCRIPT_FILENAME'] == __FILE__) {  //magic constant fullpath and filename
    exit(0);
}
if (!isset($_SESSION)) {
  session_start();
  if (!isset($_SESSION['ALIVE'])) {
    exit(0);
  }
}