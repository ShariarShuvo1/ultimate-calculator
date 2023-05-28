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
        else if(key=='Enter'|| key=='='){
            clickedEnter();
        }
        else if(key=='%'){
            findPercentage();
        }
        else if(key=='^'){
            findPower();
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
        if (char===signes[i]){
            sign=true;
            break
        }
    }
    return sign;
}

function validEquation(){
    if(signFinder(equation[equation.length-1])){
        return false;
    }
    let s = equation;
    let valid = true;
    let arr = [];
    for(let i = 0 ; i<s.length-1;i++){
        if(s[i]!='(' && s[i]!=')'){
            arr.push(s[i]);
        }
        if(signFinder(s[i])==true && signFinder(s[i+1])==true){
            valid=false;
            break
        }
    }
    if(!valid){
        return valid;
    }
    for(let i = 0 ; i<arr.length-1;i++){
        if(signFinder(arr[i]) ==true && signFinder(arr[i+1])==true){
            valid=false;
            break
        }
    }
    return valid;
}

function infixToPostfix(eqn){
    let stack=[];
    let equ = [];
    for(let i = 0 ; i<eqn.length;i++){
        if(!signFinder(eqn[i]) && eqn[i]!=='(' && eqn[i]!==')'){
            equ.push(eqn[i]);
        }
        else if(eqn[i]=='('){
            stack.push(eqn[i]);
        }
        else if(eqn[i]==')'){
            while(stack[stack.length-1]!='('){
                equ.push(stack[stack.length-1]);
                stack.pop();
            }
            stack.pop();
        }
        else if(eqn[i]=='+'){
            if(stack.length==0){
                stack.push(eqn[i]);
            }
            else if(stack[stack.length-1]=='('){
                stack.push(eqn[i]);
            }
            else{
                while(stack.length!= 0 && stack[stack.length-1]!='('){
                    equ.push(stack[stack.length-1]);
                    stack.pop();
                }
                stack.push(eqn[i]);
            }
        }
        else if(eqn[i]=='-'){
            if(stack.length==0){
                stack.push(eqn[i]);
            }
            else if(stack[stack.length-1]=='('){
                stack.push(eqn[i]);
            }
            else{
                while(stack.length!= 0 && stack[stack.length-1]!='('){
                    equ.push(stack[stack.length-1]);
                    stack.pop();
                }
                stack.push(eqn[i]);
            }
        }
        else if(eqn[i]=='x'){
            if(stack.length==0){
                stack.push('*');
            }
            else if(stack[stack.length-1]!='/'){
                stack.push('*');
            }
            else{
                while(stack.length!= 0 && stack[stack.length-1]=='/'){
                    equ.push(stack[stack.length-1]);
                    stack.pop();
                }
                stack.push('*');
            }
        }
        else if(eqn[i]=='/'){
            if(stack.length==0){
                stack.push('/');
            }
            else if(stack[stack.length-1]!='*'){
                stack.push('/');
            }
            else{
                while(stack.length!= 0 && stack[stack.length-1]=='*'){
                    equ.push(stack[stack.length-1]);
                    stack.pop();
                }
                stack.push(eqn[i]);
            }
        }
    }
    while(stack.length!=0){
        equ.push(stack[stack.length-1]);
        stack.pop();
    }
    return equ;
}

function digitChecker(digit){
    let digits = ['+','-','*','/'];
    let isDigit = true;
    for(let i = 0;i<digits.length;i++){
        if(digit===digits[i]){
            isDigit=false;
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

function stringToArr(){
    let eqn=[];
    let s = '';
    for(let i = 0; i<equation.length;i++){
        if(equation[i] === '0'||equation[i] === '1'||equation[i] === '2'||equation[i] === '3'||equation[i] === '4'||equation[i] === '5'||equation[i] === '6'||equation[i] === '7'||equation[i] === '8'||equation[i] === '9'||equation[i] === '.'){
            s+=equation[i];
        }
        else{
            if(s.length!=0){
                eqn.push(s);
                s='';
            }
            eqn.push(equation[i]);
        }
    }
    if(s.length!=0){
        eqn.push(s);
    }
    return eqn;
}

function calculate(){
    let isValidParenthesis = validParenthesis();
    let isValidEquation = validEquation();
    if(isValidParenthesis && isValidEquation){
        let eqn = stringToArr();
        let postFixEquation = infixToPostfix(eqn);
        let outputText = postfixToInfix(postFixEquation);
        if(outputText=='NaN' || outputText=='undefined'){
            outputDisplay('');
        }
        else{
            ans=outputText;
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
let ans;

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

function findPercentage(){
    if(ans.length>0){
        let str = `${ans}%`
        equationDisplay(str);
        ans = String(Number(ans)/100);
        outputDisplay(ans);
    }
}

function findRoot(){
    if(ans.length>0){
        let str = `&#8730(${ans})`
        equationDisplay(str);
        ans = String(Math.sqrt(Number(ans)));
        outputDisplay(ans);
    }
}

function findPower(){
    if(ans.length>0){
        let str = `(${ans})<sup>2</sup>`
        equationDisplay(str);
        ans = String(Math.pow(Number(ans),2));
        outputDisplay(ans);
    }
}

function clickedEnter(){
    let displayText = displayInput.innerHTML;
    let outputText = displayOutput.innerHTML;
    let mydiv = document.createElement('div');
    let p1 = document.createElement('p');
    p1.setAttribute('class','topHistoryPara');
    p1.innerHTML = displayText;
    let p2 = document.createElement('p');
    p2.setAttribute('class','downHistoryPara');
    p2.innerHTML = outputText;
    mydiv.appendChild(p1);
    mydiv.appendChild(p2);
    historyBox.appendChild(mydiv);
    equation='';
}

leftBracket.addEventListener('click',function(){equationBuilder('(')});
rightBracket.addEventListener('click',function(){equationBuilder(')')});
percentage.addEventListener('click',findPercentage);
clearScreen.addEventListener('click',equationClear);
backspace.addEventListener('click',equationBackspace);

seven.addEventListener('click',function(){equationBuilder('7')});
eight.addEventListener('click',function(){equationBuilder('8')});
nine.addEventListener('click',function(){equationBuilder('9')});
rootOver.addEventListener('click',findRoot);
power.addEventListener('click',findPower);

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
lastOutput.addEventListener('click',function(){equation=ans;
    equationDisplay(equation);
    calculate();});
equal.addEventListener('click',clickedEnter);

document.addEventListener('keydown',function(e){keyboardVerify(e.key);})