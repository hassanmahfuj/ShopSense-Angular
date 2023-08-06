import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Wishlist } from 'src/app/interfaces/wishlist';
import { WishlistDetail } from 'src/app/interfaces/wishlist-detail';
import { UtilService } from 'src/app/services/util.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  wishlists: WishlistDetail[] = [];

  constructor(
    private wishlistService: WishlistService,
    private router: Router,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.getWishlists();
  }

  getWishlists() {
    this.wishlistService.getWishlists().subscribe((res) => {
      this.wishlists = res;
    });
  }

  showDetails(id: any) {
    this.router.navigate(['product', id]);
  }

  removeFromWishlist(w: WishlistDetail) {
    let ww: Wishlist = {
      customerId: w.customerId,
      productId: w.productId
    }
    this.wishlistService.removeFromWishlist(ww).subscribe(res => {
      this.util.toastify(res, "Removed from wishlist");
      this.getWishlists();
    });
  }

}
