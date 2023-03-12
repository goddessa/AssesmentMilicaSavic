using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace AssesmentMilicaSavic.Controllers;
[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    public EmployeeContext Context { get; set; }

    public TaskController(EmployeeContext context)
    {
        Context = context;
    }

    //CRUD for Task
    [HttpPost("AddTask")]
    public async Task<ActionResult> AddTask([FromBody] Models.Task task)
    {
        try
        {
            await Context.Tasks.AddAsync(task);
            await Context.SaveChangesAsync();
            return Ok($"ID of added task is : {task.ID}");

        }
        catch(Exception e)
        {
            if (e.InnerException != null)
            {
        // log the inner exception or display its message
                Console.WriteLine(e.InnerException.Message);
            }
            return BadRequest(e.Message);
        }
    }


    [HttpGet("GetTasks")]
    public async Task<ActionResult> GetTasks()
    {
         try
        {
            return Ok(await Context
            .Tasks
            .ToListAsync());
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("UpdateTask/{taskId}")]
    public async Task<ActionResult> UpdateTask([FromBody]Models.Task task, int taskId )
    {
        try
        {
            var oldTask = await Context.Tasks.FindAsync(taskId);
            if(oldTask != null)
            {
                oldTask.Title = task.Title;
                oldTask.Description = task.Description;
                oldTask.Assigne = task.Assigne;
                oldTask.DueDate = task.DueDate;
                Context.Tasks.Update(oldTask);
                await Context.SaveChangesAsync();
                return Ok($"Id of changed task is : {taskId}");

            }
            else
            {
                return BadRequest("Error! ");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("DeleteTask/{idTask}")]
    public async Task<ActionResult> DeleteTask(int idTask)
    {
        try
        {
            var t = await Context.Tasks.FindAsync(idTask);
            if(t != null)
            {
                Context.Tasks.Remove(t);
                await Context.SaveChangesAsync();
                return Ok($"Id of deleted task is : {idTask}");
            }
            else
            {
                return BadRequest("Error");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

//returns a list of Task IDs assigned to a specific employee with the given employeeId:
    [HttpGet("GetTaskIdsByEmployeeId/{employeeId}/tasks")]
    public async Task<ActionResult<List<int>>> GetTaskIdsByEmployeeId(int employeeId)
    {
    var tasks = await Context.Tasks
        .Where(t => t.EmployeeId == employeeId)
        .Select(t => t.ID)
        .ToListAsync();

    return tasks;
    }

//finished tasks
    [HttpGet("GetFinishedExpiredTasks/expired")]
    public IActionResult GetFinishedExpiredTasks()
    {
        var tasks = Context.Tasks
        .Where(t => t.DueDate < DateTime.Now)
        .ToList();
        return Ok(tasks);
    }

//COUNT
    [HttpGet("GetTasksByEmployeeId/{id}/tasks")]
public IActionResult GetTasksByEmployeeId(int id)
{
    var employee = Context.Employees
        .Include(e => e.Tasks)
        .FirstOrDefault(e => e.ID == id);

    if (employee == null)
    {
        return NotFound();
    }

    var tasks = employee.Tasks
        .Where(t => t.DueDate < DateTime.Today)
        .ToList();

    var taskIds = tasks.Select(t => t.ID).ToList();
    var taskCount = tasks.Count();

    return Ok(new { TaskIds = taskIds, TaskCount = taskCount });
}

//all with finished tasks
[HttpGet("GetEmployeesWithMostExpiredTasks")]
public async Task<ActionResult<List<object>>> GetEmployeesWithMostExpiredTasks()
{
    var oneMonthAgo = DateTime.UtcNow.AddMonths(-1);
    var tasks = await Context.Tasks.Where(t => t.DueDate < DateTime.UtcNow && t.DueDate > oneMonthAgo).ToListAsync();

    var taskCountsByEmployeeId = tasks
        .GroupBy(t => t.EmployeeId)
        .ToDictionary(g => g.Key, g => g.Count());

    if (taskCountsByEmployeeId.Count == 0)
    {
        // No tasks have been assigned, so return null or some default value
        return NotFound();
    }

    var topEmployeesWithExpiredTasks = taskCountsByEmployeeId
        .OrderByDescending(kv => kv.Value)
        .Take(5)
        .Select(kv => new
        {
            EmployeeId = kv.Key,
            ExpiredTaskCount = kv.Value
        })
        .ToList();

    return Ok(topEmployeesWithExpiredTasks);
}

//ALL WITH FINISHED TASKS
[HttpGet("GetEmployeesWithMostFinished")]
public async Task<ActionResult<List<object>>> GetEmployeesWithMostFinished()
{
    var tasks = await Context.Tasks.Where(t => t.DueDate < DateTime.UtcNow).ToListAsync();

    var taskCountsByEmployeeId = tasks
        .GroupBy(t => t.EmployeeId)
        .ToDictionary(g => g.Key, g => g.Count());

    if (taskCountsByEmployeeId.Count == 0)
    {
        // No tasks have been assigned, so return null or some default value
        return NotFound();
    }

    var topEmployeeIdsWithTaskCounts = taskCountsByEmployeeId.OrderByDescending(kv => kv.Value).Take(5);

    var results = new List<object>();
    foreach (var kv in topEmployeeIdsWithTaskCounts)
    {
        results.Add(new
        {
            EmployeeId = kv.Key,
            FinishedTaskCount = kv.Value
        });
    }

    return Ok(results);
}

//AVERAGE NUMBER OF TASKS PER EMPLOYEE
[HttpGet("GetAverageTasksPerEmployee")]
public async Task<ActionResult<double>> GetAverageTasksPerEmployee()
{
    var tasks = await Context.Tasks.ToListAsync();

    var taskCountsByEmployeeId = tasks
        .GroupBy(t => t.EmployeeId)
        .ToDictionary(g => g.Key, g => g.Count());

    if (taskCountsByEmployeeId.Count == 0)
    {
        // No tasks have been assigned, so return null or some default value
        return NotFound();
    }

    var totalTaskCount = taskCountsByEmployeeId.Values.Sum();
    var employeeCount = taskCountsByEmployeeId.Keys.Count;
    var averageTasksPerEmployee = (double)totalTaskCount / employeeCount;

    return Ok(averageTasksPerEmployee);
}



}


