<?php

namespace hahaha\define;

use hahahasublib\hahaha_instance_trait;

/*
use hahaha\define\hahaha_define_table_direction as direction;
*/

/*
table 定義

因為怕寫錯要查麻煩，因此弄成對應表
*/
class hahaha_define_table_direction
{	
    use hahaha_instance_trait;

    /*
    注意 : 沒有要做完，有做到才補
    */

    // 如要其他類型，則這樣寫TEXT_HA

    // -------------------------------------- 
    // top
    // -------------------------------------- 
    const TOP = "top";
    // -------------------------------------- 
    // right
    // -------------------------------------- 
    const RIGHT = "right";
    // -------------------------------------- 
    // bottom
    // -------------------------------------- 
    const BOTTOM = "bottom";
    // -------------------------------------- 
    // left
    // -------------------------------------- 
    const LEFT = "left";
    // -------------------------------------- 

	function __construct()
	{
		// $this->Initial();
	}
	
	public function Initial()
	{
        
	}


}


