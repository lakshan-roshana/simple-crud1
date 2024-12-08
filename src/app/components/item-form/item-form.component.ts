import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  styleUrls: ['./item-form.component.css'],
  template: `
    <form (ngSubmit)="onSubmit()" #itemForm="ngForm" class="p-4">
      <div class="mb-3">
        <label for="id" class="form-label">ID</label>
        <input 
          type="text" 
          id="id"
          [(ngModel)]="item.id" 
          name="id" 
          placeholder="ID" 
          required 
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input 
          type="text" 
          id="name"
          [(ngModel)]="item.name" 
          name="name" 
          placeholder="Name" 
          required 
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea 
          id="description"
          [(ngModel)]="item.description" 
          name="description" 
          placeholder="Description" 
          required 
          class="form-control"
        ></textarea>
      </div>
      <button type="submit" [disabled]="!itemForm.form.valid" class="btn btn-primary">
        Submit
      </button>
    </form>
  `
})
export class ItemFormComponent {
  @Output() itemCreated = new EventEmitter<void>();

  item: Item = {
    id: '',
    name: '',
    description: ''
  };

  constructor(private itemService: ItemService) {}

  onSubmit() {
    this.itemService.createItem(this.item).subscribe({
      next: () => {
        // Reset the form after successful submission
        this.item = { id: '', name: '', description: '' };
        this.itemCreated.emit(); // Notify parent component
      },
      error: (error) => {
        console.error('Error creating item:', error);
        alert('Failed to create item. Please try again.');
      }
    });
  }
}
