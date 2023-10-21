window.onload = () => {
    let form = document.getElementById("contactForm");
    form.addEventListener("submit", addContact);
    loadTable();
}

const addContact = (event) => {
    event.preventDefault();

    let nameInput = event.target.querySelector("#name").value;
    let phoneNoInput = event.target.querySelector("#phoneNo").value;
    let emailInput = event.target.querySelector("#email").value;
    let contact = {nameInput, phoneNoInput, emailInput};
    if (validateInputs(contact)) {
        let contacts = [];
        if(sessionStorage.getItem("contacts") === null) {
            contacts.push(contact);
        } else {
            contacts = sessionStorage.getItem("contacts");
            contacts = JSON.parse(contacts);
            contacts.push(contact);
        }
        sessionStorage.setItem("contacts", JSON.stringify(contacts));
        console.log(contacts)
        location.reload();
    }
}

const loadTable = () => {
    let table = document.querySelector("table");
    let contacts = sessionStorage.getItem("contacts");
    contacts = JSON.parse(contacts);

    contacts.map(contact => {
        let tableRow = document.createElement("tr");
        let tableCellName = document.createElement("td");
        tableCellName.appendChild(document.createTextNode(contact.nameInput));

        let tableCellPhone = document.createElement("td");
        tableCellPhone.appendChild(document.createTextNode(contact.phoneNoInput));

        let tableCellEmail = document.createElement("td");
        tableCellEmail.appendChild(document.createTextNode(contact.emailInput));

        tableRow.appendChild(tableCellName);
        tableRow.appendChild(tableCellPhone);
        tableRow.appendChild(tableCellEmail);

        table.appendChild(tableRow);
    })
}

const validateInputs = (inputs) => {
    //validate name
    let onlyLettersAndWhitespace = /[^A-Z ]/gi;
    if(onlyLettersAndWhitespace.test(inputs.nameInput)) {
        showInputError("name should contain only Alphabets and Space");
        return false;
    }
    if(inputs.nameInput.length > 20) {
        showInputError("name should be less than or equal to 20 characters in length");
        return false;
    }

    //validate mobile number
    let onlyNumbers = /[^0-9]/gi;
    if(onlyNumbers.test(inputs.phoneNoInput)) {
        showInputError("phone number should contain only numbers");
        return false;
    }
    if(inputs.phoneNoInput.length !== 10) {
        showInputError("phone number should be 10 digits in length");
        return false;
    }

    //validate email
    let emailRegExp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    if(!emailRegExp.test(inputs.emailInput)) {
        showInputError("incorrect email format")
        return false;
    }
    if(inputs.emailInput.length >= 40) {
        showInputError("email should be less than 40 characters in length");
        return false;
    }

    return true
}

const showInputError = (text) => {
    let error = document.getElementById("error").firstElementChild;
    error.innerHTML = "Error: " + text;
}