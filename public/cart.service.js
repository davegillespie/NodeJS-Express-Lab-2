"use strict";
function CartService($http) {
    const service = this;

        /**
     * Call https://www.reddit.com/r/aww/.json
     * and set ctrl.feed to be the results
     */

    service.cartList = [];
 
    service.addItem = (item) => {
        console.log(item);
        service.cartList.push(item);  // This part works
        

        function genericSuccess (res) { 
            // return res.data.data;
            return res.item;
          }
          
            $http.post('/cart-items', item)
            .then( (success) => {
                service.items = {};
                service.cartList = data;
                console.log(data);
            return genericSuccess(success);
            }); 
    }

    service.removeItem = (item) => {
        let i = service.items.indexOf(item);
            // service.items.splice(removedItem, 1);
            service.cartList.splice(i, 1);
            console.log("working");
    }

    service.getTable = (result) => {
        console.log(result);
        service.cartList.get(result);

        function getSuccess (res) { 
            return result.rows
          }

        $http.get('/cart-items', result)
            .then( (success) => {
                // service.items = {};
                // service.cartList = data;
                res.send(result.rows);
                console.log(result);
            return getSuccess(success);
            }); 

    }
    
};
    

angular.module('shopApp')
.service('CartService', CartService); // Passing $http service as dependency for our service