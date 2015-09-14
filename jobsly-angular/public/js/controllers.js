app.controller("MainCtrl", ["$scope", "$http",  "$routeParams", "$location", "$route", function($scope, $http, $routeParams, $location, $route) {
  console.log('from controller');

  $http.get('http://localhost:8080/api/jobslys')
  .then(function(response) {
    $scope.jobslys = response.data;
    console.log('results', $scope.results)
  }, function(response) {
    console.log('error in the get request')
  });

  $scope.addJobsly = function(jobsly) {
    console.log('jobsly', jobsly)
    var jobsly = {
      jobTitle: $scope.jobsly.jobTitle,
      hiringCo: $scope.jobsly.hiringCo,
      desc: $scope.jobsly.desc,
      resp: $scope.jobsly.resp,
      date: Date.now(),
      filled: false
    }
      $http.post('http://localhost:8080/api/jobslys', jobsly)
        .then(function(response) {
          console.log(response)
        }), function(response) {
          console.log("Inalid URL")
        $route.reload()
        }
    } // success

    $scope.deleteJobsly = function(jobsly) {
      console.log('delete', jobsly)
      $http.delete('http://localhost:8080/api/jobslys/' +  jobsly._id)
        .then(function(response) {
          console.log("Inalid URL")
          $route.reload()
        }) // success
    }
    $scope.editJobsly = function(jobsly) {
      console.log('hello')
      console.log('jobsly', jobsly)
      console.log('id', $routeParams)

        $http.put('http://localhost:8080/api/jobslys/' +  jobsly._id, jobsly)
        .then(function(response) {
          console.log(response)
          $scope.oneJobsly = response.data
        }, function(response) {
          console.log("Inalid URL")
        })
      } // success

  }])

app.controller("ShowCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", function($scope, $routeParams, $http, $route, $location) {
  console.log('from showctrl')
  // $scope.showJobsly = $routeParams.id
  console.log('routeparams', $routeParams.id)

  $http.get('http://localhost:8080/api/jobslys/' + $routeParams.id + '/edit/')
  .then(function(response) {
    console.log('response from get in edit', response)
    $scope.oneJobsly = response.data;
    console.log('response.data', response.data)
  }, function(response) {
    console.log('error in the get request')
  });

  $scope.editJobsly = function(jobsly) {
    console.log('Jobsly', jobsly)
    console.log('id', $routeParams.id)
    var jobsly = {
      jobTitle: $scope.oneJobsly.jobTitle,
      hiringCo: $scope.oneJobsly.hiringCo,
      desc: $scope.oneJobsly.desc,
      resp: $scope.oneJobsly.resp,
      date: Date.now(),
      filled: false
    }

    $http.put('http://localhost:8080/api/jobslys/' +  $routeParams.id, jobsly)
      .then(function(response) {
        console.log(response)
        $scope.updateJobsly = response.data
      }, function(response) {
        console.log("Inalid URL")
        $route.reload()
      })
    };

    $scope.deleteJobsly = function(jobsly) {
      console.log('delete', jobsly)
      $http.delete('http://localhost:8080/api/jobslys/' +  $routeParams.id)
        .then(function(response) {
          console.log("Inalid URL")
          $route.reload()
        }) // success
    }
    $scope.newApplication = function(oneJobsly) { // full record is passed from the view
        console.log('newApplication')
        console.log('oneJobsly', oneJobsly)
        // jobsly = {
        //   jobTitle: $scope.oneJobsly.jobTitle,
        //   hiringCo: $scope.oneJobsly.hiringCo,
        //   desc: $scope.oneJobsly.desc,
        //   resp: $scope.oneJobsly.resp,
        //   date: Date.now(),
        //   filled: false
        // }
     var application = {
       name: oneJobsly.newApplication.name,
       email: oneJobsly.newApplication.email,
       url: oneJobsly.newApplication.url,
     };

     var applications = oneJobsly.applications || [];
     applications.push(application); // push comment to local $scope
       oneJobsly.newApplication.name = null; // needed to prevent autofilling fields
       oneJobsly.newApplication.email = null; // needed to prevent autofilling fields
       oneJobsly.newApplications = applications; // saves new comment locally

     $http.put('http://localhost:8080/api/jobslys/' + $routeParams.id, oneJobsly)
      .then(function(response) { // UPDATE
       console.log("Comment added.");
     }, function(response) {
       console.log("Invalid URL");
    });
  };

  $scope.deleteApplication = function(jobsly, application) {
   console.log("Deleting application.")
   var index = jobsly.applications.indexOf(application); // find the index of the comment in the array of comments
   jobsly.applications.splice(index, 1); // removes the comment from the array
   $http.put('http://localhost:8080/api/jobsly/' + jobsly._id, jobsly)
    .then(function(response) { // UPDATE
     console.log("Application deleted.");
   }, function(response) {
     console.log("Invalid URL");
   });
 } // success
  }])

  app.controller("EditCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", function($scope, $routeParams, $http, $route, $location) {
  console.log('from Editctrl')
  // $scope.showJobsly = $routeParams.id
  console.log('routeparams', $routeParams.id)

  $http.get('http://localhost:8080/api/jobslys/' + $routeParams.id + '/edit/')
  .then(function(response) {
    console.log('response from get in edit', response)
    $scope.oneJobsly = response.data;
    console.log('response.data', response.data)
  }, function(response) {
    console.log('error in the get request')
  });

  $scope.editJobsly = function(jobsly) {
    console.log('Jobsly', jobsly)
    console.log('id', $routeParams.id)
    var jobsly = {
      jobTitle: $scope.jobsly.jobTitle,
      hiringCo: $scope.jobsly.hiringCo,
      desc: $scope.jobsly.desc,
      resp: $scope.jobsly.resp,
      date: Date.now(),
      filled: false
    }
  }
}])

  app.controller("ApplicationCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", function($scope, $routeParams, $http, $route, $location) {
    console.log('from showctrl')
    // $scope.showJobsly = $routeParams.id
    console.log('routeparams', $routeParams.id)
  $scope.newApplication = function(oneJobsly) { // full record is passed from the view
      console.log('newApplication')
   var application = {
     name: jobsly.newApplication.name,
     email: jobsly.newApplication.email,
     url: jobsly.newApplication.url,
   };
   var applications = jobsly.applications || [];
   applications.push(jobsly); // push comment to local $scope
     jobsly.newApplication.name = null; // needed to prevent autofilling fields
     jobsly.newApplication.email = null; // needed to prevent autofilling fields
     jobsly.newApplications = applications; // saves new comment locally

   $http.put('http://localhost:8080/api/jobsly/' + jobsly._id, jobsly)
    .then(function(response) { // UPDATE
     console.log("Comment added.");
   }, function(response) {
     console.log("Invalid URL");
   });
  };

  $scope.deleteApplication = function(jobsly, application) {
  console.log("Deleting application.")
  var index = jobsly.applications.indexOf(application); // find the index of the comment in the array of comments
  jobsly.applications.splice(index, 1); // removes the comment from the array
  $http.put('http://localhost:8080/api/jobsly/' + jobsly._id, jobsly)
  .then(function(response) { // UPDATE
   console.log("Application deleted.");
  }, function(response) {
   console.log("Invalid URL");
  });
  } // success

}])
