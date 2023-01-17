import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {group} from "@angular/animations";
import {Observable} from "rxjs";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Group} from "../../todos/models/group";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private http: HttpClient) {}


  addGroup(group: {label: string, todos: number[]}): Observable<any> {
    return this.http.post('http://localhost:3000/groups', {
      label: group.label,
      todos: group.todos
    });
  }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>('http://localhost:3000/groups');
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/groups/${id}`);
  }

  updateGroup(id: number, updates: { label: string, todos: number[] }): Observable<any> {
    return this.http.patch(`http://localhost:3000/groups/${id}`, updates);
  }

  getGroupById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/groups/${id}`);
  }
}

