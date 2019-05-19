using Microsoft.EntityFrameworkCore;

namespace ng_core_crud.Models
{
   public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options)
            : base(options)
        {
        }

        public DbSet<TaskItem> Tasks { get; set; }
    }
}