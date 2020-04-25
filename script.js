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
}

allButtons.addEventListener("click", function(e){
    if (e.target.dataset.isnumber==="true"){
        fillArray(e.target);
    }
    else {
        if (e.target.dataset.actiontype==="operation"){
            initialValues.isOperation=true;
            if(!initialValues.isFirstNumber){
                initialValues.isFirstNumber=true;
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
        }
    }
}
)

function calculate(){
    switch(initialValues.operation){
        case '+':
            initialValues.finalResult=initialValues.firstNumber+initialValues.nextNumber;
            result.textContent=initialValues.finalResult;
            break;
        case '-':
            initialValues.finalResult=initialValues.firstNumber-initialValues.nextNumber;
            result.textContent=initialValues.finalResult;
            break;
        case 'x':
            initialValues.finalResult=initialValues.firstNumber*initialValues.nextNumber;
            result.textContent=initialValues.finalResult;
            break;
        case '÷':
            initialValues.finalResult=initialValues.firstNumber/initialValues.nextNumber;
            result.textContent=initialValues.finalResult;
            break;
        default:
            result.textContent="error";
        }
        initialValues.shouldCalculate=false;
    initialValues.firstNumber=initialValues.finalResult;
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
    } else {
    initialValues.charArray.push(element.textContent);
    if (initialValues.charArray[0]==="0"){
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
}

function saveFirstNumber(){//save first number when operation button is pressed
    initialValues.firstNumber=parseFloat(initialValues.charArray.join(""));

    console.log("firstnumber",initialValues.firstNumber);
    prepareCharArray();
}
function saveNextNumber(){//save next number when operation button is pressed
    if (initialValues.charArray.length>0){
        initialValues.nextNumber=parseFloat(initialValues.charArray.join(""));
    }
    initialValues.isNextNumber=true;
    console.log("nextNumber", initialValues.nextNumber);
    prepareCharArray();
}

function saveOperation(element){
    initialValues.operation=element.textContent;
    console.log(initialValues.operation);
}

function clearCalc(){ //clear object values to default when it's pressed
    initialValues.charArray=[];
    initialValues.firstNumber=0;
    initialValues.nextNumber=0;
    initialValues.isFirstNumber=false;
    initialValues.isNextNumber=false;
    result.textContent='';
}


