<?php

namespace App\Console\Commands\hahaha\generator\php;

use Illuminate\Console\Command;
use Config;

class DbTablePhpConst extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:db_table_php_const';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $db_hahaha = new \hahahalib\hahaha_db_mysql;
        $db_result_hahaha = new \hahahalib\hahaha_db_mysql_result;
        $db_function_hahaha = new \hahahalib\hahaha_db_mysql_function;
        // -------------------------------------------
        // 因為怕核心褲太多冗餘，其他框架的初始化設定請自己提供，目前沒寫
        // -------------------------------------------
        $ip_ = Config::Get('database.connections.mysql_backend.host');
        $port_ = Config::Get('database.connections.mysql_backend.port');
        $username_ = Config::Get('database.connections.mysql_backend.username');
        $password_ = Config::Get('database.connections.mysql_backend.password');

        $database_ = Config::Get('hahaha.tool.generate.db_table_php_const.database');
        $output_path_ = Config::Get('hahaha.tool.generate.db_table_php_const.output_path');
        $output_namespace_ = Config::Get('hahaha.tool.generate.db_table_php_const.output_namespace');
        $doctrine_style_ = Config::Get('hahaha.tool.generate.db_table_php_const.doctrine_style');

        $db_hahaha->Connect("{$ip_}:{$port_}}", "{$username_}", "{$password_}", "{$database_}");
        $db_hahaha->Set_Names("utf8");

        // 查資料庫
        $table_items_ = [];
        $db_function_hahaha->Find_Db_Databases($db_hahaha, $db_result_hahaha, $table_items_, $database_);

        $tables_ = [];
        foreach($table_items_ as $key => &$item)
        {
            $tables_[] = $item['TABLE_NAME'];
        }

        $pass_tables_ = [
            "migrates"
        ];

        $text_deal_main_ = \g_plib\db\table\hahaha_generate_php_const::Instance()->Initial_Setting($ip_, $port_);

        // 因為接口，所以回轉成\n
        $content_ = implode("\r\n", $tables_);

        $text_deal_main_->Generate($content_,
            $database_,
            $output_path_,
            $output_namespace_,
            $doctrine_style_,
            $pass_tables_
        );

        echo "產生php const 成功";
    }
}
