import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryService } from 'src/app/services/category.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  selected: Category = {
    id: 0,
    title: '',
    description: '',
    icon: '',
    parentId: 0
  }
  mode = '';

  constructor(
    private categoryService: CategoryService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getCategories().subscribe((c) => {
      this.categories = c;
      console.log(this.categories);
    });
  }

  onSelect(a: any, mode: any) {
    if (a == null) {
      this.selected = {
        id: 0,
        title: '',
        description: '',
        icon: '',
        parentId: 0
      }
    } else {
      this.selected = a;
    }
    this.mode = mode;

    console.log(mode);
    console.log(this.selected);


  }

  saveOrUpdate() {
    if (this.mode == 'create') {
      this.categoryService.create(this.selected).subscribe((c) => {
        if (c != null) {
          this.util.toastify(true, "Category created");
          this.getAllCategory();
        } else {
          this.util.toastify(false);
        }
      });

    } else {
      this.categoryService.update(this.selected).subscribe((success) => {
        this.util.toastify(success, "Category updated");
        this.getAllCategory();
      });
    }
  }

  onDelete() {
    this.util.toastify(false, "", "Deleteing category is not support for now");
  }
}
