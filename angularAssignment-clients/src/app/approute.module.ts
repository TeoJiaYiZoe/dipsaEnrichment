import {NgModule} from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { NameComponent } from './components/name.component';
import { CategoryComponent } from './components/category.component';
import { CommentsComponent } from './components/comments.component';
import { DetailComponent } from './components/detail.component';
import { CreatecommentComponent } from './components/createcomment.component';
import { TestComponent } from './components/test.component';

const routes: Routes=[
    {path:'',component:HomeComponent},
    {path:'name',component:NameComponent},
    {path:'category',component:CategoryComponent},
    {path:'category/:game',component:TestComponent},
    {path:'comments/:gameId',component:CommentsComponent},
    {path:'comment/:gameId',component:CreatecommentComponent},
    {path:'game/:gameId',component:DetailComponent},
    {path:'**',redirectTo:'/',pathMatch:'full'},


];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    

})
export class ApprouteModule{}
