import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { FooterComponent } from 'src/app/components/common/footer/footer.component';
import { UserLayoutComponent } from './user-layout.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from 'src/app/components/common/sidebar/sidebar.component';
// import { SidebarComponent } from 'src/app/components/common/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/components/common/header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxEditorModule } from 'ngx-editor';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { QuillModule } from 'ngx-quill';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AdminComponent } from 'src/app/components/dashboard/admin/admin.component';
import { NumberFormatPipe } from 'src/app/services/pipes/number-format.pipe';
import { ChartsComponent } from 'src/app/components/charts/charts.component';
import { CustomizerSettingsComponent } from 'src/app/components/customizer-settings/customizer-settings.component';



@NgModule({
  declarations: [
    FooterComponent,
    UserLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    AdminComponent,
    NumberFormatPipe,
    ChartsComponent,
    CustomizerSettingsComponent


    
  ],
  imports: [
    CommonModule,
    RouterModule,
    // SidebarComponent
    // UserLayoutRoutingModule,
    // RouterModule.forRoot(UserLayoutRoutingModule),
    UserLayoutRoutingModule,
    
    
    MatMenuModule,
    NgScrollbarModule,
    MatExpansionModule,
    NgxSkeletonLoaderModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    NgApexchartsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgScrollbarModule,
    FormsModule,
    FullCalendarModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CarouselModule,
    NgxEditorModule,
    DragDropModule,
    HttpClientModule,
    CdkAccordionModule,
    NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
    }),
    NgxGaugeModule,
    NgChartsModule,
    NgxMatTimepickerModule,
    QuillModule.forRoot(),
    ColorPickerModule,
    NgxDropzoneModule,

    
  ]
})
export class UserLayoutModule { }
