angular.module('fixitApp',['ui.router'])
	.config(configRouter)
	.controller('loginCtrl',loginCtrl)
	.controller('homeCtrl',homeCtrl)
	.controller('problemCtrl',problemCtrl)
	.controller('profileCtrl',profileCtrl)
	.controller('dashCtrl',dashCtrl)
	.controller('hangoutCtrl',hangoutCtrl)


var myFirebaseRef = new Firebase("https://https://helper-134221.firebaseapp.com.firebaseio.com/");

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
	console.log($state)
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

function problemCtrl($state){
	pCtrl=this
	pCtrl.suggestion = ''
	pCtrl.problemList = [
	{name: 'phone',
	solutionLabel: 'phone',
	solutionStarter: 'Have you tried turning it off and on again?'},
	{name: 'internet',
	solutionLabel: 'internet',
	solutionStarter: 'Have you tried turning it off and on again?'},
	{name: 'pc',
	solutionLabel: 'pc',
	solutionStarter: 'Have you tried turning it off and on again?'},
	{name: 'mac',
	solutionLabel: 'mac',
	solutionStarter: 'Have you tried turning it off and on again?'},
	{name: 'printer',
	solutionLabel: 'printer',
	solutionStarter: 'Have you tried turning it off and on again?'},
	{name: 'cat',
	solutionLabel: 'cat',
	solutionStarter: 'Have you tried feeding it?'},
	]
	// console.log(pCtrl.solutionList.name)
	// pCtrl.loggedInUser = $window.localStorage.getItem('user')
	pCtrl.solutionStarter = function(problem){
		// console.log(problem.solutionStarter)
		for (var i = 0; i < problem.solutionStarter.length; i){
			pCtrl.suggestion = problem.solutionStarter[i]
			
		}
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