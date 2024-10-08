
import {
    Controller,
    Post,
    Get,
    UseInterceptors,
    UploadedFile,
    Query,
    BadRequestException,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { TransactionsService } from './transactions.service';
  import { QueryDto } from './dto/query-dto';
  
  @Controller('transactions')
  export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}
  
    // API 1: Upload file .xlsx
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        if (!file) {
            throw new BadRequestException('No file uploaded or invalid file format.');
        }
        return this.transactionsService.handleFileUpload(file);
        }
  
    // API 2: Truy vấn dữ liệu dựa trên thời gian
    @Get('query')
    queryTransactions(@Query() query: QueryDto) {
      return this.transactionsService.queryTransactions(query.start, query.end);
    }
  }
  