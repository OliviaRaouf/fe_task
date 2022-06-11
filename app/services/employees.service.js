angular.module('appModule').service('Employees', EmployeesService);

function EmployeesService($http) {
  var currentPage = '';
  var employeesData = '';

  const getEmployees = () => {
    const employeesUrl = 'https://fe-task.getsandbox.com/employees';
    $http({
      method: 'GET',
      url: employeesUrl,
    }).then(function successCallback(response) {
      currentPage = response.data.current_page;
    });
    return $http.get(employeesUrl);
  };

  const loadMoreEmployees = () => {
    var params = {
      page: currentPage + 1,
    };

    const moreEmployees = 'https://fe-task.getsandbox.com/employees';
    return $http({
      method: 'GET',
      params: params,
      url: moreEmployees,
    }).then(function successCallback(response) {
      currentPage = response.data.current_page;
      employeesData = response;
      return employeesData;
    });
    // [Load more empolyess logic goes here]
  };

  return {
    getEmployees,
    loadMoreEmployees,
  };
}
