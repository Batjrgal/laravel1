<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('salary', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->integer('total_price', false, true)->length(50);
            $table->integer('base_price', false, true)->length(50);
            $table->integer('salary_percentage', false, true)->length(50);
            $table->enum('status', ['Олгосон', 'Олгоогүй'])->default('Олгоогүй');
            $table->string('updated_by', 250)->default('Олгоогүй');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('salary');
    }
};