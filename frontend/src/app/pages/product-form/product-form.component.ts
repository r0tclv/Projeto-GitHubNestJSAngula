import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../core/api-url';
import { Product } from '../../core/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<boolean>();

  name = '';
  price = '';
  description = '';
  error = '';
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.product) {
      this.name = this.product.name;
      this.price = this.product.price.toString();
      this.description = this.product.description;
    }
  }

  get isEditing(): boolean {
    return !!this.product?.id;
  }

  save() {
    this.error = '';

    if (!this.name.trim()) {
      this.error = 'Nome é obrigatório.';
      return;
    }
    const priceVal = parseFloat(this.price);
    if (!this.price || isNaN(priceVal) || priceVal <= 0) {
      this.error = 'Preço deve ser maior que zero.';
      return;
    }
    if (!this.description.trim()) {
      this.error = 'Descrição é obrigatória.';
      return;
    }

    this.loading = true;
    const dto = { name: this.name, price: priceVal, description: this.description };

    if (this.isEditing) {
      this.http
        .put(`${API_URL}/products/${this.product!.id}`, dto)
        .subscribe({
          next: () => this.close.emit(true),
          error: () => {
            this.loading = false;
            this.error = 'Erro ao atualizar o produto.';
          },
        });
    } else {
      this.http.post(`${API_URL}/products`, dto).subscribe({
        next: () => this.close.emit(true),
        error: () => {
          this.loading = false;
          this.error = 'Erro ao criar o produto.';
        },
      });
    }
  }

  cancel() {
    this.close.emit(false);
  }
}
