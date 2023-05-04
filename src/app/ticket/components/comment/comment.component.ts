import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { Kommentti, TicketService } from '../../ticket.service';
import { AuthService, User } from 'src/app/core/auth.service';
import { EditAttachmentsComponent } from '../edit-attachments/edit-attachments.component';
import { isToday } from 'src/app/shared/utils';

interface FileInfo {
  filename: string;
  file: File;
  error?: string;
  errorToolTip?: string;
  progress?: number;
  uploadError?: string;
  done?: boolean;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent {

  @Input() public attachmentsMessages: string = '';
  @Input() public comment: Kommentti = {} as Kommentti;
  @Input() public editingCommentID: string | null = null;
  @Input() public fileInfoList: FileInfo[] = [];
  @Input() public ticketID: string = '';
  @Input() public user: User = {} as User;
  @Output() public editingCommentIDChange = new EventEmitter();
  @Output() public messages = new EventEmitter();
  @ViewChild(EditAttachmentsComponent) attachments!: EditAttachmentsComponent;
  public attachFilesText: string = '';
  public editingComment: string | null = null;
  public form: FormGroup = this.buildForm();
  public errorMessage: string = '';
  public isRemovePressed: boolean = false;
  public state: 'editing' | 'sending' | 'done' = 'editing';  // Sivun tila
  public strings: Map<string, string>;
  public uploadClick = new Subject<string>();

  get message(): FormControl {
    return this.form.get('message') as FormControl;
  }

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private ticketService: TicketService
  ) {
      this.user = this.auth.getUserInfo();

      this.strings = new Map ([
        ['attach', $localize `:@@Liitä:Liitä` ],
        ['attachFiles', $localize `:@@Liitä tiedostoja:Liitä tiedostoja`],
        ['confirmRemoveTooltip', $localize `:@@Vahvista kommentin poistaminen:
          Vahvista kommentin poistaminen`],
        ['proposedSolution', $localize `:@@Ratkaisuehdotus:Ratkaisuehdotus`],
        ['removeComment', $localize `:@@Poista kommentti:Poista kommentti`],
        ['moreInfoNeeded', $localize `:@@Lisätietoa tarvitaan:Lisätietoa tarvitaan`]
      ]);
      this.attachFilesText = this.strings.get('attachFiles')!;
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      message: [ '', Validators.required ],
      checkboxes: [ this.comment.tila ],
      attachments: ['']
    });
  }

  public cancelCommentEditing() {
    this.stopEditing();
  }

  public changeRemoveBtn() {
    setTimeout(() => this.isRemovePressed = true, 300);
  }

  public editComment(commentID: string) {
    this.editingCommentID = commentID;
    this.editingCommentIDChange.emit(this.editingCommentID);
    this.form.controls['message'].setValue(this.comment.viesti);
    this.form.controls['checkboxes'].setValue(this.comment.tila);
  }

  public getSenderTitle(name: string, role: string): string {
    if (name == this.user.nimi) return $localize`:@@Minä:Minä`
    switch (role) {
      case 'opiskelija':
        return $localize`:@@Opiskelija:Opiskelija`; break;
      case 'opettaja':
        return $localize`:@@Opettaja:Opettaja`; break;
      case 'admin':
        return $localize`:@@Admin:Admin`; break;
      default:
        return '';
    }
  }

  public isToday(timestamp: string | Date) {
    return isToday(timestamp);
  }


  public removeComment(commentID: string) {
    this.ticketService.removeComment(this.ticketID, commentID).then(res => {
      this.stopEditing();
    }).catch((err: any) => {
      this.errorMessage = $localize `:@@Kommentin poistaminen ei onnistunut:
          Kommentin poistaminen ei onnistunut`+ '.';
      this.state="editing";
    })
  }

  public sendComment(commentID: string) {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.state = 'sending';
    this.form.disable();
    const commentText = this.form.controls['message'].value;
    const commentState = this.form.controls['checkboxes'].value;
    this.ticketService.editComment(this.ticketID, commentID, commentText,
        commentState)
      .then(response => {
        if (this.fileInfoList.length === 0) {
          this.stopEditing();
          return
        }
        this.sendFiles(this.ticketID, commentID);
        return
      }).catch(err => {
        console.log('Kommentin muokkaaminen epäonnistui.');
        this.errorMessage = $localize `:@@Kommentin muokkaaminen epäonnistui:
            Kommentin muokkaaminen epäonnistui` + '.';
        this.state="editing";
        this.form.enable();
        this.messages.emit('continue')
      })
  }

  private sendFiles(ticketID: string, commentID: string) {
    this.messages.emit('sendingFiles')
    this.attachments.sendFilesPromise(ticketID, commentID)
      .then((res:any) => {
        console.log('kaikki tiedostot valmiita.');
        this.messages.emit('continue')
        this.stopEditing();
      })
      .catch((res:any) => {
        console.log('ticket view: napattiin virhe: ' + res);
        this.errorMessage = $localize `:@@Kaikkien liitteiden lähettäminen ei onnistunut:
            Kaikkien liitteiden lähettäminen ei onnistunut`;
        this.state="editing";
        this.form.enable();
        this.messages.emit('continue')
      })
  }

  // Lopeta kommentin
  public stopEditing() {
    this.state = 'done';
    this.fileInfoList = [];
    this.attachments.clear();
    this.editingCommentID = null;
    this.editingCommentIDChange.emit(this.editingCommentID);
    this.isRemovePressed = false;
    this.messages.emit('done');
  }

}
