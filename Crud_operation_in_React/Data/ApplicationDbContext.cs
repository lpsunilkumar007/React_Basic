using Crud_operation_in_React.Model;
using Microsoft.EntityFrameworkCore;

namespace Crud_operation_in_React.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
                
        }
        public DbSet<Employee> employees { get; set; }
        public DbSet<LoginEmployeeDetail> LoginEmployeeDetail { get; set; }
    }
}
