using System.ComponentModel.DataAnnotations;

namespace Crud_operation_in_React.Model
{
    public class Employee
    {
        public  int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Address { get;set; }
    }
}
