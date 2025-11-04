<?php

namespace App\Traits;

trait WithBuilder
{
    public function scopeFetch($query, $paginate = false)
    {
        $sort = request()->sort ?? 'desc';
        $query = $query->orderBy('created_at', $sort);
        if ($paginate) {
            $res = $query->paginate(10)->withQueryString()->onEachSide(0);

            $currentPage = $res->currentPage();
            $perPage = $res->perPage();

            $res->getCollection()->transform(function ($item, $key) use ($currentPage, $perPage) {
                $item->_index = ($currentPage - 1) * $perPage + $key + 1;
                return $item;
            });

            return $res;
        } else {
            $res = $query->get();
        }

        return $res;
    }
}
