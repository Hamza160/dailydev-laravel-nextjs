<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    protected $fillable = ['user_id', 'title', 'url', 'image_url', 'description', 'comment_count', 'vote'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
