function keyboardVerify(key){
    key = String(key);
    const digits = [0,1,2,3,4,5,6,7,8,9,"(",')','x','/','+','-','.'];
    if (key=='x' || key =='*'){
        key = 'x';
    }
    let available = false;
    for(let i = 0 ; i<digits.length;i++){
        if(digits[i] == key){
            available = true;
            break;
        }
    }
    if (available){
        equationBuilder(key);
    }
    else{
        if(key == 'Backspace'){
            equationBackspace();
        }
    }
}

function equationClear(){
    equation='';
    equationDisplay(equation);
    calculate();
}
function equationBackspace(){
    equation = equation.slice(0,-1);
    equationDisplay(equation);
    calculate();
}

function equationDisplay(equ){
    displayInput.innerHTML = equ;
}

function outputDisplay(equ){
    displayOutput.innerHTML = equ;
}

function countBracket(equ){
    let bracketCount = 0;
    for(let i = 0 ; i<equ.length;i++){
        if(equ[i] == '('){
            bracketCount++;
        }
    }
    return bracketCount;
}

function validParenthesis(){
    let s = equation;
    let stack = [];
    let valid = true;
    for(let i = 0; i<s.length;i++){
        if(s[i] =='('){
            stack.push(s[i]);
        }
        else if(s[i] ==')'){
            if(stack[stack.length-1] =='('){
                stack.pop();
            }
            else{
                valid = false;
                break;
            }
        }
        if(valid==false){
            break;
        }
    }
    if(valid && stack.length==0){
        return true;
    }
    else{
        return false;
    }
}

function signFinder(char){
    let signes = ['+','-','x','/'];
    let sign = false;
    for (let i = 0 ; i<signes.length;i++){
        if (char==signes[i]){
            sign=true;
            break
        }
    }
    return sign;
}

function validEquation(){
    let s = equation;
    let valid = true;
    let arr = [];
    for(let i = 0 ; i<s.length-1;i++){
        if(s[i]!='(' && s[i]!=')'){
            arr.push(s[i]);
        }
        if(signFinder(s[i]) && signFinder(s[i+1])){
            valid=false;
            break
        }
    }
    if(!valid){
        return valid;
    }
    for(let i = 0 ; i<arr.length-1;i++){
        if(signFinder(arr[i]) == signFinder(arr[i+1])){
            valid=false;
            break
        }
    }
    return valid;
}

function infixToPostfix(){
    let stack=[];
    let equ = '';
    for(let i = 0 ; i<equation.length;i++){
        if(!signFinder(equation[i]) && equation[i]!=='(' && equation[i]!==')'){
            equ+=equation[i];
        }
        else if(equation[i]=='('){
            stack.push(equation[i]);
        }
        else if(equation[i]==')'){
            while(stack[stack.length-1]!='('){
                equ+=stack[stack.length-1];
                stack.pop();
            }
            stack.pop();
        }
        else if(equation[i]=='+'){
            if(stack.length==0){
                stack.push(equation[i]);
            }
            else if(stack[stack.length-1]=='('){
                stack.push(equation[i]);
            }
            else{
                while(stack.length!= 0 && stack[stack.length-1]!='('){
                    equ+=stack[stack.length-1];
                    stack.pop();
                }
                stack.push(equation[i]);
            }
        }
        else if(equation[i]=='-'){
            if(stack.length==0){
                stack.push(equation[i]);
            }
            else if(stack[stack.length-1]=='('){
                stack.push(equation[i]);
            }
            else{
                while(stack.length!= 0 && stack[stack.length-1]!='('){
                    equ+=stack[stack.length-1];
                    stack.pop();
                }
                stack.push(equation[i]);
            }
        }
        else if(equation[i]=='x'){
            if(stack.length==0){
                stack.push('*');
            }
            else if(stack[stack.length-1]!='/'){
                stack.push('*');
            }
            else{
                while(stack.length!= 0 && stack[stack.length-1]=='/'){
                    equ+=stack[stack.length-1];
                    stack.pop();
                }
                stack.push('*');
            }
        }
        else if(equation[i]=='/'){
            if(stack.length==0){
                stack.push('/');
            }
            else if(stack[stack.length-1]!='*'){
                stack.push('/');
            }
            else{
                while(stack.length!= 0 && stack[stack.length-1]=='*'){
                    equ+=stack[stack.length-1];
                    stack.pop();
                }
                stack.push(equation[i]);
            }
        }
    }
    while(stack.length!=0){
        equ+=stack[stack.length-1];
        stack.pop();
    }
    return equ;
}

