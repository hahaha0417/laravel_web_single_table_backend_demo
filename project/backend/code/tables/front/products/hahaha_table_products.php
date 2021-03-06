<?php

namespace hahaha\front;

use hahahasublib\hahaha_instance_trait;

use  hahaha\define\hahaha_define_table_action as action;
use  hahaha\define\hahaha_define_table_key as key;
use  hahaha\define\hahaha_define_table_tag as tag;
use  hahaha\define\hahaha_define_table_type as type;
use  hahaha\define\hahaha_define_table_validate as validate;

/*
首頁自定義欄位

因為套版用，設定會是死的，所以直接用array描述，不需要另外從資料庫撈，存在快取

如果有完整一套組合，請繼承出去修改，hahaha提供的格式，請勿直接亂改
基本上完全相異的做法，開一個新專案是比較好的選擇，避免composer要取聯集，載入太多東西
*/
class hahaha_table_products
{	
    use hahaha_instance_trait;
	
	const ID = "id";
	const TYPE = "type";
	const NAME = "name";
	const DESCRIPTION = "description";
	const COMMENT = "comment";
	const IMAGE = "image";
	const URL = "url";
	const SHOW_START_TIME = "show_start_time";
	const SHOW_END_TIME = "show_end_time";
	const SALE_START_TIME = "sale_start_time";
	const SALE_END_TIME = "sale_end_time";
	const STATUS = "status";	
	const CREATED_AT = "created_at";
	const UPDATED_AT = "updated_at";

    /*
	settings
	*/
	public $Settings = [];

	/*
	fields
	*/
	public $Fields = [];

	/*
	index
	*/
	public $Index = [];

	/*
	preview
	*/
	public $Preview = [];

	/*
	edit
	*/
	public $Edit = [];

	function __construct()
	{
		$this->Initial();
	}

	public function Initial()
	{
        // 可以給其他人設定
		$this->Settings($this->Settings);
		$this->Fields($this->Fields);
		$this->Index($this->Index);
		$this->Preview($this->Preview);
		$this->Edit($this->Edit);
	}

	/*
	settings - 設定
	因為未來要移植php hahaha framework，所以不放在config
	*/
	public function Settings(&$Settings)
	{
		// 因為同一個節點，這是共用設定
		$Settings = [
			"default" => [
                // 基於彈性，不一定要全部綁一起，如怕亂，請提供設定集，寫設定集的要提供該設定下的使用正常
                "main" => "hahaha",
                "preview" => "hahaha",
                "edit" => "hahaha",
			],
        ];
        
	}
	
	/*
	fields - DB table fields
	因為未來要移植php hahaha framework，所以不放在config
	
	"id" => [
		key_::TYPE => type::TEXT,
		key_::VALIDATE => validate::EMAIL,
		key_::ACTIONS => [
			action::AUTO_UPDATE => false,
		],				
		key_::TAGS => [
			tag::VISLBLED => true,
			tag::ENABLED => true,
			tag::DISPLAY_NONE => false,
		],
	],
	*/
	public function Fields(&$Fields)
	{
		// 因為同一個節點，這是共用設定
		$Fields = [
			self::ID => [
				key_::TYPE => type::TEXT,
				key_::TAGS => [
					tag::DISABLED => true,
				],
			],
			self::TYPE => [
				key_::TYPE => type::COMBOBOX,	// 先用array，確定後再看要不要關聯其他表
			],
			self::NAME => [
				key_::TYPE => type::TEXT,
			],
			self::DESCRIPTION => [
				key_::TYPE => type::TEXTAREA,	
			],
			self::COMMENT => [
				key_::TYPE => type::TEXTAREA,	
			],
			self::IMAGE => [
				key_::TYPE => type::IMAGE_UPLOAD,
				key_::ACTIONS => [
					action::AUTO_UPDATE => true,
				],	
			],
			self::URL => [
				key_::TYPE => type::TEXT,
			],
			self::SHOW_START_TIME => [
				key_::TYPE => type::TIME,
			],
			self::SHOW_END_TIME => [
				key_::TYPE => type::TIME,
			],
			self::SALE_START_TIME => [
				key_::TYPE => type::TIME,
			],
			self::SALE_END_TIME => [
				key_::TYPE => type::TIME,
			],
			self::STATUS => [
				key_::TYPE => type::TEXT,
				key_::ACTIONS => [
					action::AUTO_UPDATE => true,
				],	
			],
			self::CREATED_AT => [
				key_::TYPE => type::TEXT,
				key_::TAGS => [
					tag::DISABLED => true,
				],
			],
			self::UPDATED_AT => [
				key_::TYPE => type::TEXT,
				key_::TAGS => [
					tag::DISABLED => true,
				],
			],
        ];        
    }
    
