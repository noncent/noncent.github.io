var totalTweet = '',
	positiveTweet = '',
	negativeTweet = '';

var tweetData = {};

window.addEventListener("DOMContentLoaded", function(e) {

	var stage = document.getElementById("stage");

	var fadeComplete = function(e) {
		stage.removeChild(arr[0]);
			$(".zoomOut, zoomOut1, .zoomOut1-1, .zoomOut1-2, .zoomOut1-3").hide();

		if (document.getElementById("stage").childElementCount === 1){
			//do something
			$(".zoomOut, .zoomOut1, .zoomOut1-1, .zoomOut1-2, .zoomOut1-3, #stage").hide();
			$(".zoomOut2").show();

			setTimeout(function() {
				getTweets();
				$(".zoomOut2 .tweetLogo").show();
				$(".zoomOut2 .ml1").css("font-size","9rem");

				// Wrap every letter in a span
				var textWrapper = document.querySelector('.ml1 .letters');
				textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

				anime.timeline({loop: false})
				.add({
					targets: '.ml1 .letter',
					scale: [0.3,1],
					opacity: [0,1],
					translateZ: 0,
					easing: "easeOutExpo",
					duration: 900,
					delay: function(el, i) {
						return 70 * (i+1);
					}
				}).add({
					targets: '.ml1',
					opacity: 0,
					duration: 1300,
					easing: "easeOutExpo",
					delay: 1000
				});
			}, 2000);

			// setTimeout(function() {
			// 	$(".zoomOut2 .ml1").addClass("moveDown");
			// }, 2950);

			setTimeout(function() {
				$(".zoomOut2 .tweetLogo").fadeOut(1000);
			}, 3500);

			setTimeout(function() {
				$(".zoomOut2 .ml1").fadeOut(1000);
			}, 5500);

			setTimeout(function() {
				$(".zoomOut2 h3").fadeOut(600);
			}, 6300);

			setTimeout(function() {
				$(".twitterWrapper").show();
			}, 6500);
			setTimeout(function() {
				var firstTweet = document.getElementById("firstTweet");

				firstTweet.addEventListener("animationend", function() {
					$(".tweetZoomWrapper").addClass("zoomTweetOver");
				});
			}, 6500);
			setTimeout(function() {   
				$('.zoomTweetOver').animate({
					top: '-1295'
				}, 900);
				// $(".twitterWrapper .tweetLastWrapper ").show();
				var lastTweet = document.getElementById("lastTweet");

				lastTweet.addEventListener("animationend", function() {
					$(".totalTweet .count").text(tweetData.total);
					// $(".zoomOut2 .zoomOutSlow").hide();
					$(".zoomOut2 .zoomOutSlow, .zoomOut2 .twitterWrapper").hide();
					$(".zoomOut2").fadeOut(100);
					$(".zoomOut3").fadeIn(100);
					speedoTitleFront();
					setTimeout(function() {
						speedoMeterSignal();
					},1000);
					
					dropTextHappy();
					dropTextAngry();
					counter();
				});
			}, 11000);
		}
	};
	var arr = stage.getElementsByTagName("h2");
	for (var i = 0; i < arr.length; i++) {
		// if (i+2 == arr.length) { break; }
		arr[i].addEventListener("animationend",fadeComplete, false);
		// arr[i].off();
	}


}, false);


