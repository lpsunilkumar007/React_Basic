using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRUD.Core.DataModel
{
    public  class ApplicationUser:IdentityUser
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [RegularExpression(@"^(?=.*[!@#$%^&*(),.?"":{}|<>])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?"":{}|<>]{10,}$",
 ErrorMessage = "Password must contain at least 10 characters, including at least 1 uppercase letter, at least 1 lowercase letter, at least one number and a special character.")]
        public string Password { get; set; }
        [Required]
        public string Address { get; set; }
    }
}
