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
document.body.appendChild(form);
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
      li.textContent = `Name: ${employee.fullName}, Email: ${employee.email}, Phone: ${employee.phone}, Date of Birth: ${new Date(employee.dateOfBirth).toLocaleDateString()}, Salary: ${employee.salary}`;
      console.log(typeof this.dateOfBirth);
      //li.textContent = `Name: ${employee.fullName}, Email: ${employee.email}, Phone: ${employee.phone}, Date of Birth: ${employee.dateOfBirth}, Salary: ${employee.salary}`;
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
async addEmployee() {
  const name = document.querySelector(".name-div input").value;
  const email = document.querySelector(".email-div input").value;
  const phone = document.querySelector(".phone-div input").value;
  const dob = document.querySelector(".date-div input").value;
  const salary = document.querySelector(".salary-div select").value;

  const employee = {
    fullname: name,
    email: email,
    phone: phone,
    dateOfBirth: dob,
    salary: salary
  };

  try {
    const response = await fetch('http://localhost:5261/Employee/AddEmployee', {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}






 
  
}

