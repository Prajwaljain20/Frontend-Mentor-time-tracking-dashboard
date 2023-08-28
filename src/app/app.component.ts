import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DataService } from './dataService/data.service';
import { IDataModel, TimeFrameEnum } from './model/IDataModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  dataArray: Array<IDataModel[]> = [];
  private indexMap: Map<string, TimeFrameEnum> = new Map();
  indexes: string[] = [];
  currentIndex: string = '';
  record: TimeFrameEnum = TimeFrameEnum.WEEKLY;
  lastRecord: string = 'Last Week - ';
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().pipe(tap(res => {
      res.forEach(card => {
        card.style = card.title.split(' ')[0].toLowerCase();
      });
      let n = Math.ceil(res.length/2);
      let i = 0; 
      while(n < res.length) {
        this.dataArray.push([res[i++], res[n++]]);
      }
    })).subscribe(() => this.getIndexes());
  }

  private getIndexes = (): void => {
    this.indexMap.set('daily', TimeFrameEnum.DAILY);
    this.indexMap.set('weekly', TimeFrameEnum.WEEKLY);
    this.indexMap.set('monthly', TimeFrameEnum.MONTHLY);
    this.indexes = Array.from(this.indexMap.keys()).map(index => index.charAt(0).toUpperCase() + index.slice(1));
    this.currentIndex = this.indexes[1];
  }

  selectedIndex = (index: string) : void => {
    this.currentIndex = index;
    this.record = this.indexMap.get(index.toLowerCase()) as TimeFrameEnum;
    switch (this.record) {
      case TimeFrameEnum.DAILY : this.lastRecord = 'Yesterday - '; break;
      case TimeFrameEnum.WEEKLY : this.lastRecord = 'Last Week - '; break;
      case TimeFrameEnum.MONTHLY : this.lastRecord = 'Last Month - ';
    }
  }
}
