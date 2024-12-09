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
}