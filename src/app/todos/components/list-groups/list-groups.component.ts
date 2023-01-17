import { Component, OnInit } from '@angular/core';
import { GroupService} from "../../../core/services/group.service";

@Component({
  selector: 'app-list-groups',
  template: `
    <div class="">
    <div *ngFor="let group of groups">
      <h3>{{ group.label }}</h3>
      <ul>
        <li *ngFor="let todo of group.todos">{{ todo.label }}</li>
      </ul>

    </div>
    <div *ngFor="let group of groupList">
      <div>{{group.label}}</div>
      <button (click)="deleteGroup(group.id)">Delete</button>
      <button mat-raised-button color="primary" [routerLink]="['/form-group', group.id]">Update</button>
    </div>
    </div>
  `, styles:[
    `#ligneGroup{
      display: flex;
    }`
  ]
})
export class ListGroupsComponent implements OnInit {
  groups!: any[];
  groupList!: any[];
  private groupForm: any;

  constructor(private groupService: GroupService) {
    this.getAllGroups();
  }

  ngOnInit() { }

  getGroups() {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groupList = groups;
    });
  }

  deleteGroup(id: number) {
    this.groupService.deleteGroup(id).subscribe(() => {
      this.getAllGroups();
    });
  }

  updateGroup(group: { id: number, label: string, todos: number[] }) {
    this.groupService.updateGroup(group.id, { label: group.label, todos: group.todos }).subscribe(() => {
      this.getAllGroups();
    });
  }

  onUpdate(id: number) {
    this.groupService.getGroupById(id).subscribe(group => {
      this.groupForm.patchValue({
        label: group.label,
        todos: group.todos
      });
    });
  }
}
