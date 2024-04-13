<div class="col-lg-10">
      <div class="card">
            <div class="card-header">
                  <h3 class="card-title"><?php echo lang('edit_user_heading'); ?></h3>
            </div>
            <div class="card-body">
                  <?php echo form_open(uri_string()); ?>
                  <div class="form-group">
                        <label class="form-label"><?php echo lang('edit_user_fname_label', 'first_name'); ?></label>
                        <?php echo form_input($first_name, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label"><?php echo lang('edit_user_lname_label', 'last_name'); ?></label>
                        <?php echo form_input($last_name, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label"><?php echo lang('edit_user_company_label', 'company'); ?></label>
                        <?php echo form_input($company, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label"><?php echo lang('edit_user_phone_label', 'phone'); ?></label>
                        <?php echo form_input($phone, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label"><?php echo lang('edit_user_password_label', 'password'); ?></label>
                        <?php echo form_input($password, NULL, 'class="form-control"'); ?>
                  </div>
                  <div class="form-group">
                        <label class="form-label"><?php echo lang('edit_user_password_confirm_label', 'password_confirm'); ?></label>
                        <?php echo form_input($password_confirm, NULL, 'class="form-control"'); ?>
                  </div>
                  <?php if ($this->ion_auth->is_admin()) : ?>
                        <div class="form-group">
                              <div class="form-label"><?php echo lang('edit_user_groups_heading'); ?></div>
                              <div>
                                    <?php foreach ($groups as $group) : ?>
                                          <label class="custom-control custom-checkbox custom-control-inline">
                                                <?php
                                                            $gID = $group['id'];
                                                            $checked = null;
                                                            $item = null;
                                                            foreach ($currentGroups as $grp) {
                                                                  if ($gID == $grp->id) {
                                                                        $checked = ' checked="checked"';
                                                                        break;
                                                                  }
                                                            }
                                                            ?>
                                                <input type="checkbox" class="custom-control-input" name="groups[]" value="<?php echo $group['id']; ?>" <?php echo $checked; ?>>
                                                <span class="custom-control-label"><?php echo htmlspecialchars($group['name'], ENT_QUOTES, 'UTF-8'); ?></span>
                                          </label>
                                    <?php endforeach ?>
                              </div>
                        </div>
                  <?php endif ?>
                  <!-- only for admin -->
                  <?php if ($this->ion_auth->is_admin()) { ?>
                        <div class="form-group">
                              <label class="form-label">Assign City (Multiple Select)<span class="form-required">*</span></label>
                              <?php echo form_dropdown('city_assigned[]', $this->city_compact_data, explode(',', $user->city_assigned), 'multiple class="form-control custom-select"'); ?>
                        </div>
                  <?php } ?>

                  <?php echo form_hidden('id', $user->id); ?>
                  <?php echo form_hidden($csrf); ?>
                  <div class="form-footer">
                        <?php echo form_submit('submit', lang('edit_user_submit_btn'), 'class="btn btn-primary btn-block"'); ?>
                  </div>
                  <?php echo form_close(); ?>
            </div>
      </div>
</div>