function digitChecker(digit){
    let digits = ['0','1','2','3','4','5','6','7','8','9'];
    let isDigit = false;
    for(let i = 0;i<digits.length;i++){
        if(digit==digits[i]){
            isDigit=true;
            break;
        }
    }
    return isDigit;
}

function postfixToInfix(equ){
    let stack = [];
    for(let i = 0; i<equ.length;i++){
        if(digitChecker(equ[i])){
            stack.push(equ[i]);
        }
        else{
            let secondDigit = Number(stack[stack.length-1]);
            let firstDigit =Number(stack[stack.length-2]);
            stack.pop();
            stack.pop();
            let result;
            if(equ[i]=='+'){
                result = firstDigit+secondDigit;
            }
            else if(equ[i]=='-'){
                result = firstDigit-secondDigit;
            }
            else if(equ[i]=='*'){
                result = firstDigit*secondDigit;
            }
            else{
                result = firstDigit/secondDigit;
            }
            stack.push(result);
        }
    }
    return String(stack[0]);
}

function calculate(){
    let isValidParenthesis = validParenthesis();
    let isValidEquation = validEquation();
    if(isValidParenthesis && isValidEquation){
        let postFixEquation = infixToPostfix();
        let outputText = postfixToInfix(postFixEquation);
        if(outputText=='NaN' || outputText=='undefined'){
            outputDisplay('');
        }
        else{
            outputDisplay(outputText);
        }
    }
    else{
        outputDisplay('');
    }


}

function equationBuilder(digit){
    equation+=digit;
    equationDisplay(equation);
    calculate();
}

let equation='';

// row 1
let leftBracket = document.getElementById('leftBracket');
let rightBracket = document.getElementById('rightBracket');
let percentage = document.getElementById('percentage');
let clearScreen = document.getElementById('clearScreen');
let backspace = document.getElementById('backspace');
// row 2
let seven = document.getElementById('seven');
let eight = document.getElementById('eight');
let nine = document.getElementById('nine');
let rootOver = document.getElementById('rootOver');
let power = document.getElementById('power');
// row 3
let four = document.getElementById('four');
let five = document.getElementById('five');
let six = document.getElementById('six');
let multiply = document.getElementById('multiply');
let divide = document.getElementById('divide');
// row 4
let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let plus = document.getElementById('plus');
let minus = document.getElementById('minus');
// row 5
let zero = document.getElementById('zero');
let doubleZero = document.getElementById('doubleZero');
let point = document.getElementById('point');
let lastOutput = document.getElementById('lastOutput');
let equal = document.getElementById('equal');

let displayInput = document.getElementById('displayInput');
let displayOutput = document.getElementById('displayOutput');
let historyBox = document.getElementById('historyBox');

leftBracket.addEventListener('click',function(){equationBuilder('(')});
rightBracket.addEventListener('click',function(){equationBuilder(')')});

seven.addEventListener('click',function(){equationBuilder('7')});
eight.addEventListener('click',function(){equationBuilder('8')});
nine.addEventListener('click',function(){equationBuilder('9')});

four.addEventListener('click',function(){equationBuilder('4')});
five.addEventListener('click',function(){equationBuilder('5')});
six.addEventListener('click',function(){equationBuilder('6')});
multiply.addEventListener('click',function(){equationBuilder('x')});
divide.addEventListener('click',function(){equationBuilder('/')});

one.addEventListener('click',function(){equationBuilder('1')});
two.addEventListener('click',function(){equationBuilder('2')});
three.addEventListener('click',function(){equationBuilder('3')});
plus.addEventListener('click',function(){equationBuilder('+')});
minus.addEventListener('click',function(){equationBuilder('-')});

zero.addEventListener('click',function(){equationBuilder('0')});
doubleZero.addEventListener('click',function(){equationBuilder('00')});
point.addEventListener('click',function(){equationBuilder('.')});

clearScreen.addEventListener('click',equationClear);
backspace.addEventListener('click',equationBackspace);


document.addEventListener('keydown',function(e){keyboardVerify(e.key);})