/**
 * Created by aemebikuine on 29/05/2017.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {UserModel} from '../../domain/models/user/user.model';
import {ClientModel} from './../../domain/models/client/client.model';
import {UserFavorisModel} from '../../domain/models/user/user-favoris.model';
import {UserTagModel} from '../../domain/models/user/user-tag.model';
import {UserCentreInteretModel} from '../../domain/models/user/user-centre-interet.model';
import {UserCerclesCommunautesModel} from '../../domain/models/user/user-cercles-communautes.model';
import {UserAvailabilityModel} from '../../domain/models/user/user-availability.model';

@Pipe({
  name: 'TrombinoscopeCardPipe'
})
export class TrombinoscopeCardPipe implements PipeTransform {
  transform() {

  }

  transform(value: UserModel[], args: any) {
   if (!Array.isArray(value) || !args) {
     return value;
   }

   const self = this;
   const myValue: string = args.name;
   const filter: UserFavorisModel = args.filter;

   return self.orderByCollaborateurs(value.filter(function (collaborateur: UserModel) {
     let flag: boolean = false;

     if (filter) {
       const gradeFilter = filter.grade ? collaborateur.grade === filter.grade.name : true;

       let tauxDisponibiliteFilter: boolean = true;
       if (filter.tauxDeDisponibilite) {
         tauxDisponibiliteFilter = false;
         collaborateur.availabilities.forEach(function (element: UserAvailabilityModel) {
           let dateDebutFilter: boolean = true;
           let dateFinFilter: boolean = true;

           if (filter.dateDebut) {
             dateDebutFilter = !element.periodEndDate || element.periodStartDate >= filter.dateDebut || element.periodEndDate >= filter.dateFin;
           }

           if (filter.dateFin) {
             dateFinFilter = element.periodStartDate <= filter.dateFin || element.periodEndDate <= filter.dateFin;
           }

           tauxDisponibiliteFilter = (element.periodStartDate && dateDebutFilter && dateFinFilter && Number(element.rateOfAvailability) >= filter.tauxDeDisponibilite) || tauxDisponibiliteFilter;
         });
       }

       let clientFilter: boolean = true;
       if (filter.client) {
         clientFilter = false;
         collaborateur.customers.forEach(function (element: ClientModel) {
           clientFilter = element.name.trim().toLowerCase() === filter.client.name.trim().toLowerCase() || clientFilter;
         });
       }

       let tagsFilters: boolean[] = [];
       filter.tags.forEach(function (filterTag: UserTagModel) {
         let tagFound = false;
         collaborateur.tags.forEach(function (collaborateurTag: UserTagModel) {
           tagFound = collaborateurTag.code.trim().toLowerCase() === filterTag.code.trim().toLowerCase() || tagFound;
         });
         tagsFilters.push(tagFound);
       });

       let tagsFilter: boolean = true;
       tagsFilters.forEach(function (element: boolean) {
         tagsFilter = tagsFilter && element;
       });

       flag = tauxDisponibiliteFilter && gradeFilter && clientFilter && tagsFilter;

       if (filter.centreInteret) {
         let centreInteretFound: boolean = false;
         collaborateur.centresInterets.forEach(function (element: UserCentreInteretModel) {
           centreInteretFound =
             element.libelle.trim().toLowerCase() === filter.centreInteret.libelle.trim().toLowerCase()
             || centreInteretFound;
         });

         flag = flag && centreInteretFound;
       }

       if (filter.cerclesCommunaute) {
         let cercleCommunauteFound: boolean = false;
         collaborateur.cerclesCommunautes.forEach(function (element: UserCerclesCommunautesModel) {
           cercleCommunauteFound =
             element.libelle.trim().toLowerCase() === filter.cerclesCommunaute.libelle.trim().toLowerCase()
             || cercleCommunauteFound;
         });

         flag = flag && cercleCommunauteFound;
       }

     } else {
       flag = true;
     }

     return flag;
   }).filter(function (collaborateur: UserModel) {
     let flag: boolean = true;

     if (myValue) {
       const lastnameContains = collaborateur.lastname ? collaborateur.lastname.toLowerCase().indexOf(myValue.toLowerCase()) !== -1 : false;
       const firstnameContains = collaborateur.firstname ? collaborateur.firstname.toLowerCase().indexOf(myValue.toLowerCase()) !== -1 : false;
       const gradeContains = collaborateur.grade ? collaborateur.grade.toLowerCase().indexOf(myValue.toLowerCase()) !== -1 : false;
       const emailContains = collaborateur.email ? collaborateur.email.toLowerCase().indexOf(myValue.toLowerCase()) !== -1 : false;
       const telContains = collaborateur.telephone ? collaborateur.telephone.toLowerCase().indexOf(myValue.toLowerCase()) !== -1 : false;
       const telProContains = collaborateur.telephone_pro ? collaborateur.telephone_pro.toLowerCase().indexOf(myValue.toLowerCase()) !== -1 : false;

       flag = lastnameContains || firstnameContains || gradeContains || emailContains ||
         telContains || telProContains;

       collaborateur.customers.forEach(function (customer: ClientModel) {
         flag = customer.name.toLowerCase().indexOf(myValue.toLowerCase()) !== -1 || flag;
       });
     }

     return flag;
   }), filter);
  }

  private orderByCollaborateurs(users: UserModel[], filter: UserFavorisModel): UserModel[] {
   const self = this;
   if (!filter || !filter.orderByAvailabilityDate) {
     return users.sort(function (a: UserModel, b: UserModel) {
       if (a.fullname.toLowerCase() < b.fullname.toLowerCase()) return -1;
       if (a.fullname.toLowerCase() > b.fullname.toLowerCase()) return 1;
       return 0;
     });

   }
   else {
     return users.sort(function (a: UserModel, b: UserModel) {
       const aAvailability: UserAvailabilityModel = self.getAvailabilyForPeriod(a, filter.dateDebut, filter.dateFin);
       const bAvailability: UserAvailabilityModel = self.getAvailabilyForPeriod(b, filter.dateDebut, filter.dateFin);

       if (!aAvailability) {
         return 1;

       if (!bAvailability) {
         return -1;
       }

}
