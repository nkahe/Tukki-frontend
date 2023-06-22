import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators }
    from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Validators as EditorValidators } from 'ngx-editor';
import { Observable, Subject } from 'rxjs';

import { User } from '@core/core.models'
import { StoreService } from '@core/services/store.service';
import { CourseService } from '@course/course.service';
import schema from '@shared/editor/schema';
import { EditAttachmentsComponent }
    from '@ticket/components/edit-attachments/edit-attachments.component';
import { AddTicketResponse, FileInfo, Kentta, Liite, UusiTiketti }
    from '@ticket/ticket.models';
import { TicketService } from 'src/app/ticket/ticket.service';

@Component({
  selector: 'app-submit-ticket',
  templateUrl: './submit-ticket.component.html',
  styleUrls: ['./submit-ticket.component.scss']
})

export class SubmitTicketComponent implements OnInit {
  @Input() public attachmentsMessages: string = '';
  @Input() courseid!: string;
  @Input() id: string = ''
  @Input() public fileInfoList: FileInfo[] = [];
  @ViewChild(EditAttachmentsComponent) attachments!: EditAttachmentsComponent;

  public editExisting: boolean = window.history.state.editTicket ?? false;
  public errorMessage: string = '';
  public form: FormGroup = this.buildForm();
  public oldAttachments: Liite[] = [];
  public showConfirm: boolean = false;
  public state: 'editing' | 'sending' | 'done' = 'editing';
  public successMessage: string = '';
  public ticketFields: Kentta[] = [];
  public ticketId: string | null = null;
  public uploadClick = new Subject<string>();
  public user$: Observable<User | null>;
  // Listausnäkymään palattaessa näytä virheviesti.
  private commentID: string | null = null;
  private errorForListing: string | undefined;

  get additionalFields(): FormArray {
    return this.form.controls["additionalFields"] as FormArray;
  }

