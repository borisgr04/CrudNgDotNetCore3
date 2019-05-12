import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }


  /** POST: add a new task to the server */
  add0(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + 'api/Todo', task, httpOptions).pipe(
      tap((newTask: Task) => this.log(`added newTask w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }


  /** GET heroes from the server */
  getAll(): Observable<Task[]> {

    return this.http.get<Task[]>(this.baseUrl + 'api/Todo')
      .pipe(
        tap(_ => this.log('fetched task')),
        catchError(this.handleError<Task[]>('getTask', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  get(id: number): Observable<Task> {
    const url = `${this.baseUrl + 'api/Todo'}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Task>(`getHero id=${id}`))
    );
  }

   /** PUT: update the hero on the server */
   update (task: Task): Observable<any> {
    const url = `${this.baseUrl + 'api/Todo'}/${task.id}`;
    return this.http.put(url, task, httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('task'))
    );
  }

   /** DELETE: delete the hero from the server */
   delete (task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.baseUrl + 'api/Todo'}/${id}`;

    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //alert(message);
    // this.messageService.add(`HeroService: ${message}`);
  }
}
