import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private numberOfTodos: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  get numberOfTodos$(): Observable<number> {
    return this.numberOfTodos.asObservable();
  }

  setNumberOfTodos(numberOfTodos: number) {
    this.numberOfTodos.next(numberOfTodos);
  }
}
