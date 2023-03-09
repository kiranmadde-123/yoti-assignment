import { LightningElement, track, wire } from 'lwc';
import geteSignRequestList from '@salesforce/apex/YotiDemoClass.geteSignRequestList';

export default class YotiAssignment extends LightningElement {
    @track lstErequest = [];
    @track records = [];

    pageSize = 10;
    totalRecords = 0;
    totalPages;
    pageNumber = 1;

    @wire(geteSignRequestList)
    wiredeSignRequest({ data, error }) {

        if (data !== undefined) {
            var data1 = [];
            data.forEach(element => {
                var signStatus;
                if (element.Signing_Status__c === 'Signed') {
                    signStatus = true;
                } else {
                    signStatus = false;
                }
                var ele = {
                    signStatus: signStatus,
                    ...element
                };

                data1.push(ele);
            });
            //this.lstErequest = data1;

            this.records = data1;
            this.totalRecords = data1.length; // update total records count                 
            this.paginationHelper();


        }
        else if (error) {
            console.log('==========>error', error)
        }
    }

    get bDisableFirst() {
        return this.pageNumber == 1;
    }
    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }

    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }
    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }

    paginationHelper() {
        this.lstErequest = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.lstErequest.push(this.records[i]);
        }
    }
}