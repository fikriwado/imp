<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function all()
    {
        return User::fetch();
    }
}
