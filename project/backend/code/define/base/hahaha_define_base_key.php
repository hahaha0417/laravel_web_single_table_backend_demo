<?php

namespace hahaha\define;

use hahahasublib\hahaha_instance_trait;

/*
use hahaha\define\hahaha_define_base_key as key_;

use hahaha\define\hahaha_define_base_key as base_key;
*/

/*
table 定義

因為怕寫錯要查麻煩，因此弄成對應表
*/
class hahaha_define_base_key
{	
    use hahaha_instance_trait;

    /*
    注意 : 沒有要做完，有做到才補
    */

    // 如要其他類型，則這樣寫TEXT_HA
    // 因為有類型衝突，有衝突的加_，ex. INT_
    // 這裡是標籤，不是實際設定，例如integer對應某項laravel的validate設定組

    // -------------------------------------- 
    // type
    // -------------------------------------- 
    const TYPE = "type";
    // -------------------------------------- 
    // validate
    // -------------------------------------- 
    const VALIDATE = "validate";
    // -------------------------------------- 
    // actions
    // -------------------------------------- 
    const ACTIONS = "actions";
    // -------------------------------------- 
    // attributes - HTML的屬性的key
    // --------------------------------------
    const ATTRIBUTES = "attributes";
    // 縮寫
    const ATTRS = self::ATTRIBUTES;
    // -------------------------------------- 
    // properties - 套件的屬性的value
    // --------------------------------------
    const PROPERTIES = "properties";
    // 縮寫
    const PROPS = self::PROPERTIES;
    // -------------------------------------- 
    // tags
    // --------------------------------------
    const TAGS = "tags";


    // -------------------------------------- 
    // 
    // --------------------------------------
    // main or input
    const CLASSES = "classes"; 
    // no decide
    const CLASSES_1 = "classes_1"; 
    const CLASSES_2 = "classes_2"; 
    const CLASSES_3 = "classes_3"; 
    const CLASSES_4 = "classes_4"; 
    const CLASSES_5 = "classes_5"; 
    // decide
    const CLASSES_GROUP = "classes_group"; 
    const CLASSES_FORM_GROUP = "classes_from_group"; 
    const CLASSES_LABEL = "classes_label"; 
    const CLASSES_OPTION = "classes_option"; 
    const CLASSES_BUTTON = "classes_button"; 
    const CLASSES_ICON = "classes_icon"; 
    const CLASSES_LINK = "classes_link"; 

    // -------------------------------------- 
    // style
    // -------------------------------------- 
    // main or input
    const STYLES = "styles"; 
    // no decide
    const STYLES_1 = "styles_1"; 
    const STYLES_2 = "styles_2"; 
    const STYLES_3 = "styles_3"; 
    const STYLES_4 = "styles_4"; 
    const STYLES_5 = "styles_5"; 
    // decide
    const STYLES_GROUP = "styles_group"; 
    const STYLES_FORM_GROUP = "styles_from_group"; 
    const STYLES_LABEL = "styles_label"; 
    const STYLES_OPTION = "styles_option"; 
    const STYLES_BUTTON = "styles_button"; 
    const STYLES_ICON = "styles_icon"; 
    const STYLES_LINK = "styles_link";

