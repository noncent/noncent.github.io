<div class="header py-4">
    <div class="<?= CONTAINER_CLASS; ?>">
        <div class="d-flex">
            <a class="header-brand" href="<?=base_url('home');?>">
                <img src="<?= base_url(UI_ASSETS .'/images/tabler.svg'); ?>" class="header-brand-img" alt="tabler logo"> WeTweet CMS
            </a>
            <div class="d-flex order-lg-2 ml-auto">
                <div class="nav-item d-none d-md-flex">
                    <a href="<?=base_url('admin/logout');?>" class="btn btn-sm btn-outline-primary">Logout</a>
                </div>
                <div class="dropdown">
                    <a href="#" class="nav-link pr-0 leading-none" data-toggle="dropdown">
                        <span class="avatar" style="background-image: url(<?= base_url(UI_ASSETS . '/images/1.jpg'); ?>"></span>
                        <span class="ml-2 d-none d-lg-block">
                            <span class="text-default"><?= $this->session->userdata('first_name'); ?></span>
                            <small class="text-muted d-block mt-1">Administrator</small>
                        </span>
                    </a>
                </div>
            </div>
            <a href="#" class="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
                <span class="header-toggler-icon"></span>
            </a>
        </div>
    </div>
</div>