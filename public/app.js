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
      	url:'/about',
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
      	controller: 'profileCtrl as prfCtrl'
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
loginCtrl.$inject = ['$state', '$window','$firebaseArray']
var type
function loginCtrl($state, $window,$firebaseArray){
	lCtrl = this
	var ref = new Firebase("https://helper-134221.firebaseio.com/user")
	var user = $firebaseArray(ref)
	// console.log($state)
	lCtrl.auth = false

	lCtrl.setType = function (e){
		console.log(e)
		type = e.target.id 
		console.log(type)
		
	}
	lCtrl.username = ''
	lCtrl.login = function(e){
		// e.preventDefault()
		// console.log(e)
		lCtrl.auth = true
		lCtrl.username = e.target[0].value
		user.$remove(0)
		user.$add(lCtrl.username)
		// $window.localStorage.setItem('user',lCtrl.username)
		console.log(user[0].$value)
		lCtrl.placeholder = user[0].$value
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

		console.log(lCtrl.placeholder)
	}
	lCtrl.placeholder = user.value || 'Login'

}

function problemCtrl($state,$firebaseArray,$scope){
	var problem = new Firebase("https://helper-134221.firebaseio.com/problemList")
	pCtrl=this
	// var syncObj=$firebaseObject(problem)
	// syncObj.$bindTo($scope,"pCtrl.problemList")
	pCtrl.solution = []
	pCtrl.debug = false
	console.log(pCtrl.solutions)
	pCtrl.problemList = $firebaseArray(problem)
	console.log(pCtrl.problemList)

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
function profileCtrl($state,$firebaseArray){
	prfCtrl = this
	var ref = new Firebase("https://helper-134221.firebaseio.com/userTickets")
	prfCtrl.ticketList = $firebaseArray(ref)
	console.log(prfCtrl.ticketList[0])

	prfCtrl.ticketMaker = function(){
		for (ticket in prfCtrl.ticketList){
			prfCtrl.singleTicket = ticket
			console.log(prfCtrl.singleTicket)
			
		}
	}()




}
function hangoutCtrl(){
	hangCtrl = this
	gapi.hangout.render('placeholder-div', { 'render': 'createhangout' });
}
function dashCtrl(){
	dCtrl = this
}
ticketCtrl.$inject = ['$state', '$firebaseArray']
function ticketCtrl($state,$firebaseArray){
	tCtrl = this
	var ref = new Firebase("https://helper-134221.firebaseio.com/userTickets")
	tCtrl.work = function(){
		console.log('click')
		tCtrl.working = 'some'
	}
	var ticketSync = $firebaseArray(ref)
	console.log(ticketSync)
	tCtrl.createTicket = function(){
		console.log('submitted')
		console.log(tCtrl.newTicket)
		ticketSync.$add(tCtrl.newTicket)
		$state.go('profile')
	}
	

}