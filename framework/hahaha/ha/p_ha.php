<?php

/*
全域變數，一定要有Instance()
靜態用法，另外寫class用(3層式作法(1 static 2 public 3 kernel))
要附加，extends \ha::Log -> \he::Log， & \ha::ha_Log -> \he::he_Log自己設計
ex Log::Error("xxx");
*/
class p_ha
{
	use \hahahasublib\hahaha_instance_trait;
	
	// 為求快，當找到時，reference instance存成變數，這樣下次可以直接使用，但是會有物件釋放問題，會指向null
	// 因此Instance Release後，請下Update();，將指向NULL的變數，移除
	// 如果到處Release Instance，管理怕亂則規定統一在一個地方Release Instance，全部Release後下Update
	
	// --------------------------------------------------------------------------
	// Property
	// --------------------------------------------------------------------------
	// url用
	public static $Http_Port = 8081;
	public static $Https_Port = 8443;
	//

	function __construct()
	{
		
	}	
	
	public static $Mapping_List_ = NULL;
	
	public function __get($name)
	{
		// 有用到才初始對應表
		if(!self::$Mapping_List_)
		{
			$this->Get_Mapping();
		}	
			
		if(empty($this->$name))
		{
			$class = &self::$Mapping_List_[$name];
			if(!empty($class))
			{
				$this->$name = $class::Instance();
			}
			else
			{
				throw new \Exception("沒有ha變數$" . $name);
			}
		}
		
		return $this->$name;
	}
	
	public function Get_Mapping()
	{
		// Mapping $_SERVER
		self::$Mapping_List_ = [
			'Server' => "\hahahalib\hahaha_external_variable_server"
		];	
	}	
	
	public function Update()
	{
		foreach(self::$Mapping_List_ as $key => &$class)
		{
			if($class::$Instance_ == NULL)
			{
				unset($this->$key);
			}
		}
	}

	// --------------------------------------------------------------------------
	// --------------------------------------------------------------------------
	// 快捷函數
	// 根據實際樣式，何者比較適合，以hahaha為主
	// 如有另外想法，可另外寫一組，那就跟隨意，但是請自己負責
	// --------------------------------------------------------------------------
	// --------------------------------------------------------------------------
	// 語言可以找地方這樣用，就可以直接使用了
	protected static $T_ = [];
	// 由於設計上的問題(Initail的問題)，這裡不方便動態換Language，且容易搞混
	// 無聊再自己設計管理模組，這裡簡易使用
	// 有需要再用Instance方式，做成function
	/*
	t()應該小寫比較好看 & 省力
	*/
	public static function t(
		$item, 
		$parameters = [], 
		$node_names = [], 
		$parameter_prefix = NULL,
		$parameter_postfix = NULL		
	)
	{
		
		
	}

	public static function include_all($class)
	{
		$file_name_ = new \ReflectionClass($class);
		return $file_name_->getFileName();
		
	}

	// --------------------------------------------------------------------------
	// 真實
	// --------------------------------------------------------------------------
	/*
	url

	// 路徑 & 資源皆可
	http://127.0.0.1:8700/backend

	// 有要複雜設計請做成模組，這裡只是root
	$stage 是站，有指定用指定的，沒有用預設的

	只須改Url /abc ./abc abc
	*/
	public static function Url($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
						
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}
		

		if($url == "/")
		{
			return $project_->Url;
		}

