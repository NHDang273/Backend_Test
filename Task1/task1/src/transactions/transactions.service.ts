import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import * as moment from 'moment';
import * as path from 'path';

@Injectable()
export class TransactionsService {
  private latestUploadedFile: string; 

  
  handleFileUpload(file: Express.Multer.File) {
    if (!file || !file.buffer) { 
      throw new BadRequestException('File upload failed or invalid file format');
    }
  
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); 
    }
  
    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer); 
    this.latestUploadedFile = filePath; 
  
    return { message: 'File uploaded successfully', filePath };
  }

  // Xử lý truy vấn dựa trên thời gian
  queryTransactions(start: string, end: string) {
    if (!this.latestUploadedFile) {
      throw new NotFoundException('No file uploaded yet'); 
    }

    
    if (!this.isValidTimeFormat(start) || !this.isValidTimeFormat(end)) {
      throw new BadRequestException([
        'Invalid start time format. Use HH:mm:ss',
        'Invalid end time format. Use HH:mm:ss',
      ]);
    }
    

    try {
        // Đọc file Excel đã upload
        const workbook = xlsx.readFile(this.latestUploadedFile);
        const sheetName = workbook.SheetNames[0]; 
        const worksheet = workbook.Sheets[sheetName];
    
        // Chuyển đổi dữ liệu thành JSON
        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); 
    
        
        const startIndex = data.findIndex(row => row[0] === 'STT'); 
        if (startIndex === -1) {
            throw new BadRequestException('No valid data found in the file');
        }
    
        
        const resultData = data.slice(startIndex + 1); 
    
        console.log(resultData); 
    
        let totalAmount = 0; 
    
        
        resultData.forEach((transaction: any) => {
            const transactionTime = moment(transaction[2], 'HH:mm:ss'); 
    
        
            if (
                transactionTime.isBetween(moment(start, 'HH:mm:ss'), moment(end, 'HH:mm:ss'), null, '[]')
            ) {
                totalAmount += parseFloat(transaction[8] || 0); 
            }
        });
    
        if (totalAmount === 0) {
            return { message: 'Không có giao dịch nào trong khoảng thời gian này.' }; 
        }
    
        return { totalAmount }; 
    } catch (error) {
        throw new BadRequestException('Error processing file or invalid file format');
    }
  }

  // Kiểm tra định dạng thời gian
  private isValidTimeFormat(time: string): boolean {
    return moment(time, 'HH:mm:ss', true).isValid(); 
  }
}
