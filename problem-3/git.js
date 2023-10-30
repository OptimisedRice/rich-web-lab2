window.onload = () => {
    let search = document.getElementById("usernameForm");
    search.addEventListener("submit", searchUser);
}

const searchUser = (event) => {
    event.preventDefault();

    let nameInput = event.target.querySelector("#usernameInput").value;
    let response;
    fetch('https://api.github.com/users/' + nameInput)
        .then(res => res.json())//response type
        .then(data => {
            response = data;
            loadInfo(response);
        });
}

const loadInfo = async (data) => {
    let profileTable = document.querySelector("#profileTable");
    //get references
    let avatar = profileTable.querySelector("#avatar")
    let name = profileTable.querySelector("#name");
    let username = profileTable.querySelector("#username");
    let email = profileTable.querySelector("#email");
    let location = profileTable.querySelector("#location");
    let gists = profileTable.querySelector("#gists");

    avatar.setAttribute("src", validateData(data["avatar_url"]))
    name.textContent = "Name: " + validateData(data["name"]);
    username.textContent = "Username: " + validateData(data["login"]);
    email.textContent = "Email: " + validateData(data["email"]);
    location.textContent = "Location: " + validateData(data["location"]);
    gists.textContent = "Number of Gists: " + validateData(data["public_gists"]);

    let repos;
    await fetch(data["repos_url"])
        .then(res => res.json())//response type
        .then(data => {
            repos = data;
        });
    let userRepos = document.querySelector("#userRepos")
    if(repos.length > 5) {
        userRepos.style.overflow = "scroll";
        userRepos.style.maxHeight = "90vh";
    } else {
        userRepos.style.overflow = "visible";
        userRepos.style.maxHeight = "none";
    }

    let reposTable = document.querySelector("#reposTable");
    reposTable.firstElementChild.textContent = ''
    reposTable.firstElementChild.innerHTML = repos.map(repo => {
        return "<tr><td>" +
            "<p>Name: " + validateData(repo["name"]) + "</p>" +
            "<p>Description: " + validateData(repo["description"]) + "</p>" +
            "</td></tr>"
    }).join("");
}

const validateData = (data) => {
    if(data === null || data === undefined) {
        return ""
    } else {
        return data;
    }
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