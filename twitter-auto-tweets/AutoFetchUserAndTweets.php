<?php
#!
# ==================================================================
# Below code will fetch user id and will fatech tweets from timeline
# ==================================================================
#!
#
ini_set('display_errors', 1);

require_once('TwitterAPIExchange.php');

$config = array(
    'oauth_access_token'        => "YOUR_OAUTH_ACCESS_TOKEN",
    'oauth_access_token_secret' => "YOUR_OAUTH_ACCESS_TOKEN_SECRET",
    'consumer_key'              => "YOUR_CONSUMER_KEY",
    'consumer_secret'           => "YOUR_CONSUMER_SECRET"
);

/* ---------------------------------------------------------------------------- */
// Sample to fetch user id
/* ---------------------------------------------------------------------------- */

// name whom you want to get userid
$username = 'TwitterIndia';
// endpoint to get userid by username
$url = "https://api.twitter.com/2/users/by";
// set field
$getfield = "?usernames=$username";
// set api method
$requestMethod = 'GET';

// twitter config
$twitter = new TwitterAPIExchange($config);
// pass teh filed
$get_response = $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();

// get json response and convert as array
$get_response = json_decode($get_response);

echo '<pre>', print_r($get_response, 1);

$user_id = NULL;

// if no error in response
if(!isset($get_response->errors))
{
	// extract user id
	$user = array_shift($get_response->data);
	// set user id
	$user_id = $user->id;

}else{
	die( 'invalid request or parameter' );
}

/* ---------------------------------------------------------------------------- */
// Sample to fetch all tweets by a user
/* ---------------------------------------------------------------------------- */

$url =  "https://api.twitter.com/2/users/{$user_id}/tweets";

// set field
$getfield = "?max_results=10";

$get_response = $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();

// get json response and convert as array
$get_response = json_decode($get_response);

// if no error in response
if(!isset($get_response->errors))
{
	echo '<pre>', print_r($get_response, 1);

}else{
	die( 'invalid request or parameter' );
}

