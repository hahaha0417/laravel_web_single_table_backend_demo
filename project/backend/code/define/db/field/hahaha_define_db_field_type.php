<?php

namespace hahaha\define;

use hahahasublib\hahaha_instance_trait;

/*
use hahaha\define\hahaha_define_table_db_field_type as type;

use hahaha\define\hahaha_define_table_db_field_type as field_type;

use hahaha\define\hahaha_define_table_db_field_type as db_field_type;
*/

/*
table 定義

因為怕寫錯要查麻煩，因此弄成對應表
*/
class hahaha_define_table_db_field_type
{	
    use hahaha_instance_trait;

    /*
    注意 : 沒有要做完，有做到才補
    */

    // -------------------------------------- 
    // 不使用
    // -------------------------------------- 
    const NO_USE = "ha[no_use]";
    // -------------------------------------- 

    // -------------------------------------- 
    // 屬性
    // -------------------------------------- 
    // -------------------------------------- 
    const STRING = "string";
    const BOOL = "bool";
    const DATETIME = "datetime";





	function __construct()
	{
		// $this->Initial();
	}
	
	public function Initial()
	{
       
	}


}


