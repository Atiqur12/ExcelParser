import {TestBed} from '@angular/core/testing';

import {DataParserService} from './data-parser.service';

describe('DataParserService', () => {
  let service: DataParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error if input is not an array of objects', () => {
    expect(() => service.extractProductList([1, 2, 3])).toThrowError('Input must be an array of valid objects');
    expect(() => service.extractProductList([null, undefined, []])).toThrowError('Input must be an array of valid objects');
  });

  const invalidDataInputs = [
    {
      invalidInput: [
        {Name: 'Product A', UpdatedOn: '2023-10-01', Prices: 100},
        {Name: 'Product B', UpdatedOn: '2023-10-02', Prices: 100, 'Rate %': 10}
      ],
      expectedMessage: 'Item at index 0 is missing the required key: Rate %'
    },
    {
      invalidInput: [
        {Name: 'Product B', UpdatedOn: '2023-10-02', Prices: 100, 'Rate %': 10},
        {ZEr: 'Product B', UpdatedOn: '2023-10-02', Prices: 100, 'Rate %': 10}
      ],
      expectedMessage: 'Item at index 1 is missing the required key: Name'
    },
    {
      invalidInput: [
        {ZEr: 'Product B', Name: 'Product B', UpdatedOn: '2023-10-02', Prices: 100, 'Rate %': 10}
      ],
      expectedMessage: 'Item at index 0 has invalid key: ZEr'
    }
  ];
  test.each(invalidDataInputs)('should throw an error if any object is missing required keys or has an invalid key',
    async ({invalidInput, expectedMessage}) => {
      expect(() => service.extractProductList(invalidInput)).toThrowError(expectedMessage);
    });

  it('should parse an array of extracted data from excel file to product list', () => {
    const inputData: any[] = [
      {Name: 'Joint', UpdatedOn: 45914, Prices: '2;8,4', 'Rate %': 10},
      {Name: 'Fiber2', UpdatedOn: '1995-10-16', Prices: '8;-11', 'Rate %': 17},
      {Name: 'name', UpdatedOn: 'updated_on', Prices: 'prices', 'Rate %': 'rate'},
      {Name: 'Equipment1', UpdatedOn: '19/12/1993', Prices: '4', 'Rate %': 16},
      {Name: 'Equipment4', UpdatedOn: 44109, Prices: '5,604;5,60', 'Rate %': 7}
    ];
    const expectedData = [
      {name: 'Joint', updated_at: new Date('2025-09-14'), prices: [2, 8.4], rate: 10, category: 'product'},
      {name: 'Fiber2', updated_at: new Date('1995-10-16'), prices: [8, -11], rate: 17, category: 'product'},
      {name: 'Equipment1', updated_at: new Date('1993-12-19'), prices: [4], rate: 16, category: 'equipment'},
      {name: 'Equipment4', updated_at: new Date('2020-10-05'), prices: [5.604, 5.60], rate: 7, category: 'equipment'}
    ]

    const actualReturnedProducts = service.extractProductList(inputData);

    expect(actualReturnedProducts).toEqual(expectedData);
  });
});
