using Models;

namespace AssesmentMilicaSavic.Controllers;
[ApiController]
[Route("[controller]")]
public class ProjectStatisticController : ControllerBase
{
    public EmployeeContext Context { get; set; }

    public ProjectStatisticController(EmployeeContext context)
    {
        Context = context;
    }

    /*[HttpGet("{id}/statistics")]
    public ActionResult<ProjectStatistics> GetProjectStatistics(int id)
    {
        var project = Context.Projects.FirstOrDefault(p => p.ID == id);
        if (project == null)
        {
            return NotFound();
        }
        var completedTasks = project.Tasks.Count(t => t.IsCompleted);
        var totalTasks = project.Tasks.Count;
        var percentageCompleted = totalTasks == 0 ? 0 : ((decimal)completedTasks / totalTasks) * 100;
        var statistics = new ProjectStatistics
        {
            TotalTasks = totalTasks,
            CompletedTasks = completedTasks,
            PercentageCompleted = percentageCompleted
        };
        return Ok(statistics);
    }*/
}
