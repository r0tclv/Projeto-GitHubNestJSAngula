import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent {

  products: any[] = [];
  page = 1;
  limit = 5;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get(`http://localhost:3000/products?page=${this.page}&limit=${this.limit}`)
      .subscribe((res: any) => {
        this.products = res.data;
      });
  }

  next() {
    this.page++;
    this.loadProducts();
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }

}