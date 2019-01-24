import { Injectable } from '@angular/core';
import { Carrera } from 'app/entidades/CRUD/Carrera'
import {Http, Headers, Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ChatCarrerasService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<Carrera[]>('http://yavirac.edu.ec/ignug/server/carrera/leer');
   }

}
