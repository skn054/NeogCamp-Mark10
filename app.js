


//set a variable for elements value

const inputBillAmt = document.querySelector("#bill-amount");
const billErrorMessage = document.querySelector(".err-msg");
const inputCashAmount = document.querySelector("#cash-amt");
const calculateButton = document.querySelector("#calculate-btn");
const refundAmount_errorMessage = document.querySelector(".refund-amt-err");
const table = document.getElementById("notes-table");
const notesCount = document.getElementById("notes-count");

var notes = [2000, 500, 100, 20, 10, 5, 1];

for(var i=0;i<notes.length;i++){
    const tableRow = document.createElement("tr");
    const tableData = document.createElement("td");
    tableData.appendChild(document.createTextNode(notes[i]));
    tableRow.appendChild(tableData)
    table.appendChild(tableRow);


    const noteCountRow = document.createElement("tr");
    const noteCountData = document.createElement("td");
    noteCountData.appendChild(document.createTextNode(0));
    noteCountData.classList.add("notes");
    noteCountRow.appendChild(noteCountData)
    notesCount.appendChild(noteCountRow);
}

function clearNotesCount(){
  document.querySelectorAll(".notes").forEach(item =>{
    item.innerText = 0;
  })
}

function calculateButtonClickHandler() {
  console.log("Clicked Calculate button");
  console.log("calculate value",inputCashAmount.value)

  clearNotesCount();

  if (inputBillAmt.value == "" || inputBillAmt.value <= 0){
    billErrorMessage.innerText = "Please enter value";
  }
  else{
    billErrorMessage.innerText = ""
  }

  if(inputCashAmount.value == ''){
    refundAmount_errorMessage.innerText ="Please enter cash amount to calculate.";
  }
  var billAmount = parseInt(inputBillAmt.value);
  var cashAmount = parseInt(inputCashAmount.value);
  console.log(typeof(cashAmount));
  var refundAmount = billAmount - cashAmount;
  var notesCountStore;
  if (billAmount > cashAmount && cashAmount>=0) {
    refundAmount_errorMessage.classList.remove("rfd-amt");
    refundAmount_errorMessage.classList.add("refund-amt-err");
    refundAmount_errorMessage.innerText =
      "You need INR " +
        refundAmount +
      " more from Customer to complete bill payment.";
  }else if (billAmount == cashAmount) {
    refundAmount_errorMessage.classList.remove("refund-amt-err");
    refundAmount_errorMessage.innerText = "Refund amount is: " + refundAmount;
  }else if(cashAmount <=0 || cashAmount == ''){
    refundAmount_errorMessage.classList.add("refund-amt-err");
 refundAmount_errorMessage.innerText = "Please enter value greater than 0";
}
  else if (billAmount < cashAmount && cashAmount>0) {
    refundAmount= cashAmount - billAmount;
    refundAmount_errorMessage.classList.remove("refund-amt-err")
    refundAmount_errorMessage.classList.add("rfd-amt");
    refundAmount_errorMessage.innerText = "Refund amount is: " + refundAmount;
    notesCountStore= notesCalculation(refundAmount);
    console.log(notesCountStore)
    var notesTableNode = document.querySelectorAll(".notes");
    console.log(notesTableNode);
    notesTableNode.forEach((item, idx) => {
        console.log("item is " ,item);
        item.innerText = notesCountStore[idx];
    })
    
  }
}

function notesCalculation(refundAmount){
    var countnotes=0;
    var countArr=[];
    for(var i=0;i<notes.length;i++){
        countnotes=(refundAmount/notes[i]);//checking quotient from quotient we will have a note count
        countArr[i]=parseInt(countnotes);

        countnotes=parseInt(countnotes)
        if( countnotes >=1)(
            refundAmount=refundAmount%notes[i]
        )
    }
    return countArr;
}
calculateButton.addEventListener("click", calculateButtonClickHandler);
