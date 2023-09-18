'use strict';

(function () {

  
  var p1Message = 'SUCCESS';
  var p2Message = 'SUCCESS';
  var p3Message = 'SUCCESS';

  var varDeclared = ['varDeclared', 'p1Message', 'p2Message', 'p3Message'];

  function arraysAreTheSame(a1, a2) {
    if (!Array.isArray(a1) || !Array.isArray(a2) || (a1.length !== a2.length)) {
      return false;
    }
    for (var i = 0; i < a1.length; i += 1) {
      if (a1[i] !== a2[i]) {
        return false;
      }
    }
    return true;
  }


  if (typeof MakeMultiFilter !== 'function') {
    console.error('MakeMultiFilter is not a function', typeof MakeMultiFilter);
    p1Message = 'FAILURE';
  } else {
    var originalArray = [1, 2, 3];
    var filterFunc = MakeMultiFilter(originalArray);

    var secondArray = [1, 2, 3, 4];
    var filterFuncTwo = MakeMultiFilter(secondArray);

    if (typeof filterFunc !== 'function') {
      console.error('MakeMultiFilter does not return a function', filterFunc);
      p1Message = 'FAILURE';
    } else {
      var result = filterFunc();
      if (!arraysAreTheSame([1, 2, 3], result)) {
        console.error('filter function with no args does not return the original array', result);
        p1Message = 'FAILURE';
      }

      var callbackPerformed = false;
      result = filterFunc(function (item) {
        return item !== 2;
      }, function (callbackResult) {
        callbackPerformed = true;
        if (!arraysAreTheSame([1, 3], callbackResult)) {
          console.error('filter function callback does not filter 2 correctly', callbackResult);
          p1Message = 'FAILURE';
        }
        if (!arraysAreTheSame([1, 2, 3], this)) {
          console.error('filter function callback does not pass original array as this', this);
          p1Message = 'FAILURE';
        }
      });

      if (!callbackPerformed) {
        console.error('filter function callback not performed');
        p1Message = 'FAILURE';
      }

      if (result !== filterFunc) {
        console.error('filter function does not return itself', result);
        p1Message = 'FAILURE';
      }

      result = filterFunc(function (item) {
        return item !== 3;
      });
      if (result !== filterFunc) {
        console.error('filter function does not return itself 2', result);
        p1Message = 'FAILURE';
      }

      result = filterFunc();
      if (!arraysAreTheSame([1], result)) {
        console.error('filter function callback does not filter 3 correctly', result);
        p1Message = 'FAILURE';
      }
      result = filterFuncTwo(function (item) {
        return item !== 1;
      }, function (callbackResult) {
        if (!arraysAreTheSame([2, 3, 4], callbackResult)) {
          console.error('second filter does not filter 1 (check for global variable usage)', callbackResult);
          p1Message = 'FAILURE';
        }
        if (!arraysAreTheSame([1, 2, 3, 4], this)) {
          console.error('filter function callback does not pass original array as this', this);
          p1Message = 'FAILURE';
        }
      });
    }
  }
  console.log('Test MakeMultiFilter:', p1Message);


  if (typeof TemplateProcessor !== 'function') {
    console.error('TemplateProcessor is not a function', typeof TemplateProcessor);
    p2Message = 'FAILURE';
  } else {
    var template = 'My favorite month is {{month}} but not the day {{day}} or the year {{year}}';
    var dateTemplate = new TemplateProcessor(template);

    var dictionary = { month: 'July', day: '1', year: '2016' };
    var str = dateTemplate.fillIn(dictionary);

    if (str !== 'My favorite month is July but not the day 1 or the year 2016') {
      console.error('TemplateProcessor didn\'t work');
      p2Message = 'FAILURE';
    }
    varDeclared.push('template');
    varDeclared.push('dateTemplate');
    varDeclared.push('dictionary');
    varDeclared.push('str');
  }
  console.log('Test TemplateProcessor:', p2Message);


  if (typeof global !== 'undefined') {
    varDeclared.forEach(function (sym) {
      if (global[sym] !== undefined) {
        console.error('Found my symbol', sym, 'in global');
        p3Message = 'FAILURE';
      }
    });
  }
  console.log('Test Problem 3:', p3Message);

  if (typeof global !== 'undefined') {
    global.Project2Results = {
      p1Message: p1Message,
      p2Message: p2Message,
      p3Message: p3Message,
    };
  }

  if (typeof window === 'undefined') {
    process.exit();
  }

})();
