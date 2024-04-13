<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 *
 * Model Hashtag_model
 *
 * This Model for ...
 *
 * @param     ...
 * @return    ...
 *
 * @author    Neeraj Singh <neeraj.singh@digitas.com>
 * @link      www.digitas.in
 * @package        CodeIgniter
 * @category    Model
 */
class Hashtag_model extends CI_Model {
	private $table = 'hashtags';
	private $upload_data = [];

	// ------------------------------------------------------------------------
	public function __construct()
	{
		parent::__construct();
	}

	// ------------------------------------------------------------------------
	public function get($where)
	{
		if ($where)
		{
			$query = $this->db->get_where($this->table, $where);
			if ($query->num_rows() > 0)
			{
				return $query->result();
			}
			return FALSE;
		}
	}

	// ------------------------------------------------------------------------
	public function get_all()
	{
		$query = $this->db->get($this->table);
		if ($query->num_rows() > 0)
		{
			return $query->result();
		}
		return FALSE;
	}

	// ------------------------------------------------------------------------
	public function insert($data = [])
	{
		if (is_array($data) && $data)
		{
			if ($this->upload_done())
			{
				$data['banner_url'] = $this->upload_data['data']['file_name'];
				$this->db->insert($this->table, $data);
				if ($this->db->insert_id())
				{
					return $this->db->insert_id();
				}
			}
		}
		return FALSE;
	}

	// ------------------------------------------------------------------------
	public function update($data = [], $where = [])
	{
		if (is_array($data) && $data && is_array($where) && $where)
		{
			// if file upload called
			if (isset($_FILES['file']))
			{
				// delete old one file
				$this->unlink_banner('hashtag_id');
				// now upload new one file
				if ($this->upload_done())
				{
					// get uploaded file name
					$data['banner_url'] = $this->upload_data['data']['file_name'];
				}
			}
			// update the row
			$this->db->update($this->table, $data, $where);
			if ($this->db->affected_rows())
			{
				return $this->db->affected_rows();
			}
		}
		return FALSE;
	}

	// ------------------------------------------------------------------------
	public function upload_done()
	{
		// upload settings
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'gif|jpg|png|gpeg';
		// upload size in kb
		$config['max_size'] = '15000';
		$config['max_width'] = '2024';
		$config['max_height'] = '2024';
		// rename the file with random encrypted
		$config['encrypt_name'] = TRUE;
		$config['remove_spaces'] = TRUE;
		// load the upload helper
		$this->load->library('upload', $config);
		// if upload error
		if ( ! $this->upload->do_upload('file'))
		{
			$this->upload_data['error'] = $this->upload->display_errors();
			// return full upload error
			return FALSE;
		} else
		{
			// return the array of uploaded data
			$this->upload_data['data'] = $this->upload->data();
			return TRUE;
		}
	}

	/**
	 * Delete the old file when its get updated
	 *
	 * @param [type] $hashtag_id
	 * @return void
	 */
	public function unlink_banner($hashtag_id = NULL)
	{
		if ($hashtag_id !== NULL)
		{
			$row = $this->get(['hashtag_id' => $hashtag_id]);
			if ($row)
			{
				if (file_exists('/uploads/' . $row->banner_url))
				{
					@unlink('/uploads/' . $row->banner_url);
					return TRUE;
				}
			}
		}
		return FALSE;
	}

	/**
	 * Check if more than 4 status is set for hashtags
	 * @param $hashtag_id
	 * @return integer
	 */
	public function check_limit($hashtag_id)
	{
		if (ctype_digit($hashtag_id) || is_integer($hashtag_id))
		{
			$sql = "SELECT * FROM hashtags WHERE city_id = (SELECT city_id FROM hashtags WHERE hashtag_id = ?) AND current_status = ?";
			$query = $this->db->query($sql, [$hashtag_id, ENABLE]);
			return ($query->num_rows() >= 4) ? TRUE : FALSE;
		}
		return FALSE;
	}

	/**
	 * Cath the upload error if happened
	 *
	 * @return void
	 */
	public function get_error()
	{
		if (isset($this->upload_data['error']))
		{
			return $this->upload_data['error'];
		}
		return FALSE;
	}
}
/* End of file Hashtag_model.php */
/* Location: ./application/models/Hashtag_model.php */
