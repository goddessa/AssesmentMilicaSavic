using System.ComponentModel.DataAnnotations;

namespace Models;

public class Task
{
    [Key]
    public int ID { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public Employee assigne { get; set; }
    public DateTime DueDate { get; set; }
    public Project? ProjectId { get; set; }

}