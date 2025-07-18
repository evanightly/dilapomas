<?php

namespace App\Repositories;

use App\Models\Complaint;
use App\Support\Interfaces\Repositories\ComplaintRepositoryInterface;
use App\Traits\Repositories\HandlesFiltering;
use App\Traits\Repositories\HandlesRelations;
use App\Traits\Repositories\HandlesSorting;
use App\Traits\Repositories\RelationQueryable;
use Illuminate\Database\Eloquent\Builder;

class ComplaintRepository extends BaseRepository implements ComplaintRepositoryInterface {
    use HandlesFiltering, HandlesRelations, HandlesSorting, RelationQueryable;

    protected function applyFilters(array $searchParams = []): Builder {
        $query = $this->getQuery();

        $query = $this->applySearchFilters($query, $searchParams, ['reporter', 'reporter_identity_type', 'reporter_identity_number', 'incident_title', 'incident_description', 'incident_time', 'reported_person']);

        $query = $this->applyResolvedRelations($query, $searchParams);

        $query = $this->applyColumnFilters($query, $searchParams, ['id', 'reporter', 'reporter_identity_type', 'reporter_identity_number', 'incident_title', 'incident_description', 'incident_time', 'reported_person', 'created_at', 'updated_at']);

        $query = $this->applySorting($query, $searchParams);

        return $query;
    }

    protected function getModelClass(): string {
        return Complaint::class;
    }
}
