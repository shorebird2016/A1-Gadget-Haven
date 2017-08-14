//controller for home page
var app = angular.module('shoppingApp');
app.controller('homeCtrl', function ($location, $interval, $window, $timeout) {
   var vm = this;
   //start timer to cycle images in carousel
   vm.slideTimerId = $interval(slideTimerTrigger, 10000);

   //managing carousel related properties/methods
   vm.carouselImages = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6', 'slide7'];
   vm.curIndex = -1;//to avoid first time
   vm.forward = true;
   //use this formula to position sb-circle-box to center
   var bw = $window.innerWidth;
   var cb_pos = 100 * (bw - 35 * vm.carouselImages.length) / ( bw * 2);
   //dynamic circle button opacity
   vm.styleOpacityCircle = [1];//array of numbers matching each image, first one initially light up
   vm.styleCircleBox = { "left":  cb_pos + "%" };//style object for circle box

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

});