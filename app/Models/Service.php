<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_name',
        'car_type',
        'price',
    ];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}