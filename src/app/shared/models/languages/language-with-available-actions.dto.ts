import {Id} from '../../ids/id';
import * as _ from 'lodash';

export class LanguageWithAvailableActionsDto implements Id<string> {
    id: string;
    code: string;
    subCode?: string;
    isDefault = false;
    canUpdate = true;
    canDelete = false;
    canSetDefault = false;
    constructor(language: Partial<LanguageWithAvailableActionsDto>) {
        _.assign(this, language);
    }

    get displayCode(): string {
        return this.subCode ? `${this.code}-${this.subCode}` : this.code;
    }

}
