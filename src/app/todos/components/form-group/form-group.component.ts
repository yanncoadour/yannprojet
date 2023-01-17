import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService} from "../../services/todo.service";
import {Todo} from "../../models/todo";
import { GroupService } from "../../../core/services/group.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form-group',
  template: `
    <form [formGroup]="groupForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="label" formControlName="label" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Todos</mat-label>
        <mat-select formControlName="todos" multiple>
          <mat-option *ngFor="let todo of todoList" [value]="todo.id">
            {{todo.label}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button type="submit" [disabled]="!groupForm.valid">{{ buttonText }}</button>
    </form>
  `
})
export class FormGroupComponent implements OnInit {
  groupForm!: FormGroup;
  todoList: Todo[] =[];
  todos: Todo[] = [];
  groupId!: number;
  buttonText: string = 'Create Group';
  isUpdate = false;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService, private groupService: GroupService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      label: ['', Validators.required],
      todos: [[], Validators.required]
    });
    this.todoService.getAllTodos().subscribe(todos => {
      this.todoList = todos;
    });
    this.groupForm = this.formBuilder.group({
      label: ['', Validators.required],
      todos: [[], Validators.required]
    });

    this.route.params.subscribe(params => {
      this.groupId = params['id'];
      if (this.groupId) {
        this.buttonText = 'Update Group';
        this.groupService.getGroupById(this.groupId).subscribe(group => {
          this.groupForm.patchValue({
            label: group.label,
            todos: group.todos
          });
        });
      }
    });
  }

  onSubmit() {
    console.log(this.groupForm.value);

    if (this.groupForm.valid) {
      // Ajouter le name au groupe
      const label = this.groupForm.value.label;
      // Ajouter les todos au groupe
      const todos = this.groupForm.value.todos;

      this.groupService.addGroup({label, todos}).subscribe(res => {
        console.log(res);
      });
      this.groupForm.reset();
    }

    if (this.isUpdate) {
      // Update group
      this.groupService.updateGroup(this.groupForm.value.id, {
        label: this.groupForm.value.label,
        todos: this.groupForm.value.todos
      }).subscribe(() => {
        this.router.navigate(['/groups']);
      });
    } else {
      // Create group
      this.groupService.addGroup(this.groupForm.value).subscribe(() => {
        this.router.navigate(['/groups']);
      });
    }
  }



}
