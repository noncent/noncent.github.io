<?php
if (!function_exists('pre')) {
    function pre($anything = 'PARAMETER_MISSING', $die = FALSE)
    {
        echo '<pre>', print_r($anything, TRUE), '</pre>';
        if ($die) die();
    }
}

if (!function_exists('dump')) {
    function dump($anything = 'PARAMETER_MISSING', $die = FALSE)
    {
        echo '<pre>', var_dump($anything), '</pre>';
        if ($die) die();
    }
}

if (!function_exists('json_success')) {
    function json_success($message = NULL, $data = NULL)
    {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'Success', 'message' => $message, 'data' => $data]);
    }
}

if (!function_exists('json_error')) {
    function json_error($message = NULL, $data = NULL)
    {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'Error', 'message' => $message, 'data' => $data]);
    }
}

if (!function_exists('time_ago')) {
    function time_ago($timestamp = '')
    {
        if($timestamp)
        {
            return timespan(strtotime($timestamp), time());
        }
        return timespan(time(), time());
    }
}


