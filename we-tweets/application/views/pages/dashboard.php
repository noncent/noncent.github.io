<!DOCTYPE html>
<html>

<?php $fallback_url = 'https://73oskjeyha.execute-api.us-west-2.amazonaws.com/staging/api/v1/proximafb40/5d5b9e5e914e390001ae88e2/tweets/74025868-6181-4fc5-a9ed-d165a747c926'; ?>
<?php $url = $next_hash_id ? "$city_name/$next_hash_id" : "$city_name"; ?>
<?php $api_url = (isset($topic) && !empty($topic->api_url)) ? $topic->api_url : $fallback_url; ?>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>#WeTweet </title>
    <link media="screen" rel="stylesheet" type="text/css" href="<?= base_url(UI_ASSETS . '/app/css/bootstrap.min.css'); ?>" />
    <link media="screen" rel="stylesheet" type="text/css" href="<?= base_url(UI_ASSETS . '/app/css/main.css'); ?>" />
    <style type="text/css" id="preStyle"></style>
    <style type="text/css">
        .hide {
            display: none;
        }
    </style>
    <script type="text/javascript">
        window.base_url = <?php echo json_encode(base_url()); ?>;
        window.site_url = <?php echo json_encode(site_url()); ?>;
    </script>
</head>

<body>
    <!--  <h4 class="text-center">
        Next Move: <?= $topic->hashtag; ?>/<?= $city_name; ?>/<?= $next_hash_id; ?>
    </h4> -->
    <?php if (isset($data)) ?>
    <div class="zoomOut">
        <img src="<?= base_url(UI_ASSETS . '/app/images/tweet-white-logo.png'); ?>" class="bouncein">
    </div>
    <div class="zoomOut1">
        <h2 title="<?= $topic->hashtag; ?>"><img src="<?= base_url('uploads/' . $topic->banner_url); ?>"></h2>
        <div class="logoTransparent"></div>
    </div>
    <?php foreach ($data as $ix => $hashtag) : ?>
        <?php if ($ix <= 3) : ?>
            <div class="zoomOut<?= ($ix == '0') ? '1' : '1-' . ($ix); ?>">
                <h2 title="<?= $hashtag->hashtag; ?>"><img src="<?= base_url('uploads/' . $hashtag->banner_url); ?>"></h2>
                <!-- <div class="logoTransparent"></div> -->
            </div>
        <?php endif; ?>
    <?php endforeach; ?>
    <!-- end -->
    <!-- start -->
    <div id="stage">
        <?php foreach ($fast_hash as $ix => $hashtag) : ?>
            <h2 title="<?= $hashtag->hashtag; ?>"><img src="<?= base_url('uploads/' . $hashtag->banner_url); ?>"></h2>
        <?php endforeach; ?>
    </div>
    <div class="zoomOut2">
        <img src="<?= base_url('uploads/' . $topic->banner_url); ?>" class="zoomOutSlow">
        <h1 class="ml1">
            <span class="text-wrapper">
                <span class="letters">Tweet Using</span>
            </span>
        </h1>
        <h3>
            <?= $topic->hashtag; ?>
        </h3>
        <img src="<?= base_url(UI_ASSETS . '/app/images/tweet-white-logo.png'); ?>" class="tweetLogo">
        <div class="twitterWrapper"></div>
    </div>
    <div class="zoomOut3">
        <div class="zoomOut3Wrapper">
            <div class="zoomOut3Inner">
                <div class="speedoTitleWrapper">
                    <h1 class="speedoTitleBack"><?= $topic->hashtag; ?></h1>
                    <h1 class="speedoTitleFront"><?= $topic->hashtag; ?></h1>
                </div>
                <div class="speedo">
                    <div class="face">
                        <div class="needle"></div>
                    </div>
                </div>
                <div class="speedometerText clearfix">
                    <div class="speedTextInner">

                        <div class="happy">Happy</div>
                        <div class="angry">Angry</div>

                    </div>
                </div>
                <div class="totalTweet">
                    <p><span class="count"></span> people tweeting about this</p>
                </div>
            </div>
        </div>

        <div id="background-wrap">
            <div class="bubble x1"></div>
            <div class="bubble x2"></div>
            <div class="bubble x3"></div>
            <div class="bubble x4"></div>
            <div class="bubble x5"></div>
            <div class="bubble x6"></div>
            <div class="bubble x7"></div>
            <div class="bubble x8"></div>
            <div class="bubble x9"></div>
            <div class="bubble x10"></div>
            <div class="bubble x11"></div>
            <div class="bubble x12"></div>
            <div class="bubble x13"></div>
            <div class="bubble x14"></div>
            <div class="bubble x15"></div>
            <div class="bubble x16"></div>
            <div class="bubble x17"></div>
            <div class="bubble x18"></div>
            <div class="bubble x19"></div>
            <div class="bubble x20"></div>
            <div class="bubble x21"></div>
            <div class="bubble x22"></div>
            <div class="bubble x23"></div>
            <div class="bubble x24"></div>
            <div class="bubble x25"></div>
        </div>
    </div>
    <div class="zoomOut4">
        <div class="noTweetWrapper">
            <h1 class="noTweetBack">No Tweet is too small when We Tweet together</h1>
            <h1 class="noTweetFront"> No Tweet is too small when We Tweet together</h1>
        </div>
        <img src="<?= base_url(UI_ASSETS . '/app/images/tweet-blue-logo.png'); ?>" class="tweetLogo">
    </div>
    <div class="zoomOut5">
        <div class="logoTextWrapper">
            <img src="<?= base_url(UI_ASSETS . '/app/images/tweet-white-logo.png'); ?>" class="logoWithText">
            <div class="weTweetWrapper">
                <div class="contents">
                    <div class="inner">
                        #WeTweet
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        var api_endpoint = '<?= $api_url; ?>';
    </script>
    <script type="text/javascript" src="<?= base_url(UI_ASSETS . '/app/js/lib/jquery.min.js'); ?>"></script>
    <script type="text/javascript" src="<?= base_url(UI_ASSETS . '/app/js/lib/anime.min.js'); ?>"></script>
    <script type="text/javascript" src="<?= base_url(UI_ASSETS . '/app/js/main.js'); ?>"></script>
    <script type="text/javascript">
        var url = "<?= site_url("dashboard/show/$url"); ?>";
        console.log(base_url);
        console.log(site_url);

        // refresh the page to show next topic when it's over
        function PageRefresh(url) {
            location.replace(url);
        }

        // load document
        $(document).ready(function() {
            // check interval for last animation end
            setInterval(function() {
                if ($('.zoomOut5').css('display') == 'block') {
                    console.log('end');
                    setInterval(function() {
                        // reload page with topic id
                        PageRefresh(url);
                    }, 3000);
                } else {
                    console.log($('.zoomOut5').css('display'));
                }
            }, 3000)
        });
    </script>
</body>

</html>