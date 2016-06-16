angular.module('fixitApp',['ui.router', 'firebase'])
	.config(configRouter)
	.controller('loginCtrl',loginCtrl)
	.controller('homeCtrl',homeCtrl)
	.controller('problemCtrl',problemCtrl)
	.controller('profileCtrl',profileCtrl)
	.controller('dashCtrl',dashCtrl)
	.controller('hangoutCtrl',hangoutCtrl)
	.controller('ticketCtrl',ticketCtrl)


// var myFirebaseRef = new Firebase("https://helper-134221.firebaseio.com/");

// myFirebaseRef.on("value",function(snapshot){
// 	console.log(snapshot)
// })

configRouter.$inject = ['$stateProvider', '$urlRouterProvider']
// loginCtrl.$inject = ['$state, $scope']
function configRouter($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home',{
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl as hCtrl'
      })
      .state('login',{
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl as lCtrl'
      })
      .state('problem',{
      	url: '/problem',
      	templateUrl: 'partials/problem.html',
      	controller: 'problemCtrl as pCtrl'
      })
      .state('profile',{
      	url: '/profile',
      	templateUrl:'partials/profile.html',
      	controller: 'profileCtrl as prfCtrl'
      })
      .state('about',{
      	url:'about',
      	templateUrl:'partials/about.html',
      })
      // .state('hlogin',{
      // 	url: '/login',
      // 	templateUrl:'partials/login.html',
      // 	controller: 'hLoginCtrl as hlCtrl'
      // })
      .state('dashboard',{
      	url: '/dashboard',
      	templateUrl: 'partials/dashboard.html',
      	controller: 'dashCtrl as dCtrl'
      })
      .state('ticket',{
      	url: '/ticket',
      	templateUrl: 'partials/ticket.html',
      	controller: 'ticketCtrl as tCtrl'
      })
      .state('hangout',{
      	url: '/hangout',
      	templateUrl: 'partials/hangout.html',
      	controller: 'hangoutCtrl as hangCtrl'

      })
    $urlRouterProvider.otherwise('/')
  }
function homeCtrl($state){
	hCtrl=this

} 
loginCtrl.$inject = ['$state', '$window']
var type
function loginCtrl($state, $window){
	lCtrl = this
	// console.log($state)
	lCtrl.auth = false

	lCtrl.setType = function (e){
		console.log(e)
		type = e.target.id 
		console.log(type)
		
	}
	lCtrl.username = ''
	lCtrl.placeholder = $window.localStorage.getItem('user')||'Login'
	lCtrl.login = function(e){
		// e.preventDefault()
		// console.log(e)
		lCtrl.auth = true
		lCtrl.username = e.target[0].value
		$window.localStorage.setItem('user',lCtrl.username)
		lCtrl.placeholder = $window.localStorage.getItem('user')
		console.log(e)
		if (type == 'user'){
			$state.go('problem')
		}
		else if (type == 'helper') {
			$state.go('dashboard')
		}
		else{
			console.log('fuck')
		}

		console.log(lCtrl.username)
	}

}

function problemCtrl($state,$firebaseArray,$firebaseObject,$scope){
	var problem = new Firebase("https://helper-134221.firebaseio.com/problemList")
	pCtrl=this
	// var syncObj=$firebaseObject(problem)
	// syncObj.$bindTo($scope,"pCtrl.problemList")
	pCtrl.solution = []
	pCtrl.debug = false
	console.log(pCtrl.solutions)
	pCtrl.problemList = $firebaseArray(problem)
	console.log(pCtrl.problemList)
	// pCtrl.solutions = ["restart","power","incidental"]
	//[
	// {"name": "phone",
	// "solutionLabel": "phone",
	// "solutionStarter": "Have you tried turning it off and on again?"},
	// {"name": "internet",
	// "solutionLabel": "internet",
	// "solutionStarter": "Have you tried turning it off and on again?"},
	// {"name": "pc",
	// "solutionLabel": "pc",
	// "solutionStarter": "Have you tried turning it off and on again?"},
	// {"name": "mac",
	// "solutionLabel": "mac",
	// "solutionStarter": "Have you tried turning it off and on again?"},
	// {"name": "printer",
	// "solutionLabel": "printer",
	// "solutionStarter": "Have you tried turning it off and on again?"},
	// {"name": "cat",
	// "solutionLabel": "cat",
	// "solutionStarter": "Have you tried feeding it?"}
	// ]
	// console.log(pCtrl.solutionList.name)
	// pCtrl.loggedInUser = $window.localStorage.getItem('user')
	for (var i = 0; i < pCtrl.problemList.length; i++) {
		console.log(problemList[i])
	}
	pCtrl.solutionStarter = function(problem){
		pCtrl.debug = true
		pCtrl.suggestion = problem
		// console.log(problem.solutionStarter)
		// for (p in problem){
		// 	console.log(problem)
		// 	if (p.includes('$')){
		// 		break
		// 	}
		// 	for (thing in problem.p)
		// 	pCtrl.suggestion = thing
		// 	// console.log(problem.p)
		// }
		// // pCtrl.suggestion = problem.
		// console.log(pCtrl.suggestion)
	}
}
function profileCtrl($state){

}
function hangoutCtrl(){
	hangCtrl = this
	gapi.hangout.render('placeholder-div', { 'render': 'createhangout' });
}
function dashCtrl(){
	dCtrl = this
}
function ticketCtrl(){
	tCtrl = this
}