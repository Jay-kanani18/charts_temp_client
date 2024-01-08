import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexStroke,
    ApexGrid,
    ApexXAxis,
    ApexFill,
    ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    grid: ApexGrid;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    colors: any;
};
import { environment } from "../../../../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import { GeneralService } from "src/app/services/general.service";


@Component({
    selector: 'app-audience-overview',
    templateUrl: './audience-overview.component.html',
    styleUrls: ['./audience-overview.component.scss']
})

export class AudienceOverviewComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    top_sales:any = {
        items:[],
        modifiers:[],
        load:false

    }
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
        this.API_3(params)
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






            this.API_3(params)


        });

        // this.chartOptions = {
        //     series: [
        //         {
        //             name: "Item",
        //             data: [22, 16, 25, 13, 18, 12, 20, 24, 17],
        //         },
        //         {
        //             name: "Modifier",
        //             data: [15, 14, 13, 12, 11, 10, 9, 8, 7],
        //         },
        //         // {
        //         //     name: "Refunds",
        //         //     data: [8, 7, 6, 8, 9, 7, 7, 8, 6],
        //         // }
        //     ],
        //     chart: {
        //         type: "bar",
        //         height: 350,
        //     },
        //     plotOptions: {
        //         bar: {
        //             borderRadius: 3,
        //             horizontal: false,
        //             columnWidth: "33%",
        //             borderRadiusApplication: 'end',
        //         }
        //     },
        //     dataLabels: {
        //         enabled: false
        //     },
        //     colors: ["#757fef", "#2db6f5", "#ee368c"],
        //     stroke: {
        //         width: 5,
        //         show: true,
        //         colors: ["transparent"]
        //     },
        //     xaxis: {
        //         categories: [
        //             "Jan",
        //             "Feb",
        //             "Mar",
        //             "Apr",
        //             "May",
        //             "Jun",
        //             "Jul",
        //             "Aug",
        //             "Sep"
        //         ],
        //         labels: {
        //             style: {
        //                 colors: "#a9a9c8",
        //                 fontSize: "14px"
        //             },
        //         },
        //         axisBorder: {
        //             show: false
        //         },
        //         axisTicks: {
        //             show: false
        //         }
        //     },
        //     yaxis: {
        //         labels: {
        //             style: {
        //                 colors: "#a9a9c8",
        //                 fontSize: "14px",
        //             },
        //         },
        //         axisBorder: {
        //             show: false,
        //         },
        //     },
        //     fill: {
        //         opacity: 1,
        //     },
        //     tooltip: {
        //         // y: {
        //         //     formatter: function(val) {
        //         //         return "$" + val + " thousands";
        //         //     }
        //         // }
        //     },
        //     legend: {
        //         offsetY: 0,
        //         position: "top",
        //         fontSize: "14px",
        //         horizontalAlign: "left",
        //     },
        //     grid: {
        //         show: true,
        //         strokeDashArray: 5,
        //         borderColor: "#EDEFF5"
        //     }
        // };
    }
 

    API_3(date: any) {

        this.top_sales.load = false
        
        this.http.get(`${environment.URL}/API_3`,{ params: date }).subscribe({
            next: (data: any) => {
                
                this.top_sales.items = data.data.items.map((order:any) => order.y)
                this.top_sales.modifiers = data.data.modifiers.map((order:any) => order.y);
                
                this.top_sales.load = true
                
                this.chartOptions ={
                    series: [
                        {
                            name: "Item",
                            data: this.top_sales.items,
                        },
                        {
                            name: "Modifier",
                            data: this.top_sales.modifiers,
                        },
                        // {
                        //     name: "Refunds",
                        //     data: [8, 7, 6, 8, 9, 7, 7, 8, 6],
                        // }
                    ],
                    chart: {
                        type: "bar",
                        height: 350,
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 3,
                            horizontal: false,
                            columnWidth: "33%",
                            borderRadiusApplication: 'end',
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: ["#757fef", "#2db6f5", "#ee368c"],
                    stroke: {
                        width: 5,
                        show: true,
                        colors: ["transparent"]
                    },
                    xaxis: {
                        categories: [
                            "#1","#2","#3","#4","#5","#6","#7","#8","#9","#10"
                        ],
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px"
                            },
                        },
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
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
                        },
                    },
                    fill: {
                        opacity: 1,
                    },
                    tooltip: {
                        shared: true,
                        intersect: false,
                        y: {
                            formatter: function (value, { series, seriesIndex, dataPointIndex }) {
                                // Check if it's an item or modifier based on seriesIndex
                                const isItem = seriesIndex === 0;
                                const itemName = isItem
                                    ? data.data.items[dataPointIndex].x
                                    : data.data.modifiers[dataPointIndex].x;
                
                                return `${itemName}( ${value})`;
                            },
                        },
                    },
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "left",
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