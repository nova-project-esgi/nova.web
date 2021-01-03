import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';
import {UserAdminEditDto} from '../../../../shared/models/users/user-admin-edit.dto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styles: []
})
export class UsersEditComponent extends SubListElementEditionComponent<UserAdminEditDto> implements OnInit {

  roleCtrl: FormControl;

  @Input()
  set element(user: UserAdminEditDto) {
    this._elementCopy = _.clone(user);
    this.roleCtrl.setValue(user.role, {emitEvent: false});
    if (!user.canUpdateRole) {
      this.roleCtrl.disable({emitEvent: false});
    } else {
      this.roleCtrl.enable({emitEvent: false});
    }
  }

  @Output() userUpdated = new EventEmitter<UserAdminEditDto>();

  protected getElementInstance(): UserAdminEditDto {
    return new UserAdminEditDto({...this._elementCopy, role: this.roleCtrl.value});
  }

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('role', this.roleCtrl);
    this._formGrp = formGrp;
  }

  constructor(private fb: FormBuilder) {
    super();
    this.roleCtrl = this.fb.control('', {validators: [Validators.required]});
    this.initFormGrp(this.fb.group({}));
  }

  ngOnInit(): void {
  }

  updateUser(): void {
    this.userUpdated.emit(this.getElementInstance());
  }
}
