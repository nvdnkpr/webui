import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';
import { DynamicFormsCoreModule } from '@ng2-dynamic-forms/core';
import { DynamicFormsBootstrapUIModule } from '@ng2-dynamic-forms/ui-bootstrap';

import { EntityModule } from '../../common/entity/entity.module';
import { routing }       from './vlan.routing';

import { VlanListComponent } from './vlan-list/';
import { VlanAddComponent } from './vlan-add/';
import { VlanEditComponent } from './vlan-edit/';
import { VlanDeleteComponent } from './vlan-delete/';

import { NetworkService } from '../../../services';

@NgModule({
  imports: [
    EntityModule,
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsBootstrapUIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    VlanListComponent,
    VlanAddComponent,
    VlanEditComponent,
    VlanDeleteComponent,
  ],
  providers: [
    NetworkService
  ]
})
export class VlanModule {}