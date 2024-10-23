using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRUD.Core.RequestResponse
{
    public class ResetPasswordModel
    {
        [Required]
        [DataType(DataType.Password)]
        [RegularExpression(@"^(?=.*[!@#$%^&*(),.?"":{}|<>])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?"":{}|<>]{10,}$",
 ErrorMessage = "Password must contain at least 10 characters, including at least 1 uppercase letter, at least 1 lowercase letter, at least one number and a special character.")]
        public string? Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        [DataType(DataType.Password)]
        [RegularExpression(@"^(?=.*[!@#$%^&*(),.?"":{}|<>])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?"":{}|<>]{10,}$",
 ErrorMessage = "Password must contain at least 10 characters, including at least 1 uppercase letter, at least 1 lowercase letter, at least one number and a special character.")]
        public string? ConfirmPassword { get; set; }

        [Required]
        [EmailAddress]
        [RegularExpression(@"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", ErrorMessage = "Please enter a valid email address")]
        public string? Email { get; set; }

        [Required]
        public string? Token { get; set; }
    }

}
