<?php

namespace App\Exceptions;

use Exception;

class HttpException extends Exception
{
    protected $status;

    public function __construct($message = '', $status = 500)
    {
        parent::__construct($message);
        $this->status = $status;
    }

    public function getStatus()
    {
        return $this->status;
    }
}