  get message(): FormControl {
    return this.form.get('message') as FormControl;
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  constructor(private courses: CourseService,
              private formBuilder: FormBuilder,
              private router: Router,
              private store: StoreService,
              private ticketService: TicketService,
              private titleServ: Title
              ) {
    this.user$ = this.store.trackUserInfo();
  }
  
  ngOnInit(): void {
    this.ticketId = this.id ?? null;
    if (this.courseid === null) throw new Error('Kurssi ID puuttuu URL:sta.');
    if (this.ticketId === null) {
      this.titleServ.setTitle(
        this.store.getBaseTitle() + $localize `:@@Uusi kysymys: Uusi kysymys`
      );
      this.fetchAdditionalFields();
    } else {
      this.fetchTicketInfo(this.ticketId, this.courseid);
    }
  }

  private buildAdditionalFields(): void {
    // Luodaan lomakkeelle controllit
    for (const field of this.ticketFields) {
      let validators = Validators.maxLength(50);
      if (field.pakollinen) {
        validators = Validators.required, Validators.maxLength(50);
      }
      let value = field.arvo ? field.arvo : '';
      this.additionalFields.push(new FormControl(value, validators));
    }
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(255)
        ])
      ],
      additionalFields: this.formBuilder.array([]),
      message: [
        '',
        Validators.compose([
          EditorValidators.required(schema),
          Validators.maxLength(100000)
        ])
      ],
      attachments: [''],
    });
  }

  private createTicket(): UusiTiketti {
    let ticket: UusiTiketti = {} as UusiTiketti;
    ticket.otsikko = this.form.controls['title'].value;
    ticket.viesti = this.form.controls['message'].value;
    ticket.kentat = [];
    for (let i = 0; i < this.ticketFields.length; i++) {
      ticket.kentat.push({
        id: Number(this.ticketFields[i].id),
        arvo: this.additionalFields.controls[i].value
      });
    }
    return ticket;
  }

  private fetchAdditionalFields(): void {
    if (this.courseid === null) throw new Error('Kurssi ID puuttuu URL:sta.');
    this.courses.getTicketFieldInfo(this.courseid)
    .then((response) => {
      this.ticketFields = response as Kentta[];
      this.buildAdditionalFields();
    });
  }

  private fetchTicketInfo(ticketId: string, courseID: string): void {
    this.ticketService.getTicket(ticketId, courseID)
    .then(response => {
      this.form.controls['title'].setValue(response.otsikko);
      this.form.controls['message'].setValue(response.viesti);
      this.oldAttachments = response.liitteet ?? [];
      this.commentID = response.kommenttiID;
      this.titleServ.setTitle(this.store.getBaseTitle() + response.otsikko);
      this.ticketFields = response.kentat as Kentta[];
      this.buildAdditionalFields();
    });
  }

  public goBack(): void {
    if (this.errorForListing) {
      const route = 'course/' + this.courseid + '/list-tickets';
      const data = { error: this.errorForListing };
      this.router.navigate([route], { state: data });
    } else {
      this.router.navigateByUrl('course/' + this.courseid + '/list-tickets');
    }
  }

  private prepareSendFiles(response: any): void {
    if (!this.courseid) return
    if (response?.uusi == null) {
      this.errorMessage = 'Liitetiedostojen lähettäminen epäonnistui.';
      throw new Error('Ei tarvittavia tietoja tiedostojen lähettämiseen.');
    }
    let ticketID, commentID;
    ticketID = response.uusi.tiketti;
    commentID = response.uusi.kommentti;
    this.sendFiles(ticketID, commentID);
  }

  public submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.state = 'sending';
    this.form.disable();
    let newTicket = this.createTicket();
    if (this.courseid === null) throw new Error('Kurssi ID puuttuu URL:sta.');
    if (this.editExisting) {
      this.submitEdited(newTicket);
    } else {
      this.submitNew(newTicket);
    }
  }

  private submitEdited(newTicket: UusiTiketti): void {
    if (!this.ticketId || !this.commentID) throw new Error;
    this.ticketService.editTicket(this.ticketId, newTicket, this.courseid)
      .then((res: { success: boolean }) => {
        console.log('saatiin vastaus editointiin: ' + JSON.stringify(res));
        if (res?.success === false) {
          console.log('editointi ei onnistunut, heitetään virhe.');
          throw Error
        }
        if (this.attachments.filesToRemove.length === 0) {
          return true
        }
        return this.attachments.removeSentFiles();
      }).then((res: boolean) => {
        if (res === false) {
          this.errorForListing = $localize `:@@Kaikkien liitetiedostojen poistaminen ei onnistunut:Kaikkien valittujen liitetiedostojen poistaminen ei onnistunut` + '.';
        }
        // this.printFileInfoListLog();
        if (this.fileInfoList !== undefined) {
          if (this.fileInfoList.length === 0 ) return
          console.log('lähetetään tiedostoja.');
          this.successMessage = $localize `:@@Muokatun kysymyksen lähettäminen onnistui:Muokatun kysymyksen lähettäminen onnistui` + '.';
          return this.sendFiles(this.ticketId!, this.commentID!);
        } else {
          console.log('Ei lähetettäviä tiedostoja.');
          return
        }
      }).then(() => {
        this.goBack();
      }).catch(error => {
        console.log('ketjun error: ' + JSON.stringify(error));
        this.errorMessage = $localize `:@@Muokatun kysymyksen lähettäminen epäonnistui:
            Muokatun kysymyksen lähettäminen epäonnistui` + '.'
        this.state = 'editing';
        this.form.enable();
      });
  }

  private printFileInfoListLog() {
    if (this.fileInfoList) {
      console.log(' this.fileInfoList on true');
    } else {
      console.log('this.fileInfoList on false');
    }
    console.log('fileinfolist sisältö alla:');
    console.log(JSON.stringify(this.fileInfoList));
    console.log(typeof this.fileInfoList);
  }

  private submitNew(ticket: UusiTiketti): void {
    if (this.courseid === null) return;
    this.ticketService.addTicket(this.courseid, ticket)
    .then((response: AddTicketResponse) => {
      if (this.attachments.fileInfoList.length === 0) this.goBack();
      if (response === null || response?.success !== true) {
        this.state = 'editing';
        this.form.enable();
        this.errorMessage = $localize`:@@Kysymyksen lähettäminen epäonnistui:
            Kysymyksen lähettäminen epäonnistui` + '.';
        throw new Error('Kysymyksen lähettäminen epäonnistui.');
      } else if (response?.success === true) {
        this.successMessage = $localize `:@@Uuden kysymyksen lähettäminen onnistui:
            Uuden kysymyksen lähettäminen onnistui` + '.';
      }
      this.prepareSendFiles(response);
    })
    .catch( error => {
      // ? lisää eri virhekoodeja?
      this.state = 'editing';
      this.form.enable();
      this.errorMessage = $localize`:@@Kysymyksen lähettäminen epäonnistui:
          Kysymyksen lähettäminen epäonnistui` + '.';
    });
  }

  private sendFiles(ticketID: string, commentID: string):
      Promise<any> {
    return this.attachments.sendFiles(ticketID, commentID)
    .then(() => {
      if (this.errorMessage) {
        this.state = 'editing';
        return
      } else {
        this.state = 'done';
        this.goBack();
      }
    })
    .catch((res: any) => {
      this.errorMessage = $localize`:@@Kaikkien liitteiden lähettäminen ei
          onnistunut:Kaikkien liitteiden lähettäminen ei onnistunut`;
      console.log(this.router.url + ': saatiin virhe: ' + res);
      this.state = 'editing';
      this.form.enable();
    })
    .finally(() => {
      console.log('Komponentti: Kaikki valmiita!');
      // Kommentoi alla olevat, jos haluat, että jää näkyviin.
      // this.attachments.clear();
    });
  }

}
