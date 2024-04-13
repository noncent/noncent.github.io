<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 *
 * Controller Hashtag
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
class Hashtag extends MY_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Hashtag_model', 'hashtag_model');
	}

	/**
	 * Add the hashtag data
	 *
	 * @return void
	 */
	public function add()
	{
		//pre($_POST, 1);
		$data = [];
		// hashtag
		if ($this->input->post('hashtag'))
		{
			$data['hashtag'] = $this->input->post('hashtag', TRUE);
		}
		// city id
		if ($this->input->post('city_id'))
		{
			$data['city_id'] = $this->input->post('city_id', TRUE);
		}
		// row order
		if ($this->input->post('row_order'))
		{
			$data['row_order'] = $this->input->post('row_order', TRUE);
		}
		// api url
		if ($this->input->post('api_url'))
		{
			$data['api_url'] = $this->input->post('api_url', TRUE);
		}
		// if status exists
		if ($this->input->post('current_status'))
		{
			$data['current_status'] = $this->current_status[$this->input->post('current_status')];
		}
		// set as topic
		if ($this->input->post('is_topic'))
		{
			$data['is_topic'] = $this->current_status[$this->input->post('is_topic')];
		}
		// if status exists
		if ($this->input->post('current_status'))
		{
			$data['current_status'] = $this->current_status[$this->input->post('current_status')];
		}
		if ($this->input->post('is_topic'))
		{
			$data['is_topic'] = $this->current_status[$this->input->post('is_topic')];
		}
		// check if already data exists
		if ($this->hashtag_model->get(['hashtag' => $data['hashtag'], 'city_id' => $data['city_id']]) === FALSE)
		{
			// add the data
			if ($this->hashtag_model->insert($data))
			{
				// success message
				json_success(INSERT_MESSAGE);
			} else if ($this->hashtag_model->get_error())
			{
				// upload error
				json_error($this->hashtag_model->get_error());
			} else
			{
				// insert error
				json_error(INSERT_ERROR_MESSAGE);
			}
		} else
		{
			// data already exists message
			json_error(DUPLICATE_MESSAGE);
		}
	}

	/**
	 * Update the hashtag data by id
	 *
	 * @param [type] $hashtag_id
	 * @return void
	 */
	public function update($hashtag_id = NULL)
	{
		$data = [];
		$hashtag_id = (int)$hashtag_id;
		if ($this->input->post('hashtag_id') && $this->input->post('hashtag_id') == $hashtag_id)
		{
			// hashtag
			if ($this->input->post('hashtag'))
			{
				$data['hashtag'] = $this->input->post('hashtag', TRUE);
			}
			// city id
			if ($this->input->post('city_id'))
			{
				$data['city_id'] = $this->input->post('city_id', TRUE);
			}
			// row order
			if ($this->input->post('row_order'))
			{
				$data['row_order'] = $this->input->post('row_order', TRUE);
			}
			// api url
			if ($this->input->post('api_url'))
			{
				$data['api_url'] = $this->input->post('api_url', TRUE);
			}
			// if status exists
			if ($this->input->post('current_status'))
			{
				$data['current_status'] = $this->current_status[$this->input->post('current_status')];
				// check if status is already enabled for 5 hashtags
				// if ($data['current_status'] === ENABLE)
				// {
				// 	if ($this->hashtag_model->check_limit($hashtag_id) === TRUE)
				// 	{
				// 		json_error(LIMIT_EXCEEDED);
				// 		die();
				// 	}

				// }
			}

			// set as topic
			if ($this->input->post('is_topic'))
			{
				$data['is_topic'] = $this->current_status[$this->input->post('is_topic')];
			}
			// update the data
			if ($this->hashtag_model->update($data, ['hashtag_id' => $hashtag_id]))
			{
				// json ajax response
				json_success(UPDATE_MESSAGE);
			} else if ($this->hashtag_model->get_error())
			{
				// upload file error response
				json_error($this->hashtag_model->get_error());
			} else
			{
				// not updated error message
				json_error(UPDATE_ERROR_MESSAGE);
			}
		} else
		{
			// id not matched error
			json_error(UPDATE_INVALID_MESSAGE);
		}
	}

	/**
	 * Get all hashtags for user or admin
	 */
	public function get()
	{
		return $this->hashtag_model->get_all();
	}
}
/* End of file Hashtag.php */
/* Location: ./application/controllers/Hashtag.php */
