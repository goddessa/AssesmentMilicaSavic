using Microsoft.EntityFrameworkCore;

namespace Models;

public class EmployeeContext : DbContext 
{
    public required DbSet<Employee> Employees { get; set; }
    public required DbSet<Task> Tasks { get; set; }
    public required DbSet<Project> Projects { get; set; }
    public required DbSet<ProjectStatistics> Statistics { get; set; }

    public EmployeeContext(DbContextOptions options) : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Employee>(e =>
    {
        e.HasMany<Task>(employee => employee.Tasks)
        .WithOne(task => task.Assigne)
        .HasForeignKey(task => task.EmployeeId);
    });
   modelBuilder.Entity<Project>(e =>
    {
        e.HasMany<Task>(project => project.TaskList)
        .WithOne(task => task.Project)
        .HasForeignKey(task => task.IdProject);
    });

        
}

}