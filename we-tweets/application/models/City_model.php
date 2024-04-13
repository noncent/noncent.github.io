<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 *
 * Model City_model
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
class City_model extends CI_Model {
	private $table = 'cities';

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
			$this->db->insert($this->table, $data);
			if ($this->db->insert_id())
			{
				return $this->db->insert_id();
			}
		}
		return FALSE;
	}

	// ------------------------------------------------------------------------
	public function update($data = [], $where = [])
	{
		if (is_array($data) && $data && is_array($where) && $where)
		{
			$this->db->update($this->table, $data, $where);
			if ($this->db->affected_rows())
			{
				return $this->db->affected_rows();
			}
		}
		return FALSE;
	}
}
/* End of file City_model.php */
/* Location: ./application/models/City_model.php */