function getTweets() {
	var settings = {
		// "url": "https://73oskjeyha.execute-api.us-west-2.amazonaws.com/staging/api/v1/proximafb40/5d5b9e5e914e390001ae88e2/tweets/74025868-6181-4fc5-a9ed-d165a747c926",
		"url": "http://localhost/wetweets/api/GetTweets.php",
		"method": "GET",
	};
	$.ajax(settings).done(function (response) {
		tweetData = response;
		totalTweet = response.total;
		positiveTweet = response.sentiment.positive;
		negativeTweet = response.sentiment.negative;
		var _inlinecss = '';
		for (var i = 1; i < response.users.length; i++) {
			if (i < response.users.length-1) {
				_inlinecss += ".twitterWrapper .tweetSlideWrapper ul li:nth-child("+i+"){animation-delay:"+i*4+".2s}";
			} else {
				_inlinecss += ".twitterWrapper .tweetLastWrapper ul li{animation-delay:"+i*4+".3s}";
				// _inlinecss += ".twitterWrapper .tweetLastWrapper ul li{animation-duration:"+i*5+"s}";
			}
		}
		$("#preStyle").html(_inlinecss);
		$.each(response.users, function(key, val){
			// var dateString = new Date(parseInt(val.timestamp.substr(6)));
			// var dateString = "\/Date('+val.timestamp+')\/".substr(6);
			var currentTime = new Date(parseInt(val.timestamp)*1000);
			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			// var month = currentTime.getMonth() + 1;
			var month = monthNames[currentTime.getMonth()];
			var day = currentTime.getDate();
			var year = currentTime.getFullYear();
			var date = day + ' ' + month + " " + year;
			if (key===0) {
				$(".twitterWrapper").append("<div class='tweetZoomWrapper' id='firstTweet'><ul></ul></div>");
				$(".twitterWrapper .tweetZoomWrapper ul").append('<li><div class="tweetHead clearfix"><div class="headLeft"><img src="'+val.profile_image_url+'" class="profile"><div class="nameWrapper"><div class="name">'+val.screen_name+'</div><div class="atTweet">@Twitter</div></div></div><div class="headRight"><img src="http://dev.wetweet.com/ui/html/assets/images/tweet-blue-logo.svg" class="tweetProfileLogo"></div></div><div class="tweetBody">'+val.text+'</div><div class="tweetFoot clearfix"><div class="footLeft"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-reply.svg"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-retweet.svg"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-like.svg"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-sms.svg"></div><div class="footRight">'+date+'</div></div></li>');

			} else if (key===1) {
				$(".twitterWrapper").append("<div class='tweetSlideWrapper'><ul></ul></div>");
			} else if (key===response.users.length-1) {
				$(".twitterWrapper").append("<div class='tweetLastWrapper'><ul></ul></div>");
				$(".twitterWrapper .tweetLastWrapper ul").append('<li id="lastTweet"><div class="tweetHead clearfix"><div class="headLeft"><img src="'+val.profile_image_url+'" class="profile"><div class="nameWrapper"><div class="name">'+val.screen_name+'</div><div class="atTweet">@Twitter</div></div></div><div class="headRight"><img src="http://dev.wetweet.com/ui/html/assets/images/tweet-blue-logo.svg" class="tweetProfileLogo"></div></div><div class="tweetBody">'+val.text+'</div><div class="tweetFoot clearfix"><div class="footLeft"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-reply.svg"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-retweet.svg"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-like.svg"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-sms.svg"></div><div class="footRight">'+date+'</div></div></li>');

			}
			if (key>0 && key < response.users.length-1) {
				$(".twitterWrapper .tweetSlideWrapper ul").append('<li><div class="tweetHead clearfix"><div class="headLeft"><img src="'+val.profile_image_url+'" class="profile"><div class="nameWrapper"><div class="name">'+val.screen_name+'</div><div class="atTweet">@Twitter</div></div></div><div class="headRight"><img src="http://dev.wetweet.com/ui/html/assets/images/tweet-blue-logo.svg" class="tweetProfileLogo"></div></div><div class="tweetBody">'+val.text+'</div><div class="tweetFoot clearfix"><div class="footLeft"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-reply.svg"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-retweet.svg"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-like.svg"><img src="http://dev.wetweet.com/ui/html/assets/images/bg-sms.svg"></div><div class="footRight">'+date+'</div></div></li>');
			}
		});
	});
	// $.ajax({
	// 	url: "assets/data/twitter.json",
	// 	dataType: "JSON",
	// 	type: "GET",
	// 	success: function(data) {
	// 		console.log(data);
	// 	}
	// });
}