		return $project_->Url . $url;
	}
	
	/*
	Images
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function Images($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
						
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Url .  $project_->Images . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Url .  $project_->Images . $url;
		}		
	}

	/*
	Videos
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function Videos($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
						
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}
		
		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Url .  $project_->Videos . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Url .  $project_->Videos . $url;
		}	
	}

	/*
	Assets
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function Assets($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
						
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}
		
		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Url .  $project_->Assets . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Url .  $project_->Assets . $url;
		}	
	}

	/*
	Uploads
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function Uploads($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
				
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}
		
		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Url .  $project_->Uploads . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Url .  $project_->Uploads . $url;
		}	
	}

	// --------------------------------------------------------------------------
	// 虛擬
	// --------------------------------------------------------------------------

	/*
	虛擬url，因為可能有mapping或自定義對應

	// 純路徑用
	http://127.0.0.1:8700/backend

	// 有要複雜設計請做成模組，這裡只是root
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function V_Url($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();

		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($url == "/")
		{
			return $project_->Virtual_Url;
		}

		return $project_->Virtual_Url . $url;
	}

	/*
	虛擬Images
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function V_Images($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
				
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Virtual_Url .  $project_->Images . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Virtual_Url .  $project_->Images . $url;
		}
	}

	/*
	虛擬Videos
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function V_Videos($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
				
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Virtual_Url .  $project_->Videos . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Virtual_Url .  $project_->Videos . $url;
		}
	}

	/*
	虛擬Assets
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function V_Assets($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
				
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Virtual_Url .  $project_->Assets . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Virtual_Url .  $project_->Assets . $url;
		}
	}

	/*
	虛擬Uploads
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function V_Uploads($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
				
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Virtual_Url .  $project_->Uploads . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Virtual_Url .  $project_->Uploads . $url;
		}
	}

	// --------------------------------------------------------------------------
	// 選擇
	// --------------------------------------------------------------------------

	/*
	選擇url，因為可能有mapping或自定義對應

	// 純路徑用
	http://127.0.0.1:8700/backend

	// 有要複雜設計請做成模組，這裡只是root
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function S_Url($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
				
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($url == "/")
		{
			return $project_->Select_Url;
		}

		return $project_->Select_Url . $url;
	}

	/*
	選擇Images
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function S_Images($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
				
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Select_Url .  $project_->Images . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Select_Url .  $project_->Images . $url;
		}
	}

	/*
	選擇Videos
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function S_Videos($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
				
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Select_Url .  $project_->Videos . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Select_Url .  $project_->Videos . $url;
		}
	}

	/*
	選擇Assets
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function S_Assets($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
				
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Select_Url .  $project_->Assets . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Select_Url .  $project_->Assets . $url;
		}
	}

	/*
	選擇Uploads
	$stage 是站，有指定用指定的，沒有用預設的
	*/
	public static function S_Uploads($url, $stage = null)
	{
		$global_pub_ = \p_ha\_Global::Get();
        $system_setting_pub_ = \p_ha\System_Setting::Get();		
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if(empty($stage))
		{
			$project_ = $system_setting_pub_->Project->{$global_pub_->Node->Name};
		}
		else
		{
			$project_ = $system_setting_pub_->Project->{$stage};
		}

		if($system_setting_pub_->System->Resource->Addition_Time)
		{
			return $project_->Select_Url .  $project_->Uploads . $url . "?t=" . $system_setting_pub_->System->Resource->Time;
		}
		else
		{
			return $project_->Select_Url .  $project_->Uploads . $url;
		}
	}

	// --------------------------------------------------------------------------
	// 目標
	// --------------------------------------------------------------------------
	/*
	自己的url

	*/
	public static function Self_Url($url)
	{
		$global_pub_ = \p_ha\_Global::Get();
		$system_setting_pub_ = \p_ha\System_Setting::Get();
						
		if(!$system_setting_pub_->Initial)
		{
			// composer dump-autoload會用到，因為他會直接分析controller
			$system_setting_pub_->Initial();
		}

		if($global_pub_->Stage->Name == "Public")
		{
			if($url == "/")
			{
				return $system_setting_pub_->System->Url;
			}
			return $system_setting_pub_->System->Url . $url;
		}
		
		$project_ = $system_setting_pub_->Project->{$global_pub_->Stage->Name};				

		if($url == "/")
		{
			return $project_->Url;
		}

		return $project_->Url . $url;
	}

	// --------------------------------------------------------------------------
	// 快捷
	// --------------------------------------------------------------------------
	/*
	因為$this->Tab or $this->Line"很醜"，且那樣寫會失去物件導向特性，例如我先塞到臨時變數，用$this法，我可能為了簡潔寫Code
	會紀錄要塞到哪個array，導致看起來很醜，所以寫成static
	$content_, $t_，基本上只要改變數reference即可，這樣就不會一次改要大改
	變數放前面式因為當行時比較整齊，放後面會變成不整齊
	當然多行時都差不多
	*/
	
	/*
	這只要一次複製
    */
    public static function Tab(&$tab, $n)
    {
		$tab = "";
		for($i = 0; $i < $n; $i++)
		{
			$tab .= "\t";
		}
    }

    /*
    這要兩次複製
    */
    public static function Tabed($n)
    {
        $tab_ = "";
        self::Tab($tab_, $n);
        return $tab_;
	}
	
	/*
	這只要一次複製
    */
    public static function Line(&$content, &$tab = "", $str = "")
    {
		$content[] = "{$tab}{$str}";
    }

    /*
    這要兩次複製
    */
    public static function Lineed(&$tab = "", $str = "")
    {
        $line_ = "";
        self::Line($line_, $tab_, $str);
        return $line_;
    }

	// --------------------------------------------------------------------------
	// require
	// --------------------------------------------------------------------------
	// 如有需要， 在這邊使用require其他PHP做整理
	// --------------------------------------------------------------------------
}