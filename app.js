angular.module('fixitApp',['ui.router'])
	.config(configRouter)
	.controller('loginCtrl',loginCtrl)
	.controller('homeCtrl',homeCtrl)
	.controller('problemCtrl',problemCtrl)
	.controller('profileCtrl',profileCtrl)

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
    $urlRouterProvider.otherwise('/')
  }
function homeCtrl($state){
	hCtrl=this

} 
loginCtrl.$inject = ['$state', '$window']
function loginCtrl($state, $window){
	lCtrl = this
	console.log($state)
	lCtrl.auth = false
	lCtrl.username = ''
	lCtrl.placeholder = $window.localStorage.getItem('user')||'Login'
	lCtrl.login = function(e){
		// e.preventDefault()
		// console.log(e)
		lCtrl.auth = true
		lCtrl.username = e.target[0].value
		$window.localStorage.setItem('user',lCtrl.username)
		lCtrl.placeholder = $window.localStorage.getItem('user')
		
		$state.go('problem')

		console.log(lCtrl.username)
	}

}
function problemCtrl($state){
	pCtrl=this
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
		console.log(problem.solutionStarter)
	}
}
function profileCtrl($state){

}