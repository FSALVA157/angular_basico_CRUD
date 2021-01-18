import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import {map} from 'rxjs/operators';
import { MapOperator } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  url = 'https://crud-basico-f591e-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient
  ) { }

  crearHeroe(heroe: HeroeModel){
     return this.http.post(`${this.url}/heroes.json`,heroe).pipe(
       map((resp:any) => {
          heroe.id = resp.name;
          return heroe;
       })
     );
  }

  actualizarHeroe(heroe: HeroeModel){
    //clonar y romper referencia del objeto
    let heroeTemp: HeroeModel = {
      ...heroe
    };
    //quito el atributo sin modificar el objeto original
    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp)
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map(datos => {
        return this.procesarDatos(datos) ;
      })
      );
  }

  private procesarDatos(heroesObj: object){
    const listado: HeroeModel[] = [];

    if(heroesObj == null){
      return []
    };

    Object.keys(heroesObj).forEach(key => {
      let heroeTmp: HeroeModel = heroesObj[key];
      heroeTmp.id = key;
      listado.push(heroeTmp);
    });
    return listado;
  }

  getOneHeroe(id: string){
    return this.http.get(`${this.url}/heroes/${id}.json`)

  }

  deleteHeroe(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

}
