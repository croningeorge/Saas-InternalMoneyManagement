import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/distinctUntilChanged";

import swal from "sweetalert2";

@Injectable()
export class SweetAlertService {
    private apiCallingSubject = new BehaviorSubject<boolean>(false);
    public isApiCalling = this.apiCallingSubject.asObservable().distinctUntilChanged();

    showDeleteConfirm(title= "Confirm Delete", text= "Are you sure?", confirmText= "Yes, Delete", cancelText= "No, Cancel"): any {
        swal({
          title: title,
          html: text,
          showCancelButton: true,
          confirmButtonText: confirmText,
          cancelButtonText: cancelText,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            this.setApiCalling(true);
            return new Promise((resolve) => {
              let temp = setInterval(function(){
                if(!this.isApiCalling){
                  resolve();
                  clearInterval(temp);
                }
              }, 100);
            })
          },
          allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {
        });
    }
    showSuccess(title= "Success", text= ""): any {
        swal({
          type: "success",
          title: title,
          text: text
        })
    }
    setApiCalling(value) {
        this.apiCallingSubject.next(value);
    }
    getApiCallingStatus(): any {
        return this.isApiCalling;
    }
}
