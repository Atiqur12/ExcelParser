import {Product} from '../../domain/models/product.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductMapper {
  public prepareProductList(products: Product[]): any[] {
    const listWithoutDuplicates = this.removeDuplicateProducts(products);

    return Array.from(listWithoutDuplicates.values()).map(product => ({
      name: product.name.trim(),
      updated_at: this.formatDate(product.updated_at),
      prices: this.replaceNegativePrices(product.prices),
      rate: product.rate,
      category: product.category
    }));
  }

  private removeDuplicateProducts(products: Product[]): Product[] {
    const productMap = new Map<string, Product>();
    products.forEach(product => {
      productMap.set(product.name, product);
    });
    return Array.from(productMap.values());
  }

  private replaceNegativePrices(prices: number[]): number[] {
    return prices.map(price => (price < 0 ? 0 : price));
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
