let ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list"));
let list = [];
let list_all_months = [];

function calculateTotal(type, list){
    let sum = 0;

    list.forEach( entry => {
        if( entry.type == type ){
            sum += entry.amount;
        }
    })

    return sum;
}

let income = calculateTotal("income", ENTRY_LIST);
let outcome = calculateTotal("expense", ENTRY_LIST);

function calculateBalance(income, outcome){
    return income - outcome;
}

let balance = Math.abs(calculateBalance(income, outcome));

const tab_months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

const array = [0,1,2,3,4,5,6,7,8,9,10,11];

const save_Btn = document.querySelector(".save_button");
const pop_up = document.querySelector(".Validation"); 
const save_NoBtn = document.querySelector(".no_button");
const save_YesBtn = document.querySelector(".yes_button");
const Mo_container = document.querySelector(".container2");
const Ma_container = document.querySelector(".container");
const liMonths = document.querySelector(".list_months");

save_Btn.addEventListener("click", function(){
    pop_up.classList.remove("inactive");
    pop_up.classList.add("show");
})

save_NoBtn.addEventListener("click",function(){
    pop_up.classList.add("inactive");
    pop_up.classList.remove("show")
})


save_YesBtn.addEventListener("click",function(){
   Ma_container.classList.add("inactive");
   Mo_container.classList.remove("inactive");
   Update_months(liMonths);
   alert(" The current month has been stored and added to the history. Your  budget will be reset");
})

var d = new Date();
var id = d.getMonth();
const ActMonth = tab_months[id];


let month_id = {
    id_month : id,
    outcome_month : outcome,
    income_month : income,
    balance_month : balance
};
list.push(month_id);

function Update_months(list,id) {
    const month = ` <li id = "${id}">
                        ${ActMonth}          
                    </li>`;
    
    const position = "afterbegin";
    list.insertAdjacentHTML(position,month);
}

const Mo_data= document.querySelector(".list2");
const To_data= document.querySelector(".total_month");

liMonths.addEventListener("click", opendata);

var click_button = 0;

function opendata(event) {
    const targetdata = event.target;
    let num = targetdata.id;
    if (click_button %2 == 0){
        if(array.indexOf(num)){
            opendata_list(id);
            click_button ++;
        }
    }
    else{
        To_data.classList.add("opacity");
        click_button ++;
    }
}

let click_button_month = 0;
function opendata_list(id) {
    if(click_button_month == 0){
        const foundmonth= list.find((item) => {
        return item.id_month == id;
         })
        const month_list = `
        <li id = "${id}">
        <div>
            <h1>${ActMonth} 2021</h1>
            <p>Income for ${ActMonth} 2021 : ${foundmonth.income_month}$</p>
            <p>Total expenses : ${foundmonth.outcome_month}$</p>
        </div>
        <p>Balance : ${foundmonth.balance_month}$ </p>
        </li>`;
        const position = "afterbegin";
        Mo_data.insertAdjacentHTML(position,month_list);
        click_button_month ++;
    }
    To_data.classList.remove("opacity");
}
