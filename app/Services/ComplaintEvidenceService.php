<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Repositories\ComplaintEvidenceRepository;
use App\Support\Interfaces\Repositories\ComplaintEvidenceRepositoryInterface;
use App\Support\Interfaces\Services\ComplaintEvidenceServiceInterface;
use App\Traits\Services\HandlesPageSizeAll;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ComplaintEvidenceService extends BaseCrudService implements ComplaintEvidenceServiceInterface
{
    use HandlesPageSizeAll;

    public function getAllPaginated(array $search = [], int $pageSize = 15): LengthAwarePaginator {
        $this->handlePageSizeAll();

        return parent::getAllPaginated($search, $pageSize);
    }

    /** @var ComplaintEvidenceRepository */
    protected $repository;

    protected function getRepositoryClass(): string {
        return ComplaintEvidenceRepositoryInterface::class;
    }
}
