<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 *
 * Model Dashboard_model
 *
 * This Model for ...
 *
 * @param       ...
 * @return      ...
 *
 * @author      Neeraj Singh <neeraj.singh@digitas.com>
 * @link        www.digitas.in
 * @package        CodeIgniter
 * @category    Model
 */
class Dashboard_model extends CI_Model {

	public function get_next($hashtag_id, $city_id)
	{
		if ($city_id && is_int((int)$city_id))
		{
			$sql = "SELECT hashtag_id FROM hashtags WHERE hashtag_id > {$hashtag_id} AND is_topic = '1' AND city_id = {$city_id} LIMIT 1;";
			$row = $this->db->query($sql);
			if ($row->num_rows() > 0)
			{
				return $row->row()->hashtag_id;
			}
			return FALSE;
		}
	}
}

/* End of file Dashboard_model.php */
/* Location: ./application/models/Dashboard_model.php */
