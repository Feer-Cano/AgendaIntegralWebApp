
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { TranslateData } from "src/app/dashboard/interfaces/translate-data";
import { CostServices } from "src/app/dashboard/interfaces/costs-services";
import { Service } from "src/app/dashboard/models/service";

import { TranslateService } from 'src/app/dashboard//services/translate.service';
import { ServiceService } from "src/app/dashboard/services/service.service";
import { ServiceCostService } from "src/app/dashboard/services/service-cost.service";

@Component({
  selector: 'app-dialog-service',
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.scss']
})
export class DialogServiceComponent implements OnInit {

  @Output() serviceEmitter: EventEmitter<Service> = new EventEmitter<Service>();

  translator: TranslateData = {};

  form: FormGroup;

  serviceDialog: boolean = false;

  submitted: boolean = false;

  service: Service = {};

  typeDialog: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private serviceService: ServiceService,
    private serviceCostService: ServiceCostService,
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  ngOnInit(): void {
    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translator = translations;
    });
  }

  setValuesForm() {
    this.form.patchValue({
      name: this.service.name,
      description: this.service.description,
      cost: this.service.costs?.[0]?.cost ?? null,
      isActive: this.service.isActive
    });
  }

  save() {

    this.submitted = false;

    if ( this.form.invalid ) {
      this.submitted = true;
      return;
    }

    const formValues = this.form.getRawValue();

    this.service.name = formValues.name;
    this.service.description = formValues.description;

    if ( this.typeDialog === 'new' ) {

      this.form.reset();

      this.serviceService.createService( this.service ).subscribe( async(result: Service) => {

        if ( result && result.id ) {

          const costService: CostServices = {
            serviceId: result.id,
            cost: formValues.cost
          }

          await lastValueFrom( this.serviceCostService.createServiceCost( costService ) );
        }

        this.serviceEmitter.next( result );
      });

    } else {
      
      this.serviceService.updateService( this.service ).subscribe( async(result: Service) => {

        if ( result && result.id ) {

          const costService: CostServices = {
            serviceId: result.id,
            cost: formValues.cost
          }

          await lastValueFrom( this.serviceCostService.createServiceCost( costService ) );
        }
        
        this.serviceEmitter.next( result );
      });
    }

    this.hideDialog();
  }

  hideDialog() {
    this.form.reset();
    this.serviceDialog = false;
    this.submitted = false;
  }

}
