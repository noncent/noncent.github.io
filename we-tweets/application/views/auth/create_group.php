<div class="col-lg-10">
      <div class="card">
            <div class="card-header">
                  <h3 class="card-title">
                        <?php echo lang('create_group_heading'); ?>
                  </h3>
            </div>
            <div class="card-body">
                  <?php echo form_open("admin/create_group"); ?>
                  <div class="form-group">
                        <label class="form-label">
                              <?php echo lang('create_group_name_label', 'group_name'); ?>
                              <span class="form-required">*</span>
                        </label>
                        <?php echo form_input($group_name, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label">
                              <?php echo lang('create_group_desc_label', 'description'); ?>
                              <span class="form-required">*</span>
                        </label>
                        <?php echo form_input($description, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-footer">
                        <?php echo form_submit('submit', lang('create_user_submit_btn'), 'class="btn btn-primary btn-block"'); ?>
                  </div>
                  <?php echo form_close(); ?>
            </div>
      </div>
</div>