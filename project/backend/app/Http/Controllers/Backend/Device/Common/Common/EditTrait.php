<?php
/*
{{-- 原始 : hahaha --}}
{{-- 維護 :  --}}
{{-- 指揮 :  --}}
{{-- ---------------------------------------------------------------------------------------------- --}}
{{-- 決定 : name --}}
{{-- 
    ----------------------------------------------------------------------------
    說明 : 
    ----------------------------------------------------------------------------   
    
    ----------------------------------------------------------------------------
--}}
{{-- ---------------------------------------------------------------------------------------------- --}}
*/
namespace App\Http\Controllers\Backend\Device\Common\Common;

trait EditTrait
{
    //
    public function edit($dir, $id){
        return 0;
    }

    public function edit_dir0($id){
        $dir = Array();
        return $this->edit($dir, $id);
    }
    
    public function edit_dir1($dir1, $id){
        $dir = Array($dir1);
        return $this->edit($dir, $id);
    }

    public function edit_dir2($dir1, $dir2, $id){
        $dir = Array($dir1, $dir2);
        return $this->edit($dir, $id);
    }

    public function edit_dir3($dir1, $dir2, $dir3, $id){
        $dir = Array($dir1, $dir2, $dir3);
        return $this->edit($dir, $id);
    }

    public function edit_dir4($dir1, $dir2, $dir3, $dir4, $id){
        $dir = Array($dir1, $dir2, $dir3, $dir4);
        return $this->edit($dir, $id);
    }
    
    public function edit_dir5($dir1, $dir2, $dir3, $dir4, $dir5, $id){
        $dir = Array($dir1, $dir2, $dir3, $dir4, $dir5);
        return $this->edit($dir, $id);
    }

    public function edit_dir6($dir1, $dir2, $dir3, $dir4, $dir5, $dir6, $id){
        $dir = Array($dir1, $dir2, $dir3, $dir4, $dir5, $dir6);
        return $this->edit($dir, $id);
    }

    public function edit_dir7($dir1, $dir2, $dir3, $dir4, $dir5, $dir6, $dir7, $id){
        $dir = Array($dir1, $dir2, $dir3, $dir4, $dir5, $dir6, $dir7);
        return $this->edit($dir, $id);
    }

    public function edit_dir8($dir1, $dir2, $dir3, $dir4, $dir5, $dir6, $dir7, $dir8, $id){
        $dir = Array($dir1, $dir2, $dir3, $dir4, $dir5, $dir6, $dir7, $dir8);
        return $this->edit($dir, $id);
    }
}