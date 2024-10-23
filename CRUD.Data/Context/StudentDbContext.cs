using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRUD.Core.DataModel;

namespace CRUD.Data.Context
{
    public  class StudentDbContext:DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options):base(options)
        {
                
        }
        public DbSet<Student> students { get; set; }

    }
}
