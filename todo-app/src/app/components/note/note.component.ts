import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/note';
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit{

  noteForm!: FormGroup

  noteObj: Note = {
    id:'',
    note_title:'',
    note_description:''
  }
  constructor(private note_service: NoteService, private formBuilder: FormBuilder) {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
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
    this.note_service.getNotes().subscribe((res:Note[])=>{
      console.log(res);
    })
  }
}