    // -------------------------------------- 
    // icon
    // -------------------------------------- 
    const ICON = "icon";
    // -------------------------------------- 
    // readonly
    // -------------------------------------- 
    const READONLY = "readonly";
    // -------------------------------------- 
    // key
    // -------------------------------------- 
    const KEY = "key";
    // -------------------------------------- 
    // value
    // -------------------------------------- 
    const VALUE = "value";
    // -------------------------------------- 
    // id
    // -------------------------------------- 
    const ID = "id";
    // -------------------------------------- 
    // db field
    // -------------------------------------- 
    const DB_FIELD = "db_field";
    // -------------------------------------- 
    // is field
    // -------------------------------------- 
    const IS_FIELD = "is_field";
    // -------------------------------------- 
    // field
    // -------------------------------------- 
    const FIELD = "field";
    // -------------------------------------- 
    // name
    // -------------------------------------- 
    const NAME = "name";
    // -------------------------------------- 
    // index
    // -------------------------------------- 
    const INDEX = "index";
    // -------------------------------------- 
    // title
    // -------------------------------------- 
    const TITLE = "title";
    // -------------------------------------- 
    // hint
    // -------------------------------------- 
    const HINT = "hint";
    // -------------------------------------- 
    // nodes
    // -------------------------------------- 
    const NODES = "nodes";
    // -------------------------------------- 
    // group
    // -------------------------------------- 
    const GROUP = "group";
    // -------------------------------------- 
    // items
    // -------------------------------------- 
    const ITEMS = "_items";
    // -------------------------------------- 
    // options
    // -------------------------------------- 
    const OPTIONS = "_options";
    // -------------------------------------- 
    // modules
    // -------------------------------------- 
    const MODULES = " modules";
    // -------------------------------------- 
    // direction
    // -------------------------------------- 
    const DIRECTION = "direction";
    // -------------------------------------- 
    // placeholder
    // --------------------------------------    
    const PLACEHOLDER = "placeholder";
    // --------------------------------------   
    // use
    // --------------------------------------    
    const USE_ = "use";
    // --------------------------------------  
    // content
    // --------------------------------------    
    const CONTENT = "content";
    // --------------------------------------  
    // node
    // --------------------------------------    
    const NODE = "node";
    // --------------------------------------  
    // none
    // --------------------------------------    
    const NONE = "none";
    // --------------------------------------  
    // and
    // --------------------------------------    
    const AND = "and";
    // --------------------------------------  
    // or
    // --------------------------------------    
    const OR = "or";    
    // --------------------------------------  
    // data
    // --------------------------------------    
    const DATA = "data";    
    // --------------------------------------  
    // data_link
    // --------------------------------------    
    const DATA_LINK = "data_link";    
    // --------------------------------------  
    // data_list
    // --------------------------------------    
    const DATA_LIST = "data_list";    
    // -------------------------------------- 
    // url
    // -------------------------------------- 
    const URL = "url";
    // -------------------------------------- 
    // path
    // -------------------------------------- 
    const PATH = "path";

    // -------------------------------------- 
    // path
    // -------------------------------------- 
    const DESCRIPTION = "description"; 
    // -------------------------------------- 
    // path
    // -------------------------------------- 
    const NAMESPACE = "namespace"; 
    // -------------------------------------- 
    // entity
    // -------------------------------------- 
    const ENTITY = "entity"; 
    // -------------------------------------- 
    // table
    // -------------------------------------- 
    const TABLE = "table"; 
    
    // -------------------------------------- 
    // connection
    // -------------------------------------- 
    const CONNECTION = "connection"; 
    // -------------------------------------- 
    // path
    // -------------------------------------- 
    const stage = "stage"; 
    // -------------------------------------- 
    // alias
    // -------------------------------------- 
    const ALIAS = "alias"; 
    // -------------------------------------- 
    // route
    // -------------------------------------- 
    const ROUTE = "route"; 
    // -------------------------------------- 
    // model
    // -------------------------------------- 
    const MODEL = "model"; 
    // -------------------------------------- 
    // view
    // -------------------------------------- 
    const VIEW = "view"; 
    // -------------------------------------- 
    // controller
    // -------------------------------------- 
    const CONTROLLER = "controller"; 
    // -------------------------------------- 
    // target
    // -------------------------------------- 
    const TARGET = "target"; 
    // -------------------------------------- 
    // active
    // --------------------------------------  
    const ACTIVE = "active"; 
    // -------------------------------------- 
    // background
    // -------------------------------------- 
    const BACKGROUND = "background"; 
    // -------------------------------------- 
    // mini
    // -------------------------------------- 
    const MINI = "mini"; 
    // -------------------------------------- 
    // default
    // -------------------------------------- 
    const DEFAULT = "default"; 
    // -------------------------------------- 
    // middle
    // -------------------------------------- 
    const MIDDLEWARE = "middle"; 
    // -------------------------------------- 
    // prefix
    // -------------------------------------- 
    const PREFIX = "prefix"; 
    // -------------------------------------- 
    // method
    // -------------------------------------- 
    const METHOD = "method"; 
    // -------------------------------------- 
    // action
    // -------------------------------------- 
    const ACTION = "action"; 
    // -------------------------------------- 
    // stage
    // -------------------------------------- 
    const STAGE = "stage"; 
    // -------------------------------------- 
    // item
    // -------------------------------------- 
    const ITEM = "item"; 
    // -------------------------------------- 
    // page
    // -------------------------------------- 
    const PAGE = "page"; 
    // -------------------------------------- 
    // menu
    // -------------------------------------- 
    const MENU = "menu"; 
    // -------------------------------------- 
    // setting
    // -------------------------------------- 
    const SETTINGS = "setting"; 
    // -------------------------------------- 
    // use
    // -------------------------------------- 
    const _USE = "use";
    // -------------------------------------- 
    // generator
    // -------------------------------------- 
    const GENERATOR = "generator";
    

    
    // --------------------------------------  
    // doctrine
    // --------------------------------------
    // key_::NONE key_::AND key_::OR
    // --------------------------------------  



	function __construct()
	{
		// $this->Initial();
	}
	
	public function Initial()
	{
       
	}


}


