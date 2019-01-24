import { Persona } from "./../../../entidades/CRUD/Persona";
import { Carrera } from "./../../../entidades/CRUD/Carrera";
import { FotoPerfilService } from "app/CRUD/fotoperfil/fotoperfil.service";
import { Component, OnInit, Input, ViewChild  } from "@angular/core";
import { LoginResult } from "app/entidades/especifico/Login-Result";
import { PersonaService } from "app/CRUD/persona/persona.service";
import { ChatCarrerasService } from "app/shared/components/contacts/chat-carreras.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
    selector: "app-contacts",
    templateUrl: "./contacts.component.html",
    styleUrls: ["./contacts.component.scss"],
    providers: [ChatCarrerasService ]
})
export class ContactsComponent implements OnInit {
    

    
    busy: Promise<any>;
    showMenu = "";
    personaLogeada: Persona;
    userName = "";
    srcFoto: string;
    fotoNombre: string;
    fotoType: string;
    fotoFile: string;
    filtroComunidad: string;
    personasFiltroComunidad = [];
    carreras: Carrera[];

    salaElegida = "TODOScontacts"
 
   

    constructor(private fotoPerfilDataService: FotoPerfilService, private personaDataService: PersonaService, private chatCarrerasService: ChatCarrerasService) {}

    ngOnInit() {
      

        sessionStorage.setItem("enviarSala", JSON.stringify(this.salaElegida));
        console.log("OnInit Contacts",this.salaElegida);
        this.chatCarrerasService.getData().subscribe(data => {
            this.carreras = data;
            this.carreras.forEach(carrera => {
                let salas = [
                    {nombre: "Primer Nivel", id: carrera.siglas + "1"},
                    {nombre: "Segundo Nivel", id: carrera.siglas + "2"},
                    {nombre: "Tercero Nivel", id: carrera.siglas + "3"},
                    {nombre: "Cuarto Nivel", id: carrera.siglas + "4"},
                    {nombre: "Quinto Nivel", id: carrera.siglas + "5"},
                    {nombre: "Sexto Nivel", id: carrera.siglas + "6"},
                    {nombre: "Todos", id: carrera.siglas},
                ];
                carrera.chats = salas;
            });

        //var  carreraString = this.carreras.map(({ id }) => id);
      //  var    nivelString = this.carreras.map(({ nombre }) => nombre);

        //  this.salaElegida= (carreraString+" "+nivelString)
            console.log("las carreras son " , this.carreras," en String " , this.salaElegida)
          });
        const logedResult = JSON.parse(
            localStorage.getItem("logedResult")
        ) as LoginResult;
        this.personaLogeada = logedResult.persona;
        this.userName =
            this.personaLogeada.nombre1 +
            " " +
            this.personaLogeada.nombre2 +
            " " +
            this.personaLogeada.apellido1 +
            " " +
            this.personaLogeada.apellido2;

           
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = "0";
        } else {
            this.showMenu = element;
        }
    }

    refreshContactVisibleState() {
        const estado = JSON.parse(
            localStorage.getItem("contactSpaceVisibleState")
        ) as Boolean;
        return estado;
    }

    salaSeleccionada(sala) {
        
        sessionStorage.setItem("enviarSala", JSON.stringify(sala+""));
        console.log("transformacion ",sala+"");
      //  var nom = this.carreras.map(({ nombre }) => nombre);
      
       // this.salaElegida = (nom+"")
       // console.log("sera ",this.salaElegida);
       

    }

    searchPersonas() {
        this.personasFiltroComunidad = [];
        if (this.filtroComunidad.length < 3) {
            return;
        }
        this.busy = this.personaDataService
            .getFiltradoNombreCompleto(
                this.filtroComunidad
            )
            .then(respuesta => {
                if (JSON.stringify(respuesta) == "[0]") {
                } else {
                    respuesta.forEach(persona => {
                        this.personasFiltroComunidad.push(persona);
                    });
                }
            })
            .catch(error => {});
    }
   
}
