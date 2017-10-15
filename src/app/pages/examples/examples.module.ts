import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EntityModule } from '../common/entity/entity.module';

import { StorageService } from '../../services/storage.service';

import { routing } from './examples.routing';
import { ExampleCardsComponent } from './example-cards/example-cards.component';

@NgModule({
  imports: [
    EntityModule, CommonModule, FormsModule,
    ReactiveFormsModule, routing
  ],
  declarations: [
    ExampleCardsComponent,
  ],
  providers: [
    StorageService
  ]
})
export class ExamplesModule {}