    /*
	index - 首頁
	因為未來要移植php hahaha framework，所以不放在config
	*/
	public function Index(&$Index)
	{
		// 因為同一個節點，這是共用設定
		$Index = [
			"hahaha" => [
                // 基於彈性，不一定要全部綁一起，如怕亂，請提供設定集，寫設定集的要提供該設定下的使用正常
                // 主要列表
                "main" => [
					self::ID => [
						key_::TYPE => type::TEXT,
						key_::TAGS => [
							tag::DISABLED => true,
						],
					],
					self::TYPE => [
						key_::TYPE => type::COMBOBOX,	// 先用array，確定後再看要不要關聯其他表
					],
					self::NAME => [
						key_::TYPE => type::TEXT,
					],
					self::DESCRIPTION => [
						key_::TYPE => type::TEXTAREA,	
					],
					self::COMMENT => [
						key_::TYPE => type::TEXTAREA,	
					],
					self::IMAGE => [
						key_::TYPE => type::IMAGE_UPLOAD,
						key_::ACTIONS => [
							action::AUTO_UPDATE => true,
						],	
					],
					self::URL => [
						key_::TYPE => type::TEXT,
					],
					self::SHOW_START_TIME => [
						key_::TYPE => type::TIME,
					],
					self::SHOW_END_TIME => [
						key_::TYPE => type::TIME,
					],
					self::SALE_START_TIME => [
						key_::TYPE => type::TIME,
					],
					self::SALE_END_TIME => [
						key_::TYPE => type::TIME,
					],
					self::STATUS => [
						key_::TYPE => type::TEXT,
						key_::ACTIONS => [
							action::AUTO_UPDATE => true,
						],	
					],
					self::CREATED_AT => [
						key_::TYPE => type::TEXT,
						key_::TAGS => [
							tag::DISABLED => true,
						],
					],
					self::UPDATED_AT => [
						key_::TYPE => type::TEXT,
						key_::TAGS => [
							tag::DISABLED => true,
						],
					],
                ],
                // 
                // detail panel
                "detail" => [
					self::ID => [
						key_::TYPE => type::TEXT,
						key_::TAGS => [
							tag::DISABLED => true,
						],
					],
					self::TYPE => [
						key_::TYPE => type::COMBOBOX,	// 先用array，確定後再看要不要關聯其他表
					],
					self::NAME => [
						key_::TYPE => type::TEXT,
					],
					self::DESCRIPTION => [
						key_::TYPE => type::TEXTAREA,	
					],
					self::COMMENT => [
						key_::TYPE => type::TEXTAREA,	
					],
					self::IMAGE => [
						key_::TYPE => type::IMAGE_UPLOAD,
						key_::ACTIONS => [
							action::AUTO_UPDATE => true,
						],	
					],
					self::URL => [
						key_::TYPE => type::TEXT,
					],
					self::SHOW_START_TIME => [
						key_::TYPE => type::TIME,
					],
					self::SHOW_END_TIME => [
						key_::TYPE => type::TIME,
					],
					self::SALE_START_TIME => [
						key_::TYPE => type::TIME,
					],
					self::SALE_END_TIME => [
						key_::TYPE => type::TIME,
					],
					self::STATUS => [
						key_::TYPE => type::TEXT,
						key_::ACTIONS => [
							action::AUTO_UPDATE => true,
						],	
					],
					self::CREATED_AT => [
						key_::TYPE => type::TEXT,
						key_::TAGS => [
							tag::DISABLED => true,
						],
					],
					self::UPDATED_AT => [
						key_::TYPE => type::TEXT,
						key_::TAGS => [
							tag::DISABLED => true,
						],
					],
                ],
                // new panel
                "new" => [
					self::ID => [
						key_::TYPE => type::TEXT,
						key_::TAGS => [
							tag::DISABLED => true,
						],
					],
					self::TYPE => [
						key_::TYPE => type::COMBOBOX,	// 先用array，確定後再看要不要關聯其他表
					],
					self::NAME => [
						key_::TYPE => type::TEXT,
					],
					self::DESCRIPTION => [
						key_::TYPE => type::TEXTAREA,	
					],
					self::COMMENT => [
						key_::TYPE => type::TEXTAREA,	
					],
					self::IMAGE => [
						key_::TYPE => type::IMAGE_UPLOAD,
						key_::ACTIONS => [
							action::AUTO_UPDATE => true,
						],	
					],
					self::URL => [
						key_::TYPE => type::TEXT,
					],
					self::SHOW_START_TIME => [
						key_::TYPE => type::TIME,
					],
					self::SHOW_END_TIME => [
						key_::TYPE => type::TIME,
					],
					self::SALE_START_TIME => [
						key_::TYPE => type::TIME,
					],
					self::SALE_END_TIME => [
						key_::TYPE => type::TIME,
					],
					self::STATUS => [
						key_::TYPE => type::TEXT,
						key_::ACTIONS => [
							action::AUTO_UPDATE => true,
						],	
					],
					self::CREATED_AT => [
						key_::TYPE => type::TEXT,
						key_::TAGS => [
							tag::DISABLED => true,
						],
					],
					self::UPDATED_AT => [
						key_::TYPE => type::TEXT,
						key_::TAGS => [
							tag::DISABLED => true,
						],
					],
                ],
			],
        ];
        
	}

