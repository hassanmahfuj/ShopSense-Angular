import { Component } from '@angular/core';
import { CollectionPoint } from 'src/app/interfaces/collection-point';
import { CollectionPointService } from 'src/app/services/collection-point.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-collection-points',
  templateUrl: './collection-points.component.html',
  styleUrls: ['./collection-points.component.css']
})
export class CollectionPointsComponent {
  collectionPoints: CollectionPoint[] = [];
  selected: CollectionPoint = {
    id: 0,
    name: '',
    address: '',
    district: ''
  }
  mode = '';

  constructor(
    private collectionPointService: CollectionPointService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll() {
    this.collectionPointService.readAll().subscribe((res) => {
      this.collectionPoints = res;
    });
  }

  onSelect(a: any, mode: any) {
    if (a == null) {
      this.selected = {
        id: 0,
        name: '',
        address: '',
        district: ''
      }
    } else {
      this.selected = a;
    }
    this.mode = mode;
  }

  saveOrUpdate() {
    if (this.mode == 'create') {
      this.collectionPointService.create(this.selected).subscribe((res) => {
        if (res != null) {
          this.util.toastify(true, "Category created");
          this.readAll();
        } else {
          this.util.toastify(false);
        }
      });

    } else {
      this.collectionPointService.update(this.selected).subscribe((res) => {
        this.util.toastify(true, "Category updated");
        this.readAll();
      });
    }
  }

  onDelete() {
    this.collectionPointService.delete(this.selected.id).subscribe(res => {
      this.util.toastify(res.success, res.message);
      this.readAll();
    });
  }
}
