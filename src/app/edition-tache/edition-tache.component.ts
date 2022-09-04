import { Component, OnInit,  Input, EventEmitter, Output } from '@angular/core';
import {TachesDAOService } from '../dao/taches-dao.service';
import { Router } from '@angular/router';
import {Tache } from '../tache';

@Component({
  selector: 'app-edition-tache',
  templateUrl: './edition-tache.component.html',
  styleUrls: ['./edition-tache.component.css']
})
export class EditionTacheComponent implements OnInit {

  @Input() tache? : Tache;

 charge :boolean;

 @Output() onSoumettre = new EventEmitter<any>();

  constructor(private tachesDAO : TachesDAOService, private router:Router, ) {

  }

  ngOnInit() {  
    //console.log(this.tache.deadline);
  }

  estCreation(){
    return !(this.tache && this.tache.creation)
  }

  soumettre(form){

  let newTache=new Tache(form.form.value);
  if(this.estCreation()) this.tache.creation=new Date();
  this.onSoumettre.emit(newTache);
  
  }


  sortir()   {
    this.onSoumettre.emit(null);
  }

  resoudre(i){

  }
 active(i : number) : boolean{
   //console.log(i+" : "+this.tache.etat);
   if(i==this.tache.etat) return true;
   return false;
 }


}
