import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  styleUrls: ['./item-list.component.css'],
  templateUrl: './item-list.component.html',
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (error) => {
        console.error('Error loading items:', error);
      }
    });
  }

  deleteItem(id: string) {
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== id);
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      }
    });
  }

  updateItem(id: string) {
    // Get the current item to update
    const itemToUpdate = this.items.find(item => item.id === id);
  
    if (!itemToUpdate) {
      console.error('Item not found!');
      return;
    }
  
    // Mock updated data - this should come from a form in a real-world application
    const updatedData: Item = {
      ...itemToUpdate, // Spread the current item properties
      name: prompt('Enter new name:', itemToUpdate.name) || itemToUpdate.name,
      description: prompt('Enter new description:', itemToUpdate.description) || itemToUpdate.description
    };
  
    this.itemService.updateItem(id, updatedData).subscribe({
      next: (updatedItem) => {
        // Update the local items array with the new data
        this.items = this.items.map(item =>
          item.id === id ? updatedItem : item // Use the updated item from the response
        );
      },
      error: (error) => {
        console.error('Error updating item:', error);
      }
    });
  }
  
  
}