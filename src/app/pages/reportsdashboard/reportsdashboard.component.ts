import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {LineChartService, ChartConfigData, HandleChartConfigDataFunc} from './lineChart/lineChart.service';

import {
  RestService,
  SystemGeneralService,
  WebSocketService
} from '../../services/';


interface TabChartsMappingData {
  keyName: string;
  chartConfigData: ChartConfigData[];
}

@Component({
  selector: 'reportsdashboard',
  styleUrls: ['./reportsdashboard.scss'],
  templateUrl: './reportsdashboard.html',
  providers: [SystemGeneralService]
})
export class ReportsDashboard implements OnInit, HandleChartConfigDataFunc {

  public info: any = {};
  public ipAddress: any = [];
  public allowChartsDisplay: boolean = true;
  public drawTabs: boolean = false;
  public tabChartsMappingData: TabChartsMappingData[] = [];

  constructor(private _lineChartService: LineChartService) {
  }

  ngOnInit() {
    this._lineChartService.getChartConfigData(this);
  }

  /**
   * The service returns back all sources as a flat list.  What I do in here is
   * Go through the flat list.. And collect the ones I want for each Tab I want to show.
   */
  handleChartConfigDataFunc(chartConfigData: ChartConfigData[]) {
    let map: Map<string, TabChartsMappingData> = new Map<string, TabChartsMappingData>();

    // For every one of these map entries.. You see one tab in the UI With the charts collected for that tab
    map.set("CPU", {
      keyName: "CPU",
      chartConfigData: []
    });
    
    map.set("Disk", {
      keyName: "Disk",
      chartConfigData: []
    });
    
     map.set("Memory", {
      keyName: "Memory",
      chartConfigData: []
    });
    
    map.set("Network", {
      keyName: "Network",
      chartConfigData: []
    });
    
    
    map.set("Partition", {
      keyName: "Partition",
      chartConfigData: []
    });
    
     map.set("System", {
      keyName: "System",
      chartConfigData: []
    });
    
     map.set("Target", {
      keyName: "Target",
      chartConfigData: []
    });
    
     map.set("ZFS", {
      keyName: "ZFS",
      chartConfigData: []
    });

    // Go through all the items.. Sticking each source in the appropraite bucket
    // The non known buckets.. Just get one tab/one chart. (for now).. Will eventually 
    // move towards.. just knowing the ones Im wanting.
    chartConfigData.forEach((chartConfigDataItem: ChartConfigData) => {
      if (chartConfigDataItem.title === "CPU" || chartConfigDataItem.title === "Load") {
        let tab: TabChartsMappingData = map.get("CPU");
        tab.chartConfigData.push(chartConfigDataItem);
        
      } else if (chartConfigDataItem.title.toLowerCase() === "memory" || chartConfigDataItem.title.toLowerCase() === "swap") {
        let tab: TabChartsMappingData = map.get("Memory");
        tab.chartConfigData.push(chartConfigDataItem);
        
      } else if (chartConfigDataItem.title.toLowerCase() === "processes" || chartConfigDataItem.title.toLowerCase() === "uptime") {
        let tab: TabChartsMappingData = map.get("System");
        tab.chartConfigData.push(chartConfigDataItem);
        
      } else if (chartConfigDataItem.title.startsWith("df-")) {
        let tab: TabChartsMappingData = map.get("Partition");
        tab.chartConfigData.push(chartConfigDataItem);
        
      } else if (chartConfigDataItem.title.startsWith("disk")) {
        let tab: TabChartsMappingData = map.get("Disk");
        tab.chartConfigData.push(chartConfigDataItem);
        
      } else if (chartConfigDataItem.title.startsWith("interface-")) {
        let tab: TabChartsMappingData = map.get("Network");
        tab.chartConfigData.push(chartConfigDataItem);
        
      } else if (chartConfigDataItem.title.startsWith("ctl-tpc")) {
        let tab: TabChartsMappingData = map.get("Target");
        tab.chartConfigData.push(chartConfigDataItem);
        
      } else {
        
        //map.set(chartConfigDataItem.title, {
        //  keyName: chartConfigDataItem.title,
        //  chartConfigData: [chartConfigDataItem]
        //});

      }
    }); 
    
    this.tabChartsMappingData.splice(0, this.tabChartsMappingData.length);
    map.forEach((value: TabChartsMappingData )=>{ 
         this.tabChartsMappingData.push( value );
    });  
    
    this.drawTabs = true;
  }

  tabSelectChangeHandler($event) {
    let selectedTabName: string = $event.tab.textLabel;
    let tabChartsMappingData: TabChartsMappingData = this.getTabChartsMappingDataByName(selectedTabName);
    
   
    this.allowChartsDisplay = false;
    setTimeout(() => {this.allowChartsDisplay = true;}, -1);

  }
  
  private getTabChartsMappingDataByName(name:string ): TabChartsMappingData {
     let foundTabChartsMappingData: TabChartsMappingData = null;
     
     for( let item of this.tabChartsMappingData) {
        if(name === item.keyName ) {
          foundTabChartsMappingData = item;
          break;
        }
     }
     return foundTabChartsMappingData;
  }
}