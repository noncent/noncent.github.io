<?php
$json = file_get_contents('response.json');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$json =  str_replace('{{$timestamp}}', time(), $json);
echo $json;
