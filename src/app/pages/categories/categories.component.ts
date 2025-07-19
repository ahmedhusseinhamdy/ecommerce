import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../core/interfaces/categories/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService= inject(CategoriesService)
  categoryImage !: string
  categoryName !: string
  open:boolean=false
  categories!:Icategory[]

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.data
      },
      error: (err) => {
        console.error('Error:', err);
      }
    })
  }
    
  getspacificCategory(category_id:string){
    this._CategoriesService.getSpacificCategory(category_id).subscribe({
      next:(res)=>{
        console.log(res);
        this.categoryImage= res.data.image
        this.categoryName = res.data.name
        console.log(this.categoryName);
        this.showWindow()
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  showWindow()
  {
    this.open=true
  }

  closeWindo(e:Event){
   
    if(e.target == e.currentTarget){

      this.open=false
    }
    
  }
}
