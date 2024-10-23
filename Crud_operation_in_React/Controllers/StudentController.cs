using CRUD.Core.DataModel;
using CRUD.Service.Services;
using Microsoft.AspNetCore.Mvc;


namespace Crud_operation_in_React.Controllers
{
    [Route("api/Student")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentManager _studentManager;
        public StudentController(StudentManager studentManager)
        {
            _studentManager = studentManager;
        }
        // GET: api/<StudentController>
        [HttpGet]
        public async Task <IActionResult> GetAll()
        {
            var students = await _studentManager.GetAllAsync();
            return Ok(students);
        }

        // GET api/<StudentController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var student =  await _studentManager.GetById(id);
            return Ok(student);
        }

        // POST api/<StudentController>
        [HttpPost]
        public async Task<IActionResult> Post(Student student)
        {
            await _studentManager.Add(student);
            return Ok();
        }

        // PUT api/<StudentController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Student student)
        {

            await _studentManager.Update(id, student);
            return Ok();

        }

        // DELETE api/<StudentController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _studentManager.Delete(id);
            return Ok();
        }
    }
}
