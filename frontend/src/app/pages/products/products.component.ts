import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductFormComponent } from '../product-form/product-form.component';
import { AuthService } from '../../core/auth.service';
import { API_URL } from '../../core/api-url';
import { Product } from '../../core/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  page = signal(1);
  limit = 5;
  totalProducts = signal(0);
  lastPage = signal(1);
  loading = signal(true);

  showForm = signal(false);
  editingProduct: Product | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.http
      .get<{ data: Product[]; total: number; page: number; lastPage: number }>(
        `${API_URL}/products?page=${this.page()}&limit=${this.limit}`,
      )
      .subscribe({
        next: (res) => {
          this.products.set(res.data);
          this.totalProducts.set(res.total);
          this.lastPage.set(res.lastPage);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  goNext() {
    if (this.page() < this.lastPage()) {
      this.page.update((p) => p + 1);
      this.loadProducts();
    }
  }

  goPrev() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.loadProducts();
    }
  }

  openCreate() {
    this.editingProduct = null;
    this.showForm.set(true);
  }

  openEdit(product: Product) {
    this.editingProduct = { ...product };
    this.showForm.set(true);
  }

  onFormClose(saved: boolean) {
    this.showForm.set(false);
    if (saved) this.loadProducts();
  }

  deleteProduct(id: number) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    this.http.delete(`${API_URL}/products/${id}`).subscribe({
      next: () => this.loadProducts(),
      error: () => alert('Erro ao excluir o produto.'),
    });
  }

  logout() {
    this.auth.logout();
  }
}
