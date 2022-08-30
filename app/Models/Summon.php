<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Summon extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'customer_id',
        'customer_name',
        'subject',
        'status',
        'description',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
