import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #itemForm="ngForm" class="p-4">
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
      <button type="submit" [disabled]="!itemForm.form.valid" class="btn btn-primary">
        Submit
      </button>
    </form>
  `
})
export class ItemFormComponent {
  @Output() itemCreated = new EventEmitter<void>();
  
  item: Omit<Item, 'id'> = {
    name: '',
    description: '',
    price: 0
  };

  constructor(private itemService: ItemService) {}

  onSubmit() {
    this.itemService.createItem(this.item).subscribe({
      next: () => {
        this.item = { name: '', description: '', price: 0 };
        this.itemCreated.emit();
      },
      error: (error) => {
        console.error('Error creating item:', error);
        alert('Failed to create item. Please try again.');
      }
    });
  }
}