import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class DataParserService {
  private readonly REQUIRED_KEYS = ['Name', 'UpdatedOn', 'Prices', 'Rate %'];
  private readonly NORMALIZED_REQUIRED_KEYS = this.REQUIRED_KEYS.map((key) =>
    this.normalizeKey(key),
  );

  constructor() {
  }

  extractProductList(unparsedProducts: any[]): Product[] {
    this.validateInput(unparsedProducts);
    return this.mapToProductList(unparsedProducts);
  }

  private validateInput(arrayToCheck: any[]): void {
    this.validateArrayOfObjects(arrayToCheck);
    this.validateKeysInObjects(arrayToCheck);
  }

  private validateArrayOfObjects(arrayToCheck: any[]): void {
    if (!Array.isArray(arrayToCheck)) {
      throw new Error('Input must be an array.');
    }

    if (arrayToCheck.some((item) => !this.isValidObject(item))) {
      throw new Error('Input must be an array of valid objects');
    }
  }

  private isValidObject(item: any): boolean {
    return typeof item === 'object' && item !== null && !Array.isArray(item);
  }

  private validateKeysInObjects(objectsToCheck: any[]): void {
    for (const [index, item] of objectsToCheck.entries()) {
      const normalizedObjectKeys = this.getNormalizedObjectKeys(item);

      this.validateRequiredKeys(index, normalizedObjectKeys);
      this.validateNoInvalidKeys(index, normalizedObjectKeys, item);
    }
  }

  private normalizeKey(key: string): string {
    return key.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  private getNormalizedObjectKeys(item: any): string[] {
    return Object.keys(item).map((key) => this.normalizeKey(key));
  }

  private validateRequiredKeys(index: number, normalizedObjectKeys: string[]): void {
    for (const requiredKey of this.NORMALIZED_REQUIRED_KEYS) {
      if (!normalizedObjectKeys.includes(requiredKey)) {
        throw new Error(
          `Item at index ${index} is missing the required key: ${this.REQUIRED_KEYS[this.NORMALIZED_REQUIRED_KEYS.indexOf(requiredKey)]}`,
        );
      }
    }
  }

  private validateNoInvalidKeys(index: number, normalizedObjectKeys: string[], item: any): void {
    const validKeysSet = new Set(this.NORMALIZED_REQUIRED_KEYS);
    for (const key of normalizedObjectKeys) {
      if (!validKeysSet.has(key)) {
        throw new Error(
          `Item at index ${index} has invalid key: ${Object.keys(item)[normalizedObjectKeys.indexOf(key)]}`,
        );
      }
    }
  }

  private mapToProductList(unparsedProducts: any[]): Product[] {
    const validItems = unparsedProducts.filter((item) =>
      this.normalizeKey(item.Name) !== 'name'
    );

    return validItems.map((item) => this.mapToProduct(item));
  }

  private mapToProduct(item: any): Product {
    return new Product(item.Name, item.UpdatedOn, item.Prices, item['Rate %'])
  }
}
