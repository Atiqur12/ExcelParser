import {SimpleDateParserService} from '../services/simple-date-parser.service';

export class Product {
  public readonly name: string;
  public readonly updated_at: Date;
  public readonly prices: number[];
  public readonly rate: number;
  public readonly category: 'product' | 'equipment';

  constructor(name: string, updated_at: string | number, prices: string | number, rate: number) {
    this.name = this.normalizeName(name);
    this.updated_at = this.parseUpdateDate(updated_at);
    this.prices = this.parsePrices(prices);
    this.rate = rate;
    this.category = this.determineCategory(name);
  }

  private normalizeName(name: string): string {
    return name.trim();
  }

  private parseUpdateDate(date: string | number): Date {
    return typeof date === 'number'
      ? this.convertExcelDateToJsDate(date)
      : this.parseDateString(date);
  }

  private convertExcelDateToJsDate(excelDate: number): Date {
    if (excelDate < 1) {
      throw new Error(`Invalid Excel date received: ${excelDate}`);
    }

    const EPOCH = new Date(Date.UTC(1900, 0, 1)); // Excel epoch starts from 1900-01-01
    const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
    const jsDate = new Date(EPOCH.getTime() + (excelDate - 2) * MILLISECONDS_PER_DAY);

    if (Number.isNaN(jsDate.getTime())) {
      throw new Error(`Invalid Excel date received: ${excelDate}`);
    }

    return jsDate;
  }

  private parseDateString(dateString: string): Date {
    const dateFormats = [
      'dd/MM/yyyy',
      'MM/dd/yyyy',
      'yyyy-MM-dd',
      'dd-MM-yyyy',
      'MM-dd-yyyy',
    ];

    for (const format of dateFormats) {
      const parsedDate = this.parseDate(dateString, format);
      if (parsedDate) {
        return parsedDate;
      }
    }

    throw new Error(`Invalid date string received: ${dateString}`);
  }

  private parseDate(dateString: string, format: string): Date | null {
    const parser = new SimpleDateParserService(format);
    return parser.parse(dateString);
  }

  private parsePrices(prices: string | number): number[] {
    if (typeof prices === "number") {
      return [prices]
    }

    const rawPricesList: string[] = prices.split(";");

    if (rawPricesList.length > 0) {
      return rawPricesList.map(price => {
        const normalizedPrice = price.replace(',', '.').trim();
        const parsedPrice = parseFloat(normalizedPrice);

        if (Number.isNaN(parsedPrice)) {
          throw new Error(`Invalid price received: ${price}`);
        }

        return parsedPrice;
      })
    }

    return [];
  }

  private determineCategory(productName: string): 'product' | 'equipment' {
    return productName.toLowerCase().includes('equipment') ? 'equipment' : 'product';
  }
}
