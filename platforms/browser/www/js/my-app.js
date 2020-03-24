
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'Student App',
  // App id
  id: 'com.myapp.test',
    // enable Template7 rendering for Ajax and Dynamic pages
    template7Pages: true, 
  // Enable swipe panel
  panel: {
    swipe: 'false',
  },
  // Add default routes
  routes: [
    {
      name: 'login',
      path: '/index/',
      url: 'index.html',
      
        
     },
    {
        name: 'Dashboard',
      path: '/dashboard/',
        url: 'pages/dashboard.html',
     },
     {
       path: '/register/',
       url: 'pages/register.html',
     },
     {
       path: '/notifications/',
       url: 'pages/notifications.html',
     },
     {
       path: '/exams/',
       url: 'pages/exams.html',
       
     },
     {
       path: '/finance/',
       url: 'pages/finance.html',
       
     },
     {
       path: '/quotation/',
       url: 'pages/quotation.html',
       
     },
     {
       path: '/register/',
       url: 'pages/about.html',
     },
     {
       path: '/ExamResults/',
       url: 'pages/results.html',
       
     },
     {
       path: '/statement/',
       url: 'pages/statement.html',		 
     }, 
     {
      path: '/SignUp/',
        url: 'pages/SignUp.html',
     },
	      {
      path: '/calender/',
        url: 'pages/calender.html',
     }, 
     {
      path: '/forgottenPass/',
        url: 'pages/forgottenPass.html',
     },  
     {
      path: '/payments/',
        url: 'pages/payments.html',
     }, 
     {
      path: '/profile/',
        url: 'pages/profile.html',
     }, 
     {
      path: '/PaymentState/',
        url: 'pages/PaymentState.html',
     }, 
     {
      path: '/ExamState/',
        url: 'pages/ExamState.html',
     },
     {
      path: '/change_pass/',
        url: 'pages/change_pass.html',
     },	 
     {
      path: '/about/',
        url: 'pages/about.html',
     }, 
     {
      path: '/registercourse/',
      url: 'pages/registercourse.html',
     },
	 {
      path: '/register/',
      url: 'pages/register.html',
     },
     {
      path: '/resultswithheld/',
      url: 'pages/resultswithheld.html',
     },
     {
      path: '/waitingapproval/',
      url: 'pages/waitingapproval.html',
     },
  
  
    {
      path: '/request-and-load/user/:userId/',
      async: function (routeTo, routeFrom, resolve, reject) {
        // Router instance
        var router = this;
  
        // App instance
        var app = router.app;
  
        // Show Preloader
        app.preloader.show();
  
        // User ID from request
        var userId = routeTo.params.userId;
  
        // Simulate Ajax Request
        setTimeout(function () {
          // We got user data from request
          var user = {
            firstName: 'Vladimir',
            lastName: 'Kharlampidi',
            about: 'Hello, i am creator of Framework7! Hope you like it!',
            links: [
              {
                title: 'Framework7 Website',
                url: 'http://framework7.io',
              },
              {
                title: 'Framework7 Forum',
                url: 'http://forum.framework7.io',
              },
            ]
          };
          // Hide Preloader
          app.preloader.hide();
  
          // Resolve route to load page
          resolve(
            {
              componentUrl: './pages/request-and-load.html',
            },
            {
              context: {
                user: user,
              }
            }
          );
        }, 1000);
      },
        },
    // Default route (404 page). MUST BE THE LAST
    {
      path: '(.*)',
      url: "",//'./pages/404.html',
    },
  ],
  // ... other parameters
});

var $$ = Dom7;


var mainView = app.views.create('.view-main');

var StudentData = localforage.createInstance({name: "StudentToken"});


// Add the deviceready event
document.addEventListener("deviceready", function(){
    
    // attach events
   // document.addEventListener("resume", onResume, false);
    //document.addEventListener("pause", onPause, false);
    //document.addEventListener("volumeupbutton", callbackFunction, false);
    document.addEventListener("backbutton", backbuttonfunction,false);

}, false);

 
function onPause() {
    alert('paused');
}

function onResume() {
    alert('resumed');
}

function callbackFunction() { 
   alert('Volume Up Button is pressed!');
}

function backbuttonfunction() {

var mypage = app.views.main.router.currentRoute.name;

if (mypage == "Dashboard") {
    app.dialog.confirm('Are you sure you want logout', function () {
    // disable swipe so it is not available on login page    
    app.panel.disableSwipe("left");
    mainView.router.navigate('/index/');
    });
    
} else if(mypage == "login"){
     app.dialog.confirm('Are you sure you want to close Student App', function () {
    navigator.app.exitApp();
    });     
}else {
    mainView.router.back();
}

}