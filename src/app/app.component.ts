import { Component } from '@angular/core';
import type { ColDef, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';

   // Column Definitions
   columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", sortable: true, filter: true, checkboxSelection: true },
    { field: "ruleName", headerName: "Rule Name", sortable: true, filter: true },
    { field: "active", headerName: "Active Status", sortable: true, filter: true },
    { field: "type", headerName: "Type", sortable: true, filter: true },
    { field: "subType", headerName: "Sub Type", sortable: true, filter: true },
    { field: "domain", headerName: "Domain", sortable: true, filter: true },
    { field: "impacted", headerName: "Impact Count", sortable: true, filter: true },
    { field: "favourite", headerName: "Favorite", sortable: true, filter: true },
    { field: "scheduled", headerName: "Scheduled", sortable: true, filter: true },
    { field: "lastScheduledDate", headerName: "Last Scheduled Date", sortable: true, filter: true },
    { field: "alert", headerName: "Alert Enabled", sortable: true, filter: true },
  ]

  // Default Column Definition
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  rowData = [
    {
      id: 997,
      ruleName: 'Trendy',
      active: 'Y',
      type: 'Match',
      subType: '2DS - Trace Changes',
      domain: '',
      impacted: 0,
      favourite: 'N',
      scheduled: 'Y',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'Y',
    },
    {
      id: 996,
      ruleName: 'Trace Changes',
      active: 'Y',
      type: 'Match',
      subType: '2DS - Trace Changes',
      domain: '',
      impacted: 0,
      favourite: 'N',
      scheduled: 'N',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'N',
    },
    {
      id: 986,
      ruleName: 'File Monitor',
      active: 'Y',
      type: 'Match',
      subType: '1DS - File Monitor',
      domain: '',
      impacted: 57994,
      favourite: 'N',
      scheduled: 'Y',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'Y',
    },
    {
      id: 985,
      ruleName: 'test1',
      active: 'Y',
      type: 'Match',
      subType: '1DS - File Monitor',
      domain: '',
      impacted: 13773,
      favourite: 'N',
      scheduled: 'N',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'N',
    },
  ]

  // Selected rows
  selectedRows: any[] = []

  // Form data for editing
  formData: any = {}

  // Grid API
  private gridApi: any

  // Grid ready event
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();
    console.log('Selected rows:', this.selectedRows);

    if (this.selectedRows.length === 1) {
      // Populate form with selected row data
      this.formData = { ...this.selectedRows[0] }
    }
  }

  toggleColumn(field: string) {
    const columnState = this.gridApi.getColumnState();
    const column = columnState.find((col: any) => col.colId === field);

    if (column) {
      this.gridApi.setColumnVisible(field, !column.hide);
    }
  }

  saveData() {
    console.log('Saving data:', this.formData);

    if (this.formData.id) {
      // Find and update the row in rowData
      const index = this.rowData.findIndex((row) => row.id === this.formData.id)
      if (index >= 0) {
        this.rowData[index] = { ...this.formData }
        // Refresh the grid
        this.gridApi.setRowData(this.rowData)
        // console.log("Updated data:", this.formData)
      }
    }
  }
}
