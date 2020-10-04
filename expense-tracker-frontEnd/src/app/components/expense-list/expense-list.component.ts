import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Expense } from 'src/app/models/expense';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddexpenseComponent } from '../addexpense/addexpense.component';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  displayedColumns: string[] = ['Expenses', 'Description', 'Amount', 'Actions'];
  expenses: Expense[] = [];
  public dataSource: any;

  filters = {
    keyword: ''
  };

  constructor(private expenseService: ExpenseService, private snackBar: MatSnackBar, private matDailog: MatDialog) { }

  ngOnInit(): void {
    this.listExpenses();
  }

  listExpenses(): void {
    this.expenseService.getExpenses().subscribe(
      data => this.dataSource = new MatTableDataSource(this.filterExpenses(data))
    );
  }

  applyFilter(): void{
    this.dataSource.filter = this.filters.keyword.toLowerCase();
  }

  filterExpenses(data: Expense[]): Expense[] {
    const expenses1 = data.filter((exp) => {
      return exp.expenses.toLowerCase().includes(this.filters.keyword.toLowerCase());
    });
    console.log(expenses1);
    return expenses1;
  }

  openDialog(id: number): void {

    const dialogRef = this.matDailog.open(AddexpenseComponent, {
      data: this.expenses[id]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteExpense(id): void {

    if (confirm('Do you want to delete the item?')) {
      this.expenseService.deleteExpense(id).subscribe(() => {
        this.snackBar.open(`Deleted Successfully`, 'Ok',
          {
            duration: 1200,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        this.listExpenses();
      });
    }
  }
}
