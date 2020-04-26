const result = document.querySelector(".result");
const allButtons = document.querySelector(".allnumbers");

let initialValues = {
    charArray: [],
    firstNumber: 0,
    operation: '',
    nextNumber: 0,
    finalResult: 0,
    dotCounter: 0,
    isDot: false,
    resultFlag: false,
    isFirstNumber: false,
    isOperation: false,
    shouldCalculate: true,
    isInstaOper: false,
}

allButtons.addEventListener("click", function(e){
    if (e.target.dataset.isnumber==="true"){
        fillArray(e.target);
    }
    else {
        if (e.target.dataset.actiontype==="operation"){
            initialValues.isOperation=true;
            if(!initialValues.isFirstNumber){
                saveFirstNumber();
                saveOperation(e.target);
            } else {
                saveNextNumber();
                if (initialValues.shouldCalculate){
                    calculate();
                }
                saveOperation(e.target);
            }
        } else if (e.target.dataset.actiontype==="clear"){
            clearCalc();
        } else if (e.target.dataset.actiontype==="result"){
            initialValues.resultFlag=true;
            initialValues.isOperation=false;
            saveNextNumber();
            calculate();
        } else if (e.target.dataset.actiontype="instantOperation"){
            instOperation(e.target);
        }
    }
    }
)

function setFontSize(element){
        let temp = 1.6*(element.textContent.length/10);
        element.style.fontSize=`${5-temp}rem`;
}

function instOperation(element){
    if (element.textContent==="+/-"){
    let temp = result.textContent;
    temp = parseFloat(temp);
    if(!isNaN(temp)){
        if (initialValues.firstNumber===0 || initialValues.firstNumber===temp){
        temp = temp *(-1);
        initialValues.firstNumber=temp;
        result.textContent=temp;
        }
        else {
        temp=temp*(-1);
        initialValues.nextNumber=temp;
        result.textContent=temp;
        initialValues.isInstaOper=true;
        }
        initialValues.isFirstNumber=true;
        initialValues.shouldCalculate=false;
        initialValues.resultFlag=true;
        }

    } else {
        let temp = result.textContent;
    temp = parseFloat(temp);
    if(!isNaN(temp)){
        if (initialValues.firstNumber===0 || initialValues.firstNumber===temp){
        temp = temp /100;
        initialValues.firstNumber=temp;
        result.textContent=temp;
        }
        else {
        temp=temp/100;
        initialValues.nextNumber=temp;
        result.textContent=temp;
        initialValues.isInstaOper=true;
        }
        initialValues.isFirstNumber=true;
        initialValues.shouldCalculate=false;
        initialValues.resultFlag=true;
        }
    }
}

function calculate(){
    if(isNaN(initialValues.firstNumber)){
        initialValues.firstNumber=0;
    }
    switch(initialValues.operation){
        case '+':
            initialValues.finalResult=initialValues.firstNumber+initialValues.nextNumber;
            result.textContent=initialValues.finalResult;
            setFontSize(result);
            break;
        case '-':
            initialValues.finalResult=initialValues.firstNumber-initialValues.nextNumber;
            result.textContent=initialValues.finalResult;
            break;
        case 'x':
            initialValues.finalResult=initialValues.firstNumber*initialValues.nextNumber;
            initialValues.finalResult=Math.round(initialValues.finalResult*1000)/1000;
            setFontSize(result);
            result.textContent=initialValues.finalResult;
            break;
        case '÷':
            if(initialValues.nextNumber!==0){
            initialValues.finalResult=initialValues.firstNumber/initialValues.nextNumber;
            initialValues.finalResult=Math.round(initialValues.finalResult*1000)/1000;
            result.textContent=initialValues.finalResult;
            } else {
                clearCalc();
                result.textContent="Cannot divide by 0";
            }
            break;
        default:
            result.textContent="error";
        }
        initialValues.shouldCalculate=false;
        initialValues.firstNumber=initialValues.finalResult;
        console.log("finalasd", initialValues.firstNumber, "nextNum", initialValues.nextNumber);
}



function fillArray(element){//while there's no operation, it's filling char array
    if(initialValues.resultFlag && !initialValues.isOperation){
        clearCalc();
        initialValues.resultFlag=false;
    }
    initialValues.shouldCalculate=true;
    if (element.textContent==="."){
        initialValues.dotCounter++;
        initialValues.isDot=true;
    }

    if (initialValues.isDot===true && element.textContent==="." && initialValues.dotCounter>1){
        initialValues.dotCounter=1;
    } else if (initialValues.charArray.length<8){
    initialValues.charArray.push(element.textContent);
    if (initialValues.charArray[0]==="0" && !initialValues.isFirstNumber){
        initialValues.charArray=[];
    }
    let temp = initialValues.charArray.join("");
    result.textContent=temp;
    }
}

function prepareCharArray(){
    initialValues.charArray=[];
    initialValues.isDot=false;
    initialValues.dotCounter=0;
    initialValues.isInstaOper=false;
}

function saveFirstNumber(){//save first number when operation button is pressed
    initialValues.firstNumber=parseFloat(initialValues.charArray.join(""));
    initialValues.isFirstNumber=true;
    // console.log("firstnumber",initialValues.firstNumber);
    prepareCharArray();
}
function saveNextNumber(){//save next number when operation button is pressed
    if (initialValues.charArray.length>0 && !initialValues.isInstaOper){
        initialValues.nextNumber=parseFloat(initialValues.charArray.join(""));
    }
    initialValues.isNextNumber=true;
    // console.log("nextNumber", initialValues.nextNumber);
    prepareCharArray();
}

function saveOperation(element){
    initialValues.operation=element.textContent;
    // console.log(initialValues.operation);
}

function clearCalc(){ //clear object values to default when it's pressed
    initialValues.charArray=[];
    initialValues.firstNumber=0;
    initialValues.nextNumber=0;
    initialValues.isFirstNumber=false;
    initialValues.isNextNumber=false;
    result.textContent='0';
    result.style.fontSize="5rem";
}