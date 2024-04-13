<div class="col-lg-10">
      <div class="card">
            <div class="card-header">
                  <h3 class="card-title">
                        <?php echo lang('create_user_heading'); ?>
                  </h3>
            </div>
            <div class="card-body">
                  <?php echo form_open("admin/create_user"); ?>
                  <div class="form-group">
                        <label class="form-label">
                              <?php echo lang('create_user_fname_label', 'first_name'); ?>
                              <span class="form-required">*</span>
                        </label>
                        <?php echo form_input($first_name, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label">
                              <?php echo lang('create_user_lname_label', 'last_name'); ?>
                              <span class="form-required">*</span>
                        </label>
                        <?php echo form_input($last_name, NULL, 'class="form-control"'); ?>
                  </div>
                  <?php if ($identity_column !== 'email') { ?>
                        <div class="form-group">
                              <label class="form-label">
                                    <?php echo lang('create_user_identity_label', 'identity'); ?>
                                    <span class="form-required">*</span>
                              </label>
                              <?php echo form_error('identity'); ?>
                              <?php echo form_input($identity, NULL, 'class="form-control"'); ?>
                        </div>
                  <?php } ?>
                  <div class="form-group">
                        <label class="form-label">
                              <?php echo lang('create_user_company_label', 'company'); ?>
                        </label>
                        <?php echo form_input($company, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label">
                              <?php echo lang('create_user_email_label', 'email'); ?>
                              <span class="form-required">*</span>
                        </label>
                        <?php echo form_input($email, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label">
                              <?php echo lang('create_user_phone_label', 'phone'); ?>
                        </label>
                        <?php echo form_input($phone, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label">
                              <?php echo lang('create_user_password_label', 'password'); ?>
                              <span class="form-required">*</span>
                        </label>
                        <?php echo form_input($password, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label">
                              <?php echo lang('create_user_password_confirm_label', 'password_confirm'); ?>
                              <span class="form-required">*</span>
                        </label>
                        <?php echo form_input($password_confirm, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label">Assign City (Multiple Select)<span class="form-required">*</span></label>
                        <?php echo form_dropdown('city_assigned[]', $this->city_compact_data, NULL, 'multiple class="form-control custom-select"'); ?>
                  </div>
                  <div class="form-footer">
                        <?php echo form_submit('submit', lang('create_user_submit_btn'), 'class="btn btn-primary btn-block"'); ?>
                  </div>
                  <?php echo form_close(); ?>
            </div>
      </div>
</div>
