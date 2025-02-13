import {Inject, Injectable} from '@angular/core';
import {Observable, from, switchMap, map} from 'rxjs';
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

  execute(file: File): Observable<{ status: number }> {
    return this.parseDataFromExcelFile(file).pipe(
      switchMap(products => this.executeSend(products))
    );
  }

  private executeSend(products: Product[]): Observable<{ status: number }> {
    const preparedProducts = this.mapper.prepareProductList(products);
    return this.productRepo.sendProducts(preparedProducts);
  }

  private parseDataFromExcelFile(file: File): Observable<Product[]> {
    return this.readDataFromExcel(file).pipe(
      map(data => this.dataParser.extractProductList(data))
    );
  }

  private readDataFromExcel(file: File): Observable<any> {
    return from(file.arrayBuffer()).pipe(
      map(arrayBuffer => Buffer.from(arrayBuffer)),
      switchMap(buffer => from(this.excelReaderService.readExcelFile(buffer)))
    );
  }
}
