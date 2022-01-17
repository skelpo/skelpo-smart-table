import { Component, OnInit } from '@angular/core';
import { DefaultFilter } from './default-filter';
import { HttpClient } from "@angular/common/http";
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';

export interface Config {
    dropdownList: Array<any>,
    selectedItems: Array<any>,
    dropdownSettings: DropdownSettings
}

@Component({
    selector: 'mselect-filter',
    template: `<angular2-multiselect [data]="dropdownList" 
    [(ngModel)]="selectedItems" 
    [settings]="dropdownSettings" 
    (onSelect)="onItemSelect($event)"
    (onDeSelect)="OnItemDeSelect($event)" 
    (onSelectAll)="onSelectAll($event)" 
    (onDeSelectAll)="onDeSelectAll($event)">
    </angular2-multiselect>`
})
export class MselectFilterComponent extends DefaultFilter implements OnInit {

    readonly selector = "*;*";
    dropdownList: Array<any> = [];
    selectedItems: Array<any> = [];
    dropdownSettings: DropdownSettings = {};

    constructor(private http: HttpClient) {
        super()

    }

    ngOnInit() {
        this.column.filterFunction = this.onfilterValues.bind(this);
        const config: Config = this.column.getFilterConfig();
        this.dropdownList = config.dropdownList || [];
        this.selectedItems = config.selectedItems || [];
        let setting: DropdownSettings = {
            singleSelection: false,
            text: "Select",
            selectAllText: "Select All",
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "myclass",
            maxHeight: 200,
            position: 'top',
            autoPosition: true,

        };
        this.dropdownSettings = Object.assign(setting, config.dropdownSettings);
    }

    onfilterValues(cellValue: string, search: string, data: any, cellName: string) {
        if (search.indexOf(this.selector) != -1) {
            let searchArray = search.split(this.selector);
            if (searchArray.indexOf(cellValue) != -1) {
                return true;
            }
            return false;
        }
        return cellValue.toString().toLowerCase().includes(search.toString().toLowerCase());
    }

    onItemSelect(item: any) {
        this.updateQuery();
    }
    OnItemDeSelect(item: any) {
        this.updateQuery();
    }
    onSelectAll(items: any) {
        this.updateQuery();
    }
    onDeSelectAll(items: any) {
        this.updateQuery();
    }
    updateQuery() {
        this.query = this.selectedItems.map(item => item.id).join(this.selector);//.replace(/ /g, '')
        this.setFilter()
    }
}