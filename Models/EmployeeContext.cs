using Microsoft.EntityFrameworkCore;

namespace Models;

public class EmployeeContext : DbContext 
{
    public required DbSet<Employee> Employees { get; set; }
    public required DbSet<Task> Tasks { get; set; }
    public required DbSet<Project> Projects { get; set; }

    public EmployeeContext(DbContextOptions options) : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
      
    }
}