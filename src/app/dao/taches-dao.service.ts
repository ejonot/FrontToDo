import { Injectable } from '@angular/core';
import {throwError as ObservableThrowError, Observable} from 'rxjs'
import {map, tap, catchError} from 'rxjs/operators'
import { HttpClient,HttpHeaders, HttpClientModule ,HttpErrorResponse   } from '@angular/common/http';
import {Tache } from '../tache';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
  })
};

const CREATION="x";
const url="https://tachedown.firebaseio.com/";

@Injectable({
  providedIn: 'root'
})
export class TachesDAOService {

idEdite : string;

cleCreation() : string{
  return CREATION;
}
editer(id){
 this.idEdite=id;
}

creer(){
  this.idEdite=CREATION;
}

estCreation() : boolean{
  return (  this.idEdite==CREATION);
}
estEdite(s) : boolean{
    return (s &&  this.idEdite==s);
}
estEdition() : boolean{
    return (this.idEdite!=null);
}

  constructor(private client : HttpClient) {

  }

   // initTache() : Map<string, Tache>{
   // this.client.get<Tache[]>(url+"taches.json").
   //   pipe(tap(data=>data),
   // catchError(this.handleError('getTaches', []))).subscribe(data=>{
   //   var taches=new Map();;
   //   var index;
   //   index=Object.keys(data);
   //   for(var i in index){
   //     taches.set(i, data[i]);
   //   }
   //   console.log(taches);
   //   return taches;
   // }
   //
   // );
   //
   // }
  getTaches():Observable<Tache[]>{
    return this.client.get<Tache[]>(url+"taches.json").
    pipe(tap(data=>data),
  catchError(this.handleError('getTaches', []))
  );
  }


  getTache(key) : Observable<Tache[]>{


    //console.log(url+"taches/"+key+".json");
    return this.client.get<Tache[]>(url+"taches/"+key+".json").
    pipe(tap(data=>data),
  catchError(this.handleError('getTache', []))
);
  }


  // POST :  Add a tache
  addTache(tache: Tache): Observable<Tache> {
        //console.log("addTache ");
            var data=JSON.stringify(tache);
            console.log(data);
    return this.client.post<Tache>(url+"taches.json", tache, {responseType: 'json'}).pipe(
      tap((product: Tache) => console.log('tache ajoutée')),
      catchError(this.handleError<Tache>('addTache', tache))

    );
  }


  // PUT :  Edit a tache
  editTache(tache: any, key: string): Observable<Tache> {
      if(key==CREATION) return this.addTache(tache);
    //console.log("editTache "+key);
     console.log(tache);
   var data=JSON.stringify(tache);
   console.log(data); 
    return this.client.patch<any>(url+"taches/"+key+".json", tache, {responseType: 'json'}).pipe(
      tap((product: Tache) => console.log('tache edité')),
      catchError(this.handleError<Tache>('editTache', tache))
    );
  }


    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
        // Let the app keep running by returning an empty result.
        return (error);

      };

    }

}
