const Yarg = require('Yarg')



const customer_Data = {
    'Abbas': {
        customer_id: '001',
        customer_name: 'Abbas',
        customer_email: 'abbas@umkc.edu'
    },
    'Claude': {
        customer_id: '034',
        customer_name: 'Claude',
        customer_email: 'claude@umkc.edu'
    },
    'Paul': {
        customer_id: '100',
        customer_name: 'Paul',
        customer_email: 'paul@umkc.edu'
    },
    'Marc': {
        customer_id: '340',
        customer_name: 'Marc',
        customer_email: 'marc@umkc.edu'
    }
}
// add a new customer
if (command ==='add'){
    var customer= customers.addcustomer(argv.customer_id,argv.customer_name,argv.customer_email);
    if(customer){
        customers.logCustomer(customer);
    }else{
    console.log("Customer already exists");
    }

}


// list all the customers
  else if (command ==='list'){
    var Allcustomers= customers.getAll();
            console.log('Printing ${Allcustomers.lengh} note(s). ');
  Allcustomers.forEach((customer)=>{
    customers.logcustomer(customer);
  });
}
    }

// update a customer
// fetching the customer
    var fetchCustomer= () => {
    try{
        var customerString = yarg.readFilesSync ('customers-data.json')
        return Json.parse(customerString);
    } catch(e){
      return[];
    }
    };
// saving the new information of the customer
var saveCustomer= (customer) => {
    yarg.writeFilesSync ('customers-data.json',Json.stringify(customers));
            };


//Delete a customer
app.delete('/customer/:id', (req, res) => {
    const customer = customers[req.params.id]

    if (!customer) {
        return res.sendStatus(404)
    }

    delete customers[req.params.id];

    res.sendStatus(200)
})


