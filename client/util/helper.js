//helpers
var app = angular.module('shoppingApp');

//a service holding shared data among controllers
app.factory('dataProvider', function () {
   var PRODUCTS = ProductData;
   var CATEGORIES = Category;

   return {
      getProducts: getProducts,
      getCategories: getCategories
   };

   function getProducts() {
      return PRODUCTS;
   }

   function getCategories() {
      return CATEGORIES;
   }
});