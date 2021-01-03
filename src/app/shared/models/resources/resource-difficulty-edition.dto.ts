import * as _ from 'lodash';

export class ResourceDifficultyEditionDto {
    startValue: number;
    difficultyId: string;

    constructor(props?: Partial<ResourceDifficultyEditionDto>) {
        _.assign(this, props);
    }
}
