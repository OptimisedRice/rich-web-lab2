window.onload = () => {
    let form = document.getElementById("contactForm");
    form.addEventListener("submit", addContact);

    let nameHeader = document.getElementById("nameHeader");
    nameHeader.addEventListener("click", sortTableByName);

    let contacts = sessionStorage.getItem("contacts");
    contacts = JSON.parse(contacts);
    loadTable(contacts);

    let searchBox = document.getElementById("searchBox");
    searchBox.addEventListener("keyup", filterTableByPhoneNo);
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

const loadTable = (contacts) => {
    let table = document.querySelector("table");
    //clear table
    table.lastElementChild.textContent='';

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

        table.lastElementChild.appendChild(tableRow);
    })
}

const validateInputs = (inputs) => {
    if(inputs.nameInput === '' || inputs.phoneNoInput === '' || inputs.emailInput === '') {
        showInputError("fields should not be empty");
        return false;
    }
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

let sorted = false;
const sortTableByName = (event) => {
    let contacts = tableToArray();
    const compareByName = (a, b) => {
        return a.nameInput.localeCompare(b.nameInput)
    }

    sorted ? contacts.reverse() : contacts.sort(compareByName);
    sorted = !sorted;
    loadTable(contacts);
}

const filterTableByPhoneNo = (event) => {
    let searchInput = event.target.value;
    let contacts = sessionStorage.getItem("contacts");
    contacts = JSON.parse(contacts);
    console.log(searchInput);
    console.log(contacts)
    let filtered = contacts.filter(contact => {
        return contact.phoneNoInput.includes(searchInput);
    })
    filtered.length === 0 ? showNoResult() : hideNoResult();
    loadTable(filtered);
}

const showNoResult = () => {
    let noResult = document.getElementById("noResult").firstElementChild;
    noResult.innerHTML = "No result";
}

const hideNoResult = () => {
    let noResult = document.getElementById("noResult").firstElementChild;
    noResult.innerHTML = "";
}
const tableToArray = () => {
    let contacts = [];
    document
        .querySelectorAll("tbody tr")
        .forEach(tr => {
            let contact = {nameInput: '', phoneNoInput: '', emailInput: ''};
            tr.childNodes.forEach( td => {
                switch (td.cellIndex) {
                    case 0: {
                        contact.nameInput = td.innerText;
                        return;
                    }
                    case 1: {
                        contact.phoneNoInput = td.innerText;
                        return;
                    }
                    case 2: {
                        contact.emailInput = td.innerText;
                        contacts.push(contact);
                        return;
                    }
                }
            })
        });
    return contacts;
}