function infixToPostfix(){
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