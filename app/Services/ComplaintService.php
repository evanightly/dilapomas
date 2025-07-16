<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Repositories\ComplaintRepository;
use App\Support\Interfaces\Repositories\ComplaintRepositoryInterface;
use App\Support\Interfaces\Services\ComplaintServiceInterface;
use App\Traits\Services\HandlesPageSizeAll;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ComplaintService extends BaseCrudService implements ComplaintServiceInterface
{
    use HandlesPageSizeAll;

    public function getAllPaginated(array $search = [], int $pageSize = 15): LengthAwarePaginator {
        $this->handlePageSizeAll();

        return parent::getAllPaginated($search, $pageSize);
    }

    /** @var ComplaintRepository */
    protected $repository;

    protected function getRepositoryClass(): string {
        return ComplaintRepositoryInterface::class;
    }
}
