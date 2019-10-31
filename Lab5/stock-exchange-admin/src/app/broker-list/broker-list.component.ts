import { Component, OnInit } from '@angular/core';
import { BrokerService } from '../broker.service';
import {Broker} from '../broker';

@Component({ 
  selector: 'app-broker-list',
  templateUrl: './broker-list.component.html',
  styleUrls: ['./broker-list.component.less']
})
export class BrokerListComponent implements OnInit {

  brokerList : Broker[];
  brokerAdd : Broker;
  brokerEdit : Broker;
  showFormAdd : boolean;
  constructor(private brokerService : BrokerService) { }

  ngOnInit() {
    // this.brokerAdd = new Broker;
    this.brokerAdd = {
      "name": "broker "+Math.floor(Math.random()*10000),
      "cash_reserve": Math.floor(Math.random()*10000)
    }as Broker;
    this.showFormAdd = false;
    this.getBrokers();
  }
  generateRandomDefault():void{
    this.brokerAdd = {
      "name": "broker "+Math.floor(Math.random()*10000),
      "cash_reserve": Math.floor(Math.random()*10000)
    }as Broker;
  }
  getBrokers() : void {
    this.brokerService.getBrokers().subscribe(brokers => this.brokerList = brokers);
  }

  add(): void {
    this.brokerService.addBroker(this.brokerAdd)
      .subscribe(brokers => {
        this.brokerList = brokers;
        this.showFormAdd = false;
        this.generateRandomDefault();
      });
  }

  delete(broker: Broker): void {
    if(window.confirm("Delete?")){
      this.brokerList = this.brokerList.filter(h => h !== broker);
      this.brokerService.deleteBroker(broker).subscribe();
    }
  }

  isEditting(broker:Broker): boolean {
    return this.brokerEdit!=null && broker.name==this.brokerEdit.name;
  }

  editMode(broker : Broker): void{
    if(this.brokerEdit!=null){
      if(window.confirm("Discard change?")){
        this.brokerEdit = JSON.parse(JSON.stringify(broker));
      }
    }else
    this.brokerEdit = JSON.parse(JSON.stringify(broker));
  }

  editApply(): void{
    this.brokerService.updateBroker(this.brokerEdit).subscribe(brokers => {
      this.brokerList = brokers
      this.brokerEdit = null;
    })
  }

  editCancel(): void{
    this.brokerEdit = null;
  }

}
