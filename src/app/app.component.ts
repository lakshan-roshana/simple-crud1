import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, ItemListComponent, HttpClientModule],
  template: `
    <div class="container">
      <h1 class="text-center my-4">Item Management</h1>
      <app-item-form></app-item-form>
      <app-item-list></app-item-list>
    </div>
  `
})
export class AppComponent {}