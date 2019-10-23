import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { HttpService } from "@app/shared";
import { CurrenciesService } from "./currencies.service";
import { Currency } from "./currency";
import { ModalDirective } from "ngx-bootstrap/modal";
import { AlertService } from "@app/shared";
import { CountriesService } from "@app/modules/master-data/countries/countries.service";
import { Country } from "@app/modules/master-data/countries/country";


/**
 * Components related to currency
 * 
 * @export
 * @class CurrenciesComponent
 * @implements {OnInit}
 */
@Component({
  selector: "app-currencies",
  templateUrl: "./currencies.component.html",
  styleUrls: ["./currencies.component.scss"],
  providers: [HttpService, CurrenciesService, CountriesService]
})

export class CurrenciesComponent implements OnInit {
  currencies: Currency[] = [];
  countries: Country[] = [];
  model: any = {};
  selectedCountry: Object = {};
  loading = false;
  delete = true;
  @ViewChild('editCurrencyModal') public editCurrencyModal: ModalDirective;
  @ViewChild('addCurrencyModal') public addCurrencyModal: ModalDirective;
  @ViewChild('deleteCurrencyModal') public deleteCurrencyModal: ModalDirective;

  constructor(
    private currenciesDataService: CurrenciesService,
    private alertService: AlertService,
    private countriesDataService: CountriesService,
  ) {}

  ngOnInit() {
    this.loadCurrencies();
  }

  /**
   * to load currency and country listing
   * 
   * @memberof CurrenciesComponent
   */
  loadCurrencies() {
    this.currenciesDataService.getAllCurrencies().subscribe(currencies => {
      this.currencies = currencies.data;
    });
    this.countriesDataService.getAllCountries().subscribe(countries => {
      this.countries = countries.data;
    });
  }


  /**
   * to add currency (init method)
   * 
   * @memberof CurrenciesComponent
   */
  addCurrency() {
    this.alertService.clear();
    this.model = {};
    this.selectedCountry = {};
  }


  /**
   * to add currency
   * 
   * @memberof CurrenciesComponent
   */
  addNewCurrency() {
    this.loading = true;
    this.currenciesDataService
      .addNewCurrency(this.model.currency, this.model.code, this.selectedCountry)
      //, 
      .subscribe(
        data => {
          this.handleSuccess(data);
          this.addCurrencyModal.hide();
        },
        error => {
          this.handleError(error);
        }
      );
  }

  /**
   * to edit currency(init method)
   * 
   * @param {any} currencies 
   * @memberof CurrenciesComponent
   */
  editCurrency(currencies) {
    this.alertService.clear();
    this.model.id = currencies.id;
    this.model.currencyEdited = currencies.name;
    this.model.codeEdited = currencies.code;
    this.model.countryEdited = currencies.country_id;
  }


  /**
   * update currency
   * 
   * @memberof CurrenciesComponent
   */
  updateCurrency() {
    this.loading = true;
    this.currenciesDataService
      .updateCurrency(
        this.model.id,
        this.model.currencyEdited,
        this.model.codeEdited,
        this.model.countryEdited
      )
      .subscribe(
        data => {
          this.handleSuccess(data);
          this.editCurrencyModal.hide();
          console.log('u');
        },
        error => {
          this.handleError(error);
        }
      );
  }


  /**
   * delete currency(init method)
   * 
   * @param {any} currencies 
   * @memberof CurrenciesComponent
   */
  deleteCurrencyModalOpen(currencies) {
    this.delete = true;
    this.alertService.clear();
    this.model.idToBeDeleted = currencies.id;
    this.model.currencyToBeDeleted = currencies.name;
  }


  /**
   * delete currency
   * 
   * @memberof CurrenciesComponent
   */
  deleteCurrency() {
    this.loading = true;
    this.delete = false;
    this.currenciesDataService
      .deleteCurrency(this.model.idToBeDeleted)
      .subscribe(
        data => {
          this.handleSuccess(data);
          this.deleteCurrencyModal.hide();
        },
        error => {
          this.handleError(error);
        }
      );
  }
  
  /**
   * 
   * 
   * @param {*} query 
   * @memberof CurrenciesComponent
   */
  search(query: any) {
    console.log(query, ' query search')
  }
  focus(event) {
    console.log(event, ' focus event')
  }
  handleSuccess(data) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.success(data.message);
    this.loadCurrencies();
  }

  handleError(error) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.error(error.error.message);
  }
}
