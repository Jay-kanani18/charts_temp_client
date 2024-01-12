import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexGrid,
    ApexPlotOptions,
    ApexResponsive,
    ApexXAxis,
    ApexYAxis,
    ApexLegend,
    ApexFill
} from "ng-apexcharts";
import { environment } from "../../../../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import { GeneralService } from "src/app/services/general.service";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    grid: ApexGrid;
    chart: ApexChart;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    legend: ApexLegend;
    fill: ApexFill;
    colors: any;
};

@Component({
    selector: 'app-sales-analytics',
    templateUrl: './sales-analytics.component.html',
    styleUrls: ['./sales-analytics.component.scss']
})
export class SalesAnalyticsComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;


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
        this.API_6(params)
    }

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private generalService: GeneralService,

    ) {

        this.route.params.subscribe((paramss: any) => {

            let params:any  = {}


            params.country_id = this.generalService.selected_country
            params.type = this.filter.value

            this.API_6(params)


        });

    }

    promo_orders: any = []
    normal_orders: any = []
    Date: any = []

    API_6(date: any) {


        this.http.get(`${environment.URL}/API_6`,{params:date}).subscribe({
            next: (data: any) => {

                let array1: any = []
                let array2: any[] = []
                let array3: string[] = []
                data.data.orders.forEach((each: any) => {
                    array1.push(each.Promo)
                    array2.push(each.Normal)
                    array3.push(`${each._id.date.month} - ${each._id.date.year}`)

                });

                this.promo_orders = array1.slice(0, 9)
                this.normal_orders = array2.slice(0, 9)
                this.Date = array3.slice(0, 9)
                this.chartOptions = {
                    series: [
                        // {
                        //     name: "Cost",
                        //     data: [30, 20, 40, 25, 18, 43, 15]
                        // },
                        {
                            name: "Normal",
                            data: this.normal_orders
                        },
                        {
                            name: "promo",
                            data: this.promo_orders
                        }
                    ],
                    chart: {
                        type: "bar",
                        height: 350,
                        stacked: true,
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false
                        }
                    },
                    xaxis: {
                        type: "category",
                        axisBorder: {
                            show: false,
                        },
                        categories: this.Date,
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            }
                        }
                    },
                    colors: [
                        "#165BAA", "#FF8C00", "#F765A3"
                    ],
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "left",
                        labels: {
                            colors: '#5B5B98'
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            },
                        },
                        axisBorder: {
                            show: false,
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    }
                };
            }, error: (error) => {
                console.log(error);
            }
        })
    }

}