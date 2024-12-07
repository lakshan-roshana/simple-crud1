import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <form (ngSubmit)="createItem()" #itemForm="ngForm" class="p-4">
      <div class="mb-3">
        <input 
          type="text" 
          [(ngModel)]="item.name" 
          name="name" 
          placeholder="Name" 
          required 
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <input 
          type="text" 
          [(ngModel)]="item.description" 
          name="description" 
          placeholder="Description" 
          required 
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <input 
          type="number" 
          [(ngModel)]="item.price" 
          name="price" 
          placeholder="Price" 
          required 
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `
})
export class ItemFormComponent {
  item: Item = { id: '', name: '', description: '', price: 0 };

  constructor(private itemService: ItemService) {}

  createItem() {
    this.itemService.createItem(this.item).subscribe({
      next: (response) => {
        console.log('Item Created:', response);
        this.item = { id: '', name: '', description: '', price: 0 };
      },
      error: (error) => {
        console.error('Error creating item:', error);
      }
    });
  }
}