	/*
	preview - 預覽葉
	因為未來要移植php hahaha framework，所以不放在config
	*/
	public function Preview(&$Preview)
	{
		// 因為同一個節點，所以所有資料表共用一個router
		$Preview = [
			"hahaha" => [
				self::ID => [
					key_::TYPE => type::TEXT,
					key_::TAGS => [
						tag::DISABLED => true,
					],
				],
				self::TYPE => [
					key_::TYPE => type::COMBOBOX,	// 先用array，確定後再看要不要關聯其他表
				],
				self::NAME => [
					key_::TYPE => type::TEXT,
				],
				self::DESCRIPTION => [
					key_::TYPE => type::TEXTAREA,	
				],
				self::COMMENT => [
					key_::TYPE => type::TEXTAREA,	
				],
				self::IMAGE => [
					key_::TYPE => type::IMAGE_UPLOAD,
					key_::ACTIONS => [
						action::AUTO_UPDATE => true,
					],	
				],
				self::URL => [
					key_::TYPE => type::TEXT,
				],
				self::SHOW_START_TIME => [
					key_::TYPE => type::TIME,
				],
				self::SHOW_END_TIME => [
					key_::TYPE => type::TIME,
				],
				self::SALE_START_TIME => [
					key_::TYPE => type::TIME,
				],
				self::SALE_END_TIME => [
					key_::TYPE => type::TIME,
				],
				self::STATUS => [
					key_::TYPE => type::TEXT,
					key_::ACTIONS => [
						action::AUTO_UPDATE => true,
					],	
				],
				self::CREATED_AT => [
					key_::TYPE => type::TEXT,
					key_::TAGS => [
						tag::DISABLED => true,
					],
				],
				self::UPDATED_AT => [
					key_::TYPE => type::TEXT,
					key_::TAGS => [
						tag::DISABLED => true,
					],
				],
			],
		];

	}

	/*
	edit - 編輯頁
	*/
	public function Edit(&$Edit)
	{
		// 因為同一個節點，所以所有資料表共用一個model
		$Edit = [
			"hahaha" => [
				self::ID => [
					key_::TYPE => type::TEXT,
					key_::TAGS => [
						tag::DISABLED => true,
					],
				],
				self::TYPE => [
					key_::TYPE => type::COMBOBOX,	// 先用array，確定後再看要不要關聯其他表
				],
				self::NAME => [
					key_::TYPE => type::TEXT,
				],
				self::DESCRIPTION => [
					key_::TYPE => type::TEXTAREA,	
				],
				self::COMMENT => [
					key_::TYPE => type::TEXTAREA,	
				],
				self::IMAGE => [
					key_::TYPE => type::IMAGE_UPLOAD,
					key_::ACTIONS => [
						action::AUTO_UPDATE => true,
					],	
				],
				self::URL => [
					key_::TYPE => type::TEXT,
				],
				self::SHOW_START_TIME => [
					key_::TYPE => type::TIME,
				],
				self::SHOW_END_TIME => [
					key_::TYPE => type::TIME,
				],
				self::SALE_START_TIME => [
					key_::TYPE => type::TIME,
				],
				self::SALE_END_TIME => [
					key_::TYPE => type::TIME,
				],
				self::STATUS => [
					key_::TYPE => type::TEXT,
					key_::ACTIONS => [
						action::AUTO_UPDATE => true,
					],	
				],
				self::CREATED_AT => [
					key_::TYPE => type::TEXT,
					key_::TAGS => [
						tag::DISABLED => true,
					],
				],
				self::UPDATED_AT => [
					key_::TYPE => type::TEXT,
					key_::TAGS => [
						tag::DISABLED => true,
					],
				],
			],
        ];
        
	}

}


