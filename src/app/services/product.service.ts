import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRODUCTS } from '../constants/httpUrl';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(PRODUCTS);
  }
}

