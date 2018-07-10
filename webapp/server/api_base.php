<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

	// $string = file_get_contents("../dist/json/type-list.json");

	if(function_exists($_GET['f'])) {
	   	$_GET['f']();
	}

// 	get list
	function get_list(){
        $string = file_get_contents("../public/json/". $_GET["name"] ."-list.json");
		print_r($string);
    }


// 	get list
	function update_click(){
		sleep(10); 
        $string = file_get_contents("../public/json/time-series/". $_POST["id"] .".json");
		print_r($string);
    }

// 	strategy-detail
	function strategy_detail(){
        $string = file_get_contents("../public/json/strategy/". $_GET["id"] .".json");
		print_r($string);
    }

// Type-Specific Parameters
	function type_specific_parameters(){
        $string = file_get_contents("../public/json/type-parameter/". $_GET["type"] .".json");
		print_r($string);
    }

//  remove underlying
	function remove_underlying(){
        $string = file_get_contents("../public/json/strategy/". $_POST["strategy_id"] .".json");
		$data_strategies = json_decode($string, true);
        if ($data_strategies['parameters']['underlyings']) {
        	foreach ($data_strategies['parameters']['underlyings'] as $key => $entry) {
				if($entry["name"] == $_POST["name"]){
					array_splice($data_strategies['parameters']['underlyings'], $key, 1);
				}
			}
        }
        $new_strategies_obj_json = json_encode($data_strategies);
		$edit_strategies = file_put_contents('../public/json/strategy/'. $_POST["strategy_id"] .'.json', $new_strategies_obj_json);
		$res = json_encode(array('status' => 0));
		if ($edit_strategies) {
			$res = json_encode(array('status' => 1, 'data' => $data_strategies['parameters']));
		}
		print_r($res);
    }

// Create stratery
	function create_stratery(){
        $type_specific = json_decode($_POST['type_specific'], true);
        $common_parameters = json_decode($_POST['common_parameters'], true);
		// add new array strategies
		$strategies_list_json = file_get_contents('../public/json/strategies-list.json');
		$data_strategies = json_decode($strategies_list_json, true);
		$length_json = count($data_strategies);
		$data_strategies[$length_json]["id"] = $length_json + 1;
		foreach ($common_parameters as $key => $entry) {
			$data_strategies[$length_json][$key] = $entry;
		}
		foreach ($type_specific as $key => $entry) {
			$data_strategies[$length_json]["parameters"][$key] = $entry;
		}
		$new_strategies_list_json = json_encode($data_strategies);
		$edit_strategies = file_put_contents('../public/json/strategies-list.json', $new_strategies_list_json);
		
		// add new json file
		$data_strategies[$length_json]["time_series"] = [];
		$new_strategies_data = json_encode($data_strategies[$length_json]);
		$new_strategies_file = '../public/json/strategy/'. ($length_json + 1) .'.json';
		$add_strategies = file_put_contents($new_strategies_file, $new_strategies_data);
		$res = json_encode(array('status' => 0));
		if ($edit_strategies && $add_strategies) {
			$res = json_encode(array('status' => 1));
		}
		print_r($res);
    }

// Update stratery
	function update_stratery(){
		$id = $_POST['id'];
        $type_specific = json_decode($_POST['type_specific'], true);
        $common_parameters = json_decode($_POST['common_parameters'], true);

		// add new array strategies
		$strategies_list_json = file_get_contents('../public/json/strategies-list.json');
		$data_strategies_arr = json_decode($strategies_list_json, true);
		
		foreach ($data_strategies_arr as $key => $entry) {
			if ($data_strategies_arr[$key]["id"] == $id) {
				foreach ($common_parameters as $key1 => $entry1) {
					$data_strategies_arr[$key][$key1] = $entry1;
				}
				foreach ($type_specific as $key1 => $entry1) {
					$data_strategies_arr[$key]["parameters"][$key1] = $entry1;
				}
			}
		}

		$new_strategies_list_json = json_encode($data_strategies_arr);
		$edit_strategies = file_put_contents('../public/json/strategies-list.json', $new_strategies_list_json);
		
		// add new json file
		$strategies_json = file_get_contents('../public/json/strategy/'. $id .'.json');
		$data_strategies_obj = json_decode($strategies_json, true);
		foreach ($common_parameters as $key => $entry) {
			$data_strategies_obj[$key] = $entry;
		}
		foreach ($type_specific as $key => $entry) {
			$data_strategies_obj["parameters"][$key] = $entry;
		}

		$new_strategies_obj_json = json_encode($data_strategies_obj);
		$edit_strategies1 = file_put_contents('../public/json/strategy/'. $id .'.json', $new_strategies_obj_json);

		$res = json_encode(array('status' => 0));
		if ($edit_strategies && $edit_strategies1) {
			$res = json_encode(array('status' => 1));
		}
		print_r($res);
    }