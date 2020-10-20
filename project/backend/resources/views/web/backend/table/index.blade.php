{{-- 原始 : hahaha --}}
{{-- 維護 :  --}}
{{-- 指揮 :  --}}
{{-- ---------------------------------------------------------------------------------------------- --}}
{{-- 決定 : name --}}
{{-- 
    ----------------------------------------------------------------------------
    說明
    ----------------------------------------------------------------------------   
    欄位是否要模組化，等草稿定稿再做模組化，避免考慮不完全

    模組化須注意 : 
    1. 樣式
    2. 功能
    3. 現在收入狀況
    4. 接口
    5. 變成整個大模塊，並且保證我有任意使用權
    
    ----------------------------------------------------------------------------
    注意 
    ----------------------------------------------------------------------------
    本專案強調是後台"簡易快速開發"，而不是後台"任意客製化"，不要做錯東西
    這裡強調"模組化可以放reference"(需提供正常運作保證)，但是"實際開發不一定要用reference"(由開發的人自行承擔)
    由於目前沒有確定可以正常賺錢，因此不直接進行獨立的模塊化
    ----------------------------------------------------------------------------
    注意 
    ----------------------------------------------------------------------------
    模塊後規劃放在laravel single table backend framework內，除非完成了確定不改
    不然會被人搞，要求要相容舊的接口
    ----------------------------------------------------------------------------
--}}
{{-- ---------------------------------------------------------------------------------------------- --}}

<?
use hahaha\define\hahaha_define_table_action as action;
use hahaha\define\hahaha_define_table_class as class_;
use hahaha\define\hahaha_define_table_css as css;
use hahaha\define\hahaha_define_table_direction as direction;
use hahaha\define\hahaha_define_table_group as group;
use hahaha\define\hahaha_define_table_key as key;
use hahaha\define\hahaha_define_table_node as node;
use hahaha\define\hahaha_define_table_tag as tag;
use hahaha\define\hahaha_define_table_type as type;
use hahaha\define\hahaha_define_table_use as use_;
use hahaha\define\hahaha_define_table_validate as validate;
use hahaha\define\hahaha_define_table_db_field_type as db_field_type;
use Spatie\Url\Url;
?>

<?
// $target_table_class_ = $target_setting_table['table'];
// 這從controller傳來
$parameter_ = \hahaha\hahaha_parameter::Instance();
$use_ = &$parameter_->Use;
//
$target_table_ = &$parameter_->Target_Table;
$target_setting_table_ = &$parameter_->Target_Setting_Table;
$target_table_identify_ = &$parameter_->Target_Table_Identify;
$target_table_ = &$parameter_->Target_Table;
$data_list_ = &$parameter_->Index[key::DATA_LIST];
$data_link_ = &$parameter_->Index[key::DATA_LINK];

$target_setting_table_meta_data_ = EntityManager::getClassmetadata($target_setting_table_["entity"]);                                                                                        
// table class 名
$target_table_class_ = $target_setting_table_['table'];
// -------------------------------------------------- 
// 這裡是設定，到時候包成函式
// -------------------------------------------------- 
$use_->Identify = $target_table_class_::IDENTIFY;
$use_->Class_Button_Add_Identify = "." . $target_table_class_::IDENTIFY . "_" . $target_table_class_::BUTTON_ADD;
// -------------------------------------------------- 
$use_->Id_Panel_Add_Button_Add_Identify = "#" . $target_table_class_::IDENTIFY . "_" . $target_table_class_::PANEL_ADD_BUTTON_ADD;
$use_->Class_Panel_Add_Button_Add_Identify = "." . $target_table_class_::IDENTIFY . "_" . $target_table_class_::PANEL_ADD_BUTTON_ADD;
$use_->Id_Panel_Add_Button_Cancel_Identify = "#" . $target_table_class_::IDENTIFY . "_" . $target_table_class_::PANEL_ADD_BUTTON_CANCEL;
$use_->Class_Panel_Add_Button_Cancel_Identify = "." . $target_table_class_::IDENTIFY . "_" . $target_table_class_::PANEL_ADD_BUTTON_CANCEL;
// -------------------------------------------------- 
$use_->Block_Top_Identify = $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_TOP;
$use_->Id_Block_Top_Identify = "#" . $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_TOP; 
$use_->Class_Block_Top_Identify = "." . $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_TOP;
$use_->Block_Top = &$target_table_->Index[$target_table_class_::B_TOP];
// -------------------------------------------------- 
$use_->Panel_Add_Identify = $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_PANEL_ADD;
$use_->Id_Panel_Add_Identify = "#" . $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_PANEL_ADD; 
$use_->Class_Panel_Add_Identify = "." . $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_PANEL_ADD;
$use_->Panel_Add = &$target_table_->Index[$target_table_class_::B_PANEL_ADD];

