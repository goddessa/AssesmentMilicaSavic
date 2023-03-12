using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace AssesmentMilicaSavic.Controllers;
[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    public EmployeeContext Context { get; set; }

    public EmployeeController(EmployeeContext context)
    {
        Context = context;
    }

    //CRUD OPERATIONS FOR EMPLOYEE
    [HttpPost("AddEmployee")]
    public async Task<ActionResult> AddEmployee([FromBody]Employee employee)
    {

        try
        {
            var existingEmployee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Email == employee.Email);

            if (existingEmployee != null)
            {
                return BadRequest($"An employee with email '{employee.Email}' already exists.");
            }
             else
            {
            await Context.Employees.AddAsync(employee);
            await Context.SaveChangesAsync();
            return Ok($"ID of new employee is: {employee.ID}");
            }
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetEmployee")]
    public async Task<ActionResult> GetEmployees()
    {
        try
        {
            return Ok(await Context
            .Employees
            .ToListAsync());
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("UpdateEmployee/{employeeID}")]
    public async Task<ActionResult> UpdateEmployee([FromBody]Employee employee, int employeeID)
    {
        try
        {
            var oldEmployee = await Context.Employees.FindAsync(employeeID);
            if(oldEmployee != null)
            {
                oldEmployee.FullName = employee.FullName;
                oldEmployee.Email = employee.Email;
                oldEmployee.DateOfBirth = employee.DateOfBirth;
                oldEmployee.Phone = employee.Phone;
                oldEmployee.Salary = employee.Salary;
                Context.Employees.Update(oldEmployee);
                await Context.SaveChangesAsync();
                return Ok($"ID of updated employee is: {employeeID}");
            }
            else
            {
                return BadRequest("Error!");

            }
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);

        }
    }

    [HttpDelete("DeleteEmployee/{IdEmployee}")]
    public async Task<ActionResult> DeleteEmployee(int IdEmployee)
    {
        try
        {
            var emp = await Context.Employees.FindAsync(IdEmployee);
            if(emp != null)
            {
                Context.Employees.Remove(emp);
                await Context.SaveChangesAsync();
                return Ok($"ID of deleted employee is: {IdEmployee}");
            }
            else
            {
                return BadRequest($"Not found employee with ID : {IdEmployee}");
            }
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //ADDED MY FUNCTION
    [HttpGet("GetAverageSalary")]
    public async Task<ActionResult> GetAverageSalary()
    {
        try
        {  
            var employees = Context.Employees.Count();
            var totalSalary = Context.Employees.Sum(e =>e.Salary);
            var averageSalary = totalSalary / employees;
            return Ok(averageSalary);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //sort employees by salary
    [HttpGet("SortEmployeesBySalaryDescending")]
    public ActionResult<IEnumerable<Employee>> SortEmployeesBySalaryDescending()
    {
        var sortedEmployees = Context.Employees.OrderByDescending(e => e.Salary).ToList();
        if (sortedEmployees == null)
        {
            return NotFound();
        }
        return Ok(sortedEmployees);
}

[HttpGet("GetEmployeeWithHighestSalary")]
public async Task<ActionResult<Employee>> GetEmployeeWithHighestSalary()
{
    var employee = await Context.Employees.OrderByDescending(e => e.Salary).FirstOrDefaultAsync();

    if (employee == null)
    {
        return NotFound();
    }

    return employee;
}
}
