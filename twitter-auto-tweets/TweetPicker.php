<?php

function TweetPicker()
{
    global $user_handle;
    global $hashtags;
    global $tweets;
    global $timestamp;

    // first lets pick the random hashtags, user handle and tweets
    $user_handle    = $user_handle[rand(0, count($user_handle) - 1)];
    $hashtags       = $hashtags[rand(0, count($hashtags) - 1)];
    $tweets         = $tweets[rand(0, count($tweets) - 1)];

    // now shuffle the hashtags and handles
    shuffle($user_handle);
    shuffle($hashtags);

    $hashtags       = trim(implode(' ', $hashtags));
    $user_handle    = trim(implode(' ', $user_handle));

    $tweet_str      = $tweets.' '.$hashtags.' '.$user_handle.' '.$timestamp;

    // check created tweet length
    // $tweet_length = strlen(utf8_decode($tweet_str));

    // if length is more than allowed exclude user handles
    if (strlen(utf8_decode($tweet_str)) > TWEET_LIMIT) {
        
        $tweet_str      = $tweets.' '.$hashtags.' '.$timestamp;
        
        // if length is more than allowed exclude user hashtags too
        if (strlen(utf8_decode($tweet_str)) > TWEET_LIMIT) {
            $tweet_str      = $tweets.' '.$timestamp;

            // if length is more than allowed halt the script
            if (strlen(utf8_decode($tweet_str)) > TWEET_LIMIT) {
                $tweet_str      = FALSE;
            }
        }

    }
    return $tweet_str;
}
