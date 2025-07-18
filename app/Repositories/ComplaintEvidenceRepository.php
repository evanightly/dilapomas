<?php

namespace App\Repositories;

use App\Models\ComplaintEvidence;
use App\Support\Interfaces\Repositories\ComplaintEvidenceRepositoryInterface;
use App\Traits\Repositories\HandlesFiltering;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use App\Traits\Repositories\RelationQueryable;
use Illuminate\Database\Eloquent\Builder;

class ComplaintEvidenceRepository extends BaseRepository implements ComplaintEvidenceRepositoryInterface {
    use HandlesFiltering, HandlesRelations, HandlesSorting, RelationQueryable;

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applySearchFilters($query, $searchParams, ['complaint_id', 'title', 'file_path', 'file_type']);

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applyColumnFilters($query, $searchParams, ['id', 'complaint_id', 'title', 'file_path', 'file_type', 'created_at', 'updated_at']);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }

    protected function getModelClass(): string {
        return ComplaintEvidence::class;
    }
}
