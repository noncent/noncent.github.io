<?php
#!
# =========================================================
# Below code will pick a tweet randomly and will post tweet
# =========================================================
#!

ini_set('display_errors', 1);

// max length of tweets
define('TWEET_LIMIT', 280);
// debug mode on, no tweets only display
define('DEBUG_MODE', TRUE);

require_once('TwitterAPIExchange.php');
require_once('TweetCollections.php');
require_once('TweetPicker.php');

// twitter configuration
$config = array
(
    'oauth_access_token'        => "YOUR_OAUTH_ACCESS_TOKEN",
    'oauth_access_token_secret' => "YOUR_OAUTH_ACCESS_TOKEN_SECRET",
    'consumer_key'              => "YOUR_CONSUMER_KEY",
    'consumer_secret'           => "YOUR_CONSUMER_SECRET"
);

// post status endpoint
$url = 'https://api.twitter.com/1.1/statuses/update.json';

// get a random tweet
$tweet_str = TweetPicker();

// post tweet on your account
$post_fields = array(
    'status' => $tweet_str
);

// in case you want to reply on a particular tweet
// $post_fields = array(
//     'status' => '@author_handle '. $tweet_str,
//     'in_reply_to_status_id' => 'author tweet id without quotes',
// );

// endpoint method
$request_method = 'POST';

/** Perform a POST request and echo the response **/
if (!DEBUG_MODE) {
    $twitter = new TwitterAPIExchange($config);
    echo $twitter->buildOauth($url, $request_method) ->setPostfields($post_fields) ->performRequest();
} else {
    $count = strlen(utf8_decode($tweet_str));
    echo "Got it:" . '<br/>' . $tweet_str . "\n" . '<b>',$count;
}