function speedoTitleFront() {

	var textWrapper = document.querySelector('.speedoTitleFront');
	textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

	anime.timeline({loop: false})
	.add({
		targets: '.speedoTitleFront .letter',
		opacity: [0,1],
		easing: "easeInOutQuad",
		duration: 21,
		delay: function(el, i) {
			return 51 * (i+1);
		}
	}).add({
		targets: '.speedoTitleFront',
		opacity: 1,
		duration: 11,
		easing: "easeOutExpo",
		delay: 0
	});

}
// Speedo Meter START
function speedoMeterSignal() {
	var happy, neutral, angry, total,speedDegree, emojiTotal, emoji;
	// happy = tweetData.sentiment.positive;
	happy = 95;
	neutral = 0;
	// angry = tweetData.sentiment.negative;
	angry = 5;
	total = happy+angry;
	speedDegree = '';
	emoji = 0;
	emojiTotal = 25;

	if(happy>angry)
	{	
		$(".needle").addClass("moreHappy");
		$(".zoomOut3 .bubble").addClass("happy");
		$(".needle").removeClass("moreNeutral");
		$(".needle").removeClass("moreAngry");
		$(".zoomOut3 .bubble").removeClass("neutral");
		$(".zoomOut3 .bubble").removeClass("angry");
		speedDegree = (happy/total)*84;
		emoji = Math.ceil((happy*emojiTotal)/100);

		var elem1 = $(".moreHappy");

		$({deg: 84}).animate({deg: speedDegree}, {
			duration: 1000,
			step: function(now){
				elem1.css({
					transform: "rotate(-" + now + "deg)"
				});
			}
		});

		for (var i = 0; i < emoji+1; i++) {
			$("#background-wrap .bubble:nth-child("+i+")").css("display","block");
		}
	}
	else if(happy===angry)
	{
		$(".needle").addClass("moreNeutral");
		$(".zoomOut3 .bubble").addClass("neutral");
		$(".needle").removeClass("moreHappy");
		$(".needle").removeClass("moreAngry");
		$(".zoomOut3 .bubble").removeClass("happy");
		$(".zoomOut3 .bubble").removeClass("angry");
		speedDegree = -6;
		$("#background-wrap .bubble").css("display","block");

		var elem2 = $(".moreNeutral");

		$({deg: -84}).animate({deg: speedDegree}, {
			duration: 2000,
			step: function(now){
				elem2.css({
					transform: "rotate(" + now + "deg)"
				});
			}
		});
	}
	else if(angry>happy && angry>happy)
	{
		$(".needle").addClass("moreAngry");
		$(".zoomOut3 .bubble").addClass("angry");
		$(".face").addClass("moreAngryFace");
		$(".needle").removeClass("moreNeutral");
		$(".needle").removeClass("moreHappy");
		$(".zoomOut3 .bubble").removeClass("happy");
		$(".zoomOut3 .bubble").removeClass("neutral");
		speedDegree = (angry/total)*84;
		emoji = Math.ceil((angry*emojiTotal)/100);

		var elem3 = $(".moreAngry");

		$({deg: -84}).animate({deg: speedDegree}, {
			duration: 2000,
			step: function(now){
				elem3.css({
					transform: "rotate(" + now + "deg)"
				});
			}
		});

		for (var k = 0; k < emoji+1; k++) {
			$("#background-wrap .bubble:nth-child("+k+")").css("display","block");
		}
	}

	$("#background-wrap").show();
}

// Speedo Meter END

function dropTextHappy() {
	// Wrap every letter in a span
	var textWrapper = document.querySelector('.happy');
	textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='happyLetter'>$&</span>");

	anime.timeline({loop: false})
	.add({
		targets: '.happy .happyLetter',
		translateY: [-100,0],
		easing: "easeOutExpo",
		duration: 1400,
		delay: function(el, i) {
			return 101 * i;
		}
	}).add({
		targets: '.happy',
		// opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 1000
	});
}

