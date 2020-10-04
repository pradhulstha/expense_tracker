import {Component, Inject, OnInit} from '@angular/core';
import {ExpenseService} from '../../services/expense.service';
import {Expense} from '../../models/expense';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css']
})
export class AddexpenseComponent implements OnInit {

  // public expense = new Expense();
  public id: number;

  constructor(private expenseService: ExpenseService,
              public snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              @Inject(MAT_DIALOG_DATA) public expense: Expense) { }

  ngOnInit(): void {
    /*this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.expenseService.getExpense(+params.get('id')).subscribe(
          data => this.expense = data
        );
      }
    });*/
  }

  saveExpense(): void {
    if (this.expense.expenses !== undefined) {
      this.expenseService.saveExpense(this.expense).subscribe(
        data => {
          this.snackBar.open(`Saved Successfully: ${data.expenses}`, 'Ok',
            {
              duration: 800,
              horizontalPosition: 'start',
              verticalPosition: 'bottom',
            });
          this.goBack();
          // this.router.navigateByUrl('/expenses').then(r => console.log('response', r));
        });
    }
    else
    {
      this.snackBar.open(`Cannot Save Empty Expense`, 'Ok',
        {
          duration: 1200,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
    }
  }

  deleteExpense(id: number): void
  {
    this.expenseService.deleteExpense(id).subscribe(() => {
        this.snackBar.open(`Deleted Successfully`, 'Ok',
          {
            duration: 1200,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        this.router.navigateByUrl('/expenses').then(r => console.log('Delete Successful - Routing Back: ', r));
      }
    );

  }

  goBack(): void {
    this.location.back();
  }

}
