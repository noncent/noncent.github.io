<style>table {font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%; } table td, table th {border: 1px solid #ddd; padding: 8px; } table tr:nth-child(even){background-color: #f2f2f2;} table tr:hover {background-color: #ddd;} table th {padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #ccc; color: white; } </style>

<?php
ini_set('display_errors', 1);

// max length of tweets
define('TWEET_LIMIT', 280);
// debug mode on, no tweets only display
define('DEBUG_MODE', TRUE);

require_once('../TweetCollections.php');


global$timestamp;
$collection = [];

foreach($tweets as $i => $tweet) {
	foreach ($hashtags as $key => $hash) {
		foreach ($user_handle as $key => $handle) {
			$collection[] = $tweet.' '.implode(' ', $handle).' '.implode(' ', $hash).' '.$timestamp;
		}
	}
}    

echo '<table>';
echo '<tr><th>#</th><th>Tweet</th><th>:</th><th>Length</th></tr>';
foreach($collection as $i => $val) {
	$count = strlen(utf8_decode($val));
	if($count > TWEET_LIMIT){
		echo "<tr style='color:red'><td>".($i+1)."</td><td>{$val}</td><td>:</td><td>{$count}</td></tr>";
	}else{
		echo "<tr><td>".($i+1)."</td><td>{$val}</td><td>:</td><td>{$count}</td></tr>";
	}
}
echo '</table>';