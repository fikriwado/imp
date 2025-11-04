<?php

namespace App\Enums;

enum PostStatuses: string
{
    case DRAFT = 'draft';
    case PUBLISHED = 'published';
    case ARCHIVED = 'archived';
}
