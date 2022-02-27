import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { TachesDAOService } from '../dao/taches-dao.service';
import { Tache } from '../tache';

//import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
//import { ValueSansProvider } from '@angular/core/src/di/provider';

//ToDo : déplacer dans le DAO
function array_move(arr, old_index, new_index) {
  //Deplacer un element dans un Array 
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})

export class ListeComponent implements OnInit {

  etats;
  categorie;
  texte;

  //Liste des id ordonnée par leur index 
  index;
  //Liste des taches ordonnées par leur id
  taches;
  //Liste des categories
  categories;

  idEdite$: Subject<number>; 
  //tacheEdite: Tache;
  idEdite: number;
  IDCREATION : number;

  //test: boolean;

  constructor(private client: HttpClient, private tachesDAO: TachesDAOService) {
    this.idEdite$ = new Subject;  
  }

  ngOnInit() {
    this.getTaches();

    this.etats = [false,
      true,
      false];   

    this.idEdite=-1;
    this.IDCREATION=-1;

    this.idEdite$.subscribe(id => { this.idEdite =id; },
      function (error) { console.log("Erreur sur la maj idEdite" + error) },
      function () { console.log('onCompleted sur la maj idEdite'); }
    );

  }
  
  getTache(i): Tache {
    //console.log("getTache " + i)
    if (i == this.IDCREATION) return new Tache(null);
    if (this.index[i]) return this.taches[i];
    return null;
  }

  estEdite(idATester): boolean {
    return(this.idEdite==idATester);
  }

  editer(id: number):void{
    if(this.index[id]) {
      this.idEdite$.next(id);
      console.log("editer " + id);
    }
  }

  creer():void {
    this.IDCREATION=this.index.length; 
    this.idEdite$.next(this.IDCREATION);
  }

  onSoumettre(tache: Tache) {
    if (tache != null) {
      if(this.index[this.idEdite]) this.edition(tache, this.index[this.idEdite]);
      else if (this.idEdite == this.IDCREATION) this.creation(tache);
      else console.log("onSoumettre id : " + this.idEdite);
   }
    
    this.sortieEdition();
  }

  sortieEdition() {
    this.idEdite$.next(null);
  }

  creation(tache: Tache) {
    this.tachesDAO.addTache(tache).subscribe(tache => { 
      //ToDo 
      //Récupérer la tache et sa clé.
      //rajouter la tache crée à la liste des Index (en dernière position) 
      //Ou relancer getTaches
      this.sortieEdition(); console.log("Création réussie"),
      error => console.log("Création échouée " + error) }
     );
    

    //Mettre à jour la liste des tâches avec un listener 
  }

  edition(tache: Tache, id) {
    //console.log("List - edition "+ id);
    this.tachesDAO.editTache(tache, id).subscribe(tache => { 
      this.sortieEdition(); console.log("Edition réussie"), 
      error => console.log("Edition échouée " + error) });
  }


  getTaches(): void {

    this.tachesDAO.getTaches().subscribe(data => {
      var donnees = data;
      this.index = Object.keys(data);
      this.index.sort((a, b) => {
        return data[a].index - data[b].index;
      });

      this.taches = [];
      this.categories = [];
      for (var i in this.index) {
        var cle = this.index[i];
        if (cle) {
          var tache = donnees[cle];
          if (tache) {
            this.taches.push(tache);
            if (tache.categorie && this.categories.indexOf(tache.categorie) === -1) this.categories.push(tache.categorie);
          }

        }
      }
      this.IDCREATION=this.index.length;
    });
    //console.log(this.taches);
  }

  //ToDo : paser côte DAO
  estFiltre(i) {
    var tache = this.taches[i];
    var desc = (!this.texte || this.texte == "" || !tache.description || tache.description.indexOf(this.texte) >= 0);
    var cat = (!this.categorie || this.categorie == "" || !tache.categorie || tache.categorie === this.categorie)
    var et = (!tache.etat || this.etats[tache.etat]);
    //console.log("desc : "+desc+", cat : "+cat+", et : "+et);
    return (desc && cat && et);
  }

  onDragStart(event) {
    event.dataTransfer.dropEffect = "move";
    //event.dataTransfer.setData('text/plain', event.target.outerHTML);
    event.dataTransfer.setData('index', event.target.dataset.index);
    //console.log("drag");
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();

    array_move(this.taches, event.dataTransfer.getData("index"), event.target.dataset.index);
    array_move(this.index, event.dataTransfer.getData("index"), event.target.dataset.index);
    for (var i = 0; i < this.index.length; i++) {
      this.tachesDAO.editTache({ index: i }, this.index[i]).subscribe();
    }
    console.log("drop de " + event.dataTransfer.getData("index") + " vers " + event.target.dataset.index);
  }

  onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    // Set the dropEffect to move
    evt.dataTransfer.dropEffect = "move"

  }

  onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }


}
