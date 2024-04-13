<!doctype html>
<html lang="en" dir="ltr">

<head>
  <?php $this->load->view('includes/header'); ?>
</head>

<body class="">
  <div class="page">
    <div class="page-single">
      <div class="container">
        <div class="row">
          <div class="col col-login mx-auto">
            <div class="text-center mb-6">
              <img src="<?= base_url(UI_ASSETS . "/images/tabler.svg"); ?>" class="h-6" alt="">
            </div>
            <?php if (isset($message)) : ?>
              <div class="alert alert-icon alert-danger" role="alert">
                <i class="fa fa-times-circle mr-2" aria-hidden="true"></i>
                <?php echo $message; ?>
              </div>
            <?php endif; ?>
            <?php echo form_open("admin/login", ['class' => 'card']); ?>
            <div class="card-body p-6">
              <div class="card-title text-center">
                WeTweet <?php echo lang('login_heading'); ?>
              </div>
              <div class="form-group">
                <label class="form-label">
                  <?php echo lang('login_identity_label', 'identity'); ?>
                </label>
                <?php echo form_input($identity, null, ['class' => 'form-control']); ?>
              </div>
              <div class="form-group">
                <label class="form-label">
                  <?php echo lang('login_password_label', 'password'); ?>
                  <a href="forgot_password" class="float-right small">
                    <?php echo lang('login_forgot_password'); ?>
                  </a>
                </label>
                <?php echo form_input($password, null, ['class' => 'form-control']); ?>

              </div>
              <div class="form-group">
                <label class="custom-control custom-checkbox">
                  <?php echo form_checkbox('remember', '1', FALSE, 'id="remember" class="custom-control-input"'); ?>
                  <span class="custom-control-label">
                    <?php echo lang('login_remember_label', 'remember'); ?>
                  </span>
                </label>
              </div>
              <div class="form-footer">
                <?php echo form_submit('submit', lang('login_submit_btn'), 'class="btn btn-primary btn-block"'); ?>
              </div>
            </div>
            <?php echo form_close(); ?>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php $this->load->view('includes/footer'); ?>
</body>

</html>