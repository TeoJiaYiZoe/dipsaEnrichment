import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home.component';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category.component';
import { NameComponent } from './components/name.component';
import { DetailComponent } from './components/detail.component';
import { CommentsComponent } from './components/comments.component';
import { CreatecommentComponent } from './components/createcomment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApprouteModule } from './approute.module';
import { BoardGameService } from './boardgame.service';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './material.module';
import { TestComponent } from './components/test.component';
import { FormsModule }   from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    NameComponent,
    DetailComponent,
    CommentsComponent,
    CreatecommentComponent,
    HomeComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,
    BrowserAnimationsModule, MaterialModule, ApprouteModule
  ],
  providers: [BoardGameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
