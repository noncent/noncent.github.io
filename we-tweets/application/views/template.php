<?php
// PHP Global session reading for alert messages
if ($this->session->flashdata('error')) {
    $error = $this->session->flashdata('error');
    // clear the session message
    unset($_SESSION['error']);
}
if ($this->session->flashdata('success')) {
    $success = $this->session->flashdata('success');
    // clear the session message
    unset($_SESSION['success']);
}
?>

<!doctype html>
<html lang="en" dir="ltr">

<head>
    <?php $this->load->view('includes/header'); ?>
</head>

<body class="">
    <div class="page">
        <div class="flex-fill">
            <!-- start top nav -->
            <div class="<?= CONTAINER_CLASS; ?>">
                <?php $this->load->view('components/top'); ?>
            </div>
            <!-- end top nav -->
            <!-- start navigation header -->
            <div class="navstart">
                <?php $this->load->view('components/navigation'); ?>
            </div>
            <!-- start global message -->
            <div class="ajax-events <?= CONTAINER_CLASS; ?> text-center"></div>
            <!-- success -->
            <?php if (isset($success)) : ?>
                <div class="<?= CONTAINER_CLASS; ?> text-center">
                    <div class="alert alert-success">
                        <div class="message">
                            <i class="fe fe-check-circle"> </i><?php echo $success; ?>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
            <!-- error -->
            <?php if (isset($error)) : ?>
                <div class="<?= CONTAINER_CLASS; ?> text-center">
                    <div class="alert alert-danger">
                        <div class="message">
                            <i class="fe fe-x-circle"> </i><?php echo $error; ?>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
            <!-- end global message -->
            <!-- end navigation header -->
            <div class="breadstart">
                <?php $this->load->view('components/bread_crumb'); ?>
            </div>
            <div class="<?= CONTAINER_CLASS; ?>">
                <!-- optional 'components/cities' append here -->
                <!-- start row-deck -->
                <div class="row row-cards row-deck">
                    <!-- start left sidebar -->
                    <?php $this->load->view('components/left_sidebar'); ?>
                    <!-- end left sidebar -->
                    <!-- start page content -->
                    <?php $this->load->view($content); ?>
                    <!-- end page content -->
                </div>
                <!-- end row-deck -->
            </div>
        </div>
        <!-- start footer -->
        <?php $this->load->view('components/bottom'); ?>
        <!-- end footer -->
    </div>
    <!-- start js footer -->
    <?php $this->load->view('includes/footer'); ?>
    <!-- end js footer -->
</body>

</html>