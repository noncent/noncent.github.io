<div class="col-lg-10">
	<?php if ($this->ion_auth->is_admin()) : ?>
		<div class="form-group">
			<!-- start add pills -->
			<div class="selectgroup selectgroup-pills">
				<!-- add user -->
				<label class="selectgroup-item topic-card-add">
					<span class="selectgroup-button topic-text-add">
						<a class="text-normal" href="<?= base_url('admin/create_user'); ?>">
							<i class="fe fe-plus-circle"></i>
							<?= lang('index_create_user_link'); ?>
						</a>
					</span>
				</label>
				<!-- add group -->
				<label class="selectgroup-item topic-card-add">
					<span class="selectgroup-button topic-text-add">
						<a class="text-normal" href="<?= base_url('admin/create_group'); ?>">
							<i class="fe fe-plus-circle"></i>
							<?= lang('index_create_group_link'); ?>
						</a>
					</span>
				</label>
			</div>
			<!-- end add pills -->
		</div>
	<?php endif; ?>
	<!-- -- Pills End Here -- -->
	<div class="card" id="table-map-data">
		<div class="table-responsive">
			<table class="table table-hover table-outline table-vcenter text-nowrap card-table">
				<thead>
					<tr>
						<th><?php echo lang('index_fname_th'); ?></th>
						<th><?php echo lang('index_lname_th'); ?></th>
						<th><?php echo lang('index_email_th'); ?></th>
						<th><?php echo lang('index_groups_th'); ?></th>
						<th><?php echo lang('index_status_th'); ?></th>
						<th><?php echo lang('index_action_th'); ?></th>
					</tr>
				</thead>
				<tbody>
					<?php foreach ($users as $user) : ?>
						<tr>
							<td><?php echo htmlspecialchars($user->first_name, ENT_QUOTES, 'UTF-8'); ?></td>
							<td><?php echo htmlspecialchars($user->last_name, ENT_QUOTES, 'UTF-8'); ?></td>
							<td><?php echo htmlspecialchars($user->email, ENT_QUOTES, 'UTF-8'); ?></td>
							<td>
								<?php foreach ($user->groups as $group) : ?>
									<?php echo anchor("admin/edit_group/" . $group->id, htmlspecialchars($group->name, ENT_QUOTES, 'UTF-8')); ?><br />
								<?php endforeach ?>
							</td>
							<td><?php echo ($user->active) ? anchor("admin/deactivate/" . $user->id, lang('index_active_link')) : anchor("admin/activate/" . $user->id, lang('index_inactive_link')); ?></td>
							<td><?php echo anchor("admin/edit_user/" . $user->id, 'Edit'); ?></td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	</div>
</div>