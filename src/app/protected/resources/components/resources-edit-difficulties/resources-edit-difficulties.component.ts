import {Component, Input, OnInit} from '@angular/core';
import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';
import {ResourcesEditDifficultyComponent} from '../resources-edit-difficulty/resources-edit-difficulty.component';
import {DetailedDifficultyDto} from '../../../../shared/models/difficulties/detailed-difficulty.dto';
import {ResourceDifficulty} from '../../../../shared/models/resources/resource-difficulty';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-resources-edit-difficulties',
  templateUrl: './resources-edit-difficulties.component.html',
  styles: []
})
export class ResourcesEditDifficultiesComponent extends FormListEditionComponent<ResourcesEditDifficultyComponent, ResourceDifficulty> implements OnInit {

  private _difficulties: DetailedDifficultyDto[] = [];

  @Input()
  set difficulties(difficulties: DetailedDifficultyDto[]) {
    this._difficulties = difficulties;
    this.defaultDifficulties.filter(d => !this.elements.some(rD => rD.difficulty.id === d.id))
      .forEach(d =>
      this.elements.push(new ResourceDifficulty({difficulty: d, selectedDifficultyTranslationIdx: 0, startValue: 0}))
    );
  }

  get availableDifficulties(): DetailedDifficultyDto[] {
    return this._difficulties.filter(d => !this.elements.some(dR => dR.difficulty?.id === d?.id));
  }

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
  }

  get defaultDifficulties(): DetailedDifficultyDto[] {
    return this._difficulties.filter(d => d.isDefault);
  }


}
