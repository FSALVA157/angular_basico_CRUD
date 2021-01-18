import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel;
  id: string;
  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != 'nuevo'){
      this.poblarForm();
    }
    
  }

    guardar(form: NgForm){
    if(form.invalid){
      console.log("Formulario No Válido");
      return;
    }

    let peticion: Observable<any>;

    //iniciar sweetAlert
  Swal.fire({
    title: 'Procesando Datos',
    text: 'Espere por favor',
    icon: 'info',
    allowOutsideClick: false
  })
  Swal.showLoading();


    if(this.heroe.id){
        peticion = this.heroesService.actualizarHeroe(this.heroe);
     
    }else {
        peticion = this.heroesService.crearHeroe(this.heroe);
    }
    
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se ha actualizado correctamente',
        icon: 'success'
      })  
    });

  }

  poblarForm(){
    this.heroesService.getOneHeroe(this.id).subscribe((res: HeroeModel) => {
      this.heroe = res;
      this.heroe.id = this.id
      // this.heroe.id = res['id'];
      // this.heroe.nombre = res['nombre'];
      // this.heroe.poder = res['poder'];
      // this.heroe.vivo = res['vivo'];
    });
  }

}
