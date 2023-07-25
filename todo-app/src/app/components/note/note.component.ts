import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/note';
import { NoteService } from 'src/app/note.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit{

  noteForm!: FormGroup;
  editForm!: FormGroup;
  noteDetails:any;
      notes:any = [];


  noteObj: Note = {
    id:'',
    note_title:'',
    note_description:''
  };


  constructor(private note_service: NoteService, private formBuilder: FormBuilder,private spinner: NgxSpinnerService ) {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.editForm = this.formBuilder.group({
      edited_title: ['', Validators.required],
      edited_description: ['', Validators.required]
    });
  }


  ngOnInit() {
      this.getAllNotes();
  }


  addNote(){
    const {value} = this.noteForm
    console.log(value);
    
    this.noteObj.id = '',
    this.noteObj.note_title = value.title,
    this.noteObj.note_description = value.description
    this.note_service.addNote(this.noteObj).then((note)=>{
      if(note){
        alert('Note Added Successfully!')
      }
    })
  }

  getAllNotes(){
    this.spinner.show();
    this.note_service.getNotes().subscribe((res:Note[])=>{
      console.log(res);
      this.notes = res
      this.spinner.hide();
    })
  }

  deleteNote(note:Note){
    let decision = confirm("Are you sure want to delete this note?")
    if(decision === true){
      this.note_service.deleteNote(note);
    }
  }


  getNoteDetails(note:Note){
this.noteDetails = note;
console.log(this.noteDetails);
  }

  updateNote(note:Note){
    const {value} = this.editForm
    console.log(value);

    (this.noteObj.id = note.id),
    (this.noteObj.note_title = value.edited_title),
    (this.noteObj.note_description = value.edited_description);

    this.note_service.updateNote(note,this.noteObj).then(()=>{
      alert("Note Updated Successfully!");
    })
    this.editForm.reset();
  }
}
