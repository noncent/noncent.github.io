<?php
(defined('BASEPATH') or exit('No direct script access allowed'));
/**
 *
 * Controller City
 *
 * This controller for ...
 *
 * @package   CodeIgniter
 * @category  Controller CI
 * @author    Neeraj Singh <neeraj.singh@digitas.com>
 * @link      www.digitas.in
 * @param     ...
 * @return    ...
 *
 */

class MY_Controller extends CI_Controller
{
    // global class property to check status
    public $current_status = ['on' => ENABLE, 'off' => DISABLE, 'del' => DELETED];
    // build html select box
    public $city_compact_data = [];
    // build sidebar
    public $city_row_data = [];

    /**
     * constructor
     *
     * @param string $param
     */
    public function __construct($param = '')
    {
        parent::__construct($param);
        // check current controller name in request
        // $controller = $this->router->fetch_class();
        // check current controllers method name in request
        $method     = $this->router->fetch_method();
        // if not login then show login page
        if (!$this->ion_auth->logged_in() && $method !== 'login') {
            // redirect them to the login page
            redirect('admin/login', 'refresh');
        }
        // load city model
        $this->load->model('City_model', 'city_model');
    }

    /**
     * Get sidebar (left) with all city names or city name
     *
     * @return void
     */
    public function build_city_sidebar()
    {
        // only post login
        if ($this->ion_auth->logged_in()) {
            //for admin
            if ($this->ion_auth->is_admin()) {
                $this->city_row_data =  $this->city_model->get_all();
            } else {
                // get city name only for member assigned, for members, get city ids comma separated
                $this->city_row_data = $this->city_model->get("city_id IN ({$this->ion_auth->user()->row()->city_assigned})");
            }

            // build city select box html, sidebar has all cities
            if ($this->city_row_data) {
                foreach ($this->city_row_data as $idx => $row) {
                    $this->city_compact_data[$row->city_id] =  $row->city_name;
                }
            }
        }
        return [];
    }
}
