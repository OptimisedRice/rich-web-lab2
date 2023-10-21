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
