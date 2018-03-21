import {IAppState} from '../../stores/root.store';
import {Pipe, PipeTransform} from '@angular/core';
import {NgRedux} from '@angular-redux/store';

@Pipe({
  name: 'ProjetsCardPipe'
})
export class ProjetsCardPipe implements PipeTransform {

  constructor(private ngRedux: NgRedux<IAppState>) {

  }

  transform() {

  }

  // getClientById(idClient: number): ClientModel {
  //   return this.ngRedux.getState().projets.get('customers').find(function (element: ClientModel) {
  //     return element.id === idClient;
  //   });
  // }
//
  // transform(value: ProjetsModel[], args: any) {
  //   if (!Array.isArray(value) || !args) {
  //     return value;
  //   }
//
  //   const myValue: string = args.name;
  //   const self = this;
  //   return value.filter(function (projet: ProjetsModel) {
  //     let flag: boolean = true;
//
  //     if (myValue) {
  //       const titreProjetContains = projet.titreProjet ? projet.titreProjet.toLowerCase().indexOf(myValue.toLowerCase()) !== -1 : false;
  //       const clientProjetContains = self.getClientById(projet.idClient) && self.getClientById(projet.idClient).name ? self.getClientById(projet.idClient).name.toLowerCase().indexOf(myValue.toLowerCase()) !== -1 : false;
//
  //       flag = titreProjetContains || clientProjetContains;
  //     }
//
  //     return flag;
  //   });
  // }
}
