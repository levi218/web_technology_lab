import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.less']
})
export class StockListComponent implements OnInit {

  stockList : Stock[];
  stockEdit : Stock;
  stockAdd : Stock;
  showFormAdd : boolean;
  constructor(private stockService : StockService) { }

  ngOnInit() {
    this.getStocks();
    //this.stockAdd = new Stock();
    this.generateRandomDefault();
  }
  generateRandomDefault():void{
    this.stockAdd={
      "symbol": Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4).toUpperCase(),
      "name": "stock "+Math.floor(Math.random()*10000),
      "distribution_law": Math.random()> 0.5? "uniform" : "normal",
      "max_change": Math.round(Math.random()*100)/100+1.5,
      "share_available": Math.floor(Math.random()*10000),
      "share_price": Math.floor(Math.random()*10000)
    }as Stock
  }
  getStocks() : void {
    this.stockService.getStocks().subscribe(stocks => this.stockList = stocks);
  }

  add(): void {
    this.stockService.addStock(this.stockAdd)
      .subscribe(stocks => {
        this.stockList = stocks;
        this.showFormAdd = false;
        this.generateRandomDefault();
      });
  }

  delete(stock: Stock): void {
    if(window.confirm("Delete?")){
      this.stockList = this.stockList.filter(h => h !== stock);
      this.stockService.deleteStock(stock).subscribe();
    }
  }

  editMode(stock:Stock) : void {
    if(this.stockEdit!=null){
      if(window.confirm("Discard change?")){
        this.stockEdit = JSON.parse(JSON.stringify(stock));
      }
    }else
    this.stockEdit = JSON.parse(JSON.stringify(stock));
  }

  isEditting(stock : Stock):boolean{
    return this.stockEdit!=null && stock.symbol == this.stockEdit.symbol;
  }
  editApply():void {
    this.stockService.updateStock(this.stockEdit).subscribe(stocks=> {
      this.stockList = stocks;
      this.stockEdit = null
    });
  }
  editCancel():void{
    this.stockEdit = null;
  }


}
