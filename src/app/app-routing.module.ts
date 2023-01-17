import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: '', loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule)
}, {
  path: 'test', loadChildren: () => import('./test-lazy-loading/test-lazy-loading.module').then(m => m.TestLazyLoadingModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: NoPreloading
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
