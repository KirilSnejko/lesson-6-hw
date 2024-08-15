// Задача: Система управления банковскими счетами

class BankAccount {
  constructor(initialBalance) {
    this.balance = Number(initialBalance);
    this.intervalId = null;
  }

  isPositiveNumber(value) {
    return !isNaN(value) && Number(value) > 0;
  }

  deposit(depAmount) {
    try {
      if (!this.isPositiveNumber(depAmount)) {
        throw new Error("Deposit amount must be a positive number.");
      }
      this.balance += depAmount;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  withdraw(withdrawal) {
    try {
      if (!this.isPositiveNumber(withdrawal)) {
        throw new Error("Withdrawal amount must be a positive number.");
      }
      if (this.balance < withdrawal) {
        throw new Error("Insufficient funds for withdrawal.");
      }
      this.balance -= withdrawal;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  getBalance() {
    console.log(this.balance);
  }

  startInterest(interval, rate) {
    if (!this.isPositiveNumber(interval) || !this.isPositiveNumber(rate)) {
      console.error("Invalid interval or rate.");
      return;
    }
    this.intervalId = setInterval(() => {
      const interest = this.balance * (rate / 100);
      this.balance += interest;
      console.log(
        `Interest of ${interest} added. New balance: ${this.balance}`
      );
    }, interval * 1000);
  }

  stopInterest() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log("Interest calculation stopped.");
    } else {
      console.error("No active interest calculation.");
    }
  }

  scheduleTransaction(type, amount, delay) {
    setTimeout(() => {
      switch (type) {
        case "deposit":
          this.deposit(amount);
          console.log(`Deposited ${amount}. New balance: ${this.balance}`);
          break;
        case "withdraw":
          this.withdraw(amount);
          console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
          break;
        default:
          console.error("Unknown transaction type.");
          break;
      }
    }, delay * 1000);
  }
}

const mainAccount = new BankAccount(300);
const extraAccount = new BankAccount(2000);

console.log(mainAccount);
mainAccount.getBalance();

mainAccount.deposit(100);
mainAccount.getBalance();

mainAccount.withdraw(50);
mainAccount.getBalance();

mainAccount.withdraw(100000000);
mainAccount.getBalance();

mainAccount.deposit(-100);
mainAccount.getBalance();

mainAccount.deposit(0);
mainAccount.getBalance();

mainAccount.startInterest(3, 5);
mainAccount.stopInterest();

mainAccount.scheduleTransaction("deposit", 300, 2);
mainAccount.scheduleTransaction("withdraw", 200, 5);
