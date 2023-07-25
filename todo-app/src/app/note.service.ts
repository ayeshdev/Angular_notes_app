import { Injectable } from '@angular/core';
import { Note } from './note'
import {
  Firestore,
  doc,
  collection,
  addDoc,
  collectionData,
  deleteDoc,
  updateDoc } from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private afs: Firestore) { }


  //Add a New Note
  addNote(note: Note) {
    note.id = doc(collection(this.afs, 'id')).id   //meken id ekak auto generate wenawa
    return addDoc(collection(this.afs, 'Notes'), note);   //apita hadann oni collection ekek name eka
  }


  //Get All Notes
  getNotes(): Observable<Note[]> {
    let notesRef = collection(this.afs, 'Notes');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>
  }

  //Delete a Note
  deleteNote(note: Note) {
    let docRef = doc(this.afs, `Notes/${note.id}`);
    return deleteDoc(docRef)
  }

  //Update a Note
  updateNote(note:Note,notes:any){
    let docRef = doc(this.afs, `Notes/${note.id}`);
    return updateDoc(docRef,notes)
  }

}
