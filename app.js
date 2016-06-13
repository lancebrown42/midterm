angular.module('fixitApp',['ui.router'])
	.config(configRouter)
	.controller('loginCtrl',loginCtrl)
	.controller('homeCtrl',homeCtrl)
	.controller('problemCtrl',problemCtrl)

configRouter.$inject = ['$stateProvider', '$urlRouterProvider']
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
    $urlRouterProvider.otherwise('/')
  }
function homeCtrl($state){
	hCtrl=this

} 
function loginCtrl($state){
	lCtrl = this
	lCtrl.auth = false
	lCtrl.login = function(e){
		e.preventDefault()
		lCtrl.auth = true
		$state.go('problem')
		// console.log($state)
	}

}
function problemCtrl($state){
	pCtrl=this
	pCtrl.solutionList = [
	{name: 'phone',
	solutionLabel: 'phone'},
	{name: 'internet',
	solutionLabel: 'internet'},
	{name: 'pc',
	solutionLabel: 'pc'},
	{name: 'mac',
	solutionLabel: 'mac'},
	{name: 'printer',
	solutionLabel: 'printer'},
	{name: 'cat',
	solutionLabel: 'cat'},
	]
}