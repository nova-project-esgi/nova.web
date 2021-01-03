import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {EventsEditChoiceResourceComponent} from '../events-edit-choice-resource/events-edit-choice-resource.component';
import {ImageDetailedResourceDto} from '../../../../shared/models/resources/image-detailed-resource.dto';
import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';
import {DetailedChoiceResource} from '../../../../shared/models/resources/detailed-choice-resource';

@Component({
  selector: 'app-events-edit-choice-resources',
  templateUrl: './events-edit-choice-resources.component.html',
  styles: []
})
export class EventsEditChoiceResourcesComponent extends FormListEditionComponent<EventsEditChoiceResourceComponent, DetailedChoiceResource> implements OnInit {


  @Input() resources: ImageDetailedResourceDto[] = [];

  get availableResources(): ImageDetailedResourceDto[] {
    return this.resources.filter(r => !this.elements.some(cR => cR.resource?.id === r?.id));
  }

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
  }



}
