using System.ComponentModel.DataAnnotations;

namespace Models;

public class Task
{
    [Key]
    [Required]
    public int ID { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public int? EmployeeId { get; set; }
    public Employee? Assigne { get; set; } //employee that has that task
    
    public int? IdProject { get; set; }
    public Project? Project { get; set; }
    public DateTime DueDate { get; set; }
   

}