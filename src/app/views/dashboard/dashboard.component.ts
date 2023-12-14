import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../model/user';
import { UserFilter, filterOption } from '../../model/userfilter';
import { MatSelectChange } from '@angular/material/select';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { UserdetailsComponent } from 'src/app/views/userdetails/userdetails.component';
import { MatDialog } from "@angular/material/dialog";
import { Router, NavigationExtras } from "@angular/router";
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  // displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email','gender','jobtitle','department'];
  displayedColumns: string[] = ['Id', 'Firstname', 'Lastname', 'Email', 'Status'];


  status: string[] = ['All', 'Paid', 'Unpaid'];

  defaultValue = "All";

  filterDictionary = new Map<string, string>();
  filter: string = 'all'; // 'all', 'paid', 'unpaid'


  UserData: User[] = [];
  dataSource = new MatTableDataSource(this.UserData);
  dataSourceFilters = new MatTableDataSource(this.UserData);
  @ViewChild(MatPaginator) private paginator!: MatPaginator;


  totalPages: any
  page: any = 1;
  tableSize: any = 10000;
  tableSizes: any = [10, 20];
  userFilters = [
    { name: 'All', value: 'all' },
    { name: 'Paid', value: 'paid' },
    { name: 'Unpaid', value: 'unpaid' },
  ];

  selectedFilter: string = 'all';
  filteredData: any[] = [];

  constructor(private dialog: MatDialog, private router: Router, private api: ApiService) {
  }

  ngOnInit(): void {
    this.userData(this.page, this.tableSize);
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  userDetails(userDetails: any) {

    this.router.navigate(['/userdetails'], { state: userDetails });

  }

  userData(pageNo: any, pageSize: any) {
    const formData: FormData = new FormData();
    formData.append('pageNo', pageNo);
    formData.append('pageSize', pageSize);
  
    this.api.getAllUsers(formData).subscribe((res: any) => {
      console.log(res);
      
      this.UserData = res.Users;
      this.dataSource.data = this.UserData;
      this.tableSize = res.TotalCounts[0].TotalPages;
      this.applyFilter();
    });
  }
  
  applyFilter() {
    const filterValue = this.selectedFilter;
    
    // Update the filter predicate of the MatTableDataSource
    this.dataSource.filterPredicate = (user: any, filter: string) => {
      if (filter === 'all') {
        return true; // Show all users
      } else {
        const filterValueBoolean = filter === 'paid';
        return user.IsPaid === filterValueBoolean;
      }
    };
  
    // Trigger the filter with the current filter value
    this.dataSource.filter = filterValue;
  }
  

  onPageChange(event: any): void {
    this.page = event.pageIndex; // Adjusting the page index to start from 0
    if (this.page < this.totalPages) {
      this.userData(this.page + 1, this.tableSize); // Increment the page by 1 for API request
    } else {
      console.log('Invalid page number');
    }
  }

  onPageSizeChange(event: any): void {
    this.tableSize = event.pageSize;
    console.log(this.tableSize);
    this.userData(this.page, this.tableSize);
  }

  pageNavigate(event: PageEvent) {
    this.userData(event.pageIndex, event.pageSize);
  }

}
