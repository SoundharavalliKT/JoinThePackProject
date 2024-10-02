import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})

export class Page1Component {
  public toDoUrl = 'https://dummyjson.com/todos?limit=10&skip=';
  public initialToDos: any;
  public toDoList: any;
  public viewList: any=false;
  public randomList: any=false;
  public randomTodo: any;
  public addTodo: any=false;
  public deleteTodo: any=false;
  public deleteTodoId: any;
  public updateTodo: any=false;
  public updateTodoId: any;
  public newTodo={
    todo: "",
    completed: false,
    userId: 0
  };
  public name="";

  public disablePrevBtn = false;
  public disableNextBtn = false;
  public totalCount=0;

  // rowData = [];
  // colDefs = [
  //   { field: 'id' }, 
  //   { field: 'todo' }, 
  //   { field: 'userId' }
  // ];

  // defaultColDef: ColDef = {
      
  // };
  constructor(private http: HttpClient, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {   
    this.http.get<any>(this.toDoUrl+0).subscribe(data => {
      this.initialToDos=data;
      this.totalCount= data.total;
      //console.log(this.initialToDos);
    });
  }  

  viewTodoList(){
    this.disablePrevBtn=true;
    this.toDoList=this.initialToDos.todos;
    this.viewList=true;
    //console.log(this.toDoList);
  }

  randomTodoList(){
    this.randomList=true;
    this.addTodo=false;
    this.deleteTodo=false;
    this.updateTodo=false;
    this.http.get<any>('https://dummyjson.com/todos/random').subscribe(data => {
      this.randomTodo=data;
    });
  }

  goTopreviousPage(){
    this.disableNextBtn=false;
    let startIndex = this.toDoList[0].id;
    let temp=startIndex-11;
    this.disablePrevBtn = startIndex<=20? true : false;
    this.http.get<any>(this.toDoUrl+temp).subscribe(data => {
      this.toDoList=data.todos;
      //console.log(this.toDoList);
    });
  }

  goTonextPage(){
    this.disablePrevBtn=false;
    let endIndex = this.toDoList[9].id;
    //let temp=startIndex<=10? startIndex :startIndex-10;
    this.http.get<any>(this.toDoUrl+endIndex).subscribe(data => {
      this.toDoList=data.todos;
      this.disableNextBtn = this.toDoList.length!=10? true: false;
      //console.log(this.toDoList);
    });
  }

  addingTodo(){
    this.addTodo=true;
    this.deleteTodo=false;
    this.updateTodo=false;
    this.randomList=false;
  }

  deletingTodo(){
    this.deleteTodo=true;
    this.addTodo=false;
    this.updateTodo=false;
    this.randomList=false;
  }

  updatingTodo(){
    this.updateTodo=true;
    this.addTodo=false;
    this.deleteTodo=false;
    this.randomList=false;
  }

  onInputChange(event: any): void {  
    console.log(event.target.value);
    this.newTodo.todo=event.target.value;
  }

  onIdChange(event: any): void {  
    console.log(event.target.value);
    this.newTodo.userId=event.target.value;
  }

  submitTodo(){
    this.http.post<any>('https://dummyjson.com/todos/add',this.newTodo).subscribe(data => {
      console.log(data);
      this.snackBar.open('Task Added to the list Successfully !!','',{
        duration: 2000,
      });     
    },
    (error) => {
      console.log(error.error);
      this.snackBar.open(error.error.message,'',{
        duration: 2000,
      }); 
    });
  }

  ondeleteChange(event: any){
    this.deleteTodoId = event.target.value;
  }

  onDeleteTodo(){
    this.http.delete('https://dummyjson.com/todos/'+this.deleteTodoId).subscribe(data => {
      //console.log(data);
      this.snackBar.open('Task deleted Successfully !!','',{
        duration: 2000,
      });     
    },
    (error) => {
      console.log(error.error);
      this.snackBar.open(error.error.message,'',{
        duration: 2000,
      }); 
    });
  }

  onUpdateChange(event: any){
    this.updateTodoId = event.target.value;
  }

  onUpdateTodo(){
    this.http.put('https://dummyjson.com/todos/'+this.updateTodoId,{completed:false}).subscribe(data => {
      console.log(data);
      this.snackBar.open('Task updated Successfully !!','',{
        duration: 2000,
      });     
    },
    (error) => {
      console.log(error.error);
      this.snackBar.open(error.error.message,'',{
        duration: 2000,
      }); 
    });
  }

  goToPage2(){
    this.router.navigate(['/page2']);
  }

  goToPage3(){
    this.router.navigate(['/page3']);
  }
}
