import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // let searchQuery = this.route.snapshot.params['query'];
    let searchQuery1 = this.route.snapshot.queryParams['p'];
    console.log(searchQuery1);

  }


}
