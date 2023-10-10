import { Component, ViewChild, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { take } from 'rxjs';
import { TranslateData } from "../../../interfaces/translate-data";
import { User } from "../../../models/user";
import { DialogUserComponent } from "./dialogs/dialog-user/dialog-user.component";
import { RemoveUserComponent } from "./dialogs/remove-user/remove-user.component";
import { UserService } from '../../../services/user.service';
import { TranslateService } from '../../../services/translate.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [AlertsService, MessageService]
})
export class UsersComponent {

  removeUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  users: User[] = [];

  user: User = {}

  selectedUsers: User[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];

  birthSex: any[] = [];

  translatedStrings: TranslateData = {};

  @ViewChild( DialogUserComponent ) dialogUser!: DialogUserComponent;
  @ViewChild( RemoveUserComponent ) dialogRemoveUser!: RemoveUserComponent;

  constructor(
    private userService: UserService,
    private alertsService: AlertsService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    
    this.birthSex = this.userService.birthSex;

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });

    this.reloadTable();
    
  }

  reloadTable() {
    this.userService.getUsers( 1 ).subscribe( (result: User[]) => {
      this.users = result;
    });

  }

  dialogNewUser() {

    this.dialogUser.hideDialog();
    this.dialogUser.typeDialog = 'new';
    this.dialogUser.user = new User({ isActive: 1 });
    this.dialogUser.submitted = false;
    this.dialogUser.userDialog = true;

    if ( this.dialogUser.userEmitter ) {
      this.dialogUser.userEmitter.unsubscribe();
    }

    this.dialogUser.userEmitter = new EventEmitter<User>();

    this.dialogUser.userEmitter.pipe( take(1) ).subscribe( (user: User) => {
      user ? ( this.alertsService.alertsUser.Insert(), this.reloadTable() ) : this.alertsService.alertsUser.Error();
    });
  }

  dialogEditUser( user: User ) {

    this.dialogUser.typeDialog = 'edit';
    this.dialogUser.user = { ...user };
    this.dialogUser.userDialog = true;
    this.dialogUser.setValuesForm();

    if ( this.dialogUser.userEmitter ) {
      this.dialogUser.userEmitter.unsubscribe();
    }

    this.dialogUser.userEmitter = new EventEmitter<User>();

    this.dialogUser.userEmitter.pipe( take(1) ).subscribe( (user: User) => {
      user ? ( this.alertsService.alertsUser.Update(), this.reloadTable() ) :  this.alertsService.alertsUser.Error();
    });
  }

  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }

  dialogDeleteUser( user: User ) {
    this.dialogRemoveUser.removeUserDialog = true;
    this.dialogRemoveUser.user = { ...user };

    if ( this.dialogUser.userEmitter ) {
      this.dialogUser.userEmitter.unsubscribe();
    }

    this.dialogUser.userEmitter = new EventEmitter<User>();

    this.dialogRemoveUser.userEmitter.pipe( take(1) ).subscribe( (result: any) => {
      if ( result.id ) {
        this.reloadTable();
      }
    });
  }

  findIndexById( id: number ): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal( (event.target as HTMLInputElement).value, 'contains' );
  }

}
