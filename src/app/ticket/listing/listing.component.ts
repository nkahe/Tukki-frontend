import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild }
    from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, Subject, Subscription, takeUntil, timer } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { AuthService } from '@core/auth.service';
import { Constants, getIsInIframe } from '@shared/utils';
import { environment } from 'src/environments/environment';
import { RefreshDialogComponent } from '@core/refresh-dialog/refresh-dialog.component';
import { StoreService } from '@core/store.service';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { User } from '@core/core.models';
import { UKK } from '../ticket.models';
import { TicketService } from '../ticket.service';

interface ColumnDefinition {
  def: string;
  showMobile: boolean;
}

interface ErrorNotification {
  title: string,
  message: string,
  buttonText?: string
}

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})

export class ListingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(TicketListComponent) ticketList!: TicketListComponent;
  public columnDefinitions: ColumnDefinition[];
  public courseID: string = '';
  public dataSource = new MatTableDataSource<UKK>();
  public error: ErrorNotification | null = null;
  public isInIframe: boolean;
  public isLoaded: boolean = false;
  public screenSize: 'handset' | 'small' | 'other' = 'other';
  public isParticipant$: Observable<boolean | null>
  public isPhonePortrait: boolean = false;
  public maxItemTitleLength = 100;  // Älä aseta tätä vakioksi.
  public numberOfFAQ: number = 0;
  public noDataConsent: boolean | null;
  public isLoggedIn$: Observable<boolean | null>;
  public user$: Observable<User | null>;

  private fetchFAQsSub$: Subscription | null = null;
  // private isParticipant$: Subscription | null = null;
  private isPolling: boolean = false;
  private isTicketsLoaded: boolean = false;
  private loggedIn$ = new Subscription;
  private scrollPosition: number = 0;
  public strings: Map<string, string>;
  private readonly POLLING_RATE_MIN = (environment.production == true ) ? 5 : 15;
  private unsubscribe$ = new Subject<void>();
  private url: string = '';

  @ViewChild('sortFaq', { static: false }) sort = new MatSort();
  // @ViewChild('paginatorQuestions') paginator: MatPaginator | null = null;
  // @ViewChild('paginatorFaq') paginatorFaq: MatPaginator | null = null;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private responsive: BreakpointObserver,
    private route : ActivatedRoute,
    private store : StoreService,
    private ticket:TicketService,
    private title : Title
  ) {
    this.noDataConsent = this.authService.getDenyDataConsent();
    this.title.setTitle(Constants.baseTitle + $localize `:@@Otsikko-Kysymykset:
        Kysymykset`);
    this.isLoggedIn$ = this.store.trackLoggedIn();
    this.isInIframe = getIsInIframe();
    this.isParticipant$ = this.store.trackIfParticipant();
    this.user$ = this.store.trackUserInfo();
    this.columnDefinitions = [
      { def: 'otsikko', showMobile: true },
      { def: 'aikaleima', showMobile: true }
    ];
    this.strings = new Map([
      ['Ei osallistujana-msg', $localize`:@@Ei osallistujana-viesti: Et voi lisätä tai nähdä kurssilla esitettyjä henkilökohtaisia kysymyksiä.`],
      ['Et ole kirjautunut-title', $localize`:@@Et ole kirjautunut:Et ole kirjautunut`],
      ['Et osallistujana-title', $localize`:@@Ei osallistujana-otsikko:Et osallistu tälle kurssille.`],
      ['Kirjaudu', $localize`:@@Kirjaudu:Kirjaudu`],
      ['Luo tili', $localize`:@@Luo tili:Luo tili`]
    ]);
  }

  ngOnInit() {
    this.url = window.location.pathname;
    this.trackCourseID();
    // this.trackLoggedStatus();
    this.trackScreenSize();
  }

  ngAfterViewInit(): void {
    this.trackMessages();
  }

  ngOnDestroy(): void {
    console.warn('listaus: ngOnDestroy ajettu.');
    window.removeEventListener('scroll', this.onScroll);
    this.loggedIn$.unsubscribe();
    // this.isParticipant$?.unsubscribe();
    this.stopPolling();
  }

  //hakutoiminto, jossa paginointi kommentoitu pois
  public applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
      /*if (this.dataSourceFAQ.paginator) {
        this.dataSourceFAQ.paginator.firstPage();
      }*/
  }

  public GoToLogin(): void {
    if (!this.courseID) return
    this.authService.navigateToLogin(this.courseID)
  }

  public errorClickEvent(button: string) {
    if (this.noDataConsent === true && this.isInIframe === true) {
      this.showConsentPopup();
    } else if (this.noDataConsent !== true && this.isInIframe === false) {
      this.authService.navigateToLogin(this.courseID);
    }
}

  // refresh = Jos on saatu refresh-pyyntö muualta.
  private fetchFAQ(courseID: string, refresh?: boolean) {
    this.ticket.getFAQlist(courseID).then(response => {
      if (this.isLoaded === false) this.isLoaded = true;
        if (response.length > 0) {
          this.numberOfFAQ = response.length;
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.sort = this.sort;
          // this.dataSourceFAQ.paginator = this.paginatorFaq;
        }
        return
      })
      .catch(error => {
        this.error = {
          title: $localize`:@@Virhe:Virhe`,
          message: $localize `:@@UKK-lista ei saatu haettua:
            Ei saatu haettua tälle kurssille lisättyjä usein kysyttyjä kysymyksiä` + '.',
          buttonText: ''
        }
        this.isLoaded = true;
      })
      .finally(() => {
        if (this.isPolling === false) {
          this.isPolling = true;
          if (this.isTicketsLoaded === true || this.numberOfFAQ > 0) {
            this.restorePosition();
          }
        }
        // if (refresh !== true) this.stopLoading();
      });
  }

  public getDisplayedColumnFAQ(): string[] {
    return this.columnDefinitions
      .filter(cd => !this.isPhonePortrait || cd.showMobile)
      .map(cd => cd.def);
  }

  public showConsentPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '30rem';
    this.dialog.open(RefreshDialogComponent, dialogConfig);
  }

  public newTicketMessage(event: any) {
    if (event === 'loaded') {
      this.isTicketsLoaded = true;
      if (this.isPolling === true) {
        // this.isLoaded = true;
        this.restorePosition();
      }
    }
  }

  private onScroll = () => {
    this.scrollPosition = window.scrollY;
    this.store.setPosition(this.url, this.scrollPosition);
  }

  private restorePosition(): void {
    this.scrollPosition = this.store.getPosition(this.url);
    if (this.scrollPosition && this.scrollPosition !== 0) {
      console.log('siirrytään aiempaan scroll-positioon');
      setTimeout(() => window.scrollTo(0, this.scrollPosition), 100);
    }
    window.addEventListener('scroll', this.onScroll);
  }

  public stopPolling(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (this.fetchFAQsSub$) this.fetchFAQsSub$.unsubscribe();
  }

  // Kun esim. headerin logoa klikataan ja saadaan refresh-pyyntö.
  private trackMessages(): void {
    this.store.trackMessages()
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(response => {
      if (response === 'go begin') {
        console.log('listing.trackMessages: saatiin refresh pyyntö.');
        this.isLoaded = false;
        setTimeout(() => this.isLoaded = true, 800);
        this.fetchFAQ(this.courseID, true);
      }
    });
  }

  // Aseta tarvittavat asettelun muutokset riippuen näkymän leveydestä.
  private trackScreenSize(): void {
    this.responsive.observe([Breakpoints.HandsetPortrait, Breakpoints.Small])
    .subscribe((state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.HandsetPortrait]) {
        this.maxItemTitleLength = 85;
        this.isPhonePortrait = true;
        this.screenSize = "handset";
      } else if (state.breakpoints[Breakpoints.Small]) {
        this.isPhonePortrait = false;
        this.maxItemTitleLength = 90;
        this.screenSize = "small";
      } else {
        this.isPhonePortrait = false;
        this.maxItemTitleLength = 100;
        this.screenSize = "other";
      }
    });
  }

  // Tallentaa URL:n kirjautumisen jälkeen tapahtuvaa uudelleenohjausta varten.
  public saveRedirectUrl(linkEnding?: string): void {
    this.stopPolling();
    const link = '/course/' + this.courseID + '/submit' + (linkEnding ?? '');
    if (this.store.getIsLoggedIn() === false) {
      console.log('tallennettu URL: ' + link);
      window.localStorage.setItem('REDIRECT_URL', link);
    }
  }

  // Seurataan kurssi ID:ä URL:sta.
  private trackCourseID(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const courseID = paramMap.get('courseid');
      if (courseID != null) this.courseID = courseID;
      // Älä ota pois. Tällä sivulla toistaiseksi tarvitsee.
      this.startPollingFAQ();
    })
  }


  private startPollingFAQ(): void {
    this.fetchFAQsSub$?.unsubscribe();
    console.warn('Aloitetaan UKK pollaus.');
    const pollRate = this.POLLING_RATE_MIN * Constants.MILLISECONDS_IN_MIN;
    this.fetchFAQsSub$ = timer(0, pollRate)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(() => this.fetchFAQ(this.courseID));
  }

}
