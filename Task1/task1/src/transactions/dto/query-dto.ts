
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class QueryDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{2}:\d{2}:\d{2}$/, { message: 'Invalid start time format. Use HH:mm:ss' })
    start: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{2}:\d{2}:\d{2}$/, { message: 'Invalid end time format. Use HH:mm:ss' })
    end: string;
}
