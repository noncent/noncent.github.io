var totalTweet="",positiveTweet="",negativeTweet="",tweetData={};function getTweets(){$.ajax({url:api_endpoint,method:"GET"}).done(function(n){totalTweet=(tweetData=n).total,positiveTweet=n.sentiment.positive,negativeTweet=n.sentiment.negative;for(var e="",t=1;t<n.users.length;t++)t<n.users.length-1?e+=".twitterWrapper .tweetSlideWrapper ul li:nth-child("+t+"){animation-delay:"+4*t+".2s}":e+=".twitterWrapper .tweetLastWrapper ul li{animation-delay:"+4*t+".3s}";$("#preStyle").html(e),$.each(n.users,function(e,t){var o=new Date(parseInt(t.timestamp)*1000),a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][o.getMonth()],s=o.getDate()+" "+a+" "+o.getFullYear();0===e?($(".twitterWrapper").append("<div class='tweetZoomWrapper' id='firstTweet'><ul></ul></div>"),$(".twitterWrapper .tweetZoomWrapper ul").append('<li><div class="tweetHead clearfix"><div class="headLeft"><img src="'+t.profile_image_url+'" class="profile"><div class="nameWrapper"><div class="name">'+t.screen_name+'</div><div class="atTweet">@Twitter</div></div></div><div class="headRight"><img src="'+base_url+'/public/assets/images/tweet-blue-logo.svg" class="tweetProfileLogo"></div></div><div class="tweetBody">'+t.text+'</div><div class="tweetFoot clearfix"><div class="footLeft"><img src="'+base_url+'/public/assets/images/bg-reply.svg"><img src="'+base_url+'/public/assets/images/bg-retweet.svg"><img src="'+base_url+'/public/assets/images/bg-like.svg"><img src="'+base_url+'/public/assets/images/bg-sms.svg"></div><div class="footRight">'+s+"</div></div></li>")):1===e?$(".twitterWrapper").append("<div class='tweetSlideWrapper'><ul></ul></div>"):e===n.users.length-1&&($(".twitterWrapper").append("<div class='tweetLastWrapper'><ul></ul></div>"),$(".twitterWrapper .tweetLastWrapper ul").append('<li id="lastTweet"><div class="tweetHead clearfix"><div class="headLeft"><img src="'+t.profile_image_url+'" class="profile"><div class="nameWrapper"><div class="name">'+t.screen_name+'</div><div class="atTweet">@Twitter</div></div></div><div class="headRight"><img src="'+base_url+'/public/assets/images/tweet-blue-logo.svg" class="tweetProfileLogo"></div></div><div class="tweetBody">'+t.text+'</div><div class="tweetFoot clearfix"><div class="footLeft"><img src="'+base_url+'/public/assets/images/bg-reply.svg"><img src="'+base_url+'/public/assets/images/bg-retweet.svg"><img src="'+base_url+'/public/assets/images/bg-like.svg"><img src="'+base_url+'/public/assets/images/bg-sms.svg"></div><div class="footRight">'+s+"</div></div></li>")),0<e&&e<n.users.length-1&&$(".twitterWrapper .tweetSlideWrapper ul").append('<li><div class="tweetHead clearfix"><div class="headLeft"><img src="'+t.profile_image_url+'" class="profile"><div class="nameWrapper"><div class="name">'+t.screen_name+'</div><div class="atTweet">@Twitter</div></div></div><div class="headRight"><img src="'+base_url+'/public/assets/images/tweet-blue-logo.svg" class="tweetProfileLogo"></div></div><div class="tweetBody">'+t.text+'</div><div class="tweetFoot clearfix"><div class="footLeft"><img src="'+base_url+'/public/assets/images/bg-reply.svg"><img src="'+base_url+'/public/assets/images/bg-retweet.svg"><img src="'+base_url+'/public/assets/images/bg-like.svg"><img src="'+base_url+'/public/assets/images/bg-sms.svg"></div><div class="footRight">'+s+"</div></div></li>")})})}function speedoTitleFront(){var e=document.querySelector(".speedoTitleFront");e.innerHTML=e.textContent.replace(/([^\x00-\x80]|\w)/g,"<span class='letter'>$&</span>"),anime.timeline({loop:!1}).add({targets:".speedoTitleFront .letter",opacity:[0,1],easing:"easeInOutQuad",duration:21,delay:function(e,t){return 51*(t+1)}}).add({targets:".speedoTitleFront",opacity:1,duration:11,easing:"easeOutExpo",delay:0})}function speedoMeterSignal(){var e,t,o,a,s;if(0,o=(e=tweetData.sentiment.positive)+(t=tweetData.sentiment.negative),a="",s=0,25,t<e){$(".needle").addClass("moreHappy"),$(".zoomOut3 .bubble").addClass("happy"),$(".needle").removeClass("moreNeutral"),$(".needle").removeClass("moreAngry"),$(".zoomOut3 .bubble").removeClass("neutral"),$(".zoomOut3 .bubble").removeClass("angry"),a=e/o*84,s=Math.ceil(25*e/100);var n=$(".moreHappy");$({deg:84}).animate({deg:a},{duration:1e3,step:function(e){n.css({transform:"rotate(-"+e+"deg)"})}});for(var i=0;i<s+1;i++)$("#background-wrap .bubble:nth-child("+i+")").css("display","block")}else if(e===t){$(".needle").addClass("moreNeutral"),$(".zoomOut3 .bubble").addClass("neutral"),$(".needle").removeClass("moreHappy"),$(".needle").removeClass("moreAngry"),$(".zoomOut3 .bubble").removeClass("happy"),$(".zoomOut3 .bubble").removeClass("angry"),a=-6,$("#background-wrap .bubble").css("display","block");var r=$(".moreNeutral");$({deg:-84}).animate({deg:a},{duration:2e3,step:function(e){r.css({transform:"rotate("+e+"deg)"})}})}else if(e<t&&e<t){$(".needle").addClass("moreAngry"),$(".zoomOut3 .bubble").addClass("angry"),$(".face").addClass("moreAngryFace"),$(".needle").removeClass("moreNeutral"),$(".needle").removeClass("moreHappy"),$(".zoomOut3 .bubble").removeClass("happy"),$(".zoomOut3 .bubble").removeClass("neutral"),a=t/o*84,s=Math.ceil(25*t/100);var d=$(".moreAngry");$({deg:-84}).animate({deg:a},{duration:2e3,step:function(e){d.css({transform:"rotate("+e+"deg)"})}});for(var u=0;u<s+1;u++)$("#background-wrap .bubble:nth-child("+u+")").css("display","block")}$("#background-wrap").show()}function dropTextHappy(){var e=document.querySelector(".happy");e.innerHTML=e.textContent.replace(/([^\x00-\x80]|\w)/g,"<span class='happyLetter'>$&</span>"),anime.timeline({loop:!1}).add({targets:".happy .happyLetter",translateY:[-100,0],easing:"easeOutExpo",duration:1400,delay:function(e,t){return 101*t}}).add({targets:".happy",duration:1e3,easing:"easeOutExpo",delay:1e3})}function dropTextAngry(){var e=document.querySelector(".angry");e.innerHTML=e.textContent.replace(/([^\x00-\x80]|\w)/g,"<span class='angryLetter'>$&</span>"),anime.timeline({loop:!1}).add({targets:".angry .angryLetter",translateY:[-100,0],easing:"easeOutExpo",duration:1400,delay:function(e,t){return 101*t}}).add({targets:".angry",duration:1e3,easing:"easeOutExpo",delay:1e3})}function dropTextNTBack(){var e=document.querySelector(".noTweetBack");e.innerHTML=e.textContent.replace(/\S/g,"<span class='noTweetBackLetter'>$&</span>"),anime.timeline({loop:!1}).add({targets:".noTweetBack .noTweetBackLetter",opacity:[0,1],easing:"easeInOutQuad",duration:51,delay:function(e,t){return 11*(t+1)}}).add({targets:".noTweetBack",duration:100,easing:"easeOutExpo",delay:0})}function dropTextNTFront(){var e=document.querySelector(".noTweetFront");e.innerHTML=e.textContent.replace(/\S/g,"<span class='noTweetFrontLetter'>$&</span>"),anime.timeline({loop:!1}).add({targets:".noTweetFront .noTweetFrontLetter",opacity:[0,1],translateY:[-10,0],easing:"easeInOutQuad",duration:100,delay:function(e,t){return 21*(t+1)}}).add({targets:".noTweetFront",opacity:1,duration:100,easing:"easeOutExpo",delay:0})}function counter(){$(".count").each(function(){$(this).prop("Counter",0).animate({Counter:$(this).text()},{duration:1500,easing:"swing",step:function(e){$(this).text(Math.ceil(e))}})})}window.addEventListener("DOMContentLoaded",function(e){for(var t=document.getElementById("stage"),o=function(e){t.removeChild(a[0]),$(".zoomOut, zoomOut1, .zoomOut1-1, .zoomOut1-2, .zoomOut1-3").hide(),1===document.getElementById("stage").childElementCount&&($(".zoomOut, .zoomOut1, .zoomOut1-1, .zoomOut1-2, .zoomOut1-3, #stage").hide(),$(".zoomOut2").show(),setTimeout(function(){getTweets(),$(".zoomOut2 .tweetLogo").show(),$(".zoomOut2 .ml1").css("font-size","9rem");var e=document.querySelector(".ml1 .letters");e.innerHTML=e.textContent.replace(/([^\x00-\x80]|\w)/g,"<span class='letter'>$&</span>"),anime.timeline({loop:!1}).add({targets:".ml1 .letter",scale:[.3,1],opacity:[0,1],translateZ:0,easing:"easeOutExpo",duration:900,delay:function(e,t){return 70*(t+1)}}).add({targets:".ml1",opacity:0,duration:1300,easing:"easeOutExpo",delay:1e3})},2e3),setTimeout(function(){$(".zoomOut2 .tweetLogo").fadeOut(1e3)},3500),setTimeout(function(){$(".zoomOut2 .ml1").fadeOut(1e3)},5500),setTimeout(function(){$(".zoomOut2 h3").fadeOut(200)},6300),setTimeout(function(){$(".twitterWrapper").show()},6500),setTimeout(function(){document.getElementById("firstTweet").addEventListener("animationend",function(){$(".tweetZoomWrapper").addClass("zoomTweetOver")})},6500),setTimeout(function(){$(".zoomTweetOver").animate({top:"-1595"},900),document.getElementById("lastTweet").addEventListener("animationend",function(){$(".totalTweet .count").text(tweetData.total),$(".zoomOut2 .zoomOutSlow, .zoomOut2 .twitterWrapper").hide(),$(".zoomOut2").fadeOut(100),$(".zoomOut3").fadeIn(100),speedoTitleFront(),setTimeout(function(){speedoMeterSignal()},1e3),dropTextHappy(),dropTextAngry(),counter()})},11e3))},a=t.getElementsByTagName("h2"),s=0;s<a.length;s++)a[s].addEventListener("animationend",o,!1)},!1),$(document).ready(function(){var e=function(){var e,t=document.createElement("fakeelement"),o={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(e in o)if(void 0!==t.style[e])return o[e]}();$(".zoomOut .bouncein").one(e,function(e){setTimeout(function(){$(".zoomOut1").fadeIn(0),$(".zoomOut1 .logoTransparent").fadeIn(0),$(".zoomOut .bouncein").hide()},500),setTimeout(function(){$(".zoomOut1 .logoTransparent").hide()},1200)}),$(".zoomOut1 img, .zoomOut1 h2").one(e,function(e){$(".zoomOut, .zoomOut1").hide(),$(".zoomOut1-1").show()}),$(".zoomOut1-1 img, .zoomOut1-1 h2").one(e,function(e){$(".zoomOut, .zoomOut1, .zoomOut1-1").hide(),$(".zoomOut1-2").show()}),$(".zoomOut1-2 img, .zoomOut1-2 h2").one(e,function(e){$(".zoomOut, .zoomOut1, .zoomOut1-1, .zoomOut1-2").hide(),$(".zoomOut1-3").show()}),$(".zoomOut1-3 img, .zoomOut1-3 h2").one(e,function(e){$(".zoomOut, .zoomOut1, .zoomOut1-1, .zoomOut1-2, .zoomOut1-3").hide(),$("#stage").show()}),$(".zoomOut2 .zoomOutSlow").one(e,function(e){$(".zoomOut, .zoomOut1, .zoomOut1-1, .zoomOut1-2, .zoomOut1-3, #stage").hide()}),$(".zoomOut3 #background-wrap").one(e,function(e){$(".zoomOut, .zoomOut1, .zoomOut1-1, .zoomOut1-2, .zoomOut1-3, #stage, .zoomOut2").hide(),setTimeout(function(){$(".zoomOut3 .face").hasClass("moreAngryFace")&&$(".zoomOut3 .face").removeClass("moreAngryFace").addClass("moreAngryFaceRed"),$(".zoomOut3 #background-wrap").hide(),$(".zoomOut3Wrapper").addClass("zoomOutSpeedoWrapper")},8e3),setTimeout(function(){$(".zoomOut3").fadeOut(5),$(".zoomOut4").fadeIn(10),dropTextNTBack(),dropTextNTFront(),$(".noTweetBack > span:nth-child(17), .noTweetFront > span:nth-child(17)").after("<br>")},9500),setTimeout(function(){$(".zoomOut4 .noTweetWrapper").addClass("noTweetFadeOut")},13500),setTimeout(function(){$(".zoomOut5").fadeIn(100),$(".zoomOut4").fadeOut(700)},13500)}),$(".zoomOut5 .logoWithText").one(e,function(e){$(".zoomOut5 .logoTextWrapper").addClass("afterZoom"),$(".zoomOut5 .logoWithText").addClass("moveLogoLeft"),setTimeout(function(){$(".zoomOut5 .weTweetWrapper").addClass("show")},100),setTimeout(function(){$(".zoomOut5 .afterZoom").addClass("logoTextWrapperInner"),$(".zoomOut5 .logoWithText").removeClass("moveLogoLeft").addClass("moveLogoRight"),$(".zoomOut5 .weTweetWrapper").removeClass("show").addClass("hide")},2e3)})}),$(window).on("load",function(){});
