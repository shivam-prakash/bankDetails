export class BankData {
    accountNo: number;
    date: string;
    transactionDetails: string;
    valueDate: string;
    withdrawalAMT: string;
    depositAMT: string;
    balanceAMT: string;
    constructor() {
        this.accountNo = 0;
        this.balanceAMT = '';
        this.date = '';
        this.transactionDetails = '';
        this.valueDate = '';
        this.withdrawalAMT = '';
        this.depositAMT = '';
    }
}
