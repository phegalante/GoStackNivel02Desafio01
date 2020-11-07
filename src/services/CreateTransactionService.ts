import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    const balance = this.transactionsRepository.getBalance();

    if (transaction.type === 'outcome' && balance.total < transaction.value) {
      throw Error('Ta sem saldo, brother!');
    }

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
