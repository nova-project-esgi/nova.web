import {Component, Input, OnInit} from '@angular/core';
import {CursorPagination} from '../../pagination/cursor.pagination';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-paged-list',
  templateUrl: './paged-list.component.html',
  styles: []
})
export class PagedListComponent implements OnInit {

  @Input()
  cursor: CursorPagination<any>;

  @Input()
  disabled = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  changePage(page: PageEvent): void {
    this.cursor?.toPage(page.pageIndex - 1).subscribe();
  }
}
