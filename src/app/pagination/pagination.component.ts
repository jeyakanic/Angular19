import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {
  @Input() totalItems:any;
  @Input() currentPage:any;
  @Input() itemsPerPage:any;
  @Output() onClick:EventEmitter<number>=new EventEmitter();
  totalpages=0;
  pages:number[]=[];

  
  ngOnInit():void
  {       
   debugger
      if (this.totalItems) {

        debugger
        alert(this.totalItems)
        console.log(this.itemsPerPage);
        this.totalpages = Math.ceil(this.totalItems / this.itemsPerPage)
      /*  this.pages = Array.from({ length: this.totalpages }, (_, i) => i + 1)    */
        this.pages = Array(this.totalItems).fill(0).map((x,i)=>i+1)
      
      }
  }

  pageClick(page: number) {   
     debugger
    if (page <= this.totalpages) {    
    
      this.onClick.emit(page);
      this.currentPage=page;  
               
    }
  }
}