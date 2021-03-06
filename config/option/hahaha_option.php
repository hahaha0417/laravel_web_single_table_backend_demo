<?php

namespace pub;

/*
設計上，hahaha_option，規劃可以多重設定，例如我可以切換不同的server或是不同代理商
公表不需要這麼複雜，有需要再規劃default & local
*/
class hahaha_option
{
	use \hahahasublib\hahaha_instance_trait;

	function __construct()
	{
		$this->Initial();
	}
		
	public function Initial($option = 'hahaha')
	{
		// 不能用這個hahaha_env::Instance()，會無限迴圈
		if($option == 'hahaha' && method_exists($this, "Initial_Ha"))
		{
			$this->Initial_Ha($this);
		}	
		return $this;
	}
	
	/*
	初始化腳本
	*/
	public function Initial_Ha($option)
	{		
		$option->Project = new \stdClass;

		
		// project/front
		$option->Project->Front = new \stdClass;
		// project/backend
		$option->Project->Backend = new \stdClass;
		$option->Project->Backend->Panel_Add = new \stdClass;
		$option->Project->Backend->Panel_Add->Width = "97%";
		$option->Project->Backend->Panel_Add->Height = "97%";

		$option->Project->Backend->Panel_Detail = new \stdClass;
		$option->Project->Backend->Panel_Detail->Left = "1.5%";
		$option->Project->Backend->Panel_Detail->Width = "97%";
		$option->Project->Backend->Panel_Detail->Height = "400px";
	
	}
}


