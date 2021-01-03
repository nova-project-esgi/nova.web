import {DifficultyTranslationDto} from './difficulty-translation.dto';
import * as _ from 'lodash';
import {DetailedDifficultyWithAvailableActionsDto} from './detailed-difficulty-with-available-actions.dto';

export class DetailedDifficultyDto {
    id: string;
    translations: DifficultyTranslationDto[];
    isDefault: boolean;
    rank = 0;

    constructor(props: Partial<DetailedDifficultyDto>) {
        _.assign(this, props);
        this.translations = props?.translations?.map(translation => new DifficultyTranslationDto(translation)) ?? [];
    }
}
