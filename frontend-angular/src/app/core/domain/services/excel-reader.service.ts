import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelReaderService {

  constructor() {
  }

  async readExcelFile(fileBuffer: Buffer<ArrayBufferLike>): Promise<any[]> {
    const workbook = XLSX.read(fileBuffer, {type: 'buffer'});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
  }

}
