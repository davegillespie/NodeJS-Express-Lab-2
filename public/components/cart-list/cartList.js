"use strict";
function CartListController(CartService) {
    let ctrl = this;

    ctrl.removeItem = (item) => {
      console.log('here');
      console.log(item.data, item);

      CartService.removeItem(item)
      .then( () => {
      
        CartService.getTable()
        .then( (data) => {
          ctrl.cartList = data;
        });
  
      })
    }
    
    // ctrl.cartList = CartService.cartList;
    // ctrl.removeItem = CartService.removeItem;
    ctrl.getTable = CartService.getTable;

    CartService.getTable()
    .then( (data) => {
      ctrl.cartList = data;
    });

}
  
  angular.module('shopApp')
  .component('cartList', {
    template: `
    <section id="cart-list">
      <h3 class="cart-list-header">Cart List</h3>
      <p>Good choices, Yum!</p>
  
    <table>
      <thead>
          <tr>          
              <th>ID</th>
              <th>Product</th>
              <th>Price</th> 
              <th>Quantity</th>
              <th>Close</th>
          </tr>
      </thead>
      <tbody>
          <tr ng-repeat="item in $ctrl.cartList">
              <td> {{item.id}} </td>
              <td> {{item.product}} </td>
              <td> {{item.price}} </td>
              <td> {{item.quantity}} </td>
              <td> <a type="button" ng-click="$ctrl.removeItem(item)"> x </a> </td>
          </tr>
        </tbody>
    </table>


    </section>

   
    `, // or use templateUrl
    controller: CartListController,
    bindings: {
      addItem: '&',
     // removeItem: '&'
    }
  });