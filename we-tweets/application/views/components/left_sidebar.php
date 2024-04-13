<?php if (!isset($active_city)) $active_city = 0; ?>
<div class="col-lg-2">
    <div class="card visible-sm-block hidden-sm">
        <div class="card-header">
            <h3 class="card-title"># City Status</h3>
        </div>
        <!-- left sidebar -->
        <div class="card-body fluid text-left">
            <div class="list-groups">
                <ul class="list-group">
                    <?php $controller->build_city_sidebar(); ?>
                    <?php foreach ($controller->city_row_data as $id => $row) : ?>
                        <li class="<?= ($active_city == $row->city_id ? 'active' : ''); ?> list-group-item d-flex justify-content-between align-items-center">
                            <a href="<?= base_url('welcome/index/' . $row->city_id); ?>" data-id="<?= $row->city_id; ?>" class="city-list text-normal">
                                <?php if ($row->current_status == ENABLE) : ?>
                                    <i class="fe fe-check-circle"></i>
                                <?php endif; ?>
                                <?php if ($row->current_status == DISABLE) : ?>
                                    <i class="fe fe-x-circle"></i>
                                <?php endif; ?>
                                <?php if ($row->current_status == DELETED) : ?>
                                    <i class="fe fe-trash"></i>
                                <?php endif; ?>
                                &nbsp;<?= $row->city_name; ?>
                            </a>
                            <a href="#" data-id="<?= $row->city_id; ?>" data-toggle="modal" data-target="#city-edit-<?= $row->city_id; ?>">
                                <i class="fe fe-edit"></i>
                            </a>
                        </li>
                        <!-- end left sidebar -->
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </div>
</div>
<?php if ($this->ion_auth->is_admin()) : ?>
    <?php foreach ($controller->city_row_data as $id => $row) : ?>
        <!-- edit modal form -->
        <div class="modal fade" id="city-edit-<?= $row->city_id; ?>" tabindex="-1" role="dialog" aria-labelledby="city-edit-<?= $row->city_id; ?>" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <!-- Forms -->
                <?php $uniqeid = uniqid(random_string() . time()); ?>
                <?php echo form_open("city/update/$row->city_id", "data-modal-header='header-$uniqeid' class='ajax-form'"); ?>
                <div class="modal-content">
                    <div class="modal-header  header-<?= $uniqeid; ?>">
                        <h5 class="modal-title" id="city-edit-<?= $row->city_id; ?>"><i class="fe fe-edit"></i> Edit City</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <fieldset class="form-fieldset">
                            <div class="form-group">
                                <label class="form-label">City Name<span class="form-required">*</span></label>
                                <input name="city_name" type="text" class="form-control" value="<?= $row->city_name; ?>" placeholder="enter city name here" />
                            </div>
                            <div class="selectgroup w-100">
                                <label class="selectgroup-item" title="Click to Show">
                                    <input type="radio" name="current_status" value="on" class="selectgroup-input" <?= ($row->current_status == ENABLE) ? "checked" : ''; ?>>
                                    <span class="selectgroup-button"><i class="fe fe-eye"></i></span>
                                </label>
                                <label class="selectgroup-item" title="Click to Hide">
                                    <input type="radio" name="current_status" value="off" class="selectgroup-input" <?= ($row->current_status == DISABLE) ? "checked" : ''; ?>>
                                    <span class="selectgroup-button"><i class="fe fe-eye-off"></i></span>
                                </label>
                                <label class="selectgroup-item" title="Click to Delete">
                                    <input type="radio" name="current_status" value="del" class="selectgroup-input" <?= ($row->current_status == DELETED) ? "checked" : ''; ?>>
                                    <span class="selectgroup-button"><i class="fe fe-trash"></i></span>
                                </label>
                            </div>
                            <input type="hidden" name="city_id" value="<?= $row->city_id; ?>">
                        </fieldset>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
                <?php echo form_close(); ?>
            </div>
        </div>
        <!-- end modal form -->
    <?php endforeach; ?>
<?php endif; ?>