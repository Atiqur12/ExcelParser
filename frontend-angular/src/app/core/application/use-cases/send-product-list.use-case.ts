import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../domain/models/product.model';
import {ProductMapper} from '../../infra/mapper/product.mapper';
import {Buffer} from 'buffer';
import {ExcelReaderService} from '../../domain/services/excel-reader.service';
import {DataParserService} from '../../domain/services/data-parser.service';
import {PRODUCT_REPOSITORY_TOKEN} from '../../shared/product.tokens';
import {ProductApiRepository} from '../../infra/repositories/product-api.repository';

@Injectable({
  providedIn: 'root'
})
export class SendProductListUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN) private readonly productRepo: ProductApiRepository,
    private readonly excelReaderService: ExcelReaderService,
    private readonly dataParser: DataParserService,
    private readonly mapper: ProductMapper) {
  }

  async execute(file: File) {
    const products = await this.parseDataFromExcelFile(file);
    this.executeSend(products);
  }

  executeSend(products: Product[]): Observable<{ status: number }> {
    const preparedProducts = this.mapper.prepareProductList(products);
    return this.productRepo.sendProducts(preparedProducts);
  }

  private async readDataFromExcel(file: File): Promise<any> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await this.excelReaderService.readExcelFile(buffer)
  }

  private async parseDataFromExcelFile(file: File) {
    const data = await this.readDataFromExcel(file);
    return this.dataParser.extractProductList(data);
  }
}

