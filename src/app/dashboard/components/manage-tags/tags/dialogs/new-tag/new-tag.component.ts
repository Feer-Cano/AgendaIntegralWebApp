import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from '../../../../../services/tag.service';
import { Tag } from '../../../../../models/tag';

@Component({
  selector: 'app-new-tag',
  templateUrl: './new-tag.component.html',
  styleUrls: ['./new-tag.component.scss']
})
export class NewTagComponent implements OnInit{

  @Output() tagCreated: EventEmitter<Tag> = new EventEmitter<Tag>();

  form: FormGroup;

  tagDialog: boolean = false;

  submitted: boolean = false;

  tag: Tag = {};

  entities: any[] = [];

  birthSex: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagService
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      entity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.entities = this.tagService.entities;

  }

  save() {

    this.submitted = false;

    if ( this.form.invalid ) {
      this.submitted = true;
      return;
    }

    const formValues = this.form.getRawValue();

    this.tag.name = formValues.name;
    this.tag.typeEntityId = formValues.entity;


    this.tagService.createTags( this.tag ).subscribe( result => {

      this.tagCreated.emit(result);
      this.form.reset();

    });

    this.hideDialog();

  }

  hideDialog() {
    this.tagDialog = false;
    this.submitted = false;
  }
}
