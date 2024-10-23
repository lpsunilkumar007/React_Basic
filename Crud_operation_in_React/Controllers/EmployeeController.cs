using Crud_operation_in_React.Data;
using Crud_operation_in_React.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;

namespace Crud_operation_in_React.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var employeeList = _context.employees.ToList();
            return Ok(employeeList);
        }

        [HttpGet("{employeeId:int}", Name = "GetEmployeeById")]
        public IActionResult GetEmployeeById(int employeeId)
        {
            var employee = _context.employees.Find(employeeId);
            if (employee == null)
                return NotFound();
            //Notfound ka status code 404 hota hai 

            return Ok(employee);

            //sara khel EndPoint ka hi hai 
        }

        [HttpPost]
        public IActionResult SaveEmployee([FromBody] Employee employee)
        {
            if (employee == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();
            _context.employees.Add(employee);
            _context.SaveChanges();
            return Ok();

        }
        [HttpPut("{id}")] // Use {id} in the route
        public IActionResult UpdateEmployee(int id, [FromBody] Employee employee)
        {
            if (employee == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();

            // Check if the employee exists
            var existingEmployee = _context.employees.Find(id);
            if (existingEmployee == null) return NotFound();

            // Update employee properties
            existingEmployee.Name = employee.Name;
            existingEmployee.Email = employee.Email;
            existingEmployee.Address = employee.Address;
            existingEmployee.DateOfBirth = employee.DateOfBirth;

            _context.employees.Update(existingEmployee);
            _context.SaveChanges();
            return Ok(existingEmployee); // Return the updated employee or a success message
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employeeInDb = _context.employees.Find(id);
            if(employeeInDb == null) return NotFound(); 
            _context.employees.Remove(employeeInDb);
            _context.SaveChanges();
            return Ok();
        }

    }
}
