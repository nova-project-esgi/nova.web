import { Injectable } from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {TranslatedEventsTitleFilter} from '../../../shared/filters/events/translated-events-title.filter';
import {Observable} from 'rxjs';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {TranslatedEventDto} from '../../../shared/models/events/translated-event.dto';
import {CustomMediaTypeEnum} from '../../../shared/enums/custom-media-type.enum';
import {ChoiceTranslationFilter} from '../../../shared/filters/choices/choice-translation.filter';
import {ChoiceTranslationDto} from '../../../shared/models/choices/choice-translation.dto';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService extends ApiServiceBase{

  protected url = `${environment.apiUrl}/choices`;

  constructor(protected http: HttpClient) {
    super();
  }

  getPaginatedChoiceTranslationsFiltered(paginationWrapper: PaginationWrapper<ChoiceTranslationFilter>): Observable<PaginationMetadata<ChoiceTranslationDto>>{
    return this.getFiltered<PaginationMetadata<ChoiceTranslationDto>, ChoiceTranslationFilter>(
      {url: this.url, filterObj: {...paginationWrapper.content}, pagination: paginationWrapper,   headers: this.getAcceptHeader(CustomMediaTypeEnum.CHOICE_TRANSLATION)});
  }


}
