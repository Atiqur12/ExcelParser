import { IsArray, IsEnum, IsNumber, IsString, Min, Matches } from 'class-validator';
import { Expose } from 'class-transformer';

export class ProductDTO {
    @IsString()
    @Expose()
    readonly name: string;

    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'updated_at must be in the format YYYY-MM-DD',
    })
    @Expose()
    readonly updated_at: string;

    @IsArray()
    @IsNumber({}, { each: true })
    @Min(0, { each: true, message: 'each value in prices must not be negative' })
    @Expose()
    readonly prices: number[];

    @IsNumber()
    @Expose()
    readonly rate: number;

    @IsEnum(['product', 'equipment'], {
        message: 'category must be either "product" or "equipment"',
    })
    @Expose()
    readonly category: 'product' | 'equipment';
}
