<?php
header('Content-Type: application/json');
$epics = !empty($_GET['epics']) ? '--epics '.$_GET['epics'] : '';
$users = !empty($_GET['users']) ? '--users '.$_GET['users'] : '';

echo `node ../src/task/server.js $epics $users`;



