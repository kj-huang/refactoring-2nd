function printOwing(){
    let outstanding = 0;

    console.log("*************************");
    console.log("******Customer Owes******");
    console.log("*************************");


    //calculate outstanding
    for(const o of invoice.orders){
        outstanding = o.amount;
    }

    //log the due date
    const today = Clock.today;

    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    //print detail
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}