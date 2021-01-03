import {Injectable} from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {ImageDetailedResourceEditionDto} from '../../../shared/models/resources/image-detailed-resource-edition.dto';
import {CustomMediaTypeEnum} from '../../../shared/enums/custom-media-type.enum';
import {ImageService} from './image.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {ResourcesFilter} from '../../../shared/filters/resources/resources-filter';
import {ResourceNameTranslationDto} from '../../../shared/models/resources/resource-name-translation.dto';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {PaginationWrapper} from '../../../shared/http/pagination/pagination-wrapper';
import {ImageDetailedResourceDto} from '../../../shared/models/resources/image-detailed-resource.dto';
import {FileUtils} from '../../../shared/utils/file.utils';
import {DetailedResourceDto} from '../../../shared/models/resources/detailed-resource.dto';
import {DetailedResourceEditionDto} from '../../../shared/models/resources/detailed-resource-edition.dto';

@Injectable({
  providedIn: 'root'
})
export class ResourceService extends ApiServiceBase {
  protected url = `${environment.apiUrl}/resources`;

  constructor(protected http: HttpClient, private imageService: ImageService) {
    super();
  }

  create(resource: ImageDetailedResourceEditionDto): Observable<any> {
    return this.createAndLocate({
      url: this.url,
      headers: this.getContentTypeHeader(CustomMediaTypeEnum.RESOURCE_WITH_TRANSLATIONS)
    }, resource.toResourceWithTranslations())
      .pipe(
        switchMap(location => this.imageService.saveFile(`${location}/icon`, resource.icon))
      );
  }

  getPaginatedResourceNamesFiltered(filter: ResourcesFilter): Observable<ResourceNameTranslationDto[]> {
    return this.getFiltered<PaginationMetadata<ResourceNameTranslationDto>, ResourcesFilter>({
      url: this.url,
      filterObj: filter,
      headers: this.getAcceptHeader(CustomMediaTypeEnum.RESOURCE_NAME)
    }).pipe(
      map(page => page.values.map(rN => new ResourceNameTranslationDto({name: rN.name})))
    );
  }

  getResourceIconById(id: string): Observable<File> {
    return this.imageService.getData(`${this.url}/${id}/icon`).pipe(
      map(content => FileUtils.base64ToFile(content, `icon-${id}`))
    );
  }

  getPaginatedDetailedResourcesFiltered(paginationWrapper: PaginationWrapper<ResourcesFilter>): Observable<PaginationMetadata<DetailedResourceDto>> {
    return this.getFiltered<PaginationMetadata<ImageDetailedResourceDto>, ResourcesFilter>(
      {
        url: this.url,
        filterObj: {...paginationWrapper.content},
        pagination: paginationWrapper,
        headers: this.getAcceptHeader(CustomMediaTypeEnum.RESOURCE_WITH_TRANSLATIONS)
      });
  }

  getAllDetailedResources(): Observable<DetailedResourceDto[]> {
    return this.fetchAll<DetailedResourceDto, ResourcesFilter>(
      {
        url: this.url,
        headers: this.getAcceptHeader(CustomMediaTypeEnum.RESOURCE_WITH_TRANSLATIONS)
      });
  }

  getAllImageDetailedResources(): Observable<ImageDetailedResourceDto[]> {
    return this.getAllDetailedResources().pipe(
      switchMap(resources => forkJoin(
        resources.map(resource => this.getResourceIconById(resource.id).pipe(
          map(icon => new ImageDetailedResourceDto({...resource, icon}))
        ))
        )
      )
    );
  }


  getPaginatedImageDetailedResourcesFiltered(paginationWrapper: PaginationWrapper<ResourcesFilter>): Observable<PaginationMetadata<ImageDetailedResourceDto>> {
    return this.getPaginatedDetailedResourcesFiltered(paginationWrapper).pipe(
      switchMap(page => {
        page = PaginationMetadata.fromPage(page);
        const values = page.values.map(resource => new ImageDetailedResourceDto({...resource}));
        const iconPage = page.copyTo<ImageDetailedResourceDto>(values);
        return forkJoin(
          of(iconPage),
          ...iconPage.values.map(
            resource => this.getResourceIconById(resource.id).pipe(
              tap(file => resource.icon = file)
            )));
      }),
      map(([page]) => page)
    );

  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  update(resource: DetailedResourceEditionDto, icon: File, id: string): Observable<any> {
    return this.http
      .put(`${this.url}/${id}`, resource, {headers: this.getContentTypeHeader(CustomMediaTypeEnum.RESOURCE_WITH_TRANSLATIONS)})
      .pipe(
        switchMap(location => this.imageService.saveFile(`${this.url}/${id}/icon`, icon))
      );
  }
}
