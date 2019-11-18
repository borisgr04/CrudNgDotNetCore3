import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../modals/alert-modal/alert-modal.component';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,private modalService: NgbModal) { }

    /** POST: add a new task to the server */
    add(task: Task): Observable<Task> {

        return this.http.post<Task>(this.baseUrl + 'api/Task', task, httpOptions).pipe(
            tap((newTask: Task) => this.log(`added newTask w/ id=${newTask.id}`)),
            catchError(this.handleError<Task>('addTask'))
        );
    }

    /** GET heroes from the server */
    getAll(): Observable<Task[]> {

        return this.http.get<Task[]>(this.baseUrl + 'api/Task')
            .pipe(
                tap(_ => this.log('fetched task')),
                catchError(this.handleError<Task[]>('getTask', []))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    get(id: number): Observable<Task> {
        const url = `${this.baseUrl + 'api/Task'}/${id}`;
        return this.http.get<Task>(url).pipe(
            tap(_ => this.log(`fetched task id=${id}`)),
            catchError(this.handleError<Task>(`getHero id=${id}`))
        );
    }

    /** PUT: update the hero on the server */
    update(task: Task): Observable<any> {
        const url = `${this.baseUrl + 'api/Task'}/${task.id}`;
        return this.http.put(url, task, httpOptions).pipe(
            tap(_ => this.log(`updated task id=${task.id}`)),
            catchError(this.handleError<any>('task'))
        );
    }

    /** DELETE: delete the hero from the server */
    delete(task: Task | number): Observable<Task> {
        const id = typeof task === 'number' ? task : task.id;
        const url = `${this.baseUrl + 'api/Task'}/${id}`;

        return this.http.delete<Task>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted task id=${id}`)),
            catchError(this.handleError<Task>('deleteTask'))
        );
    }

    protected log(message: string) {
        console.log(message);
        // this.messageService.add(`HeroService: ${message}`);
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            if (error.status == "400") {
                alert(JSON.stringify(error.error.errors));
                this.mostrarError400_ModalState(error);
            }
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
    
    private mostrarError400_ModalState(error: any): void {
        let contadorValidaciones: number = 0;
        let mensajeValidaciones: string =
            `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la operación.<br/><br/>`;

        for (const prop in error.error.errors) {
            contadorValidaciones++;
            mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;

            error.error.errors[prop].forEach(element => {
                mensajeValidaciones += `<br/> - ${element}`;
            });

            mensajeValidaciones += `<br/>`;
        }


        //alert(`${mensajeValidaciones}`);
        const modalRef = this.modalService.open(AlertModalComponent);
        modalRef.componentInstance.title = 'Mensaje de Error';
        modalRef.componentInstance.message = mensajeValidaciones;

    }
}
