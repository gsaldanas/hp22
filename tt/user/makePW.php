<?php

$pw_sarah=password_hash(trim('sarac24eh'),PASSWORD_DEFAULT);

$pw_guy=password_hash(trim('guyr0b22k'),PASSWORD_DEFAULT);

echo 'sara --> .   '.  $pw_sarah;

echo '<br/><br/>';

echo 'guy ---> ' .  $pw_guy;