function dropTextAngry() {
	// Wrap every letter in a span
	var textWrapper = document.querySelector('.angry');
	textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='angryLetter'>$&</span>");

	anime.timeline({loop: false})
	.add({
		targets: '.angry .angryLetter',
		translateY: [-100,0],
		easing: "easeOutExpo",
		duration: 1400,
		delay: function(el, i) {
			return 101 * i;
		}
	}).add({
		targets: '.angry',
		// opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 1000
	});
}

function dropTextNTBack() {

	// Wrap every letter in a span
	var textWrapper = document.querySelector('.noTweetBack');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='noTweetBackLetter'>$&</span>");

	anime.timeline({loop: false})
	.add({
		targets: '.noTweetBack .noTweetBackLetter',
		opacity: [0,1],
		// translateY: [-10, 0],
		easing: "easeInOutQuad",
		duration: 51,
		// delay: (el, i) => 150 * (i+1)
		delay: function(el, i) {
			return 11 * (i+1);
		}
	}).add({
		targets: '.noTweetBack',
		// opacity: 1,
		duration: 100,
		easing: "easeOutExpo",
		delay: 0
	});


	// Wrap every letter in a span
	// var textWrapper = document.querySelector('.noTweetBack');
	// textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='noTweetBackLetter'>$&</span>");

	// anime.timeline({loop: false})
	// .add({
	// 	targets: '.noTweetBack .noTweetBackLetter',
	// 	translateX: [51, 0],
	// 	easing: "easeInOutQuad",
	// 	duration: 11,
	// 	delay: function(el, i) {
	// 		return 25 * i;
	// 	}
	// }).add({
	// 	targets: '.noTweetBack',
	// 	// opacity: 0,
	// 	duration: 100,
	// 	easing: "easeOutExpo",
	// 	delay: 0
	// });
}

function dropTextNTFront() {

	// Wrap every letter in a span
	var textWrapper = document.querySelector('.noTweetFront');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='noTweetFrontLetter'>$&</span>");

	anime.timeline({loop: false})
	.add({
		targets: '.noTweetFront .noTweetFrontLetter',
		opacity: [0,1],
		translateY: [-10, 0],
		easing: "easeInOutQuad",
		duration: 100,
		// delay: (el, i) => 150 * (i+1)
		delay: function(el, i) {
			return 21 * (i+1);
		}
	}).add({
		targets: '.noTweetFront',
		opacity: 1,
		duration: 100,
		easing: "easeOutExpo",
		delay: 0
	});

	// // Wrap every letter in a span
	// var textWrapper = document.querySelector('.noTweetFront');
	// textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='noTweetFrontLetter'>$&</span>");

	// anime.timeline({loop: false})
	// .add({
	// 	targets: '.noTweetFront .noTweetFrontLetter',
	// 	translateX: [951, 0],
	// 	easing: "easeInOutQuad",
	// 	opacity: 1,
	// 	duration: 100,
	// 	delay: function(el, i) {
	// 		return 120 * i;
	// 	}
	// }).add({
	// 	targets: '.noTweetFront',
	// 	opacity: 1,
	// 	duration: 100,
	// 	easing: "easeOutExpo",
	// 	delay: 0
	// });
}

function counter() {
	$('.count').each(function () {
		$(this).prop('Counter',0).animate({
			Counter: $(this).text()
		}, {
			duration: 1500,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});
	});
}


