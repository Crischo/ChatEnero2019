import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
//clases
import { Persona } from 'app/entidades/CRUD/Persona';
import { LoginResult } from './../../../entidades/especifico/Login-Result';

//servicios
import {FotoPerfilService} from 'app/CRUD/fotoperfil/fotoperfil.service';
import {ChatObtenerChatSalaService} from 'app/shared/components/chatspace/chat-obtener-chat-sala.service';
import {ChatObtenerDocenteService} from 'app/shared/components/chatspace/chat-obtener-docente.service';
 
// instancia a la Base de datos

import * as firebase from 'firebase';


@Component({
  selector: 'app-chatspace',
  templateUrl: './chatspace.component.html',
  styleUrls: ['./chatspace.component.scss'],
  providers: [ChatObtenerChatSalaService, ChatObtenerDocenteService]
})
export class ChatspaceComponent implements OnInit {
  

  


  salaElegida = 'TODOSchat';
    busy: Promise<any>;
  showMenu: string = "";
  personaLogeada: Persona;
  userName: string = "";
  srcFotoPerfil: string = "";
  srcFoto: string = "";
  fotoNombre: string = "";
  fotoType: string = "";
  fotoFile: string = "";
  
  message: string = "";
  messages = []; 
  
  //variables botones auxiliares maxinizar, cerrar
  minimizar = false;
  cerrar = true;
  //variables mensajes

  //nombreCarrera: string;
 // nombreMateria: string;
  nombreValue: string = "";
  mensajeValue: string = "";
  timeStamp: Date = new Date();
  public salaId = '1';
  mensaje: string = "";
  person: Persona;

  //cargar archivo
  form: FormGroup;
  //variable idPersona para tomar el usuario
  idPersona: string = "";
  arrayPersona = []; 

  constructor(private fotoPerfilDataService: FotoPerfilService,
    private chatObtenerChatSalaService: ChatObtenerChatSalaService,
    private chatObtenerDocente: ChatObtenerDocenteService,
     private http: Http
    
  ) {
   
    //obtener los mensajes
//this.getMessages();

//obtener el usuario

     }

  ngOnInit() {
    //cargar a pa persona logueada
    
    const logedResult = JSON.parse(localStorage.getItem('logedResult')) as LoginResult;
   
  
    this.personaLogeada = logedResult.persona;
    this.userName = this.personaLogeada.nombre1 + ' ' + this.personaLogeada.nombre2 + ' ' + this.personaLogeada.apellido1 + ' ' + this.personaLogeada.apellido2;
    this.getFotoPerfil();
    this.botonMinimizar();
    this.botonMaximizar();
    this.cerrar=true;
    this.cerrar=false
   this.getMessages();

  
;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
        this.showMenu = '0';
    } else {
        this.showMenu = element;
    }
  }

  getFotoPerfil() {
    this.srcFotoPerfil = 'assets/images/user.png';
    this.busy = this.fotoPerfilDataService.getFiltrado('idPersona', 'coincide', this.personaLogeada.id.toString())
        .then(respuesta => {
            if (JSON.stringify(respuesta) == '[0]') {
                return;
            }
            this.fotoFile = respuesta[0].adjunto;
            this.fotoNombre = respuesta[0].nombreArchivo;
            this.fotoType = respuesta[0].tipoArchivo;
            this.srcFotoPerfil = 'data:' + this.fotoType + ';base64,' + this.fotoFile;
        })
        .catch(error => {

        });
  }


  botonMinimizar() {
   this.minimizar = true;
   
  }
  botonMaximizar() {
    this.minimizar = false;
   }

  botonCerrar() {
    this.cerrar = true;
  }
  botonAbrir() {
    this.cerrar = false;
    this.getMessages();
  }
 
// metodo cargar archivo

CodificarArchivo(event) {this.userName
  
  var reader = new FileReader();
  if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.fotoNombre = file.name;
          this.fotoType = file.type;
//- split para imagen


//  split = cadena.substring(inicio, fin);

// console.log(subCadena); // la consola devolverá: texto



          this.fotoFile = reader.result.split(',')[1];
          this.srcFoto = 'data:' + this.fotoType + ';base64,' + this.fotoFile;
          console.log(this.srcFoto)
      };
  }
}

onFileChange(event) {
let reader = new FileReader();
if(event.target.files && event.target.files.length > 0) {
  let file = event.target.files[0];
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.form.get('avatar').setValue({
      filename: file.name,
      filetype: file.type,
      value: reader.result.split(',')[1]
    })
  };
  
}

}

processWebImage(event) {
let reader = new FileReader();
reader.onload = (readerEvent) => {

  let imageData = (readerEvent.target as any).result;
 
};

var imagen =  reader.readAsDataURL(event.target.files[0]);
console.log(imagen)
}


    //Metodos cabeza

  
    sendMessage() {
      if(this.salaElegida==null){
        this.salaElegida="TODOScontacts"
        console.log("sendMessages ",this.salaElegida);
      }else{ 
       this.salaElegida = JSON.parse(sessionStorage.getItem('enviarSala')); 
       //   firebase.database().ref().child("mensajes");  
       console.log("sendMessages ",this.salaElegida);
      }
console.log('Envio--------------------------')
var messageRef = firebase.database().ref().child("mensajes");

messageRef.push({
  nombre: this.userName,
  mensaje: this.message,
  fecha: Date.now(),
  
  salaID: this.salaElegida,
  foto:this.srcFoto,
  tipo: this.fotoType.split('/')[0] });

  this.srcFoto = null;
  this.message = null;
  //this.fileInput.nativeElement.value = null;
    }
 
 getMessages(){  

   if(this.salaElegida==null){
     this.salaElegida="TODOScontacts"
     console.log("getMessages aaaaaaaaaaaaaaaaaaaa",this.salaElegida);
     this.cerrar=true;
   }else{ 
    this.salaElegida = JSON.parse(sessionStorage.getItem('enviarSala')); 
    //   firebase.database().ref().child("mensajes");  
    console.log("getMessages aaaaaaaaaaaaaaaaaaaaaaaa",this.salaElegida);
    this.cerrar=true;
   }
  
 var messagesRef = firebase.database().ref('/mensajes').orderByChild('salaID').equalTo(this.salaElegida+""); //.equalTo(this.salaId)
  messagesRef.on("value", (snap) => {
    var data = snap.val();
    this.messages = [];
    for(var key in data){
      this.messages.push(data[key]);
     
    }
  });  
  console.log(this.messages);
  this.salaElegida =""; 
  //   firebase.database().ref().child("mensajes");  
  console.log("getMessages ",this.salaElegida);
  this.cerrar=false;
  this.botonMinimizar();
  this.botonMaximizar();
}
}
