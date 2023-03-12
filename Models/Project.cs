using System.ComponentModel.DataAnnotations;

namespace Models;

public class Project
{
    [Key]
    [Required]
    public int ID { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public IList<Task>? TaskList { get; set; }


}