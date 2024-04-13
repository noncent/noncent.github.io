## TwitterAutoTweets

TwitterAutoTweets is a PHP script that helps you to post a tweet randomly based on your tweet collection. You can add as many as you want tweets and the later script will pick one random tweet and will post it on your timeline.

Create a Twitter app >> Add your tweets, hashtags and handles >> Set Cronjob and done

The idea is to set the tweets and set the cronjob to run the script. Cron will run in every 20 minutes and script will be executed to pick and post a random tweet from the collection
Simple PHP Script to POST Tweets Automatically for Twitter API v1.1 calls. Script is based on [TwitterAPIExchange] (https://github.com/J7mbo/twitter-api-php) 

The aim of this script is simple. You need to:

- Post tweets in a certain interval
- Want to automate tweets if you have lots of tweets to share
- Your tweets will be picked randomly and will be post

You really can't get much simpler than that. The above bullet points are an example of how to use the script for a POST request to make a Tweet.

Installation
------------

**Normally:** If you *don't* use composer, don't worry - just include TwitterAPIExchange.php in your application.

```php
require_once('TwitterAPIExchange.php');
```

**Via Composer:**

```bash
composer require j7mbo/twitter-api-php
```

How To Use
----------

#### Set access tokens ####

```php
$config = array(
    'oauth_access_token'        => "YOUR_OAUTH_ACCESS_TOKEN",
    'oauth_access_token_secret' => "YOUR_OAUTH_ACCESS_TOKEN_SECRET",
    'consumer_key'              => "YOUR_CONSUMER_KEY",
    'consumer_secret'           => "YOUR_CONSUMER_SECRET"
);
```

#### Below endpoint will post a tweet ####

```php
$url = 'https://api.twitter.com/1.1/statuses/update.json';
$request_method = 'POST';
```

#### POST method ####

```php
$post_fields = array(
    'status' => 'Hello! Twitter, How are you today?'
);
```

#### Perform the request! ####

```php
$twitter = new TwitterAPIExchange($config);
echo $twitter->buildOauth($url, $request_method)
    ->setPostfields($postfields)
    ->performRequest();
```

GET all your tweets
-------------------

```php
require_once('TwitterAPIExchange.php');

$config = array(
    'oauth_access_token'        => "YOUR_OAUTH_ACCESS_TOKEN",
    'oauth_access_token_secret' => "YOUR_OAUTH_ACCESS_TOKEN_SECRET",
    'consumer_key'              => "YOUR_CONSUMER_KEY",
    'consumer_secret'           => "YOUR_CONSUMER_SECRET"
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

$url =  "https://api.twitter.com/2/users/{$user_id}/tweets";

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
```

## Creating a new Twitter application
[Creating A Twitter Application](https://docs.wpwebelite.com/social-network-integration/twitter/)
Thank you :)
