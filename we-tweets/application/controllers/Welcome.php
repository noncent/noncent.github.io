<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 *
 * Controller Welcome
 *
 * This controller for ...
 *
 * @param     ...
 * @return    ...
 *
 * @author    Neeraj Singh <neeraj.singh@digitas.com>
 * @link      www.digitas.in
 * @package   CodeIgniter
 * @category  Controller CI
 */
class Welcome extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->helper('date');
		$this->load->model('Hashtag_model', 'hashtag_model');
	}

	/**
	 * Welcome dashboard with topics and table hashtags
	 *
	 * @return void
	 */
	public function index($city_id = 0)
	{
		if ($city_id == '0')
		{
			if ($this->ion_auth->is_admin())
			{
				// list of hashtag data
				$hash_data = $this->hashtag_model->get_all();
			} else
			{
				// for members only
				$city_ids = $this->ion_auth->user()->row()->city_assigned;
				$hash_data = $this->hashtag_model->get("city_id IN ({$city_ids}) AND current_status != " . DELETED);
			}
		} else
		{
			// list of hashtag data
			$hash_data = $this->hashtag_model->get("city_id = {$city_id}");
		}
		// if no record found show error
		if ( ! $hash_data)
		{
			$this->session->set_flashdata('error', 'No record found');
		}
		// pre($hash_data, 1);
		// make group array by city
		$group_hash = [];
		if ($hash_data)
		{
			foreach ($hash_data as $x => $row)
			{
				if (isset($group_hash[$row->city_id]))
				{
					$group_hash[$row->city_id][] = $row;
				} else
				{
					$group_hash[$row->city_id][] = $row;
				}
			}
		}

		// render view
		$this->load->view(TEMPLATE, [
			'content' => 'pages/home',
			'controller' => $this,
			'hash_data' => $hash_data,
			'group_hash' => $group_hash,
			'active_city' => $city_id
		]);
	}
}
