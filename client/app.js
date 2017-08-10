//TODO - use product id when database is involved, find universal database of countries
//main JS file to manage top level controller, routing and various high level models
var app = angular.module('shoppingApp', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
       templateUrl: 'app/home/home.html'
    })
    .when('/product', {
       templateUrl: 'app/product/product.html',
       controller: 'productCtrl'
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
   //start timer to cycle images in carousel
   vm.slideTimerId = $interval(slideTimerTrigger, 5000);

   //==========home page==========
   vm.carouselImages = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6', 'slide7'];
   vm.curIndex = -1;//to avoid first time
   vm.forward = true;
   //use this formula to position sb-circle-box to center
   var bw = $window.innerWidth;
   var cb_pos = 100 * (bw - 35 * vm.carouselImages.length) / ( bw * 2);
   //dynamic circle button opacity
   vm.styleCircleOpacity = { "opacity": 0.3 };//default
   vm.styleCircleBox = { "left":  cb_pos + "%" };//style object for circle box
   vm.slideForward = function () {
      interruptSlideShow();
      if (vm.curIndex < vm.carouselImages.length - 1) {//at end, don't slide further
         vm.curIndex++;
         vm.styleSliderBoxLeft = { "left": (-100 * vm.curIndex) + '%' };
         // vm.styleCircleOpacity = { "opacity": }
      }
   };
   vm.slideBackward = function () {
      interruptSlideShow();
      if (vm.curIndex > 0) {//curIndex == 0 stop slide further
         vm.curIndex--;
         vm.styleSliderBoxLeft = {"left": (-100 * vm.curIndex) + '%'};
      }
   };
   vm.goToSlide = function (index) {
      interruptSlideShow();
      vm.curIndex = index;
      vm.styleSliderBoxLeft = { "left": (-100 * vm.curIndex) + '%' };
   };
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
      }, 15000, 1);
   }
   function slideTimerTrigger() {
      var len = vm.carouselImages.length;
      if (vm.curIndex === len - 1 || vm.curIndex === 0) //reverse direction at boundary
         vm.forward = !vm.forward;
      if (vm.curIndex === -1) vm.curIndex = 0;//first time
      if (vm.forward) vm.curIndex++;
      else vm.curIndex--;
      vm.styleSliderBoxLeft = { "left": (-100 * vm.curIndex) + '%' };
console.log("==> ", vm.curIndex, " | ", vm.styleSliderBoxLeft, " | ", vm.carouselImages[vm.curIndex], " | ",
vm.forward ? " Forward" : " Backward" );
   }

   //==========login, profile, reset password, register==========
   //--properties
   // vm.country = "China"; vm.state = "Sichuan"; vm.city = "Qingdao";//profile page
   vm.stateList = [
      { country: 'US', state: ['CA', 'NV', 'OR' ] },
      { country: 'China', state: ['Canton', 'Sichuan', 'Shandong' ] },
      { country: 'Canada', state: ['Ontario', 'Alberta', 'Quebec' ] }
   ];
   vm.cityList = [
      { state: 'CA', city: ['San Francisco', 'San Jose', 'Los Angeles' ] },
      { state: 'NV', city: ['Las Vegas', 'Reno', 'Carson City' ] },
      { state: 'OR', city: ['Portland', 'Salem', 'Beaverton' ] },
      { state: 'Canton', city: ['Guangzhou', 'Foshan', 'Shenzhen' ] },
      { state: 'Shandong', city: ['Jinan', 'Qingdao', 'Yantai' ] },
      { state: 'Sichuan', city: ['Chengdu', 'Mianyang', 'Nanchong' ] },
      { state: 'Ontario', city: ['Upland', 'Pomona', 'Fontana' ] },
      { state: 'Alberta', city: ['McMurray', 'Edmonton', 'Calgary' ] },
      { state: 'Quebec', city: ['Wendake', 'Shannon', 'Beaumont' ] }
   ];

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
   vm.products = [
      { id: 1000, name: "Day and Night Vision Laser Binoculars", shortDescription: "",
         description: "Traditional night vision goggles are expensive, don’t magnify. " +
            "But the Day and Night Vision Laser Binoculars give you " +
            "8X magnification at any hour, at an affordable price! By day, they’re rugged, " +
            "solid and provide a sharp up-close view for sports and other outdoor activities. " +
            "When the sun goes down, simply push a button to activate a wideangle green laser " +
            "that illuminates even the darkest areas, up to 150 yards away. " +
            "Features an easy-to-use center focus wheel, right eye focus adjustment, water-resistant " +
            "armor and tripod socket.Get 8X magnification… day or night! The Day and Night Vision Laser " +
            "Binoculars give you a clear view at a great price!",
         price: 159.99, inventory: -10, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/binocular-night/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.png", "v7.png"],
         feature: [ "Rugged binoculars for day or nighttime use",
            "Tripod socket accommodates all standard tripods", "32mm objective lenses",
            "Spot diameter 4m @ 50m", "Field of view: 294′ @ 1,000 yds.", "Minimum focus distance: 13′",
            "Exit pupil size: 4mm", "Eye relief: approx. 12.5mm", "Relative brightness index: 17.36",
            "Twilight factor: 24.49", "Batteries provide up to 2.5 hours of continuous use", "Requires 2 AAA batteries",
         ]
      },
      { id: 1010, name: "Backtab Portable Comfortable Backrest", shortDescription: "",
         description: "Take a load off anywhere you go when you have the Backtab Portable Comfortable Backrest. " +
            "Designed to go anywhere you go, this device offers total support and comfort. The Backtab is extremely easy to use. " +
            "Simply unfold and take a seat. The Backtab features a highly durable hinge system. " +
            "In fact, this strong material is the same stuff used for helicopter rotor blades. " +
            "In addition, the back of the Backtab uses CNC-machined 'claws' to keep the entire system upright. " +
            "You can rest the full weight of your upper body with total peace of mind. " +
            "It rolls out to cover the ground and give you a clean seat. " +
            "the Backtab can truly go anywhere.",
         price: 53, inventory: 8, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/backtab/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg"],
         feature: [ "10.2 x 7.1 x 0.75 Inches", "Water Repellent, Corrosion Resistant, Customizable", "Glass Fiber Reinforced Plastic, PVC",
            "Measuring only 10.2 inches long, the size of an average tablet", "Water-repellent, tear-proof material",
            "Glass fiber reinforced plastic", "Strong stainless steel hinges", "Highly durable hinge system",
         ]
      },
      { id: 1020, name: "Doogee Mix Bezel-Less Smartphone", shortDescription: "",
         description: "See your apps in all their glory with the Doogee Mix Bezel-Less Smartphone. " +
            "This device shakes off the frame, so that your videos and photos stretch from edge to edge. " +
            "Furthermore, the 5.5-inch Samsung Super AMOLED display offers amazing detail and rich colors. " +
            "Because there is no bezel, this phone is much smaller than most devices with the same screen size. " +
            "Despite its compact form, the Mix is seriously powerful. " +
            "The octa-core Helio P25 CPU can handle multi-tasking at speed, and the phone has 6GB of RAM. " +
            "You also get all-day battery life with quick charge technology. " +
            "Dual cameras allow you to take DSLR-quality photos in any light, and you get the latest version of Android to play with. " +
            "Finally, the Mix provides an incredible 128GB of storage space. " +
            "If you want top performance, this phone certainly fits the bill.",
         price: 169.99, inventory: -5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/doogee/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg", "v9.jpg"],
         feature: [ "Bezel-Less with contents stretch from edge to edge", "5.5-inch Samsung Super AMOLED display",
            "octa-core Helio P25 CPU", "6GB of RAM", "Dual cameras", "128GB of storage", "Android powered" ]
      },
      { id: 1030, name: "Vivowake Anti-Drowsiness Smartband", shortDescription: "",
         description: "Combat the drowsiness from your every day with the Vivowake Anti-Drowsiness Smartband. " +
            "This wearable uses two sensors to keep you awake and alert. The Vivowake capsule sits inside the included wristband. " +
            "The Vivowake Smartband is ideal for drivers, security guards, operators, or any time when drowsiness can impact your ability. " +
            "When Vivowake detects drowsiness, it instantly sends an alert to your wrist. " +
            "If your body doesn’t wake up sufficiently after this alert, the wearable will deliver more consistent alerts. " +
            "With each, your body becomes more awake and you can be more aware.",
         price: 31, inventory: 65, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/vivowake/",
         images: ["v1.jpg", "v2.jpg", "v3.jpeg", "v4.gif", "v5.jpg", "v6.jpg", "v7.jpg"],
         feature: [ "Uses two sensors to keep you awake and alert", "Alert 3 to 8 minutes before your body begins to fall asleep",
            "Ideal for drivers, security guards, operators", "Sensors underneath monitor your skin and detect early " +
            "signs of weakening human response." ]
      },
      { id: 1040, name: "Q – The Affordable Smart Wallet", shortDescription: "",
          description: "Keep your most valuable items safe and sound with the Q Ultra Compact Smart Wallets. " +
            "These wallets come in two models which offer superior protection for your goods. " +
            "The Q-BLOQ features RFID-blocking technology so you won’t fall victim to data theft. " +
            "In fact, the Q-BLOQ provides two layers of this material for each card for even more security. " +
            "In addition, the Q-TRAQ is complete with Bluetooth tracking capability. " +
            "Connecting to the app on your smartphone, the Q-TRAQ features a CHIPOLO tracking chip for ultra-precise location tracking. " +
            "You can ring your wallet to find it, use your wallet to find your smartphone, and even see your wallet on a map. " +
            "The CHIPOLO chip has a 12-month battery life so you get total peace of mind. " +
            "Both models have loads of storage space yet remain totally slim even when full.",
         price: 100, inventory: -10, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/q-ultra/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"],
         feature: [ "Q-BLOQ features RFID-blocking technology", "Provides two layers of this material",
             "The Q-TRAQ is complete with Bluetooth tracking capability", "Features a CHIPOLO tracking chip for ultra-precise location tracking",
             "CHIPOLO chip has a 12-month battery life", "Loads of storage space yet remain totally slim"
         ]
      },
      { id: 1050, name: "Ring Mouse with Laser Pointer", shortDescription: "",
        description: "Imagine a mouse that fits on your index finger! " +
           "The rechargeable Ring Mouse With Laser Pointer lets you wirelessly control PowerPoint presentations, " +
           "slide shows and web pages from up to 33 feet away. Flip a switch and this handy mouse becomes a laser pointer. " +
           "Worry-free 2.4GHz technology gives you reliable cursor and clicking control when the pressure’s on! " +
           "Charges via USB with included cable. System requirements: Windows 7/Vista/XP or Mac OSX 10.6+.",
        price: 100, inventory: 214, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
        image_url: "asset/image/product/ring-mouse/",
         images: ["v1.jpg", "v2.jpg"],
         feature: [ "Wireless connectivity with 33’ range", "Built-in laser pointer",
            "Mouse ring fits comfortably on the index finger", "Control the cursor and click with your thumb",
            "Adjustable cursor speed", "Low-battery indicator", "Charges via USB with included cable",
            "USB Pico receiver plugs into mouse port on PC or Mac", "Worry-free 2.4GHz technology"
        ]
      },
      { id: 1060, name: "Senstone Sensitive Voice Tracker", shortDescription: "",
         description: "Never lose a great idea again when you have the Senstone Wearable Voice Recorder. " +
            "This compact device attaches right to your gear or clothing and is always ready to record. " +
            "Senstone offers an intuitive and easy to use interface. Simply tap the device and speak. " +
            "Senstone will instantly begin recording your audio to keep your notes, ideas, and thoughts safe and sound. " +
            "Because you wear the device, Senstone is more efficient than paper and pen or even a smartphone app. " +
            "From there, Senstone automatically converts your speech into text and organizes your notes. In addition, " +
            "Senstone works with third party apps and can include tags as well as location information. Totally wireless, " +
            "Senstone is compatible with a dozen languages. Senstone can be worn as a necklace or a bracelet. " +
            "Thanks to its beautiful design, it integrates seamlessly into your style and daily life.",
         price: 100, inventory: 27, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/senstone/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg"],
         feature: [ "attaches right to your gear", "instantly begin recording your audio to keep your notes",
            "automatically converts your speech into text and organizes your notes", "Totally wireless, compatible with a dozen languages",
            "integrates seamlessly into your style and daily life"
         ]
      },
      { id: 1070, name: "Smartduvet Breeze Self-Making Temperature Bed", shortDescription: "",
         description: "Turn your bed into a smart bed with the " +
         "Smartduvet Breeze Self-Making Temperature Bed. This system has so many intelligent features to make your life easier. " +
         "Firstly, the Smartduvet Breeze features dual-zone temperature control. " +
         "Both you and your partner can determine the perfect climate for sleeping to achieve total comfort. " +
         "Some like it cool and some like it hot. Either way, the Smartduvet Breeze does it all. " +
         "In addition to climate control, this smart system removes humidity, prevents bed bugs, and reduces sweating. " +
         "If that’s not enough, the Smartduvet Breeze actually makes your bed for you. " +
         "Incredibly, it uses an inflation system to lift the duvet back to its original position. " +
         "The Smartduvet Breeze is the ultimate bedtime accessory to ensure the best night’s sleep.",
         price: 179, inventory: -5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/duvet/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg"],
         feature: [ "Dual-zone temperature control", "Smart system removes humidity",
            "Prevents bed bugs, and reduces sweating", "Uses an inflation system to lift the duvet back to its original position"
         ]
      },
      { id: 1080, name: "TAP-TAB Magnetic Organization System", shortDescription: "",
         description: "Tidy up your everyday life with the TAP-TAB Magnetic Organization System. " +
         "Featuring ultra-strong magnets, this system allows you to hang and store your clothing, towels, " +
         "accessories, notes, ideas, and more. TAP-TAB comes with the stylish TAP-TAB Board and special magnet loops. " +
         "The loops, which work in a pair, mount on the inside and outside of a garment or object without creating any holes. " +
         "With the magnets in place, you can simply toss your items onto the Board and they will magnetically stick in place. " +
         "With TAP-TAB, you can achieve total organization in any space. " +
         "You can hang the durable Board just like a picture frame or use double sided tape. " +
         "It’s perfect for the kitchen, entryway, your bedroom, and even the bathroom. " +
         "Say goodbye to heaps of jackets and coats, untidy piles of towels, and messy accessories. " +
         "TAP-TAB does all the heavy lifting (and hanging) for you.",
         price: 25, inventory: 855, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/tap-tab/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg"],
         feature: [ "Ultra-strong magnets", "Hang and store your clothing, towels, accessories, notes, ideas...etc",
            "stylish TAP-TAB Board and special magnet loops", "Toss your items onto the Board and they will magnetically stick in place",
            "Perfect for the kitchen, entryway, your bedroom, and even the bathroom"
         ]
      },
      { id: 1090, name: "Scribbler DUO Dual Nozzle 3D Printing Pen", shortDescription: "",
         description: "Unleash your endless creativity with the Scribbler DUO Dual Nozzle 3D Printing Pen. " +
         "This incredible device allows you to create 3D designs all with your hand. " +
         "As a tool of the 21st century, the Scribbler DUO unlocks your creative world. " +
         "Simply place your filament inside and get making. As you draw, your idea turns into a 3D structure. " +
         "In addition, the Scribbler DUO has a dual nozzle design. With two active nozzles, " +
         "you can create faster than ever before. You have the option to use multiple colors to add another layer of dimension. " +
         "The pen itself is ergonomic and comfortable to use. " +
         "Additionally, it’s totally safe and clean. Complete with a lightweight design, " +
         "the 1.75mm filament inside is also affordable. You have 6 speeds to choose from as well as a " +
         "temperature adjustment toggle for unprecedented control.",
         price: 60, inventory: 341, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/scribbler/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg", "v9.jpg"],
         feature: [ "Create 3D designs all with your hand", "As you draw, your idea turns into a 3D structure",
            "Dual nozzle design", "Use multiple colors to add another layer of dimension",
            "Rrgonomic pen is comfortable to use", "Totally safe and clean with a lightweight design",
            "Inexpensive 1.75mm filament", "6 speeds with temperature adjustment"
         ]
      },
      { id: 1100, name: "CUJO Smart Home Firewall Device", shortDescription: "",
         description: "Protect your entire connected home with the CUJO Smart Home Firewall Device. " +
         "This flawless system creates a personal firewall right at home. When in use, " +
         "CUJO protects devices such as your laptop, smartphone, tablet, and more against online threats. " +
         "CUJO even works with gaming consoles. " +
         "Complete with a cute face, CUJO offers business-level internet security and " +
         "hackers don’t stand a chance. It connects to your home’s Wi-Fi router and you " +
         "can manage it through the companion app. " +
         "It effortlessly safeguards all of your devices all at the same time." +
         " However, it will never slow down your network so you can browse with total peace of mind. " +
         "In addition to protection, you also get parental controls. " +
         "Within the app, you can block certain websites, restrict time, and much more.",
         price: 249, inventory: 37, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/cujo/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"],
         feature: [ "Creates a personal firewall right at home", "Protects devices such as your laptop, smartphone, tablet",
            "Offers business-level internet security", "Connects to your home’s Wi-Fi router",
            "Will never slow down your network", "Features parental controls to block certain websites, restrict time"
         ]
      },
      { id: 1110, name: "Fred One-Touch Smart Home Mirror", shortDescription: "",
         description: "Start each day off smart when you have the Fred One-Touch Smart Home Mirror. " +
         "With a tap, this smart home device tells you everything you need to know for the day. " +
         "It prominently displays the date as well as the time. " +
         "It also gives you the local weather and refreshes with real-time updates. " +
         "It can even access your preferred news channels so you can be informed before you even leave. " +
         "The state-of-the-art system also pumps out your favorite tunes. " +
         "But, the Fred Mirror does so much more. It features a built-in air purifying module. " +
         "It takes in air and releases optimized, germ-free fresh air. " +
         "It also works to deodorize the air. Finally, the mirror is also steam-free. " +
         "No matter how hot your shower, the Fred Mirror gives you a crystal clear reflection.",
         price: 1950, inventory: -5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/mirror/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg"],
         feature: [ "Tells you everything you need to know for the day with one tap",
            "Displays the date, time and local weather in real time",
            "Access your preferred news channels", "Play your favorite tunes",
            "Built-in air purifying module", "The mirror is steam-free"
         ]
      },
      { id: 1120, name: "Wobblrs - Soccer-Specific Tailgate Game", shortDescription: "",
         description: "Ramp up the pre-game excitement with Wobblrs – " +
         "the first soccer-specific tailgate game. It’s designed by soccer fans for soccer fans " +
         "and a game that you’ll want to play with friends for hours. " +
         "Coming in a set of two, the Wobblrs stand 11 steps apart. " +
         "You can play 1v1 or 2v2 and the goal is to hit your opponent’s Wobblrs by " +
         "kicking it with a soccer ball. Incredibly, each Wobblr uses its high-quality plastic " +
         "and aluminum design to always self-right. So, when you hit the pylon, " +
         "it won’t knock over but will be obvious that you’ve made contact. " +
         "This eliminates the need to reset the pin manually after a successful hit. " +
         "You must hit your opponent’s Wobblr to get a point but be careful to not knock over your own! " +
         "The first team to 11 points wins, however; you must win by at least 2 points. " +
         "Expand your tailgating experience while ramping up the anticipation before the big game.",
         price: 35, inventory: 150, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/wobblr/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.gif", "v5.jpg", "v6.jpg", "v7.jpg"],
         feature: [ "Soccer-specific tailgate game", "A set of two, stand 11 steps apart",
            "Kicking other team's wobblr via a soccer ball",
            "Plastic and aluminum design to always self-right", "The first team to 11 points wins"
         ]
      },
      { id: 1130, name: "Constellation Watch", shortDescription: "",
         description: "The more you know about astronomy, the more you’ll love the newly redesigned " +
         "Constellation Watch. In addition to the current time, this quartz analog watch displays " +
         "a wealth of astronomical data about the Northern Hemisphere, including positions of the " +
         "constellations, plus the azimuth and altitude of the major fixed stars, nebulae and star " +
         "clusters, local sidereal time, stellar spectral type, pole star hour angle and hours " +
         "for astronomical twilight. You can even use the Constellation Watch to align your telescope " +
         "to the polar axis. Features 42mm stainless steel case, 20mm black silicone rubber strap and " +
         "heavy duty stainless steel buckle..",
         price: 189.99, inventory: 8, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/constellation/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg"],
         feature: [ "Designed to show the night sky of the Northern Hemisphere",
            "Constellation dial displays almost all of the celestial sphere (approximately 98.6%) visible at 35 deg. " +
            "north latitude (–55.57deg. to +77.06deg. declination)",
            "The constellation display includes the positions of 1,056 fixed stars with a brightness of 4.8 magnitude or brighter, 169 major nebulae and star clusters, delimitation of constellations, the ecliptic and celestial " +
            "equator based on their positions for the year 2000.0.",
            "The position of the sun is shown in a broken line along the ecliptic on the 1st, 11th, and 21st of each month",
            "Examine the horizon line on the crystal underprint to determine times for sunrise and sunset as well as the number of daylight hours",
            "Local sidereal time can be designated by reading the right ascension graduations on the constellation dial that intersect with the meridian on the transparent dial",
            "Hour angle display of the pole star lets you align an astronomical telescope to the polar axis",
            "100% Japan movement", "3 ATM water resistance", "Beautiful, reusable gift box",
            "42mm stainless steel case (steel is high-quality surgical grade 316L)",
            "20mm black silicone rubber strap with heavy duty stainless steel buckle",
            "Battery included"
         ]
      },
      { id: 1140, name: "Bluetooth Digital Pen", shortDescription: "",
         description: "The Bluetooth Digital Pen automatically captures handwritten notes and drawings, " +
         "and saves them as digital files! Simply clip the small receiver to the top of your notepad " +
         "and write or draw as you would with a regular ballpoint pen. " +
         "Your notes and drawings will be saved as digital files. Includes two free " +
         "apps (MemoPlus and CloudMemo+) and Black ink cartridge. Extra ink cartridges " +
         "available atSharperImage.com. Compatible with iPhone/iPad and Galaxy/Android.",
         price: 59.99, inventory: -5, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/digipen/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg"],
         feature: [ "Clip the small receiver to the top of your notepad",
            "Write or draw normally with the premium ballpoint + digital device",
            "Pen writes in black ballpoint ink",
            "Notes and drawings are captured instantly as digital files",
            "Makes your notes more useful by integrating them with your daily activities",
            "Easy sharing options let you send notes to a variety of apps, services and social media",
            "Includes two free apps for your iPhone/iPad or Galaxy/Android",
            "MemoPlus - Smart Pen (Shenzhen Yifang Digital Technology): Captures handwritten notes as JPEG files and also records the real-time writing process as a video clip that can be shared to social networks. Requires Android OS 4.0+ or iOS 8.0+",
            "CloudMemo+ (Shenzhen Yifang Digital Technology): Captures and digitizes handwritten notes to your smartphone so they can be shared on social networks. Requires Android OS 4.3+ or iOS 7.0+",
            "Extra ink cartridges available at SharperImage.com (Item No. 205052)",
            "Receiver and pen charge at the same time with the included USB cable",
         ]
      },
      { id: 1150, name: "INNO LUMI Smart Lighting System", shortDescription: "",
         description: "Introducing the INNO LUMI Smart Lighting System which gives you all the control to achieve the best lighting. " +
         "INNO LUMI is a suite of smart lighting products providing effortless control of home lighting systems. " +
         "It features an elegantly simple remote control as well as a range of LED bulbs and light strips. " +
         "INNO LUMI enables the transformation of the humble home lighting into a sophisticated mood enhancer " +
         "in the most uncomplicated and straightforward manner. In addition, the INNO LUMI remote is a specialized device " +
         "that is designed to deliver a single function and provides one-directional command driven light control " +
         "similar to the control of your TV. The system takes just seconds to setup and has no requirement for Wi-FI, ZigBee, " +
         "gateway, Bluetooth, or a smartphone. With the remote, you can control 96 different sets of lights. " +
         "Additionally, you can do more than just dim. You can adjust the color temperature, colors, and access a variety " +
         "of light mode profiles. The INNO LUMI Remote uses minimal power and gives you total clarity for ease of use.",
         price: 54, inventory: 35, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/inno-lumi/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg"],
         feature: [ "Gives you all the control to achieve the best lighting",
            "Smart lighting products providing effortless control of home lighting systems",
            "Simple remote control as well as a range of LED bulbs and light strips",
            "Takes just seconds to setup and has no requirement for Wi-FI",
            "Can control 96 different sets of lights",
            "Adjust the color temperature, colors, and access a variety of light mode profiles",
            "Remote uses minimal power and ease of use"
         ]
      },
      { id: 1160, name: "Zing Smart AI Night Light", shortDescription: "",
         description: "Introducing the Zing Smart AI Night Light, a smart path lighting system for your home. " +
         "Individually, each Zing is an awesome, full-color LED night light that plugs directly into your outlet " +
         "to give you tons of convenient features. These include smartphone control, light effects and blue light reduction" +
         " — which helps your body ready itself for sleep. It also keeps you from becoming too alert during late night trips to the bathroom. " +
         "The billions of color options are just the tip of the iceberg. Zing can act as a visual indicator for incoming calls " +
         "and other smartphone events. When used together as a system, multiple Zing lights learn " +
         "and automatically illuminate your path without the need for manual configuration. " +
         "Conversely, Zing can notify you of unusual and suspicious motion activities via push notifications on your phone.",
         price: 36, inventory: 150, //inventory: -10 = no re-reorder, -5 = back order, > 0 actual quantity
         image_url: "asset/image/product/zing/",
         images: ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg", "v8.jpg"],
         feature: [ "smart path lighting system",
            "Full-color LED night light that plugs directly into your outlet",
            "Smartphone control, light effects and blue light reduction",
            "Billions of color options",
            "A visual indicator for incoming calls and other smartphone events",
            "Automatically illuminate your path when used together as a system",
            "Notify you of unusual and suspicious motion activities on your phone"
         ]
      }
   ];
   vm.currentProductIndex = 0;
   vm.curProduct = vm.products[vm.currentProductIndex];
   vm.activeImage = vm.curProduct.images[0];//default 0
   vm.addQuantity = "1";//model of select widget
   vm.quantities = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ];

   //--methods
   vm.getProductStatus = function (product_obj) {
      var stat = product_obj.inventory;
      return stat > 0 ? stat + " in stock" : ( (stat === -5) ? "Back order" : "Out of stock");
   };
   vm.clickProduct = function (product_idx) {
      vm.currentProductIndex = product_idx;
      vm.curProduct = vm.products[product_idx];
   };
   vm.clickThumb = function (thumb_idx) {
      vm.activeImage = vm.curProduct.images[thumb_idx];
   };

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
      for (var idx = 0; idx < stateList.length; idx++) {
         var ct = stateList[idx].country;
         if (ct === country)
            return stateList[idx].state;
      }
      return null;
   }
   //helper to find city list, null returned if not found
   function findCityList(state) {
      for (var idx = 0; idx < cityList.length; idx++) {
         var st = cityList[idx].state;
         if (st === state)
            return cityList[idx].city;
      }
      return null;
   }
});

//-----literals
const KEY_USERS = "registeredUsers";
const KEY_LOGIN_ID = "login-id";
