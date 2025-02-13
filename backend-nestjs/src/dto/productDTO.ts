import {IsArray, IsEnum, IsNumber, IsString, Matches, Min} from 'class-validator';

export class ProductDTO {
    @IsString()
    name: string;

    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'updated_at must be in the format YYYY-MM-DD',
    })
    updated_at: string;

    @IsArray()
    @IsNumber({}, { each: true })
    @Min(0, { each: true, message: 'each value in prices must not be negative' })
    prices: number[];

    @IsNumber()
    rate: number;

    @IsEnum(['product', 'equipment'], {
        message: 'category must be either "product" or "equipment"',
    })
    category: 'product' | 'equipment';
}
