"use strict";
function CartService($http, $q) {
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
                // service.cartList = data;
                // console.log(data);
            return genericSuccess(success);
            }); 
    }

    service.removeItem = (item) => {
        return $q ( (resolve, reject) => {
            $http({
                url: '/cart-items/' + item.id,
                method: 'DELETE',
                data: item
            })
            .then( (item) => {
                    console.log(item);
                resolve(getSuccess(item));
                }); 
            });
    
    }

    service.getTable = () => {
        return $q ( (resolve, reject) => {

        function getSuccess (res) { 
            return res.data;
          }

        $http.get('/cart-items')
            .then( (response) => {
                console.log(response);
            resolve(getSuccess(response));
            }); 
        });

    }

    service.updateItem = (item) => {
        return $http({
          url: "/cart-items/" + item.id,
          method: "PUT",
          data: item
        }).then((response) => {
          return response.data;
        });
      }



    
};
    

angular.module('shopApp')
.service('CartService', CartService); // Passing $http service as dependency for our service