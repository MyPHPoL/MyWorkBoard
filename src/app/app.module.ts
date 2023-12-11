import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule, Routes,ActivatedRouteSnapshot,DetachedRouteHandle,RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewCardComponent } from './new-card/new-card.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MatSliderModule } from '@angular/material/slider';
import { TaskComponent } from './task/task.component';
import { EditTaskComponent } from './edit-task/edit-task.component'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SetFilterComponent } from './set-filter/set-filter.component';
import { TaskColorDirective } from './task-color.directive';
import { TaskDetailsComponent } from './task-details/task-details.component'; 
import { FilterPriorityPipe } from './filter-priority.pipe';
import { SortTasksPipe } from './sort-tasks.pipe'; 


const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
  { path: 'board/:board.Id', component: BoardComponent, title: 'Board' },
  { path: '**', component: HomeComponent, title:'Home'}
];

//google ways of resolving the problem of the page not reloading on same url navigation with different object id
//https://github.com/angular/angular/issues/21115#issuecomment-645588886
@Injectable()
export class MyStrategy extends RouteReuseStrategy {
   shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
    return null;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    BoardComponent,
    NewCardComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    ProfileComponent,
    TaskComponent,
    EditTaskComponent,
    SetFilterComponent,
    TaskDetailsComponent,
    FilterPriorityPipe,
    SortTasksPipe
  ],
  imports: [
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'}),
    BrowserModule,
    DragDropModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    TaskColorDirective
  ],
  bootstrap: [AppComponent],
  providers: [{provide: RouteReuseStrategy, useClass: MyStrategy}]
})
export class AppModule { }
