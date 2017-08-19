//controller for home page
var app = angular.module('shoppingApp');
app.controller('homeCtrl', function ($location, $interval, $window, $timeout, dataProvider) {
   var vm = this;
   genCarouselImages(8);

   //start timer to cycle images in carousel
   vm.slideTimerId = $interval(slideTimerTrigger, 10000);
   vm.products = dataProvider.getProducts();//short cut

   //managing carousel related properties/methods
   vm.curIndex = -1;//to avoid first time
   vm.forward = true;
   vm.curCarouselProduct = vm.products[vm.carouselProductIndices[0]];

   //use this formula to position sb-circle-box to center
   var bw = $window.innerWidth;
   var cb_pos = 100 * (bw - 35 * vm.carouselImages.length) / ( bw * 2);

   //to position sb-slider-caption "left" property
//TODO how to calculate current caption string width in current font, same for description
   // var ssc_pos = 100 * (bw - )

   //dynamic circle button opacity
   vm.styleOpacityCircle = [1];//array of numbers matching each image, first one initially light up
   vm.styleCircleBox = { "left":  cb_pos + "%" };//style object for circle box
   for (var idx = 1; idx < vm.carouselImages.length; idx++)
      vm.styleOpacityCircle.push(0.3);
   vm.slideForward = function () {
      interruptSlideShow();
      vm.styleOpacityCircle[vm.curIndex] = 0.3;//dim
      if (vm.curIndex < vm.carouselImages.length - 1) {//at end, don't slide further
         vm.curIndex++;
         vm.styleSliderBoxLeft = { "left": (-100 * vm.curIndex) + '%' };
         vm.styleOpacityCircle[vm.curIndex] = 1;//light up
         vm.curCarouselProduct = vm.products[vm.carouselProductIndices[vm.curIndex]];
      }
   };
   vm.slideBackward = function () {
      interruptSlideShow();
      vm.styleOpacityCircle[vm.curIndex] = 0.3;//dim
      if (vm.curIndex > 0) {//curIndex == 0 stop slide further
         vm.curIndex--;
         vm.styleSliderBoxLeft = {"left": (-100 * vm.curIndex) + '%'};
         vm.styleOpacityCircle[vm.curIndex] = 1;//light up
         vm.curCarouselProduct = vm.products[vm.carouselProductIndices[vm.curIndex]];
      }
   };
   vm.goToSlide = function (index) {
      interruptSlideShow();
      vm.curIndex = index;
      vm.styleSliderBoxLeft = { "left": (-100 * vm.curIndex) + '%' };
      vm.styleOpacityCircle[vm.curIndex] = 1;//light up
      vm.curCarouselProduct = vm.products[vm.carouselProductIndices[vm.curIndex]];
   };
   vm.getOpacityObj = function (index) {
      return { "opacity": vm.styleOpacityCircle[index] };
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
      vm.curCarouselProduct = vm.products[vm.carouselProductIndices[vm.curIndex]];

// console.log("==> ", vm.curIndex, " | ", vm.styleSliderBoxLeft, " | ", vm.carouselImages[vm.curIndex], " | ",
// vm.forward ? " Forward" : " Backward" );
   }
   //randomly select N images from "full-image" folder of products and use for carousel slides
   function genCarouselImages(count) {
      var products = dataProvider.getProducts();
      var cnt = count; var list = [];//index to product array
      while(cnt > 0) {
         var prd_idx = Math.floor(Math.random() * products.length);
         if (!list.includes(prd_idx)) {
            list.push(prd_idx);
            cnt--;
         }
      }
      vm.carouselProductIndices = list;
console.log("Carousel product indices ==> " + vm.carouselProductIndices);
      var urls = [];
      for (var idx = 0; idx < list.length; idx++) {
         var pidx = list[idx];
         urls.push(products[pidx].image_url + 'full-image/' + products[pidx].images[0]);
      }
      vm.carouselImages = urls;
   }
});