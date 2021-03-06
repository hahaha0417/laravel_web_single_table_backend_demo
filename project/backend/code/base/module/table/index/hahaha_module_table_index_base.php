<?php

namespace hahaha;

use hahaha\define\hahaha_define_table_key as key;

/*
index 模組

安裝柄
*/
class hahaha_module_table_index_base
{
    public $Handles_ = [];

    /*
    初始化，直接使用物件

    用method_exists檢查是否執行
    速度太慢再加array決定是否要執行method
    */
    public function Initial()
    {
        $handles_ = [
            key_::TABEL => "\\hahaha\\hahaha_module_table_index_table_base",
            key_::CONTROLLER => "\\hahaha\\hahaha_module_table_index_controller_base",
            key_::_USE => "\\hahaha\\hahaha_module_table_index_use_base",
            key_::GENERATOR => "\\hahaha\\hahaha_module_table_index_generator_base",
            key_::VIEW => "\\hahaha\\hahaha_module_table_index_view_base",
        ];

        $this->Handles_ = [];
        foreach($handles_ as $key => &$handle)
        {
            $this->Handles_[$key] = $handle::Instance()->Initail();    
        }

    }    

 

}
