<div class="col-lg-10">
  <div class="alert alert-danger alert-dismissible">
    <button data-dismiss="alert" class="close"></button>
    <i class="fe fe-x-circle"></i> <?php echo lang('deactivate_heading'); ?>
  </div>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title"> <?php echo sprintf(lang('deactivate_subheading'), $user->username); ?></h3>
    </div>
    <div class="card-body">
      <?php echo form_open("admin/deactivate/" . $user->id); ?>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <div class="custom-controls-stacked">
              <label class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" name="confirm" value="no" />
                <span class="custom-control-label"><?php echo lang('deactivate_confirm_y_label', 'confirm'); ?></span>
              </label>
              <label class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" name="confirm" value="yes" checked="checked" />
                <span class="custom-control-label"><?php echo lang('deactivate_confirm_n_label', 'confirm'); ?></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <?php echo form_hidden($csrf); ?>
        <?php echo form_hidden(['id' => $user->id]); ?>
        <?php echo form_submit('submit', lang('deactivate_submit_btn'), 'class="btn btn-danger btn-block"'); ?>
      </div>
      <?php echo form_close(); ?>
    </div>
  </div>
</div>