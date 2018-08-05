import { Component } from '@angular/core';
import { Child } from '../../app/entity/Child';
import { StoreItemService } from '../../app/service/StoreItemService';
import { StoreItem } from '../../app/entity/StoreItem';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage{

  public child: Child;
  constructor(public storeItemService: StoreItemService) {
  }

  loadChild() {
    this.storeItemService.getStoreItem('1').subscribe((storeItem: StoreItem) => {
      console.log('GetStoreItem SUCCESS');
      console.log(storeItem.title);

    }, () => {
      console.log('GetStoreItem - FAIL');
    });

  }
}
