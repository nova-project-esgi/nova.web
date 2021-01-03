import {Component, OnInit} from '@angular/core';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';
import {PageEvent} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import * as fromResources from '../../state/resources.reducer';
import * as ResourcesSelectors from '../../state/resources.selectors';
import * as ResourcesActions from '../../state/resources.actions';
import {trackById} from '../../../../shared/track-by/generic-track-by';
import * as _ from 'lodash';
import {Payload} from '../../../../shared/redux/payload';
import {ImageDetailedResourceDto} from '../../../../shared/models/resources/image-detailed-resource.dto';
import {ResourcesFilter} from '../../../../shared/filters/resources/resources-filter';
import * as LanguagesSelectors from '../../../../shared/states/languages/languages.selectors';
import * as DifficultySelectors from '../../../../shared/states/difficulties/difficulties.selectors';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {DetailedDifficultyDto} from '../../../../shared/models/difficulties/detailed-difficulty.dto';
import * as LanguagesActions from '../../../../shared/states/languages/languages.actions';
import * as DifficultiesActions from '../../../../shared/states/difficulties/difficulties.actions';

@Component({
  selector: 'app-resources-list-page',
  templateUrl: './resources-list-page.component.html',
  styles: []
})
export class ResourcesListPageComponent implements OnInit {
  resources: ImageDetailedResourceDto[];
  languages: LanguageDto[];
  difficulties: DetailedDifficultyDto[];

  constructor(private store: Store<fromResources.State>) {
    this.store.select(ResourcesSelectors.selectResources).subscribe(resources => {
      this.resources = resources;
    });
  }

  pagination: PaginationResume;

  trackByFn = trackById;

  ngOnInit(): void {
    this.store.select(ResourcesSelectors.selectPaginationResume).subscribe(pagination => {
      if (pagination && pagination.page !== null && pagination.size !== null && !_.isEqual(this.pagination, pagination) && this.pagination) {
        this.store.dispatch(ResourcesActions.loadResourcesPageFiltered());
      }
      this.pagination = pagination;
    });

    this.store.select(ResourcesSelectors.selectIsDeleted).subscribe(isDeleted => {
      if (isDeleted) {
        this.store.dispatch(ResourcesActions.loadResourcesPageFiltered());
      }
    });
    this.store.select(LanguagesSelectors.selectLanguages).subscribe(languages => {
      this.languages = languages;
    });
    this.store.select(DifficultySelectors.selectDifficulties).subscribe(difficulties => {
      this.difficulties = difficulties;
    });
    this.store.dispatch(LanguagesActions.loadLanguages());
    this.store.dispatch(DifficultiesActions.loadDifficulties());

  }

  onFilterReset(): void {

  }

  updateFilter(filter: ResourcesFilter): void {
    this.store.dispatch(ResourcesActions.updateFilter(new Payload<ResourcesFilter>(filter)));
  }

  onPageChange($event: PageEvent): void {
    this.store.dispatch(ResourcesActions.updatePagination(new Payload<PaginationResume>(PaginationResume.fromPageEvent($event))));
  }

  getResources(): void {
    this.store.dispatch(ResourcesActions.loadResourcesPageFiltered());
  }

  onResourceUpdated(resource: ImageDetailedResourceDto): void {
    this.store.dispatch(ResourcesActions.updateResource(new Payload<ImageDetailedResourceDto>(new ImageDetailedResourceDto(resource))));
  }

  onResourceDeleted(resource: ImageDetailedResourceDto): void {
    this.store.dispatch(ResourcesActions.deleteResource(new Payload<string>(resource.id)));
  }

  // get defaultLanguage(): LanguageDto {
  //   return this.languages.find(l => l.isDefault);
  // }
  //
  // get defaultDifficulties(): DetailedDifficultyDto[] {
  //   return this.difficulties.filter(d => d.isDefault);
  // }
}
