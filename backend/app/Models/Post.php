<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['user_id', 'title', 'url', 'image_url', 'description', 'comment_count', 'vote'];
}
