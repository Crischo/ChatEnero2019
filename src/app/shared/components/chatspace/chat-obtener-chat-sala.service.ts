import { Injectable } from '@angular/core';
// importacion de http o httpClient segun la clase
import { HttpClient } from '@angular/common/http';
import {Http, Headers, Response} from '@angular/http';
//inporta la base de datos para obtener los mensajes
import { AngularFireDatabase } from 'angularfire2/database';
//importa la clace persona
import { Persona  } from 'app/entidades/CRUD/Persona';

@Injectable()


export class ChatObtenerChatSalaService {
  constructor(
    //instancia las importaciones
    private http: Http,
   private http2: HttpClient,
     public angularFireDatabase: AngularFireDatabase
     ) {     }

     // metodo para obtener las salas segun id de la persona logeada
     getPersona(id): Promise<any> {

      let data = {idPersona: id};
      return this.http.post('http://yavirac.edu.ec/ignug/server/chat/consultar_salas', JSON.stringify(data))
      .toPromise().then(
        respuesta => respuesta.json()
      ).catch(
        error => {
          Promise.reject(error.message || error);
        }
      );
    }

    //clase tomar mensajes
  // getChatBySalaId(id) {
    //  return this.angularFireDatabase.list("mensajes", ref => ref.orderByChild("salaid").equalTo(salaId)).valueChanges()
   // return this.angularFireDatabase.list("mensajes", ref => ref.orderByChild("salaid")).valueChanges()   
  // }

  getData() {
    return this.http2.get<Persona[]>('http://www.yavirac.edu.ec/ignug/server/docente/leer');
   }

}
