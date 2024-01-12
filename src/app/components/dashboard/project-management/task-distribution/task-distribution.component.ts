import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexLegend,
    ApexGrid,
    ApexPlotOptions,
    ApexStroke,
    ApexFill
} from "ng-apexcharts";
export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    legend: ApexLegend;
    grid: ApexGrid;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    labels: any;
    colors: any;
    stroke: ApexStroke;
    fill: ApexFill;
};
import { environment } from "../../../../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import { GeneralService } from "src/app/services/general.service";


@Component({
    selector: 'app-task-distribution',
    templateUrl: './task-distribution.component.html',
    styleUrls: ['./task-distribution.component.scss']
})
export class TaskDistributionComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    chart_lables: any = []
    chart_values: any = []

    filter_object = [
        {name:"This Week" ,value:1},
        {name:"This Month" ,value:2},
        {name:"This Year" ,value:3},
        {name:"All Time" ,value:4},

    ]
    filter:any = {
        name:"This Week",
        value:1
    }
    onFilter(item:any){
        this.filter = item
        let params:any  = {}
        params.country_id = this.generalService.selected_country
        params.type = item.value
        this.API_5(params)
    }

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private generalService: GeneralService

    ) {

        this.route.params.subscribe((paramss: any) => {
            console.log('build');


            let params:any  = {}

            params.country_id = this.generalService.selected_country
            params.type = this.filter.value




            this.API_5(params)


        });

    }
    API_5(date: any) {


        this.http.get(`${environment.URL}/API_5`,{params:date}).subscribe({
            next: (data: any) => {

                this.chart_lables = data.data.orders.map((order: any) => order.timeSlot)
                this.chart_values = data.data.orders.map((order: any) => order.count);
                this.chartOptions = {
                    series: this.chart_values,
                    chart: {
                        height: 607,
                        type: "polarArea"
                    },
                    stroke: {
                        width: 0,
                        colors: ["#ffffff"]
                    },
                    plotOptions: {
                        polarArea: {
                            rings: {
                                strokeWidth: 1,
                                strokeColor: '#EDEFF5',
                            },
                            spokes: {
                                strokeWidth: 1,
                                connectorColors: '#EDEFF5',
                            }
                        }
                    },
                    colors: [

                    ],
                    fill: {
                        opacity: 0.8
                    },
                    grid: {
                        show: false,
                        // strokeDashArray: 5,
                        // borderColor: "#EDEFF5"
                    },
                    legend: {
                        offsetY: 0,
                        fontSize: "14px",
                        position: "bottom",
                        horizontalAlign: "left",
                        labels: {
                            colors: '#5B5B98',
                        }
                    },
                    labels: this.chart_lables
                };


            }, error: (error) => {
                console.log(error);
            }
        })
    }
}