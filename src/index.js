module.exports = function check(str, bracketsConfig) {
    let stack = [];
    let openingBrackets = [];
    let closingBrackets = [];
  
    function parsingBracketConfig (arr) {
      for(var i = 0; i < arr.length; i++){
          for(var j = 0; j < 2; j++){
              if(j==0) {
                  openingBrackets.push(arr[i][j]);
              }
              else {
                  closingBrackets.push(arr[i][j]);
              }
          }
      }
    }
    
    parsingBracketConfig(bracketsConfig);

    function searchIndexInBrackets(char, arr){
      return arr.indexOf(char);
    }
  
    function comparePairBrackets(char1, char2){
      let indexChar1 = searchIndexInBrackets(char1, openingBrackets);
      let indexChar2 = searchIndexInBrackets(char2, closingBrackets);
      if((indexChar1 == indexChar2)&&indexChar1!=-1) {
          return true;
      } else {
          return false;
      }
    }
    
    for (let char of str) {
      stack.push(char)
      if(stack.length>1) {
          if (comparePairBrackets(stack[stack.length-2],stack[stack.length-1])) stack.splice(stack.length - 2, 2)
      }
    }

    return stack.length == 0 ? true : false
  }
