import { Component, ViewChild } from "@angular/core";
import { DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexTooltip,
    ApexGrid,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexFill
} from "ng-apexcharts";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { ActivatedRoute } from "@angular/router";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    series2: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    colors: any;
    xaxis: ApexXAxis;
    fill: ApexFill;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-analytics-status',
    templateUrl: './analytics-status.component.html',
    styleUrls: ['./analytics-status.component.scss']
})
export class AnalyticsStatusComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    constructor(
        private datePipe: DatePipe,
        public themeService: CustomizerSettingsService,
        private http: HttpClient,
        private route: ActivatedRoute

    ) {

        this.route.params.subscribe((paramss: any) => {
            console.log('build');




            this.API_4({country_id:paramss.id})


        });
      
    }

    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');
    orders= 0
    visited = 0
      
    API_4(date: any) {


        this.http.get(`${environment.URL}/API_4`,{params:date}).subscribe({
            next: (data: any) => {
                console.log(data);
                this.orders  = data.data.orders[0].total_orders
                console.log("🚀 ~ file: analytics-status.component.ts:77 ~ AnalyticsStatusComponent ~ this.http.get ~ this.orders:", this.orders)
                this.visited  = data.data.analytic[0].total_visits
                console.log("🚀 ~ file: analytics-status.component.ts:79 ~ AnalyticsStatusComponent ~ this.http.get ~ this.visited:", this.visited)

                // this.chartOptions = {
                //     series: [
                //         {
                //             name: "Visited",
                //             data: [2400, 1398, 5405, 3910, 4398, 3321, 2000]
                //         }
                //     ],
                //     series2: [
                //         {
                //             name: "Net Income",
                //             data: [24, 13, 30, 35, 40, 22, 15]
                //         }
                //     ],
                //     chart: {
                //         height: 90,
                //         width: 180,
                //         type: "bar",
                //         toolbar: {
                //             show: false
                //         }
                //     },
                //     plotOptions: {
                //         bar: {
                //             columnWidth: "15%",
                //             distributed: true,
                //         },
                //     },
                //     dataLabels: {
                //         enabled: false
                //     },
                //     colors: [
                //         "#FFBA69", "#757FEF"
                //     ],
                //     xaxis: {
                //         categories: [
                //             "Sat",
                //             "Sun",
                //             "Mon",
                //             "Tue",
                //             "Wed",
                //             "Thu",
                //             "Fri"
                //         ],
                //         axisBorder: {
                //             show: false
                //         },
                //         axisTicks: {
                //             show: false
                //         },
                //         labels: {
                //             show: false
                //         }
                //     },
                //     yaxis: {
                //         labels: {
                //             show: false
                //         }
                //     },
                //     grid: {
                //         borderColor: "#f2f2f2",
                //         strokeDashArray: 2,
                //         show: true
                //     },
                //     legend: {
                //         show: false
                //     },
                //     tooltip: {
                //         y: {
                //             formatter: function(val) {
                //                 return "$" + val + "K";
                //             }
                //         }
                //     }
                // };
            }, error: (error) => {
                console.log(error);
            }
        })
    }

}