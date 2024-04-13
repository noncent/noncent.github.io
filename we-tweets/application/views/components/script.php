<?php
// get class and method name
$controller = $this->router->fetch_class();
// check current controllers method name in request
$method     = $this->router->fetch_method();
// get current url segment
$segment = $this->uri->uri_string();
?>
<script type="text/javascript">
    let CSRF = {
        name: '<?= $this->security->get_csrf_token_name(); ?>',
        token: '<?= $this->security->get_csrf_hash(); ?>'
    }
</script>

<?php if ($this->ion_auth->logged_in()) : ?>
    <script type="text/javascript">
        require(['jquery', 'validate'], function($, validate) {
            var errorClass = {
                "error": "alert-danger",
                "success": "alert-success"
            };
            // ajax message handler
            function ajaxMessage(errortype, msg) {
                let ajaxSNSClass = '.ajax-events';
                let errorIcon = errortype == 'error' ? 'x' : 'check';
                let msgClass = errortype == 'error' ? 'danger' : 'success';
                let errorTemplate = '';
                errorTemplate += '<div class="alert alert-' + msgClass + '">';
                errorTemplate += '<div class="message-container">';
                errorTemplate += '<div class="txt_response">' + '<i class="fe fe-' + errorIcon + '-circle"></i> ' + msg + '</div>';
                errorTemplate += '</div>';
                errorTemplate += '</div>';
                $(ajaxSNSClass).html(errorTemplate).show();
                // hide all alert in 5 seconds
                $(".alert").delay(<?= ALERT_HIDE_TIME; ?>).slideUp(200, function() {
                    $(this).alert('close');
                });
            };
            // global ajax method as callback
            var ajxCall = function(arg, callback) {
                if (arg) arg.params[CSRF.name] = CSRF.token;
                $.post(arg.url, arg.params, function(success_error) {
                    callback(success_error);
                }, 'JSON');
            }
            // doc ready start
            $(document).ready(function(e) {
                // hide all alert in 5 seconds
                $(".alert").delay(<?= ALERT_HIDE_TIME; ?>).slideUp(200, function() {
                    $(this).alert('close');
                });
                // city sidebar select
                $('body').on('click', '.city-list', function(e) {
                    $('.city-list.active').removeClass('active');
                    $(this).addClass('active');
                });
                // top header topic labels
                $('body').on('click', '.topic-text', function(e) {
                    // if (e.target != this) return;
                    let tabeleID = $(this).data('table-id');
                    $('.tweet.alert-success').removeClass('alert-success');
                    $(this).addClass('tweet alert-success');
                    $('.table-show').hide();
                    // if topic has hashtags
                    if ($(tabeleID).length) {
                        $(tabeleID).show();
                    } else {
                        // no hashtags found for requested topic
                        ajaxMessage('error', '<?= GET_ERROR_MESSAGE; ?>');
                    }
                });
                // table row hashtag edit status
                $('body').on('click', '.hashtag_label', function(e) {
                    let hashtagID = $(this).prev('input').data('table-id');
                    let hashtagStatus = $(this).prev('input').prop('checked') ? 'off' : 'on';
                    var arg = {
                        url: base_url + 'hashtag/update/' + hashtagID,
                        params: {
                            "current_status": hashtagStatus,
                            "hashtag_id": hashtagID,
                        },
                    };
                    ajxCall(arg, function(data) {
                        ajaxMessage(data.status.toLowerCase(), data.message);
                    });
                });
                // table row is_topic edit status
                $('body').on('click', '.is_topic', function(e) {
                    let hashtagID = $(this).prev('input').data('table-id');
                    let is_topic = $(this).prev('input').prop('checked') ? 'off' : 'on';
                    var arg = {
                        url: base_url + 'hashtag/update/' + hashtagID,
                        params: {
                            "is_topic": is_topic,
                            "hashtag_id": hashtagID,
                        },
                    };
                    ajxCall(arg, function(data) {
                        ajaxMessage(data.status.toLowerCase(), data.message);
                    });
                });
                // ajax upload global form method 'file'
                $('.ajax-form-upload').on('submit', function(e) {
                    e.preventDefault();
                    let _this = $(this);
                    let _status = _this.data('modal-header');
                    if (_this.validate()) {
                        var file_data = $(_this.data('upload-id')).prop('files')[0];
                        var form_data = new FormData();
                        // check if file is upload
                        if (file_data) form_data.append('file', file_data);
                        // get each form element array and extract name and value
                        $.each(_this.serializeArray(), function(indx, obj) {
                            // adding the form data in array/object
                            form_data.append(obj.name, obj.value);
                        });
                        // append CSRF token
                        form_data.append(CSRF.name, CSRF.token);
                        // ajax call to upload file
                        $.ajax({
                            url: _this.attr('action'),
                            type: "POST",
                            data: form_data,
                            // tell jQuery not to process the data
                            processData: false,
                            // tell jQuery not to set contentType
                            contentType: false,
                            dataType: 'json',
                            success: function(data) {
                                $('.' + _status).attr('class', 'modal-header' + ' ' + errorClass[data.status.toLowerCase()] + ' ' + _status);
                                ajaxMessage(data.status.toLowerCase(), data.message);
                            }
                        });
                    } else {}
                });
                // global ajax form submission
                $('.ajax-form').on('submit', function(e) {
                    e.preventDefault();
                    let _this = $(this);
                    let _status = _this.data('modal-header');
                    var arg = {
                        url: _this.attr('action'),
                        params: _this.serialize(),
                    };
                    ajxCall(arg, function(data) {
                        $('.' + _status).attr('class', 'modal-header' + ' ' + errorClass[data.status.toLowerCase()] + ' ' + _status);
                        ajaxMessage(data.status.toLowerCase(), data.message);
                    });
                });
                // add active class in top menu
                $('.nav-link[href="<?= base_url($segment); ?>"]').addClass('active');
                // check if api url requested
                $('.api_url_check').on('change', function(e) {
                    let apiUrlInput = $(this).parents('form').find('[name="api_url"]');
                    let apiUrlContainer = $('.api_url');
                    if ($(this).val() == 'on') {
                        apiUrlContainer.removeClass('hide');
                        apiUrlInput.attr('required', 'required');
                    } else {
                        apiUrlContainer.addClass('hide');
                        apiUrlInput.removeAttr('required');
                    }
                });
                // doc ready end
            });
        });
    </script>
<?php endif; ?>