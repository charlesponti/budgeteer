import { TransactionService } from './transactions.service';
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionService) { }

  @Get()
  getTransactions(@Req() request: Request) {
    return this.transactionsService.find(request.query);
  }
}
