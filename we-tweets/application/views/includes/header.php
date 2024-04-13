<meta charset="UTF-8">
<meta name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<meta http-equiv="Content-Language" content="en"/>
<meta name="msapplication-TileColor" content="#2d89ef">
<meta name="theme-color" content="#4188c9">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="HandheldFriendly" content="True">
<meta name="MobileOptimized" content="320">
<link rel="icon" href="<?= base_url('favicon.ico'); ?>" type="image/x-icon"/>
<link rel="shortcut icon" type="image/x-icon" href="<?= base_url('favicon.ico'); ?>"/>
<title>WeTweet - CMS</title>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet"
      href="//fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext">
<!-- Dashboard Core -->
<link href="<?= base_url(UI_ASSETS . "/css/dashboard.min.css"); ?>" rel="stylesheet"/>
<!-- Dashboard Core -->
<link href="<?= base_url(UI_ASSETS . "/css/additional.css"); ?>" rel="stylesheet"/>
<!-- On demand load css only internal -->
<?php if (isset($css)) : ?>
    <link href="<?= base_url(UI_ASSETS . "/css/{$css}.css"); ?>" rel="stylesheet"/>
<?php endif; ?>
<script src="<?= base_url(UI_ASSETS . "/js/require.min.js"); ?>"></script>
<script>
    requirejs.config({
        baseUrl: '<?= base_url(UI_ASSETS . '/'); ?>'
    });
</script>
<script type="text/javascript">
    window.base_url = <?php echo json_encode(APP_URL); ?>;
    window.site_url = <?php echo json_encode(APP_URL); ?>;
</script>