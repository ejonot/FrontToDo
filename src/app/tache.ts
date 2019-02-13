export class Tache {

  titre : String ;
  description : String ;
  etat : number ;
  creation : Date ;
  deadline : Date ;
  categorie : String ;
 index :number;

  constructor(data){
    this.titre ="";
    this.description="";
    this.etat =1;
    this.creation =new Date();
    this.deadline = this.initDeadline() ;
    this.categorie  ="";
    this.index=null;

    if(data && data['titre']) this.titre=(Array.isArray(data['titre'])? data['titre'][0] : data['titre']);
    if(data && data['description']) this.description=(Array.isArray(data['description'])    ?data['description'][0] : data['description']);
    if(data && data['categorie']) this.categorie=(Array.isArray(data['categorie'])?data['categorie'][0] : data['categorie']);
    if(data && data['etat']) this.etat=(Array.isArray(data['etat'])?data['etat'][0]  :data['etat']);
    if(data && data['creation']) this.creation=new Date(data['creation']);
    if(data && data['deadline']) this.deadline=new Date(data['deadline']);
     if(data && data['index']) this.index=(Array.isArray(data['index'])? data['index'][0] : data['index']);
  }
  initDeadline() : Date{
    var date=new Date();
    date.setDate(date.getDate() + 30);
    return date;
  }
}
