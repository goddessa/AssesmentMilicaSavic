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

    [HttpPut("UpdateTask/{taskID}")]
    public async Task<ActionResult> UpdateTask([FromBody]Models.Task task, int taskId )
    {
        try
        {
            var oldTask = await Context.Tasks.FindAsync(taskId);
            if(oldTask != null)
            {
                oldTask.Title = task.Title;
                oldTask.Description = task.Description;
                oldTask.assigne = task.assigne;
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

    //Top 5 employees who finished the tasks in past month
/*[HttpGet("GetTopAssignees")]
public ActionResult<IEnumerable<Employee>> GetTopAssignees()
{
    
}*/
//Finished tasks
/*[HttpGet("tasks/finished")]
public ActionResult<IEnumerable<Models.Task>> GetFinishedTasks()
{
    var finishedTasks = Conte.Tasks.Where(t => t.IsFinished == true).ToList();

    if (finishedTasks == null || finishedTasks.Count == 0)
    {
        return NotFound("No finished tasks found.");
    }

    return finishedTasks;
}*/
}