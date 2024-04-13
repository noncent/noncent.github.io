<?php

/**
 * - WARNING -
 * 
 * DO NOT DELETE BELOW TIMESTAMP CODE - IT WILL HELP YOUR TWEETS TO ACT AS DYNAMIC AND UNIQUE CONTENT
 * 
 * @author Neeraj Singh <neeraj singh sonu at the rate gmail dot com>
 * @version 1.0 release
 * @since 11 April 2021
 */

$timestamp = date('Y-m-d h:i:s');

/**
 * You collection of twitter handle whom you want to add in your message/tweet
 * 
 * @author Neeraj Singh <neeraj singh sonu at the rate gmail dot com>
 * @version 1.0 release
 * @since 11 April 2021
 */

$user_handle[] 	= ['@AutoComplaints', '@TwitterUSA', '@TwitterIndia'];
$user_handle[] 	= ['@MoreHandle', '@evenmorehandle']; // you can delete or add many more

/**
 * You collection of twitter hashtags which you want to add in your message/tweet
 * 
 * @author Neeraj Singh <neeraj singh sonu at the rate gmail dot com>
 * @version 1.0 release
 * @since 11 April 2021
 */

$hashtags[] 		= ['#TwitterAutoTweetsLove', '#TwitterAutoTweetsHeart', '#TwitterAutoTweetsLike', '#TwitterAutoTweetsShare'];
$hashtags[] 		= ['#MoreHashtagsHere', '#EvenMoreHashtagsHere']; // you can delete or add many more

/**
 * You collection of tweets which you want to post randomly in a certain interval
 * 
 * @author Neeraj Singh <neeraj singh sonu at the rate gmail dot com>
 * @version 1.0 release
 * @since 11 April 2021
 */

// English
$tweets[] = '#TwitterAutoTweets will post a tweet in a certain interval automatically on your account';
$tweets[] = 'This tweet is posted by #TwitterAutoTweets';
$tweets[] = 'I am happy that I found this #TwitterAutoTweets';
$tweets[] = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// Hindi
$tweets[] = '#TwitterAutoTweets आपके अकाउंट से ट्वीट कर देता है वो भी अपने आप';
$tweets[] = '#TwitterAutoTweets ने मेरी मदद की ट्वीट पोस्ट करने में';

// Spanish
$tweets[] = '#TwitterAutoTweets publicará un tweet en un cierto intervalo automáticamente en su cuenta';
$tweets[] = 'Este tweet es publicado por #TwitterAutoTweets';
$tweets[] = 'Estoy feliz de haber encontrado este #TwitterAutoTweets';

// Chinese
$tweets[] = '#Twitter自动推文会在一定间隔内自动在您的帐户上发布推文';
$tweets[] = '此推文由#TwitterAutoTweets发布';
$tweets[] = '我很高兴找到这个#TwitterAutoTweets';