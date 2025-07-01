<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;

    protected $table = 'salary';

    protected $fillable = [
        'user_id',
        'total_price',
        'base_price',
        'salary_percentage',
        'status',
        'updated_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}