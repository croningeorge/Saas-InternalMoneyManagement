import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CountriesService } from "./countries.service";
import { Country } from "./country";
import { ModalDirective } from "ngx-bootstrap/modal";
import { AlertService } from "@app/shared";


/**
 * component related to country
 * 
 * @export
 * @class CountriesComponent
 * @implements {OnInit}
 */
@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.scss"],
  providers: [CountriesService]
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [];
  model: any = {};
  loading = false;
  delete = true;
  @ViewChild('editCountryModal') public editCountryModal: ModalDirective;
  @ViewChild('addCountryModal') public addCountryModal: ModalDirective;
  @ViewChild('deleteCountryModal') public deleteCountryModal: ModalDirective;
  constructor(
    private countriesDataService: CountriesService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadCountries();
  }


  /**
   * country details listing
   * 
   * @memberof CountriesComponent
   */
  loadCountries() {
    this.countriesDataService.getAllCountries().subscribe(countries => {
      this.countries = countries.data;
    });
  }


  /**
   *add country(init)
   * 
   * @memberof CountriesComponent
   */
  addCountry() {
    this.alertService.clear();
    this.model = {};
  }


  /**
   * add country details
   * 
   * @memberof CountriesComponent
   */
  addNewCountry() {
    this.loading = true;
    this.countriesDataService
      .addNewCountry(
      this.model.country,
      this.model.code,
      this.model.allowFrom,
      this.model.allowTo
      )
      .subscribe(
      data => {
        this.handleSuccess(data);
        this.addCountryModal.hide();
      },
      error => {
        this.handleError(error);
      }
      );
  }


  /**
   * edit country(init)
   * 
   * @param {any} country 
   * @memberof CountriesComponent
   */
  editCountry(country) {
    this.alertService.clear();
    this.model.id = country.id;
    this.model.countryEdited = country.name;
    this.model.codeEdited = country.code;
    // this.model.countryEdited = country.country_id;
    this.model.allowFromEdited = country.allow_from;
    this.model.allowToEdited = country.allow_to;
  }


  /**
   * update country details
   * 
   * @memberof CountriesComponent
   */
  updateCountry() {
    this.loading = true;
    this.countriesDataService
      .updateCountry(
      this.model.id,
      this.model.countryEdited,
      this.model.codeEdited,
      // this.model.countryEdited
      this.model.allowFromEdited,
      this.model.allowToEdited
      )
      .subscribe(
      data => {
        this.handleSuccess(data);
        this.editCountryModal.hide();
      },
      error => {
        this.handleError(error);
      }
      );
  }


  /**
   * delete country details(init)
   * 
   * @param {any} country 
   * @memberof CountriesComponent
   */
  deleteCountryModalOpen(country) {
    this.delete = true;
    this.alertService.clear();
    this.model.idToBeDeleted = country.id;
    this.model.countryToBeDeleted = country.name;
  }


  /**
   * delete country
   * 
   * @memberof CountriesComponent
   */
  deleteCountry() {
    this.loading = true;
    this.delete = false;
    this.countriesDataService.deleteCountry(this.model.idToBeDeleted).subscribe(
      data => {
        this.handleSuccess(data);
        this.deleteCountryModal.hide();
      },
      error => {
        this.handleError(error);
      }
    );
  }
  handleSuccess(data) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.success(data.message);
    this.loadCountries();
  }

  handleError(error) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.error(error.error.message);
  }
}
