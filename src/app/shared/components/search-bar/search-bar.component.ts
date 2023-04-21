import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent {

  @ViewChild('input') searchInput!: ElementRef<HTMLInputElement>;

  public focus() {
    this.searchInput.nativeElement.focus();
  }

}
