import {TestBed} from '@angular/core/testing';

import {ExcelReaderService} from './excel-reader.service';
import * as path from 'path';
import * as fs from 'fs';

describe('ExcelReaderService', () => {
  const PATH_TEST_EXCEL_FILE: string = '../../../../../test_data/excelReaderTestFIle.xlsx';
  let service: ExcelReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read an Excel file and parse it to an array', async () => {
    const excelPath = path.join(__dirname, PATH_TEST_EXCEL_FILE);
    const fileBuffer = fs.readFileSync(excelPath);
    const expectedData: any[] = [
      {Name: 'Joint', UpdatedOn: 45914, Prices: '2;8,4', 'Rate %': 10},
      {Name: 'Fiber2', UpdatedOn: 34988, Prices: '8;-11', 'Rate %': 17},
      {Name: 'name', UpdatedOn: 'updated_on', Prices: 'prices', 'Rate %': 'rate'},
      {Name: 'Equipment1', UpdatedOn: 34322, Prices: 4, 'Rate %': 16},
      {Name: 'Equipment4', UpdatedOn: 44109, Prices: '5,604;5,60', 'Rate %': 7}
    ];

    const data: any[] = await service.readExcelFile(fileBuffer);

    expect(data).toEqual(expectedData);
  });
});
