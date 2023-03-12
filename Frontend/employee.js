export class Employee
{
    constructor(host, id, fullname, email, phone, dateOfBirth, salary)
    {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.salary = salary;
        this.host = host;
    
}


crtaj(host)
{
    /*Employee.prototype.crtaj = function(host){
        if (!host) {
          console.error('Invalid host element');
          return;
        }*/

   const glavniDiv = document.createElement("div");
   glavniDiv.classList.add("glavni-div");
   this.glavni = glavniDiv;
   host.appendChild(glavniDiv);

   const formDiv = document.createElement("div");
   formDiv.classList.add("form-div");
   glavniDiv.appendChild(formDiv);
  
   //FULLNAME
   const nameDiv = document.createElement("div");
   nameDiv.classList.add("name-div");
   nameDiv.style.backgroundColor = "#ffafcc"
   formDiv.appendChild(nameDiv);

   const name = document.createElement("label");
   name.textContent = "Full name: ";
   nameDiv.appendChild(name);

   const nameLabel = document.createElement("input");
   nameLabel.type = "text";
   name.appendChild(nameLabel);

   //EMAIL
   const emailDiv = document.createElement("div");
   emailDiv.classList.add("email-div");
   emailDiv.style.backgroundColor = "#ffafcc"
   formDiv.appendChild(emailDiv);

   const email = document.createElement("label");
   email.textContent = "Email: ";
   emailDiv.appendChild(email);

   const emailLabel = document.createElement("input");
   emailLabel.type = "text";
   email.appendChild(emailLabel);

   //PHONE NUMBER
   const phoneDiv = document.createElement("div");
   phoneDiv.classList.add("phone-div");
   phoneDiv.style.backgroundColor = "#ffafcc"
   formDiv.appendChild(phoneDiv);

   const phone = document.createElement("label");
   phone.textContent = "Phone number: ";
   phoneDiv.appendChild(phone);

   const phoneLabel = document.createElement("input");
   phoneLabel.type = "number";
   phone.appendChild(phoneLabel);
   
   //DATE OF BIRTH
   const dateDiv = document.createElement("div");
   dateDiv.classList.add("date-div");
   dateDiv.style.backgroundColor = "#ffafcc"
   formDiv.appendChild(dateDiv);

   const date = document.createElement("label");
   date.textContent = "Date of birth: ";
   dateDiv.appendChild(date);

   const dateInput = document.createElement("input");
   dateInput.type = "date";
   date.appendChild(dateInput);

   //SALARY
   const salaryDiv = document.createElement("div");
   salaryDiv.classList.add("salary-div");
   salaryDiv.style.backgroundColor = "#ffafcc"
   formDiv.appendChild(salaryDiv);

   const salary = document.createElement("label");
   salary.textContent = "Salary : ";
   salaryDiv.appendChild(salary);

   const salaryOptions = document.createElement("select");
   for (let i = 40000; i <= 250000; i += 5000) {
   const option = document.createElement("option");
   option.value = i;
   option.text = i;
   salaryOptions.appendChild(option);
}
salary.appendChild(salaryOptions);

//DUGME
  const dugmeDiv = document.createElement("div");
   dugmeDiv.classList.add("dugme-div");
   dugmeDiv.style.backgroundColor = "#ffafcc"
   formDiv.appendChild(dugmeDiv);

   const button = document.createElement("input");
   button.type = "button";
   button.value = "Add Employee";
   dugmeDiv.appendChild(button);
   
   button.onclick = () => {
    const fullName = nameLabel.value;
    const email = emailLabel.value;
    const phoneNumber = phoneLabel.value;
    const dateOfBirth = dateInput.value;
    const salary = salaryOptions.value;
    
    const employee = {
      FullName: fullName,
      Email: email,
      PhoneNumber: phoneNumber,
      DateOfBirth: dateOfBirth,
      Salary: salary
    };
    
    const url = 'http://localhost:5261/Employee/AddEmployee';
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    };
    
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          alert("Employee added successfully");
        } else {
          alert("Error adding employee");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Error adding employee");
      });
  };
  
//Za izlistanje zaposlenih
    const listDiv = document.createElement("div");
    listDiv.classList.add("list-div");
    listDiv.style.backgroundColor = "#219ebc";
    glavniDiv.appendChild(listDiv);

    const getAllEmployeesButton = document.createElement("input");
    getAllEmployeesButton.type = "button";
    getAllEmployeesButton.value = "List all";
    listDiv.appendChild(getAllEmployeesButton);
    
    /*// Get the button and form elements from the DOM
    getAllEmployeesButton = document.getElementById('getAllEmployeesButton');

    const employeeListForm = document.createElement("div");
    employeeListForm.classList.add("list-form");
    listDiv.appendChild(employeeListForm);
    employeeListForm = document.getElementById('employeeListForm');
    getAllEmployeesButton.addEventListener('click', async () => {
  // Send a GET request to the API endpoint
    const response = await fetch('http://localhost:5261/Employee/GetEmployee');
    const data = await response.json();

  // Clear the form before adding new employee data
    employeeListForm.innerHTML = '';

  // Loop through the data and create a div element for each employee
    data.forEach(employee => {
    const employeeDiv = document.createElement('div');
    employeeDiv.classList.add('employee');
    listDiv.appendChild(employeeDiv);
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.innerHTML = `<span>Name:</span> ${employee.fullname}`;
    employeeDiv.appendChild(nameDiv);

    const emailDiv = document.createElement('div');
    emailDiv.classList.add('email');
    emailDiv.innerHTML = `<span>Email:</span> ${employee.email}`;
    employeeDiv.appendChild(emailDiv);

    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('phone');
    phoneDiv.innerHTML = `<span>Phone:</span> ${employee.phone}`;
    employeeDiv.appendChild(phoneDiv);

    const dobDiv = document.createElement('div');
    dobDiv.classList.add('dob');
    dobDiv.innerHTML = `<span>Date of Birth:</span> ${employee.dateOfBirth}`;
    employeeDiv.appendChild(dobDiv);

    const salaryDiv = document.createElement('div');
    salaryDiv.classList.add('salary');
    salaryDiv.innerHTML = `<span>Salary:</span> ${employee.salary}`;
    employeeDiv.appendChild(salaryDiv);

    employeeListForm.appendChild(employeeDiv);
  });
});*/

    

}


 
  
}

