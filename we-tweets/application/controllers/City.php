<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 *
 * Controller City
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
class City extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model('City_model', 'city_model');
	}

	/**
	 * Add the city data
	 *
	 * @return void
	 */
	public function add()
	{
		$data = [];
		$data['current_status'] = DISABLE;
		if ($this->input->post('city_name'))
		{
			$data['city_name'] = $this->input->post('city_name', TRUE);
			// if status exists
			if ($this->input->post('current_status'))
			{
				$data['current_status'] = $this->current_status[$this->input->post('current_status')];
			}
			// check if already data exists
			if ($this->city_model->get(['city_name' => $data['city_name']]) === FALSE)
			{
				// add the data
				if ($this->city_model->insert($data))
				{
					json_success(INSERT_MESSAGE);
				} else
				{
					json_error(INSERT_ERROR_MESSAGE);
				}
			} else
			{
				json_error(DUPLICATE_MESSAGE);
			}
		}
	}

	/**
	 * Update the city data by id
	 *
	 * @param [type] $city_id
	 * @return void
	 */
	public function update($city_id = NULL)
	{
		$data = [];
		$city_id = (int)$city_id;
		// if id matched
		if ($city_id && ($city_id == $this->input->post('city_id')))
		{
			if ($this->input->post('city_name'))
			{
				$data['city_name'] = $this->input->post('city_name');
			}
			// if status exists
			if ($this->input->post('current_status'))
			{
				$data['current_status'] = $this->current_status[$this->input->post('current_status')];
			}
			// update the data
			if ($this->city_model->update($data, ['city_id' => $city_id]))
			{
				json_success(UPDATE_MESSAGE, $city_id);
			} else
			{
				json_error(UPDATE_ERROR_MESSAGE, $city_id);
			}
		}
	}
}
/* End of file City.php */
/* Location: ./application/controllers/City.php */