// -------------------------------------------------- 
$use_->Block_Bottom_Identify = $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_BOTTOM;
$use_->Id_Block_Bottom_Identify = "#" . $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_BOTTOM; 
$use_->Class_Block_Bottom_Identify = "." . $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_BOTTOM;
$use_->Block_Bottom = &$target_table_->Index[$target_table_class_::B_BOTTOM];
// -------------------------------------------------- 
$use_->Prepend_Detail_Button_Identify = $target_table_class_::IDENTIFY . "_" . $target_table_class_::BUTTON_PREPEND_DETAIL;
$use_->Id_Prepend_Detail_Button_Identify = "#" . $target_table_class_::IDENTIFY . "_" . $target_table_class_::BUTTON_PREPEND_DETAIL;
$use_->Class_Prepend_Detail_Button_Identify = "." . $target_table_class_::IDENTIFY . "_" . $target_table_class_::BUTTON_PREPEND_DETAIL;

$use_->Panel_Detail_Identify = $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_PANEL_DETAIL;
$use_->Id_Panel_Detail_Identify = "#" . $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_PANEL_DETAIL;
$use_->Class_Panel_Detail_Identify = "." . $target_table_class_::IDENTIFY . "_" . $target_table_class_::B_PANEL_DETAIL;
// $use_->Panel_Detail = &$target_table_->Index[$target_table_class_::B_PANEL_DETAIL];
// -------------------------------------------------- 

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        @include('web.common.main_meta')
        @include('web.common.sub_meta')
    
        @include('web.common.main_script')
        @include('web.common.sub_script')
                    
        @include('web.common.main_css')
        @include('web.common.sub_css')
        {{--  Checkbox  --}}
        {{--  https://www.html5tricks.com/10-pretty-checkbox-radiobox.html  --}}
        <link rel="stylesheet" href="{{\p_ha::Assets('plugin/checkbox/labelauty/css/jquery-labelauty.css')}}">
        <script src="{{\p_ha::Assets('plugin/checkbox/labelauty/js/jquery-labelauty.js')}}"></script>
        {{--  jQuery Upload File  --}}
        {{--  http://hayageek.com/docs/jquery-upload-file.php#doc  --}}
        <link href="{{\p_ha::Assets('plugin/jquery-upload-file/css/uploadfile.css')}}" rel="stylesheet">
        {{--  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>  --}}
        <script src="{{\p_ha::Assets('plugin/jquery-upload-file/js/jquery.uploadfile.min.js')}}"></script>
        {{--  layer  --}}
        {{--  http://layer.layui.com/  --}}
        <script src="{{\p_ha::Assets('plugin/layer/layer/layer.js')}}"></script>
        {{-- Boostrap Autocomplete --}}
        <script src="https://gitcdn.link/repo/xcash/bootstrap-autocomplete/master/dist/latest/bootstrap-autocomplete.min.js"></script>
        {{--  --}}     
        {{--    --}}
        <script>
            {{--  此法不要用在plugin裡面，要請在index.js初始化  --}}
            {{-- var item_list_ = {!! $item_list !!};
            var index_ = "{{ $index }}";
            var page_ = "{{ $page }}";
             --}}
        </script>  
         
        {{--  主要文件  --}}
        {{--  因為參數式內容需要，所以需要產生需要的CSS & JS  
            因為表是動態內容，每個表會對應一組CSS & JS，存放在對應的
            // \p_ha::Assets('web/backend/table/index/*')路徑下
            命名為hahaha/backend_accounts_list.css & hahaha/backend/accounts_list.js
            {key} / {stage} / {node}("/"換成"_")
            --}}        
        {{--    --}}

        
        {{-- 自動生成文件 --}}
        <?
            $system_setting_pub_ = \pub\hahaha_system_setting::Instance();
            if($system_setting_pub_->Project->Backend->Generate_Script->Enabled)
            {
                // generator 
                $list_ = [
                    \hahaha\backend\table_index_css::Instance(),         
                    \hahaha\backend\table_index_js::Instance(),
                ];
                // 必須初始化，不然沒指標 
                $static_content_ = [];
                $dynamic_content_ = [];
                //
                $generator_ = \hahaha\hahaha_generator_web::Instance();
                
                $table_file_ = $system_setting_pub_->Project->Backend->Public . "/" . $system_setting_pub_->Project->Backend->Assets . 'web/backend/table/index/table';
                $file_list_ = [
                    $table_file_ . '/' . $target_table_identify_ . '.css',
                    $table_file_ . '/' . $target_table_identify_ . '.js',
                ];  
                
                if(!$system_setting_pub_->Project->Backend->Generate_Script->Overwrite)
                {
                    foreach($file_list_ as $key => $file)
                    {
                        if(file_exists($file))  
                        {
                            // 已經有就不處理，unset
                            unset($list_[$key]);
                            unset($file_list_[$key]);
                        }                  
                    }
                }
                
                if(!empty($file_list_))
                {
                    $generator_->Generate($list_,
                        $static_content_,
                        $dynamic_content_
                    ); 
                    $generator_->Save($static_content_, 
                        $file_list_
                    );
                }
                
            }
            
            // 注意 : CSS必須在index.css前面，JS也必須在index.js前面，以進行覆蓋
            // 其他模組化的，等到我的框架時，再用我的模組，統一前置
            $generator_->Render($dynamic_content_);
            
        ?>
       
        <link rel="stylesheet" href="{{\p_ha::Assets("web/backend/table/index/table/{$target_table_identify_}.css")}}">
        <script src="{{\p_ha::Assets("web/backend/table/index/table/{$target_table_identify_}.js")}}"></script>
        {{-- 客製化文件 --}}
        <link rel="stylesheet" href="{{\p_ha::Assets('web/backend/table/index.css')}}">
        <script src="{{\p_ha::Assets('web/backend/table/index.js')}}"></script>
        <script src="{{\p_ha::Assets('cross_origin/iframe_resize_height.js')}}"></script>

        
        {{--  附加  --}}
        

        
        <script>
            $(function(){    
                $(function () {
                    $('[data-toggle="tooltip"]').tooltip()
                  })
                
            });
            
        </script>
        <style>
            .container {
                /* https://pjchender.blogspot.tw/2017/10/bs-bootstrap-4-custom-container-and.html */
                /* 有預設樣式，要調整 */
                margin: 0;
                padding: 0;
                max-width: 100%;
            }
            
            .sidebar-menu.sidebar-mini {
                /* 會被iframe遮住 */
                z-index: 5000;
            }
            .sidebar-menu.sidebar-mini .main-menu ul li .submenu{
                /* 字太長延長 */
                width: 400px;
                right: -400px;
            }

            .sidebar-menu.sidebar-mini .main-menu ul li .submenu li {
                /* 字太長延長 */
                width: 400px;
            }

            

        </style>
        {{--  基於現在瀏覽器下載是並行的，因此程式碼檔案太多並不會嚴重影響效能，因此盡可能的拆成分散式模組  --}}
    </head>
    <body>    
        {{--  有需要再模組化，基本上只是分塊整入index資料夾，用@include填入  --}}
        {{--  如要翻譯，請在hahaha_setting_table裡面事先翻好  --}}

        <? // -------------------------------------------------------------------------------------------------------------- ?>
        <? // 標題面板 ?>
        <? // -------------------------------------------------------------------------------------------------------------- ?>
        <div class="index_title">
            <h1 style="font-weight:bold;">{{__('backend.db_table_list')}}</h1>
            <hr class="hr_title" />
            
            <h3 style="font-weight:bold;">{{$target_setting_table_['title']}}</h3>
            {{$target_setting_table_['description']}}
            <hr class="hr_title" />
        </div> 
        <? // -------------------------------------------------------------------------------------------------------------- ?>
        <? // 內容面板 ?>
        <? // -------------------------------------------------------------------------------------------------------------- ?>
        <div class="index_content">
                
        </div>     
        <div class="index_content">
            <form action="#" method="post">
                {{csrf_field()}}
                {{--  分隔線  --}}
                <div class="index_result_wrap">
                </div>
                <? // -------------------------------------------------------------------------------------------------------------- ?>
                <? // 置頂區塊 ?>
                <? // 此為挖洞，非客製化 ?>
                <? // -------------------------------------------------------------------------------------------------------------- ?>
                @if(!empty($use_->Block_Top) )
                    <div class="index_result_wrap">
                        <div class="index_result_content">
                            <? // -------------------------------------------------------------------------------------------------------------- ?>
                            <?php 
                            // 因為模板array會複製，所以用物件傳
                            $block = new \hahaha\hahaha_parameter;
                            $block->identify = &$use_->Block_Top_Identify;
                            $block->id = &$use_->Id_Block_Top_Identify;
                            $block->class = &$use_->Class_Block_Top_Identify;
                            $block->block = &$use_->Block_Top;
                            $block->block_class = "top";
                            $block->block_style = "";
                            ?>
                            @include("web.backend.table.common.block.block") 
                            <? // -------------------------------------------------------------------------------------------------------------- ?>
                        </div>
                    </div>
                @endif
                <? // -------------------------------------------------------------------------------------------------------------- ?>
                <? // Add置中面板 - 草創模組，簡單加就好，有需要複製後另做一份 ?>
                <? // 此為挖洞，非客製化 ?>
                <? // 彈出面板，所以border-bottom:unset;padding:unset; ?>
                <? // -------------------------------------------------------------------------------------------------------------- ?>
                @if(!empty($use_->Panel_Add) )
                    <div class="index_result_wrap" style="border-bottom:unset;padding:unset;">
                        <div class="index_result_content">
                            <? // -------------------------------------------------------------------------------------------------------------- ?>
                            <?php 
                            // 因為模板array會複製，所以用物件傳
                            $block = new \hahaha\hahaha_parameter;
                            $block->identify = &$use_->Panel_Add_Identify;
                            $block->id = &$use_->Id_Panel_Add_Identify;
                            $block->class = &$use_->Class_Panel_Add_Identify;
                            $block->panel = &$use_->Panel_Add;
                            $block->panel_class = "add";
                            $block->panel_style = "";
                            ?>
                            @include("web.backend.table.common.panel.panel") 
                            <? // -------------------------------------------------------------------------------------------------------------- ?>
                        </div>
                    </div>
                @endif
                <? // -------------------------------------------------------------------------------------------------------------- ?>
                <? // 內容面板 ?>
                <? // 此為挖洞，非客製化 ?>
                <? // -------------------------------------------------------------------------------------------------------------- ?>
                @if(!empty($data_list_) )
                    <div class="index_result_wrap">
                        <div class="index_result_content">
                            <table class="list_tab table table-sm">
                                <tr id="index_item_all" class="index_item">   
                                    <? // -------------------------------------------------------------------------------------------------------------- ?>
                                    <?php 
                                    // 因為模板array會複製，所以用物件傳
                                    $fields = new \hahaha\hahaha_parameter;
                                    $fields = &$target_table_->Index['main'];
                                    ?>
                                    @include("web.backend.table.common.table.th", ["fields"]) 
                                    <? // -------------------------------------------------------------------------------------------------------------- ?>  
                                </tr>
                                @foreach($data_list_ as $key_data => $data)                            
                                    <tr id="index_item_{{$key_data}}" class="index_item" item_id="{{$data['id']}}" index="{{$key_data}}">
                                        <? // -------------------------------------------------------------------------------------------------------------- ?>
                                        <?php 
                                        // 因為模板array會複製，所以用物件傳
                                        $block = new \hahaha\hahaha_parameter;
                                        $block->fields = &$target_table_->Index['main'];
                                        $block->key_data = &$key_data;
                                        $block->data = &$data;
                                        $block->option = &$option;
                                        ?>
                                        @include("web.backend.table.common.table.td") 
                                        <? // -------------------------------------------------------------------------------------------------------------- ?>   
                                    </tr> 
                                @endforeach                   
                            </table>
                        </div>
                    </div>
                @endif
                <? // -------------------------------------------------------------------------------------------------------------- ?>
                <? // 置底區塊 ?>
                <? // 此為挖洞，非客製化 ?>
                <? // -------------------------------------------------------------------------------------------------------------- ?>
                @if(!empty($use_->Block_Bottom) )
                    <div class="index_result_wrap">
                        <div class="index_result_content">
                            <? // -------------------------------------------------------------------------------------------------------------- ?>
                            <?php 
                            // 因為模板array會複製，所以用物件傳
                            $block = new \hahaha\hahaha_parameter;
                            $block->identify = &$use_->Block_Bottom_Identify;
                            $block->id = &$use_->Id_Block_Bottom_Identify;
                            $block->class = &$use_->Class_Block_Bottom_Identify;
                            $block->block = &$use_->Block_Bottom;
                            $block->block_class = "bottom";
                            $block->block_style = "";
                            ?>
                            @include("web.backend.table.common.block.block") 
                            <? // -------------------------------------------------------------------------------------------------------------- ?>
                        </div>
                    </div>
                @endif
                <? // -------------------------------------------------------------------------------------------------------------- ?>
                <? // link面板 ?>
                <? // 此為挖洞，非客製化 ?>
                <? // -------------------------------------------------------------------------------------------------------------- ?>
                @if($data_link_['count'] != 0)
                    <div class="index_result_wrap">                    
                        <div style="height:5px">&nbsp;</div>
                        <div class="page_list">
                            {{--  laravel樣式，有需要再模組化  --}}
                            <?
                            $page_ = $data_link_['page'];
                            $count_ = $data_link_['count'];
                            $range_ = $data_link_['range'];
                            //
                            $range_start_ = $page_ - $range_;
                            $range_end_ = $page_ + $range_;
                            $out_start_flag_ = false;
                            $out_end_flag_ = false;

                            $actual_link_ = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";                            
                            $url_ = Url::fromString($actual_link_);                         
                            ?>
                            <ul class="pagination" role="navigation">
                                @if(1 == $page_)
                                    <li class="page-item disabled" aria-disabled="true" aria-label="« First">
                                        <span class="page-link" aria-hidden="true">‹‹</span>
                                    </li> 
                                    <li class="page-item disabled" aria-disabled="true" aria-label="« Previous">
                                        <span class="page-link" aria-hidden="true">‹</span>
                                    </li> 
                                @else
                                    <li class="page-item" aria-disabled="true" aria-label="« First">
                                        <a class="page-link" href="{{$url_->withQueryParameter('page', 1)}}" rel="next" aria-label="« First">‹‹</a>
                                    </li>    
                                    <li class="page-item" aria-disabled="true" aria-label="« Previous">
                                        <a class="page-link" href="{{$url_->withQueryParameter('page', $page_ - 1)}}" rel="next" aria-label="« Previous">‹</a>
                                    </li>                        
                                @endif
                                @for ($i = 1; $i <= $count_; $i++)
                                    @if($page_ == $i)
                                        <li class="page-item active" aria-current="page"><span class="page-link">{{$i}}</span></li>
                                    @elseif($i >= $range_start_ && $i <= $range_end_)
                                        <li class="page-item"><a class="page-link" href="{{$url_->withQueryParameter('page', $i)}}">{{$i}}</a></li>
                                    @elseif(!$out_start_flag_ && $i < $range_start_)
                                        <li class="page-item disabled" aria-current="page"><span class="page-link">...</span></li>
                                        <? $out_start_flag_ = true; ?>                                        
                                    @elseif(!$out_end_flag_ && $i > $range_end_)
                                        <li class="page-item disabled" aria-current="page"><span class="page-link">...</span></li>
                                        <? $out_end_flag_ = true; ?>
                                    @endif
                                @endfor
                                @if($count_ == $page_)
                                    <li class="page-item disabled" aria-disabled="true" aria-label="Next »">
                                        <span class="page-link" aria-hidden="true">›</span>
                                    </li> 
                                    <li class="page-item disabled" aria-disabled="true" aria-label="End »">
                                        <span class="page-link" aria-hidden="true">››</span>
                                    </li> 
                                @else
                                    <li class="page-item" aria-disabled="true" aria-label="Next »">
                                        <a class="page-link" href="{{$url_->withQueryParameter('page', $page_ + 1)}}" rel="next" aria-label="Next »">›</a>
                                    </li>            
                                    <li class="page-item" aria-disabled="true" aria-label="End »">
                                        <a class="page-link" href="{{$url_->withQueryParameter('page', $count_)}}" rel="next" aria-label="End »">››</a>
                                    </li>                 
                                @endif
                            </ul>
                        </div>
                    </div>
                @endif  
            </form>         
        </div>         
               
      
         
    </body>
    
    <script>
            
        $(function(){
            // 最後一次載入
            lazyload();      
                            
        });
        
    </script>
</html>

