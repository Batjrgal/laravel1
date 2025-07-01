<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('phone', false, true)->length(10)->default(0)->after('email');
            $table->enum('role', ['Admin', 'Employee'])->nullable()->after('phone');
            $table->enum('status', ['Идэвхтэй', 'Идэвхгүй'])->default('Идэвхтэй')->after('role');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'role', 'status']);
        });
    }
};
