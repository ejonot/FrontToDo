import { Component, OnInit } from '@angular/core';
import {TachesDAOService } from '../dao/taches-dao.service';
import {Tache } from '../tache';
import { HttpClient } from '@angular/common/http';

function array_move(arr, old_index, new_index) {
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

  taches ;
  index ;
  categories;

  constructor(private client : HttpClient, private tachesDAO : TachesDAOService) { }

  ngOnInit() {
    this.getTaches();
    this.etats=[false,
      true,
      false];
    }

   getTache(i) : Tache{
     return this.taches[i];
   }

    getTaches():void{

      this.tachesDAO.getTaches().subscribe(data=>{
         var donnees=data;

        this.index=Object.keys(data);
        this.index.sort((a,b)=>{
          return data[a].index-data[b].index;
        });

        //console.log(donnees);
        this.taches=[];
        this.categories=[];
        for( var i in this.index){
          var cle=this.index[i];
          if(cle){
            var tache=donnees[cle];
            if(tache){
              this.taches.push(tache);
              if(tache.categorie && this.categories.indexOf(tache.categorie)===-1) this.categories.push(tache.categorie);
            }

          }

        }
        //console.log(this.taches);
        //this.taches=Object.values(data);
      });
      //this.taches=this.tachesDAO.initTache();

      //this.taches=data;
      //console.log(this.taches);
    }

    estFiltre(i){
      var tache=this.taches[i];
      // console.log(this.texte +" : "+tache.description);
      // console.log(this.categorie  +" : "+tache.categorie===this.categorie);
      // console.log(tache.etat +" : "+this.etats[tache.etat]);
      var desc=(!this.texte || this.texte=="" || !tache.description || tache.description.indexOf(this.texte)>=0);
      var cat=(!this.categorie || this.categorie=="" || !tache.categorie || tache.categorie===this.categorie)
      var et=(!tache.etat || this.etats[tache.etat]);
      console.log("desc : "+desc+", cat : "+cat+", et : "+et);
      return (desc && cat && et );
    }

    estEdite(i) : boolean{
      // console.log(this.tachesDAO.idEdite);
      // console.log(this.index[i]==this.tachesDAO.idEdite);
      //return (this.tachesDAO.estEdite(i));
      return (this.index[i] && this.tachesDAO.estEdite(this.index[i]));
    }

    estEdition() : boolean{
      return this.tachesDAO.estEdition();
    }

    estCreation() : boolean{
      return this.tachesDAO.estCreation();
    }

    creer(){
      this.tachesDAO.creer();
    }

    editer(i){
      //console.log("edit" +i);
      if(this.index[i]) {
        this.tachesDAO.editer(this.index[i]);
      }
      //this.tachesDAO.editer(i);
    }



    onDragStart(event){
      event.dataTransfer.dropEffect = "move";
      //event.dataTransfer.setData('text/plain', event.target.outerHTML);
      event.dataTransfer.setData('index', event.target.dataset.index);
      //console.log("drag");
    }

    onDrop(event: any) {
      event.preventDefault();
      event.stopPropagation();
      // your code goes here after droping files or any


      array_move(this.taches, event.dataTransfer.getData("index"), event.target.dataset.index);
      array_move(this.index, event.dataTransfer.getData("index"), event.target.dataset.index);
      for(var i=0; i<this.index.length; i++){
        this.tachesDAO.editTache({index: i}, this.index[i]).subscribe();
      }
      console.log("drop de "+event.dataTransfer.getData("index")+" vers " +event.target.dataset.index);
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
