import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../model/employee';
import { EmpFilter, filterOption } from '../../model/empfilter';
import { MatSelectChange } from '@angular/material/select';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { UserdetailsComponent } from 'src/app/views/userdetails/userdetails.component';
import { MatDialog } from "@angular/material/dialog";
import { Router, NavigationExtras  } from "@angular/router";


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email','gender','jobtitle','department'];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'status'];

  // EmpData : Employee[] =[{"id":1,"firstname":"Mellie","lastname":"Gabbott","email":"mgabbott0@indiatimes.com","gender":"Female","department":"Support","jobtitle":"Support Analyst"},
  // {"id":2,"firstname":"Yehudi","lastname":"Ainsby","email":"yainsby1@w3.org","gender":"Female","department":"Support","jobtitle":"Support Analyst"},
  // {"id":3,"firstname":"Noellyn","lastname":"Primett","email":"nprimett2@ning.com","gender":"Female","department":"Human Resources","jobtitle":"Project Manager"},
  // {"id":4,"firstname":"Stefanie","lastname":"Yurenin","email":"syurenin3@boston.com","gender":"Female","department":"Marketing","jobtitle":"Senior officer"},
  // {"id":5,"firstname":"Stormi","lastname":"O'Lunny","email":"solunny4@patch.com","gender":"Female","department":"Engineering","jobtitle":"Software Engineer"},
  // {"id":6,"firstname":"Keelia","lastname":"Giraudy","email":"kgiraudy5@nba.com","gender":"Male","department":"Marketing","jobtitle":"Senior officer"},
  // {"id":7,"firstname":"Ikey","lastname":"Laight","email":"ilaight6@wiley.com","gender":"Male","department":"Support","jobtitle":"Support Analyst"},
  // {"id":8,"firstname":"Adrianna","lastname":"Ruddom","email":"aruddom7@seattletimes.com","gender":"Male","department":"Marketing","jobtitle":"Senior officer"},
  // {"id":9,"firstname":"Dionysus","lastname":"McCory","email":"dmccory8@ox.ac.uk","gender":"Male","department":"Engineering","jobtitle":"Software Engineer"},
  // {"id":10,"firstname":"Claybourne","lastname":"Shellard","email":"cshellard9@rediff.com","gender":"Male","department":"Engineering","jobtitle":"Software Engineer"}];

  EmpData: Employee[] = [{ "id": 1, "firstname": "Mellie", "lastname": "Gabbott", "email": "mgabbott0@indiatimes.com", "status": "Paid" },
  { "id": 2, "firstname": "Yehudi", "lastname": "Ainsby", "email": "yainsby1@w3.org", "status": "Paid" },
  { "id": 3, "firstname": "Noellyn", "lastname": "Primett", "email": "nprimett2@ning.com", "status": "Unpaid" },
  { "id": 4, "firstname": "Stefanie", "lastname": "Yurenin", "email": "syurenin3@boston.com", "status": "Paid" },
  { "id": 5, "firstname": "Stormi", "lastname": "O'Lunny", "email": "solunny4@patch.com", "status": "Unpaid" },
  { "id": 6, "firstname": "Keelia", "lastname": "Giraudy", "email": "kgiraudy5@nba.com", "status": "Unpaid" },
  { "id": 7, "firstname": "Ikey", "lastname": "Laight", "email": "ilaight6@wiley.com", "status": "Unpaid" },
  { "id": 8, "firstname": "Adrianna", "lastname": "Ruddom", "email": "aruddom7@seattletimes.com", "status": "Paid" },
  { "id": 9, "firstname": "Dionysus", "lastname": "McCory", "email": "dmccory8@ox.ac.uk", "status": "Paid" },
  { "id": 10, "firstname": "Claybourne", "lastname": "Shellard", "email": "cshellard9@rediff.com", "status": "Unpaid" }];

  // genders: string[]=['All','Male','Female'];
  status: string[] = ['All', 'Paid', 'Unpaid'];
  // jobtitles: string[]=['All','Support Analyst','Project Manager','Senior officer','Software Engineer'];
  // departments: string[]=['All','Support','Human Resources','Marketing','Engineering'];
  empFilters: EmpFilter[] = [];

  defaultValue = "All";

  filterDictionary = new Map<string, string>();



  dataSource = new MatTableDataSource(this.EmpData);
  dataSourceFilters = new MatTableDataSource(this.EmpData);

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {

    // this.empFilters.push({name:'gender',options:this.genders,defaultValue:this.defaultValue});
    // this.empFilters.push({name:'jobtitle',options:this.jobtitles,defaultValue:this.defaultValue});
    // this.empFilters.push({name:'department',options:this.departments,defaultValue:this.defaultValue});
    this.empFilters.push({ name: 'status', options: this.status, defaultValue: this.defaultValue });
    // this.empFilters.push({name:'jobtitle',options:this.jobtitles,defaultValue:this.defaultValue});
    // this.empFilters.push({name:'department',options:this.departments,defaultValue:this.defaultValue});

    this.dataSourceFilters.filterPredicate = function (record, filter) {
      debugger;
      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for (let [key, value] of map) {
        isMatch = (value == "All") || (record[key as keyof Employee] == value);
        if (!isMatch) return false;
      }
      return isMatch;
    }
  }

  applyEmpFilter(ob: MatSelectChange, empfilter: EmpFilter) {

    this.filterDictionary.set(empfilter.name, ob.value);


    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));

    this.dataSourceFilters.filter = jsonString;
    //console.log(this.filterValues);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Reset table filters
  //  resetFilters(input:any) {
  //   this.filterValues = {};
  //   this.filterSelectObj.forEach((value:any, key:any) => {
  //     console.log(value.modelValue);
  //     value.modelValue = '';
  //   });
  //   this.dataSource.filter = '';
  //   input.value = '';
  // }

  userDetails(userDetails: any) {
    // const dialogRef = this.dialog.open(UserdetailsComponent, {
    //   data: { userDetails }
    // });

    // dialogRef.afterClosed().subscribe((result: any) => {

    //   if (result && result.product) {
    //     // this.sql.insertIntoProductsTable(result.product).then((res) => {
    //     //   this.sql.insertIntosetProductsColorQuantity(result.product).then((res) => {

    //     //   });
    //     //   this.getData();
    //     // })
    //   }
    // });
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     data: userDetails
    //   }
    // };
  
    this.router.navigate(['/userdetails'], {state : userDetails});

  }


  onTableDataChange(event: any) {
    this.page = event;
    // this.getData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.getData();
  }


}
