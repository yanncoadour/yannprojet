import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {ToolbarService} from "../../services/toolbar.service";
import {LoaderService} from "../../services/loader.service";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar>
      <span>{{title}}</span>
      <span class="spacer"></span>
      <div class="button-container">
        <mat-form-field appearance="standard">
          <mat-label>Langue</mat-label>
          <mat-select (valueChange)="selectLang($event)" [value]="currentLang">
            <mat-option *ngFor="let lang of langs" [value]="lang">
              {{'HEADER.LANGUAGES.' + lang | uppercase | translate}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-raised-button [routerLink]="['groups']">Liste des groupes</button>
        <button mat-stroked-button color="primary" [routerLink]="['']">
          {{'HEADER.BUTTONS.TODO.LIST' | translate}}
          <mat-icon [matBadge]="numberOfTodos$ | async">list</mat-icon>
        </button>
        <button mat-stroked-button color="primary" [routerLink]="['add']">
          {{'HEADER.BUTTONS.TODO.ADD' | translate}}
          <mat-icon>add</mat-icon>
        </button>
        <button mat-stroked-button color="primary" [routerLink]="['/form-group']">
          Ajouter un groupe
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </mat-toolbar>
    <mat-progress-bar *ngIf="isLoading$ | async" mode="indeterminate"></mat-progress-bar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    .button-container {
      *:not(:last-child) {
        margin-right: 1rem;
      }
    }
  `]
})
export class ToolbarComponent {

  title = 'monSuperProjetAngular de TODO list de FOU !!!!';
  numberOfTodos$: Observable<number> = this.toolbarService.numberOfTodos$;
  langs: string[] = this.translateService.langs;
  currentLang: string = this.translateService.currentLang;
  isLoading$ = this.loaderService.loading$;

  constructor(
    private toolbarService: ToolbarService,
    private loaderService: LoaderService,
    private translateService: TranslateService,
    private groupService : GroupService
  ) {
  }

  selectLang(lang: string) {
    this.translateService.use(lang);
  }

}
