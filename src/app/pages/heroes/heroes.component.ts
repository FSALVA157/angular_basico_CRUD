import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  cargando: boolean = false;
  heroes: HeroeModel[] = [];

  constructor(
    private heroesService:HeroesService
  ) {
     
   }

  ngOnInit(): void {
    this.listarHeroes();
  }

  listarHeroes(){
    this.cargando = true;
    return this.heroesService.getHeroes().subscribe(data => {
        this.heroes = data;
        this.cargando = false;
    });
  }

  borrarHeroe(id: string, i: number){

    Swal.fire({
      title: 'Eliminar!!',
      text: 'Esta seguro de Eliminar este Registro?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      this.heroesService.deleteHeroe(id).subscribe(res => {
        this.heroes.splice(i,1);
        Swal.fire({
          title: 'Eliminado!!',
          text: 'El registro seleccionado ha sido eliminado correctamente',
          icon: 'success'
        })  
      });

    }); 

  }


}
