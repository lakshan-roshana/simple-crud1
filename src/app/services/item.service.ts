import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = `${environment.apiUrl}/item`;

  constructor(private http: HttpClient) {}

  // getItems() {
  //   return this.http.get('http://localhost:5227/api/item');
  // }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  createItem(item: Omit<Item, 'id'>): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}