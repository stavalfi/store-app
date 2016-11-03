import {Component, OnDestroy, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit,OnDestroy{

  private categories$:Observable<Category[]>;
  @Output() onCategoryChanged = new EventEmitter();
  constructor(private categoriesService:CategoryService) {
  }
  private categoryChanged(categoryKey:string):void
  {
    this.onCategoryChanged.emit(categoryKey);
  }
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.categories$=this.categoriesService.categories$();
  }
}
