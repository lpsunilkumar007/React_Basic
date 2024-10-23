using Crud_operation_in_React.Data;
using Crud_operation_in_React.Migrations;
using Crud_operation_in_React.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crud_operation_in_React.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public LoginController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult SaveEmployeeDetails([FromBody] LoginEmployeeDetail loginEmployeeDetail)
        {
            if (loginEmployeeDetail == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();
            _context.LoginEmployeeDetail.Add(loginEmployeeDetail);
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            return Ok(_context.LoginEmployeeDetail.ToList());
        }
        [HttpGet("{email}/{password}", Name = "GetUserByEmailPassword")]
        public IActionResult GetEmployeeByEmailPassword(string email,string password)
   {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return NotFound();
            }

            // Retrieve the user with matching email and password in one query
            var employee = _context.LoginEmployeeDetail
                            .FirstOrDefault(e => e.Email == email && e.Password == password);

            if (employee == null)
            {
                return NotFound("Invalid email or password");
            }

            return Ok(employee);
        }


        [HttpPost("EmployeeLogin")]
        public IActionResult CheckLoginUser([FromBody] LoginEmployeeDetail form)
        {
            if (form == null) return BadRequest("Invalid request!!");
            //first we check email exist in db or not
            var employee = _context.LoginEmployeeDetail.FirstOrDefault(e => e.Email == form.Email);
            if (employee == null) return BadRequest("Invalid request!!!");
            if (employee.Password != form.Password) return BadRequest("Unauthorized Request!!");
            return Ok(new { message = "Login successful", userId = employee.Id });
            
        }
        [HttpPut("{id}")]
        public IActionResult UpdateAdmin(int id, [FromBody] LoginEmployeeDetail form)
        {
            var adminInDb = _context.LoginEmployeeDetail.Find(id);
            if (adminInDb == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();
            adminInDb.FirstName = form.FirstName;
            adminInDb.LastName = form.LastName;
            adminInDb.Email = form.Email;
            adminInDb.Password = form.Password;
            _context.LoginEmployeeDetail.Update(adminInDb);
            _context.SaveChanges();
            return Ok(adminInDb);
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteAdmin(int id)
        {
            var adminInDB = _context.LoginEmployeeDetail.Find(id);
            if(adminInDB == null) return NotFound();
            _context.Remove(adminInDB);
            _context.SaveChanges();
            return Ok();
        }

    }
}