$(document).ready(function(){
	function whichAnimationEvent() {
		var t,
			el = document.createElement("fakeelement");

		var animations = {
			"animation": "animationend",
			"OAnimation": "oAnimationEnd",
			"MozAnimation": "animationend",
			"WebkitAnimation": "webkitAnimationEnd"
		};

		for (t in animations) {
			if (el.style[t] !== undefined) {
				return animations[t];
			}
		}
	}

	var animationEvent = whichAnimationEvent();


	$(".zoomOut .bouncein").one(animationEvent, function(event) {
		// Do something when the animation ends
		// $(".zoomOut").hide();
		setTimeout(function() {
			$(".zoomOut1").fadeIn(0);
			// $(".zoomOut1 h2").fadeIn(0);
			$(".zoomOut1 .logoTransparent").fadeIn(0);
			$(".zoomOut .bouncein").hide();
		}, 500);
		setTimeout(function() {
			$(".zoomOut1 .logoTransparent").hide();
		}, 1200);
		
	});

	$(".zoomOut1 img, .zoomOut1 h2").one(animationEvent, function(event) {
		// Do something when the animation ends
		$(".zoomOut, .zoomOut1").hide();
		$(".zoomOut1-1").show();
	});

	$(".zoomOut1-1 img, .zoomOut1-1 h2").one(animationEvent, function(event) {
		// Do something when the animation ends
		$(".zoomOut, .zoomOut1, .zoomOut1-1").hide();
		$(".zoomOut1-2").show();
	});

	$(".zoomOut1-2 img, .zoomOut1-2 h2").one(animationEvent, function(event) {
		// Do something when the animation ends
		$(".zoomOut, .zoomOut1, .zoomOut1-1, .zoomOut1-2").hide();
		$(".zoomOut1-3").show();
	});

	$(".zoomOut1-3 img, .zoomOut1-3 h2").one(animationEvent, function(event) {
		// Do something when the animation ends
		$(".zoomOut, .zoomOut1, .zoomOut1-1, .zoomOut1-2, .zoomOut1-3").hide();
		$("#stage").show();
	});

	$(".zoomOut2 .zoomOutSlow").one(animationEvent, function(event) {
		// Do something when the animation ends
		$(".zoomOut, .zoomOut1, .zoomOut1-1, .zoomOut1-2, .zoomOut1-3, #stage").hide();
	});

	$(".zoomOut3 #background-wrap").one(animationEvent, function(event) {
		// Do something when the animation ends
		$(".zoomOut, .zoomOut1, .zoomOut1-1, .zoomOut1-2, .zoomOut1-3, #stage, .zoomOut2").hide();

		setTimeout(function() {
			if ($(".zoomOut3 .face").hasClass("moreAngryFace")) {
				$(".zoomOut3 .face").removeClass("moreAngryFace").addClass("moreAngryFaceRed");
			}
			$(".zoomOut3 #background-wrap").hide();
			$('.zoomOut3').children().wrapAll("<div class='zoomOutSpeedoWrapper'></div>");
		}, 8000);
		setTimeout(function() {
			$(".zoomOut3").fadeOut(5);
			$(".zoomOut4").fadeIn(10);
			// $(".zoomOut3").hide();
			// $(".zoomOut4").show();
			dropTextNTBack();
			dropTextNTFront();
		}, 9500);
		setTimeout(function() {
			$(".zoomOut4 .noTweetWrapper").addClass("noTweetFadeOut");
		}, 13500);
		setTimeout(function() {
			$(".zoomOut5").fadeIn(100);
			$(".zoomOut4").fadeOut(700);
		}, 13500);
	});

	$(".zoomOut5 .logoWithText").one(animationEvent, function(event) {
		// Do something when the animation ends
		$(".zoomOut5 .logoTextWrapper").addClass("afterZoom");
		$(".zoomOut5 .logoWithText").addClass("moveLogoLeft");
		// setTimeout(function() {
		// 	$(".zoomOut5 .logoWithText").addClass("moveLogoLeft");
		// }, 200);
		setTimeout(function() {
			$(".zoomOut5 .weTweetWrapper").addClass("show");
		}, 100);
		setTimeout(function() {
			$(".zoomOut5 .afterZoom").addClass("logoTextWrapperInner");
			$(".zoomOut5 .logoWithText").removeClass("moveLogoLeft").addClass("moveLogoRight");
			$(".zoomOut5 .weTweetWrapper").removeClass("show").addClass("hide");
		}, 2000);
	});
	
});

$(window).on("load", function () {
});