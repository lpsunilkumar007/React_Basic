using System.ComponentModel.DataAnnotations;

namespace Crud_operation_in_React.Model
{
    public class LoginEmployeeDetail
    {
        [Key]
        public int Id { get; set; }
        
        public string?  FirstName { get; set; }
      
        public string? LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email  { get; set; }
        [Required]
        public string  Password { get; set; }
    }
}
