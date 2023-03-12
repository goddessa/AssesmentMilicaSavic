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
   //update
   const updateDiv = document.createElement("div");
    updateDiv.classList.add("update-div");
    updateDiv.style.backgroundColor = "#219ebc";
    formDiv.appendChild(updateDiv);

    const update = document.createElement("label");
    update.textContent = "ID for update:";
    updateDiv.appendChild(update);

    const updateLabel = document.createElement("input");
    updateLabel.type="number";
    update.appendChild(updateLabel);

    const updateButton = document.createElement("div");
    updateButton.classList.add("update-button");
    updateDiv.appendChild(updateButton);

    const updateEmployees = document.createElement("input");
    updateEmployees.type = "button";
    updateEmployees.value = "Update";
    updateButton.appendChild(updateEmployees);

    // get reference to the update button and input fields
const updateId = updateLabel;
const updateName = nameLabel;
const updateEmail = emailLabel;
const updatePhone = phoneLabel;
const updateDate = dateInput;
const updateSalary = salaryOptions;

const updateEmployeesButton = updateEmployees;

// add event listener for clicking the update button
updateEmployeesButton.addEventListener("click", () => {
  const id = updateId.value;
  const fullName = updateName.value;
  const email = updateEmail.value;
  const phone = updatePhone.value;
  const dateOfBirth = updateDate.value;
  const salary = updateSalary.value;

  // make sure all fields are filled out
  if (!id || !fullName || !email || !phone || !dateOfBirth || !salary) {
    alert("Please fill out all fields!");
    return;
  }

  // make PUT request to server to update employee
  fetch(`http://localhost:5261/Employee/UpdateEmployee/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Name: fullName,
      Email: email,
      PhoneNumber: phone,
      DateOfBirth: dateOfBirth,
      Salary: salary
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Employee updated successfully!");
      // clear input fields
      updateId.value = "";
      updateName.value = "";
      updateEmail.value = "";
      updatePhone.value = "";
      updateDate.value = "";
      updateSalary.selectedIndex = 0;
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

   
  
    //delete employees div
    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("delete-div");
    deleteDiv.style.backgroundColor = "#cdb4db";
    glavniDiv.appendChild(deleteDiv);

    const deleteId = document.createElement("label");
    deleteId.textContent = "ID for delete:";
    deleteDiv.appendChild(deleteId);

    const deleteLabel = document.createElement("input");
    deleteLabel.type="number";
    deleteId.appendChild(deleteLabel);

    const deletButton = document.createElement("div");
    deletButton.classList.add("delete-button");
    deleteDiv.appendChild(deletButton);

    const deleteEmployees = document.createElement("input");
    deleteEmployees.type = "button";
    deleteEmployees.value = "Delete";
    deletButton.appendChild(deleteEmployees);
    


const form = document.createElement("form");
form.style.backgroundColor = "#80ed99";
// Create the form elements
const listButtonDiv = document.createElement("div");
const listButton = document.createElement("input");
listButton.type = "button";
listButton.value = "List all employees";
const employeeListDiv = document.createElement("div");

// Add the button to the form
listButtonDiv.appendChild(listButton);
form.appendChild(listButtonDiv);

// Add the employee list to the form
form.appendChild(employeeListDiv);

// Add the form to the page
document.body.appendChild(form);

// Add a click event listener to the button
listButton.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:5261/Employee/GetEmployee");
    const employees = await response.json();
    console.log(employees); // do something with the employees

    // Create an unordered list to display the employees
    const ul = document.createElement("ul");

    // Loop through the employees and add each one to the list
    employees.forEach((employee) => {
      const li = document.createElement("li");
      li.style.display = "block";
      li.textContent = `Name: ${employee.fullName}, Email: ${employee.email}, Phone: ${employee.phone}, Date of Birth: ${employee.dateOfBirth}, Salary: ${employee.salary}`;
      ul.appendChild(li);
    });

    // Add the list to the page
    employeeListDiv.innerHTML = "";
    employeeListDiv.appendChild(ul);
  } catch (error) {
    console.error(error);
  }
});


  //Average salary display
  const avgDiv = document.createElement("div");
  avgDiv.classList.add("avg-div");
  avgDiv.style.backgroundColor = "#219ebc"
  glavniDiv.appendChild(avgDiv);

  const avgButton = document.createElement("div");
    avgButton.classList.add("avg-button");
    avgDiv.appendChild(avgButton);

    const avg = document.createElement("input");
    avg.type = "button";
    avg.value = "Average Salary";
    avgButton.appendChild(avg);
    //display ->>WORKS
  // Add a click event listener to the button
  avg.addEventListener("click", async () => {
    try {
    const response = await fetch("http://localhost:5261/Employee/GetAverageSalary");
    const avgSalary = await response.json();
    console.log(avgSalary); // do something with the average salary

    // Display the average salary on the page
    const avgSalaryDiv = document.createElement("div");
    avgSalaryDiv.textContent = `The average salary is ${avgSalary}`;
    avgDiv.appendChild(avgSalaryDiv);
  } catch (error) {
    console.error(error);
  }
});

    




}


 
  
}

