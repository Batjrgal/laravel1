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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('full_name', 100)->nullable();
            $table->string('email')->unique();
            $table->integer('phone', false, true)->length(10)->default(0);
            $table->enum('role', ['Admin', 'Employee'])->nullable();
            $table->enum('status', ['Идэвхтэй', 'Идэвхгүй'])->default('Идэвхтэй');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
