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
    prevOperation: '',
    resultFlag: false,
    isNextNumber: false,
    isOperation: false,
}

allButtons.addEventListener("click", function(e){
    if (e.target.dataset.isnumber==="true"){
        fillArray(e.target);
    }
    else {
        if (e.target.dataset.actiontype==="operation"){
                if(initialValues.firstNumber===0){
                saveFirstNumber(e.target);
                } else {
                saveNextNumber(e.target);
                }
                saveOperation(e.target);
                if(initialValues.operation!==''){
                    if(initialValues.isNextNumber){
                    calculate();
                    }
                    saveNextNumber(e.target);
                }
            } else if (e.target.dataset.actiontype==="result"){
                saveNextNumber(e.target);
                calculate();
                initialValues.resultFlag=true;
            } else if (e.target.dataset.actiontype==="clear"){
                clearCalc();
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

    initialValues.firstNumber=initialValues.finalResult;
}

function fillArray(element){//while there's no operation, it's filling char array
    if(initialValues.resultFlag){
        clearCalc();
        initialValues.resultFlag=false;
    }
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

function saveFirstNumber(element){//save first number when operation button is pressed
    initialValues.firstNumber=parseFloat(initialValues.charArray.join(""));

    console.log("firstnumber",initialValues.firstNumber);
    prepareCharArray();
}
function saveNextNumber(element){//save next number when operation button is pressed
    if (initialValues.nextNumber===0 && initialValues.charArray.length>0){
        initialValues.nextNumber=parseFloat(initialValues.charArray.join(""));
    }
    initialValues.prevOperation=initialValues.operation;
    initialValues.isNextNumber=true;
    prepareCharArray();
}

function saveOperation(element){
    initialValues.operation=element.textContent;
    console.log(initialValues.operation);
    console.log(initialValues.prevOperation);
}

function clearCalc(){ //clear object values to default when it's pressed
    initialValues.charArray=[];
    initialValues.firstNumber=0;
    initialValues.nextNumber=0;
    initialValues.isNextNumber=false;
    result.textContent='';
}


