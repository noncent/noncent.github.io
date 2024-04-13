<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 *
 * Controller Dashboard
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
class Dashboard extends CI_Controller {
	public function __construct()
	{
		parent::__construct($city_name = NULL, $hashtag_id = NULL);
		$this->load->model('Hashtag_model', 'hashtag_model');
		$this->load->model('City_model', 'city_model');
		$this->load->model('Dashboard_model', 'dashboard_model');
	}

	public function index()
	{
		$this->show();
	}

	/**
	 * Get all hashtag for city
	 *
	 * @param [type] $city_name
	 * @return void
	 */
	public function show($city_name = 'mumbai', $hashtag_id = NULL)
	{
		$hash_data = [];
		$topic_data = [];
		$next_hash_id = FALSE;
		$city_id = $this->city_id($city_name);
		if ($city_id)
		{
			// get all hashtag and images for fast effect
			// $fast_hash = $this->hashtag_model->get_all();
			$fast_hash = $this->hashtag_model->get(['city_id' => $city_id, 'current_status' => ENABLE]);
			// pre($fast_hash, 1);
			// get hashtags by city id
			$hash_data = $this->hashtag_model->get(['city_id' => $city_id, 'current_status' => ENABLE]);

			// row found
			if ( ! $hash_data)
			{
				// error no record found
				show_error('There are no entries for city ' . $city_name);
			}
			// pre($hash_data, 1);
			// below code will get hashtags which has is_topic = 1
			if ($hashtag_id === NULL)
			{
				// first request for city and hashtag
				$cur_hash_id = $this->get_next_hashtag_id(0, $city_id);
				if ($cur_hash_id)
				{
					$topic_data = $this->get_topic_row($cur_hash_id);
					$next_hash_id = $this->get_next_hashtag_id($cur_hash_id, $city_id);
				} else
				{
					// error no record found
					show_error('There are no entries for hashtag as topic ' . $city_name . '. Please set at least 1 topic for city');
				}
			} else
			{
				// get hashtag with topic row
				$topic_data = $this->get_topic_row($hashtag_id);
				// second request for city and hashtag
				$next_hash_id = $this->get_next_hashtag_id($hashtag_id, $city_id);
				if ( ! $next_hash_id)
				{
					// first request for city and hashtag
					$cur_hash_id = $this->get_next_hashtag_id(0, $city_id);
					if ($cur_hash_id)
					{
						$next_hash_id = $cur_hash_id;
					}
				}

			}
			if ( ! $topic_data)
			{
				show_error('Please set at least 1 hashtag as topic');
			}
			if ($topic_data)
			{
				// make sure its single object array
				$topic_data = array_shift($topic_data);
			}

			//pre($hash_data, 1);
			$this->load->view(
				'pages/dashboard',
				[
					'data' => $hash_data,
					'topic' => $topic_data,
					'next_hash_id' => $next_hash_id,
					'city_name' => $city_name,
					'fast_hash' => $fast_hash
				]
			);
		} else
		{
			show_error('City name is required to display hashtags.');
		}
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $city_name
	 * @return void
	 */
	public function city_id($city_name)
	{
		if ($city_name)
		{
			// get city id from city name
			$city = $this->city_model->get(['city_name' => $city_name]);

			if ($city)
			{
				$city = array_shift($city);
				return $city->city_id;
			}
		}
		return FALSE;
	}

	/**
	 * Get next topic hashtag id
	 */
	public function get_next_hashtag_id($hashtag_id = 0, $city_id)
	{
		// get first or next hashtag as is_topic limit 1
		return $this->dashboard_model->get_next($hashtag_id, $city_id);
	}

	/**
	 * get next topic data
	 *
	 * @param [type] $hash_id
	 * @return void
	 */
	public function get_topic_row($hash_id)
	{
		$topic_data = $this->hashtag_model->get(['hashtag_id' => $hash_id]);
		if ($topic_data)
		{
			return $topic_data;
		}
		return FALSE;
	}
}
/* End of file Dashboard.php */
/* Location: ./application/controllers/Dashboard.php */
