namespace Models;
public class ProjectStatistics
{
    public int Id { get; set; }
    public int TotalTasks { get; set; }
    public int CompletedTasks { get; set; }
    public int IncompleteTasks { get; set; }
    public int ProjectId { get; set; }
    public  virtual Project? Project { get; set; }
}