using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public class Employee
{
    [Key]
    public int ID { get; set; }
    public required string FullName { get; set; }
    public required string Email { get; set; }
    public required int Phone { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Salary { get; set; }
    public IList<Task>? Tasks { get; set; }

}