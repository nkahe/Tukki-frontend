import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TicketService, Ticket } from '../ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth.service';


@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.scss']
})
export class TicketViewComponent implements OnInit  {
  errorMessage: string = '';
  ticket: Ticket;
  tila: string;
  public newCommentState: 3 | 4 | 5 = 4;
  // tila: typeof Tila | typeof State;
  commentText: string;
  isLoaded: boolean;
  ticketID: string;

  // messageSubscription: Subscription;
  message: string = '';
  public userRole: 'opettaja' | 'opiskelija' | 'admin' | '' = '';

  constructor(
    private auth: AuthService,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {
      this.ticket = {} as Ticket;
      this.tila = '';
      this.commentText = '';
      this.isLoaded = false;
      this.ticketID = String(this.route.snapshot.paramMap.get('id'));
      // this.messageSubscription = this.ticketService.onMessages().subscribe(
      //   (message) => { this._snackBar.open(message, 'OK') });
  }

  ngOnInit(): void {
    this.trackUserRole();
    this.ticketService.getTicketInfo(this.ticketID)
      .then(response => {
        this.ticket = response;
        this.isLoaded = true;
        this.tila = this.ticketService.getTicketState(this.ticket.tila);
      });
  }

  public goBack(): void {
    this.router.navigateByUrl('/list-tickets?courseID=' + this.ticket.kurssi);
  }

  private trackUserRole() {
    this.auth.onGetUserRole().subscribe(response => {
      console.log('saatiin rooli: ' + response);
      this.userRole = response;
    })
  }


  public sendComment(): void {
    this.ticketService.addComment(this.ticketID, this.commentText, this.newCommentState)
      .then((response) => { 
        if (response?.success == true) {
          this.errorMessage = '';
          this.ticketService.getTicketInfo(this.ticketID).then(response => { this.ticket = response });
          // this._snackBar.open($localize `:@@Kommentin lisääminen:Kommentin lisääminen tikettiin onnistui.`, 'OK');
        } else {
          this.errorMessage = $localize `:@@Kommentin lisääminen epäonistui:Kommentin lisääminen tikettiin epäonnistui.`;
          console.log(response);
        }
      })
      .then(() => { this.commentText = '' })
      .catch(error => {
        //console.log('napattiin virhe');
        //console.dir(error);
        this.errorMessage = $localize `:@@Kommentin lisääminen epäonistui:Kommentin lisääminen tikettiin epäonnistui.`;
        console.log(JSON.stringify(error));
      });
  }


}
