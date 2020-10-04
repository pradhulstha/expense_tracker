import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, shareReplay} from 'rxjs/operators';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private URL = 'http://localhost:8080/api/v1/expenses';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getExpenses(): Observable<Expense[]>
  {
    return this.httpClient.get<Expense[]>(this.URL).pipe(
      map(response => response),
      shareReplay({bufferSize: 1, refCount: true}),
      catchError(this.handleError<any>('Get Expenses'))
    );
  }

  saveExpense(expense: Expense): Observable<Expense> {
    return this.httpClient.post<Expense>(this.URL, expense, this.httpOptions).pipe(
      catchError(this.handleError<any>('saveExpense'))
    );
  }

  getExpense(id: number): Observable<Expense> {
    return this.httpClient.get<Expense>(`${this.URL}/${id}`).pipe(
      map(response => response),
      catchError(this.handleError<any>(`Get Expense by id:${id}`)));
  }

  deleteExpense(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/${id}`, {responseType: 'text'}).pipe(
      catchError(this.handleError<any>(`Delete Expense: ${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
