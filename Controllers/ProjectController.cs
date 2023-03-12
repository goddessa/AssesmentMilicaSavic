using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

//project consists of group of tasks that employees have
//it will help us with the statistic
//When all tasks for one project are done, the project is completed

namespace AssesmentMilicaSavic.Controllers;
[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{
    public EmployeeContext Context { get; set; }

    public ProjectController(EmployeeContext context)
    {
        Context = context;
    }

    //CRUD for Project
    

    //first retrieves the employee from the database using the FindAsync method, and throws an exception if the employee is not found.
    /*[HttpPost]
    public async Task<IActionResult> AddProject([FromBody] Project project)
    {
        try
        {
        // Check if the employee exists
        var employeeExists = await Context.Employees.AnyAsync(e => e.ID == project.EmployeeId);

        if (!employeeExists)
        {
            return NotFound("Employee not found");
        }

        // Add the project
        Context.Projects.Add(project);
        await Context.SaveChangesAsync();

        return Ok(project);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex}");
    }
}*/
    [HttpPost("AddProject")]
    public async Task<ActionResult> AddProject([FromBody]Project project)
    {

        try
        {
            await Context.Projects.AddAsync(project);
            await Context.SaveChangesAsync();
            return Ok($"ID of new project is: {project.ID}");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }



    [HttpGet("GetProjects")]
    public async Task<ActionResult> GetProjects()
    {
         try
        {
            return Ok(await Context
            .Projects
            .ToListAsync());
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("UpdateProject/{projectId}")]
    public async Task<ActionResult> UpdateProject([FromBody]Project project, int projectId )
    {
        try
        {
            var oldProject = await Context.Projects.FindAsync(projectId);
            if(oldProject != null)
            {
                oldProject.Name = project.Name;
                oldProject.Description = project.Description;
                oldProject.StartDate = project.StartDate;
                oldProject.EndDate = project.EndDate;
                Context.Projects.Update(oldProject);
                await Context.SaveChangesAsync();
                return Ok($"Id of changed project is : {projectId}");

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

    [HttpDelete("DeleteProject/{idProject}")]
    public async Task<ActionResult> DeleteProject(int idProject)
    {
        try
        {
            var p = await Context.Tasks.FindAsync(idProject);
            if(p != null)
            {
                Context.Tasks.Remove(p);
                await Context.SaveChangesAsync();
                return Ok($"Id of deleted project is : {idProject}");
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

    //Get project by id
    [HttpGet("GetProjectById{id}")]
    public ActionResult<Project> GetProjectById(int id)
    {
        var project = Context.Projects.FirstOrDefault(p => p.ID == id);
        if (project == null)
        {
            return NotFound();
        }
        return Ok(project);
    }

  
   
}
