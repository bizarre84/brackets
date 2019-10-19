module.exports = function check(str, bracketsConfig) {
  var stack = [];
  var openingBrackets = [];
  var closingBrackets = [];

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

  var indexSameBrackets = [];

  function comparePairBrackets(char1, char2){
    let indexChar1 = searchIndexInBrackets(char1, openingBrackets);
    let indexChar2 = searchIndexInBrackets(char2, closingBrackets);
    if(indexChar1 == indexChar2) {
        return true;
    } else {
        return false;
    }
  }

  function searchSameBrackets(char){
    let index = searchIndexInBrackets(char, openingBrackets);
    if (index!=-1) {
        if(comparePairBrackets(openingBrackets[index], closingBrackets[index])) {
            if(indexSameBrackets.includes(index)) {
                if(indexSameBrackets[index]) {indexSameBrackets[index] = false;} else {indexSameBrackets[index] = true;}
            } else {
                indexSameBrackets[index] = true;
            }
            
        }
    }
  }
  
  var iterate = 0;
  for(let char of str){
      let indexOpeningBrackets = searchIndexInBrackets(char, openingBrackets);
      let indexClosingBrackets = searchIndexInBrackets(char, closingBrackets);

      if(indexOpeningBrackets != -1) {
        if(iterate==0) {
            stack.push(char);
        } else if (indexSameBrackets.includes(char)){
            if(!indexSameBrackets[char]) {stack.push(char);}
        } else {stack.push(char);}
        
      }
      if(indexClosingBrackets != -1){
          if(stack.length == 0){
              return false;
          } else if (!comparePairBrackets(stack[stack.length-1],char)){
              return false;
          } else {
              stack.pop();
          }
      }
      iterate++;
  }

  if(stack.length == 0){
    return true;
  } else {
    return false; 
  }
}
