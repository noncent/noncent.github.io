<!-- start col-12 -->
<div class="col-lg-10">
    <div class="form-group">
        <!-- start add pills -->
        <div class="selectgroup selectgroup-pills">
            <?php if ($this->ion_auth->is_admin()) : ?>
                <label class="selectgroup-item topic-card-add">
                    <span class="selectgroup-button topic-text-add">
                        <a class="text-normal" href="javascript:void(0)" data-toggle="modal" data-target="#city-add-form">
                            <i class="fe fe-plus-circle"></i>
                            Add New City
                        </a>
                    </span>
                </label>
            <?php endif; ?>
            <label class="selectgroup-item topic-card-add">
                <span class="selectgroup-button topic-text-add">
                    <a class="text-normal" href="javascript:void(0)" data-toggle="modal" data-target="#add-hashtag-from">
                        <i class="fe fe-plus-circle"></i>
                        Add New Hashtag
                    </a>
                </span>
            </label>
        </div>
        <!-- end add pills -->
        <!-- -- Pills End Here -- -->
        <?php $i = 0; ?>
        <?php foreach ($group_hash as $city_id => $topic) : ?>
            <?php $active_class = ($i == DISABLE) ? 'tweet alert-success' : ''; ?>
            <!-- start edit pills -->
            <div class="selectgroup selectgroup-pills">
                <label class="selectgroup-item topic-card">
                    <span data-table-id="#table-map-data-<?= $city_id; ?>" class="selectgroup-button topic-text text-normal <?= $active_class; ?>">
                        <?= $controller->city_compact_data[$city_id]; ?>
                    </span>
                </label>
            </div>
            <?php ++$i; ?>
            <!-- end end pills -->
        <?php endforeach; ?>
    </div>
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <!-- start add city modal form -->
    <?php if ($this->ion_auth->is_admin()) : ?>
        <!-- add modal form -->
        <div class="modal fade" id="city-add-form" tabindex="-1" role="dialog" aria-labelledby="city-add-form" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <!-- Forms -->
                <?php $uniqeid = uniqid(random_string() . time()); ?>
                <?php echo form_open("city/add", "data-modal-header='header-$uniqeid' class='ajax-form'"); ?>
                <div class="modal-content">
                    <div class="modal-header header-<?= $uniqeid; ?>">
                        <h5 class="modal-title" id="city-add-form"><i class="fe fe-edit"></i> Add City</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <fieldset class="form-fieldset">
                            <div class="form-group">
                                <label class="form-label">City Name<span class="form-required">*</span></label>
                                <input name="city_name" type="text" class="form-control" value="" placeholder="enter city name here" />
                            </div>
                            <div class="selectgroup w-100">
                                <label class="selectgroup-item" title="Click to Show">
                                    <input type="radio" name="current_status" value="on" class="selectgroup-input" checked>
                                    <span class="selectgroup-button"><i class="fe fe-eye"></i></span>
                                </label>
                                <label class="selectgroup-item" title="Click to Hide">
                                    <input type="radio" name="current_status" value="off" class="selectgroup-input">
                                    <span class="selectgroup-button"><i class="fe fe-eye-off"></i></span>
                                </label>
                                <label class="selectgroup-item" title="Click to Delete">
                                    <input type="radio" name="current_status" value="del" class="selectgroup-input">
                                    <span class="selectgroup-button"><i class="fe fe-trash"></i></span>
                                </label>
                            </div>
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
    <?php endif; ?>
    <!-- start add hashtag modal form -->
    <div class="modal fade" id="add-hashtag-from" tabindex="-1" role="dialog" aria-labelledby="add-hashtag-from" aria-hidden="true">
        <div class="modal-dialog modal-dialog" role="document">
            <?php $uniqeid = uniqid(random_string() . time()); ?>
            <?php echo form_open(base_url("hashtag/add"), ['data-modal-header' => "header-$uniqeid", 'class' => 'ajax-form-upload', 'data-upload-id' => '#banner_url']); ?>
            <div class="modal-content">
                <div class="modal-header header-<?= $uniqeid; ?>">
                    <h5 class="modal-title" id="add-hashtag-from"><i class="fe fe-edit"></i> Modal - Add Your Hashtag</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Forms -->
                    <fieldset class="form-fieldset">
                        <div class="form-group">
                            <label class="form-label">Hashtag<span class="form-required">*</span></label>
                            <input data-label="Hashtag" name="hashtag" type="text" class="form-control" value="" required />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Select City<span class="form-required">*</span></label>
                            <?php echo form_dropdown('city_id', $controller->city_compact_data, $active_city, 'required class="form-control custom-select" data-label="City Name"'); ?>
                        </div>
                        <div class="form-group">
                            <div class="form-label">Banner Upload<span class="form-required">*</span></div>
                            <div class="custom-file">
                                <input data-label="Upload File" type="file" class="custom-file-input" required id="banner_url" name="banner_url">
                                <label class="custom-file-label">Choose file</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Order<span class="form-required">*</span></label>
                            <input data-label="Order" name="row_order" type="text" required class="form-control" value="0" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Set as Topic</label>
                            <div class="selectgroup w-100">
                                <label class="selectgroup-item">
                                    <input type="radio" name="is_topic" value="on" class="selectgroup-input api_url_check">
                                    <span class="selectgroup-button">Yes</span>
                                </label>
                                <label class="selectgroup-item">
                                    <input type="radio" name="is_topic" value="off" class="selectgroup-input api_url_check">
                                    <span class="selectgroup-button">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group api_url hide">
                            <label class="form-label">API Url<span class="form-required">*</span></label>
                            <input data-label="API Url" name="api_url" type="text" placeholder="<?=API_ENDPOINT;?>" class="form-control" value="" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Current Status</label>
                            <div class="selectgroup w-100">
                                <label class="selectgroup-item" title="Click to Show">
                                    <input type="radio" name="current_status" value="on" class="selectgroup-input">
                                    <span class="selectgroup-button"><i class="fe fe-eye"></i></span>
                                </label>
                                <label class="selectgroup-item" title="Click to Hide">
                                    <input type="radio" name="current_status" value="off" class="selectgroup-input">
                                    <span class="selectgroup-button"><i class="fe fe-eye-off"></i></span>
                                </label>
                                <label class="selectgroup-item" title="Click to Delete">
                                    <input type="radio" name="current_status" value="del" class="selectgroup-input">
                                    <span class="selectgroup-button"><i class="fe fe-trash"></i></span>
                                </label>
                            </div>
                        </div>
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
    <!-- end add hashtag modal form -->
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <!-- start table data for a topic -->
    <!-- <label class="form-label"><i class="fe fe-command"></i> - Your hashtags and banners</label> -->
    <?php $i = 0; ?>
    <?php foreach ($group_hash as $city_id => $hashtags) : ?>
        <?php $hide_class = $i == DISABLE ? 'table-show' : 'table-show hide'; ?>
        <div class="card <?= $hide_class; ?>" id="table-map-data-<?= $city_id; ?>">
            <div class="table-responsive">
                <table class="table table-hover table-outline table-vcenter text-nowrap card-table">
                    <thead>
                        <tr>
                            <th class="text-center w-1">#</th>
                            <th>Hashtag</th>
                            <th class="text-center">Banner</th>
                            <th class="text-center">Last Updated</th>
                            <th class="text-center">Status</th>
                            <th class="text-center">Set as Topic</th>
                            <th class="text-center">Order</th>
                            <th class="text-center">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($hashtags as $sr => $hashtag) : ?>
                            <?php $srn = ($sr + 1); ?>
                            <?php $uniqeid = uniqid($srn . time()); ?>
                            <tr>
                                <td class="text-center"> <?= $srn; ?> </td>
                                <td> <?= $hashtag->hashtag; ?> </td>
                                <td class="text-center"> <img src="<?= base_url('uploads/' . $hashtag->banner_url); ?>" alt="<?= $hashtag->hashtag; ?>" width="100" class="img img-responsive" /> </td>
                                <td class="text-center">
                                    <div><?= time_ago($hashtag->date_updated); ?></div>
                                </td>
                                <td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input data-table-id="<?= $hashtag->hashtag_id; ?>" name="current_status" <?= $hashtag->current_status == ENABLE ? 'checked' : ''; ?> type="checkbox" class="custom-control-input" id="show-hide-<?= $srn . $uniqeid; ?>">
                                        <label class="custom-control-label hashtag_label" for="show-hide-<?= $srn . $uniqeid; ?>"><?= $hashtag->current_status == ENABLE ? 'Visible' : 'Hidden'; ?></label>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input data-table-id="<?= $hashtag->hashtag_id; ?>" name="is_topic" <?= $hashtag->is_topic == ENABLE ? 'checked' : ''; ?> type="checkbox" class="custom-control-input" id="topic-show-hide-<?= $srn . $uniqeid; ?>">
                                        <label class="custom-control-label is_topic" for="topic-show-hide-<?= $srn . $uniqeid; ?>"><?= $hashtag->is_topic == ENABLE ? 'Yes' : 'No'; ?></label>
                                    </div>
                                </td>
                                <td class="text-center"> <?= $hashtag->row_order; ?> </td>
                                <td class="text-center">
                                    <a class="icon" href="javascript:void(0)" data-toggle="modal" data-target="#<?= $uniqeid; ?>">
                                        <i class="fe fe-edit"></i>
                                    </a>
                                </td>
                            </tr>
                            <!-- start table modal -->
                            <div class="modal fade" id="<?= $uniqeid; ?>" tabindex="-1" role="dialog" aria-labelledby="<?= $uniqeid; ?>" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <?php echo form_open(base_url("hashtag/update/{$hashtag->hashtag_id}"), ['data-modal-header' => "header-$uniqeid", 'class' => 'ajax-form-upload', 'data-upload-id' => '#banner_url' . $uniqeid]); ?>
                                    <div class="modal-content">
                                        <div class="modal-header header-<?= $uniqeid; ?>">
                                            <h5 class="modal-title" id="<?= $uniqeid; ?>">Modal - <?= $hashtag->hashtag; ?></h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <!-- Forms -->
                                            <fieldset class="form-fieldset">
                                                <div class="form-group">
                                                    <label class="form-label">Hashtag<span class="form-required">*</span></label>
                                                    <input name="hashtag" type="text" class="form-control" value="<?= $hashtag->hashtag; ?>" />
                                                </div>
                                                <div class="form-group">
                                                    <label class="form-label">Select City<span class="form-required">*</span></label>
                                                    <?php echo form_dropdown('city_id', $controller->city_compact_data, $hashtag->city_id, 'class="form-control custom-select"'); ?>
                                                </div>
                                                <div class="form-group">
                                                    <div class="form-label">Banner Upload<span class="form-required">*</span></div>
                                                    <div class="custom-file">
                                                        <input type="file" class="custom-file-input" id="banner_url<?= $uniqeid; ?>" name="banner_url">
                                                        <label class="custom-file-label">Choose file</label>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="form-label">Order<span class="form-required">*</span></label>
                                                    <input name="row_order" type="text" class="form-control" value="<?= $hashtag->row_order; ?>" />
                                                </div>
                                                <div class="form-group api_url <?= ($hashtag->is_topic == ENABLE) ? "" : 'hide'; ?>">
                                                    <label class="form-label">API Url<span class="form-required">*</span></label>
                                                    <input data-label="API Url" name="api_url" type="text" class="form-control" value="<?= $hashtag->api_url; ?>" />
                                                </div>
                                                <div class="form-group">
                                                    <label class="form-label">Set as Topic</label>
                                                    <div class="selectgroup w-100">
                                                        <label class="selectgroup-item">
                                                            <input type="radio" name="is_topic" value="on" class="selectgroup-input api_url_check" <?= ($hashtag->is_topic == ENABLE) ? "checked" : ''; ?>>
                                                            <span class="selectgroup-button">Yes</span>
                                                        </label>
                                                        <label class="selectgroup-item">
                                                            <input type="radio" name="is_topic" value="off" class="selectgroup-input api_url_check" <?= ($hashtag->is_topic == DISABLE) ? "checked" : ''; ?>>
                                                            <span class="selectgroup-button">No</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="form-label">Current Status</label>
                                                    <div class="selectgroup w-100">
                                                        <label class="selectgroup-item" title="Click to Show">
                                                            <input type="radio" name="current_status" value="on" class="selectgroup-input" <?= ($hashtag->current_status == ENABLE) ? "checked" : ''; ?>>
                                                            <span class="selectgroup-button"><i class="fe fe-eye"></i></span>
                                                        </label>
                                                        <label class="selectgroup-item" title="Click to Hide">
                                                            <input type="radio" name="current_status" value="off" class="selectgroup-input" <?= ($hashtag->current_status == DISABLE) ? "checked" : ''; ?>>
                                                            <span class="selectgroup-button"><i class="fe fe-eye-off"></i></span>
                                                        </label>
                                                        <label class="selectgroup-item" title="Click to Delete">
                                                            <input type="radio" name="current_status" value="del" class="selectgroup-input" <?= ($hashtag->current_status == DELETED) ? "checked" : ''; ?>>
                                                            <span class="selectgroup-button"><i class="fe fe-trash"></i></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div class="modal-footer">
                                            <?php echo form_hidden('hashtag_id', $hashtag->hashtag_id); ?>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                    <?php echo form_close(); ?>
                                </div>
                            </div>
                            <!-- end table modal -->
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- end table data for a topic -->
        <?php ++$i; ?>
    <?php endforeach; ?>
</div>
<!-- end col-12 -->
