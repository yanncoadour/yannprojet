import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateTodoComponent} from "./components/create-todo/create-todo.component";
import {ListTodosComponent} from "./components/list-todos/list-todos.component";
import {EditTodoComponent} from "./components/edit-todo/edit-todo.component";
import {FormGroupComponent} from "./components/form-group/form-group.component";
import {ListGroupsComponent} from "./components/list-groups/list-groups.component";

const routes: Routes = [{
  path: '', component: ListTodosComponent
}, {
  path: 'add', component: CreateTodoComponent
}, {
  path: 'edit/:id', component: EditTodoComponent
}, {
  path: 'form-group', component: FormGroupComponent
},
  { path: 'groups', component: ListGroupsComponent },

  { path: 'form-group/:id', component: FormGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {
}
