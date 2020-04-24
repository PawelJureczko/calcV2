const result = document.querySelector(".result");
const allButtons = document.querySelector(".allnumbers");

let initialValues = {
    charArray: [],
    firstNumber: 0,
    operation: '',
    nextNumber: 0,
}

allButtons.addEventListener("click", function(e){
    if (e.target.dataset.isnumber==="true"){
        fillArray(e.target);
    }
    else {
        if (e.target.dataset.actiontype==="operation"){
                saveNumber(e.target);
            } else if (e.target.dataset.actiontype==="result"){
                //show result
            } else if (this.dataset.actiontype==="clear"){
                clearCalc();
            }
        }
    }
)

function fillArray(element){//while there's no operation, it's filling char array
    initialValues.charArray.push(element.textContent);
    let temp = initialValues.charArray.join("");
    result.textContent=temp;
}

function saveNumber(element){//save first number when operation button is pressed
    if (initialValues.firstNumber===0 && initialValues.charArray.length>0){
        initialValues.firstNumber=parseFloat(initialValues.charArray.join(""));
    }
    else {
        initialValues.nextNumber=parseFloat(initialValues.charArray.join(""));
    }
    initialValues.operation=element.textContent;
    initialValues.charArray=[];
    console.log(initialValues.firstNumber);
    console.log(initialValues.operation);
    console.log(initialValues.nextNumber);
}

function clearCalc(){ //clear object values to default when it's pressed
    initialValues.charArray=[];
    result.textContent='';
}


