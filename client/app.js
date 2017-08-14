//TODO - use product id when database is involved, find universal database of countries
//main JS file to manage top level controller, routing and various high level models
var app = angular.module('shoppingApp', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
       templateUrl: 'app/home/home.html',
       controller: 'homeCtrl'//MUST use quotes
    })
    .when('/product', {
       templateUrl: 'app/product/product.html',
       // controller: 'productCtrl'
    })
    .when('/cart', {
       templateUrl: 'app/cart/cart.html'
    })
    .when('/checkout', {
       templateUrl: 'app/checkout/checkout.html'
    })
    .when('/order', {
       templateUrl: 'app/checkout/order-confirm.html'
    })
    .when('/tracking', {
       templateUrl: 'app/order/tracking.html'
    })
    .when('/login', {
          templateUrl: 'app/profile/login.html'
       })
    .when('/reset-pwd', {
          templateUrl: 'app/profile/reset-pwd.html'
       })
    .when('/profile', {
          templateUrl: 'app/profile/profile.html'
       })
    .when('/admin', {
       templateUrl: 'app/admin/users.html'
    })
    .otherwise({
    redirectTo: '/home'
 })
}]);

app.controller('shoppingCtrl', function ($location, $scope, $interval, $timeout, $window) {
   var vm = this;

   //-----initialize
   //--check if logged in already
   vm.users = [];
   vm.userLoggedIn = false;
   vm.email = ''; vm.password = '';//login page ng-model
   localforage.getItem(KEY_LOGIN_ID, function (err, user_email) {//logged in already?
      if (err) console.log("***Oops [localForage error] ==> ", err);
      else {
         if (user_email) {//already in local storage, should be email
            vm.userLoggedIn = true;
            //look up from local storage user information
            var users = localforage.getItem(KEY_USERS, function (err, users) {
               if (err) {
                  console.log("**Oops ==> ", err); return; }
               console.log("localforage Ok ==>  found ", users.length, " registered users.");

               //look for this user in returned values
               var found = false;
               for (var idx = 0; idx < users.length; idx++) {
                  var em = users[idx].email;
                  if (em === user_email) {//found matching user, populate profile
                     vm.profileLoginName = users[idx].loginName;
                     vm.profilePassword = users[idx].password;
                     vm.profilePasswordConfirm = users[idx].password;
                     vm.profileEmail = em;
                     vm.profileCountry = users[idx].country;
                     vm.profileState = users[idx].state;
                     vm.profileCity = users[idx].city;
                     vm.profileGender = users[idx].gender;
                     vm.profileAgree = true;
                     vm.userLoggedIn = true;
                     found = true;
                     break;
                  }
               }
               if (!found) {
                  //TODO clear logged in user in local storage, clear data structures in vm.profilexxxxx
                  vm.userLoggedIn = false;
               }
            });
         }
         else {//no one logs in, put defaults in some fields
            vm.profileCountry = "US";
            vm.profileState = "CA";
            vm.profileCity = "San Francisco";
            vm.profileGender = "male";
            vm.profileAgree = true;
         }
      }
   });
/*
   //start timer to cycle images in carousel
   vm.slideTimerId = $interval(slideTimerTrigger, 10000);
*/

   //==========home page==========
/*
   vm.carouselImages = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6', 'slide7'];
   vm.curIndex = -1;//to avoid first time
   vm.forward = true;
   //use this formula to position sb-circle-box to center
   var bw = $window.innerWidth;
   var cb_pos = 100 * (bw - 35 * vm.carouselImages.length) / ( bw * 2);
   //dynamic circle button opacity
   vm.styleOpacityCircle = [1];//array of numbers matching each image, first one initially light up
*/
   vm.curCategory = "All Categories";
   // vm.styleCircleBox = { "left":  cb_pos + "%" };//style object for circle box
   vm.showSearchList = false;//used to show drop-down
   vm.searchString = '';
   vm.searchList = [];

/*
   for (var idx=1; idx<vm.carouselImages.length; idx++)
      vm.styleOpacityCircle.push(0.3);
   vm.slideForward = function () {
      interruptSlideShow();
      vm.styleOpacityCircle[vm.curIndex] = 0.3;//dim
      if (vm.curIndex < vm.carouselImages.length - 1) {//at end, don't slide further
         vm.curIndex++;
         vm.styleSliderBoxLeft = { "left": (-100 * vm.curIndex) + '%' };
         vm.styleOpacityCircle[vm.curIndex] = 1;//light up
      }
   };
   vm.slideBackward = function () {
      interruptSlideShow();
      vm.styleOpacityCircle[vm.curIndex] = 0.3;//dim
      if (vm.curIndex > 0) {//curIndex == 0 stop slide further
         vm.curIndex--;
         vm.styleSliderBoxLeft = {"left": (-100 * vm.curIndex) + '%'};
         vm.styleOpacityCircle[vm.curIndex] = 1;//light up
      }
   };
   vm.goToSlide = function (index) {
      interruptSlideShow();
      vm.curIndex = index;
      vm.styleSliderBoxLeft = { "left": (-100 * vm.curIndex) + '%' };
      vm.styleOpacityCircle[vm.curIndex] = 1;//light up
   };
   vm.getOpacityObj = function (index) {
      return { "opacity": vm.styleOpacityCircle[index] };
   };
*/
   vm.searchStringChange = function () {//based on search field content, show drop down list
      if (vm.searchString) {//has something, show drop-down list
         vm.searchList = getSearchList();
         vm.showSearchList = true;
      }
      else //empty string
         vm.showSearchList = false;
   };
   vm.clickSearchList = function (index) {//user click
      vm.searchString = vm.searchList[index];//put inside text field
      vm.curProduct = getProductByName(vm.searchString);
      vm.showSearchList = false;
      vm.searchList = [];
   };
   vm.startSearch = function () {
      vm.navTo('/product');
      vm.searchString = '';
   };
   vm.searchViaKeyPress = function (key_code) {
      if (key_code === 13) vm.startSearch();
   };
   vm.showThumbnails = function (category) {//search all products in this category
      vm.curCategory = category;
      if (category === "All Categoreis") {
         vm.products = ProductData;
         return;
      }

      //subset of products of this category
      var list = [];//of product objects
      for (var idx = 0; idx < ProductData.length; idx++) {
         var cats = ProductData[idx].category;
         for (var cat_idx = 0; cat_idx < cats.length; cat_idx++) {
            if (category === cats[cat_idx])
               list.push(ProductData[idx]);
         }
      }
      vm.products = list;//set to a smaller list
   };
/*

   //first class function to manage sliding images
   function interruptSlideShow() {//stop interval, start timer 15s restart
      if (angular.isDefined(vm.slideTimerId)) {
         $interval.cancel(vm.slideTimerId);
         vm.slideTimerId = undefined;
      }
      //start 15s timer to restart slide show
      $timeout(function () {
         console.log("========15 second timeout expired========");
         vm.slideTimerId = $interval(slideTimerTrigger, 5000);
      }, 30000, 1);
   }
   function slideTimerTrigger() {
      var len = vm.carouselImages.length;
      if (vm.curIndex === len - 1 || vm.curIndex === 0) //reverse direction at boundary
         vm.forward = !vm.forward;
      if (vm.curIndex === -1) vm.curIndex = 0;//first time
      vm.styleOpacityCircle[vm.curIndex] = 0.3;//dim
      if (vm.forward) vm.curIndex++;
      else vm.curIndex--;
      vm.styleSliderBoxLeft = { "left": (-100 * vm.curIndex) + '%' };
      vm.styleOpacityCircle[vm.curIndex] = 1;//light up
// console.log("==> ", vm.curIndex, " | ", vm.styleSliderBoxLeft, " | ", vm.carouselImages[vm.curIndex], " | ",
// vm.forward ? " Forward" : " Backward" );
   }
*/
   //find a list of product names that matches search text
   function getSearchList() {
      var ret = [];//array of strings
      for (var idx = 0; idx < ProductData.length; idx++) {
         var dscr = ProductData[idx].name;
         if (dscr.toLowerCase().indexOf(vm.searchString.toLowerCase()) >= 0)
            ret.push(dscr);
      }
      return ret;
   }

   //==========login, profile, reset password, register==========
   //--properties
   vm.stateList = StateList;
   vm.cityList = CityList;

   //--methods
   vm.logout = function () {
      localforage.setItem(KEY_LOGIN_ID, null);
      //clear in memory objects
      vm.profileLoginName = ''; vm.profileEmail = ''; vm.profilePassword = '';
      vm.profilePasswordConfirm = '';
      vm.email = ''; vm.password = '';
      vm.userLoggedIn = false;
   };
   vm.login = function() {
      //find user from registered users in local storage
      var users = localforage.getItem(KEY_USERS, function (err, users) {
         if (err) { console.log("**Oops ==> ", err); return; }
         console.log("localforage Ok ==>  found ", users.length, " registered users.");
         vm.users = users;

         //special user - hard coded name/password
         if (vm.email === 'admin@admin.com' && vm.password === 'admin') {
            //use special route for user management page
            $location.url('/admin'); $scope.$apply();//must use apply
            return;
         }

         //look for this user in returned values
         var found = false;
         for (var idx = 0; idx < users.length; idx++) {
            var em = users[idx].email;
            var pwd = users[idx].password;
            if (em === vm.email && pwd === vm.password) {//found matching user, populate profile
               vm.profileLoginName = users[idx].loginName;
               vm.profilePassword = pwd;
               vm.profilePasswordConfirm = pwd;
               vm.profileEmail = em;
               vm.profileCountry = users[idx].country;
               vm.profileState = users[idx].state;
               vm.profileCity = users[idx].city;
               vm.profileGender = users[idx].gender;
               vm.userLoggedIn = true;
               $location.path('/home'); $scope.$apply();//must use apply
               localforage.setItem(KEY_LOGIN_ID, vm.email);
               found = true;
               break;
            }
         }
         if (!found)
            document.getElementById('msg-dlg-id').style.display = 'block';//TODO not good idea to manipulate DOM at low level
      });
      // return false;//don't submit form
   };
   vm.sendResetPasswordEmail = function () {//TODO how to send email?????
   };
   vm.getStateList = function(country) {
      for (var idx = 0; idx < vm.stateList.length; idx++) {
         var ct = vm.stateList[idx].country;
         if (ct === country) {
            vm.state = vm.stateList[idx].state[0];
            return vm.stateList[idx].state;
         }
      }
      return null;
   };
   vm.getCityList = function(state) {
      for (var idx = 0; idx < vm.cityList.length; idx++) {
         var st = vm.cityList[idx].state;
         if (st === state) {
            vm.city = vm.cityList[idx].city[0];
            return vm.cityList[idx].city;
         }
      }
      return null;
   };
   vm.hideDialog = function () {
      document.getElementById('msg-dlg-id').style.display = 'none';
      // vm.dlgVisible = false;//TODO why doesn't this work?????????
   };
   vm.saveProfile = function () {
      if (vm.profileLoginName === '' || vm.profileLoginName.length < 5) {//check length, alphanumeric
         var msg = "Name must be at least 5 characters.  Please re-enter.";
         // showError('name-id', msg);
         //TODO...different ways to present error
         return false;//NOTE- must return false here to not continue
      }
      var alpha_numeric = /^[a-zA-z0-9-_]+$/.test(vm.profileLoginName);
      if (!alpha_numeric) {//TODO...different ways to present error
         msg = "Name must contain alpha-numeric, dash, underscore characters.  Please re-enter.";
         // showError('name-id', msg);
         return false;
      }
      //validate 2 passwords are identical
      if (vm.profilePassword !== vm.profilePasswordConfirm) {
         msg = "Passwords do not confirm.  Please check.";
         // showError('pwd-id', msg);//TODO...different ways to present error
         return false;//NOTE- must return false here to not continue
      }
      //user must click agree
      if (!vm.profileAgree) {
         msg = "You must agree to the term of registration.  Please check the checbox";
         // showError('agree-id', msg);//TODO...different ways to present error
         return false;//NOTE- must return false here to not continue
      }
      //success validation, update local storage, back to home page
      //save user information in localforage
      localforage.getItem(KEY_USERS, function (err, users) {
         if (err) { console.log("*** Oops ==> ", err); return; }
         var user_obj = {
            email: vm.profileEmail,
            password: vm.profilePassword,
            loginName: vm.profileLoginName,
            country: vm.profileCountry,
            state: vm.profileState,
            city: vm.profileCity,
            gender: vm.profileGender
         };

         if (users) {
            //if user already exist (by userLoginName), remove it first, for now just add
            for (var idx = 0; idx < users.length; idx++) {
               var usr_name = users[idx].loginName;
               if (usr_name === vm.profileLoginName) {
                  users.splice(idx, 1);
                  break;
               }
            }//ok if not found
         }
         else {
            users = [];
         }
         users.push(user_obj);

         //write back entire users structure
         localforage.setItem(KEY_USERS, users, function (err, value) {
            if (err) console.log("*** Oops ==> ", err);
            else
               console.log(value);
         })
      });
      $location.url('/home');//can go first, LS work is behind the scene
   };
   vm.handleCountryChange = function () {
      var state_list = findStateList(vm.profileCountry);
      vm.profileState = state_list[0];//set to first state
      vm.handleStateChange();
   };
   vm.handleStateChange = function () {
      var city_list = findCityList(vm.profileState);
      vm.profileCity = city_list[0];
   };
   vm.removeUser = function (user) {
      vm.users.forEach(function (usr, idx) {
         if (usr.email === user.email) {
            vm.users.splice(idx, 1);

            //write local storage too
            localforage.setItem(KEY_USERS, vm.users, function (err) {
               if (err) { console.log("**Oops ==> ", err); return; }
               console.log("***Ok ==> users in local storage updated.")
            });
         }
      })
   };

   //==========product page==========
   //--properties
   vm.products = ProductData;
   vm.categories = Category;
   vm.curProduct = vm.products[0];
   vm.addQuantity = "1";//model of select widget
   vm.quantities = [];

   //--methods
   vm.getProductStatus = function (product_obj) {
      var stat = product_obj.inventory;
      return stat > 0 ? stat + " in stock" : ( (stat === -5) ? "Back order" : "Out of stock");
   };
   vm.clickProduct = function (product_idx) {
      vm.curProduct = vm.products[product_idx];
      //also establish quantities array
      vm.quantities = [];
      var qty = vm.curProduct.inventory;
      var limit = qty;
      if (qty > 10) limit = 10;
      else if (qty <= 0) limit = -1;
      for (var idx = 1; idx <= limit; idx++)
         vm.quantities.push(idx + '');//turn into string
      vm.activeImage = vm.curProduct.images[0];//any product will have at least 1
   };
   vm.clickThumb = function (thumb_idx) {
      vm.activeImage = vm.curProduct.images[thumb_idx];
   };
   vm.getThumbnailByName = function (product_name) {
      return getProductByName(product_name).image_url + "thumbnail/tn-1.jpg";
   };
   function getProductByName(name) {
      for (var idx = 0; idx < ProductData.length; idx++)
         if (ProductData[idx].name === name)
            return ProductData[idx];
      return null;
   }

   //==========shopping cart page==========
   vm.cartItems = [
      { productIndex: 3, quantity: 8 },//TODO remove this dummy
   ];

   vm.getProductByCartItemIndex = function(item_index) {
      var prd_idx = vm.cartItems[item_index].productIndex;
      return vm.products[prd_idx];
   };
   vm.getThumbnailByCartItemIndex= function(item_index) {
      var prd = vm.getProductByCartItemIndex(item_index);
      return prd.image_url + "thumbnail/tn-1.jpg";
   };
   vm.getCartImage = function (index) {
      return vm.products[index].image_url + "thumbnail/tn-1.jpg";
   };
   vm.getCartItemByIndex = function (index) { return vm.products[index]; };
   vm.addToCart = function (product_id) { //check if current product is already in cart
      var found = false;
      for (var idx = 0; idx < vm.cartItems.length; idx++) {
         var pid = vm.products[vm.cartItems[idx].productIndex].id;
         if (vm.curProduct.id === pid) {
            vm.cartItems[idx].quantity += vm.addQuantity; //if yes, increase quantity
            found = true;
            break;
         }
      }
      if (!found) {//find out product index using id
         for (var idx = 0; idx < vm.products.length; idx++) {
            if (vm.products[idx].id === product_id) {
               vm.cartItems.push({ productIndex: idx, quantity: vm.addQuantity}); //else, add new entry to cartItems
               break;
            }
         }
      }
   };
   vm.calcCartTotal = function () {
      var sum = 0;
      vm.cartItems.forEach(function (item, index, ary) {
         sum += vm.products[item.productIndex].price * item.quantity;
      });
      return sum;
   };
   vm.incCartItemQuantity = function (item_index) { vm.cartItems[item_index].quantity++; };
   vm.decCartItemQuantity = function (item_index) {
      vm.cartItems[item_index].quantity--;
      if (vm.cartItems[item_index].quantity === 0)
         vm.removeCartItem(item_index);
   };
   vm.removeCartItem = function (item_index) { vm.cartItems.splice(item_index, 1); };
   vm.calcItemSubtotal = function (item_index) {
      return vm.products[vm.cartItems[item_index].productIndex].price *
         vm.cartItems[item_index].quantity;
   };

   //-----order
   vm.order = {

   };

   //-----helpers
   vm.navTo = function (to_route) {
      $location.path(to_route);
   };
   //helper to find state list, null returned if not found
   function findStateList(country) {
      for (var idx = 0; idx < vm.stateList.length; idx++) {
         var ct = vm.stateList[idx].country;
         if (ct === country)
            return vm.stateList[idx].state;
      }
      return null;
   }
   //helper to find city list, null returned if not found
   function findCityList(state) {
      for (var idx = 0; idx < vm.cityList.length; idx++) {
         var st = vm.cityList[idx].state;
         if (st === state)
            return vm.cityList[idx].city;
      }
      return null;
   }
});

//-----literals
const KEY_USERS = "registeredUsers";
const KEY_LOGIN_ID = "login-id";
