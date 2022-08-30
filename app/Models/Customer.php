<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'customers';

    protected $fillable = [
        'name',
        'fantasy_name',
        'cnpj',
        'phone',
        'zipcode',
        'street',
        'number',
        'complement',
        'neighborhood',
        'city',
        'state',
    ];
}
