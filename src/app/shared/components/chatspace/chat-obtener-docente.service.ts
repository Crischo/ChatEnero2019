import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';

import {Http, Headers, Response} from '@angular/http';

import { Persona  } from 'app/entidades/CRUD/Persona';
@Injectable()



export class ChatObtenerDocenteService {

  constructor(private http: HttpClient, public db: AngularFireDatabase) { }

  getData() {
    return this.http.get<Persona[]>('http://www.yavirac.edu.ec/ignug/server/docente/leer');
   }



}



 