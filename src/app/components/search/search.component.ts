import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  searchProductsByName(query:string) {

    this.route.navigateByUrl(`/search/${query}`);
  }
}
