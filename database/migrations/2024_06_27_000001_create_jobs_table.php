<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('services')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('vehicle_number', 20)->nullable();
            $table->enum('payment', ['Бэлэн', 'Данс', 'Карт']);
            $table->timestamp('created_at')->useCurrent();
        });

    }

    public function down()
    {
        Schema::dropIfExists('jobs');
    }
};
