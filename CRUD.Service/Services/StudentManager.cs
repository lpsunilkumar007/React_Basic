using CRUD.Core.DataModel;
using CRUD.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace CRUD.Service.Services
{
    public class StudentManager
    {
        private readonly StudentDbContext _dbContext;

        //private string _name;


        public StudentManager(StudentDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Here we are saving the data in database.
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        public async Task Add(Student student)
        {

            await _dbContext.students.AddAsync(student);
            await _dbContext.SaveChangesAsync();
        }
        /// <summary>
        /// This is a update method that update the student details we are passing two parameters in this method id and student , here id contain the id of particular student , and in student we have all the data of that  students.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="student"></param>
        /// <returns></returns>
        public async Task Update(int id, Student student)
        {
            var studentInDb = await _dbContext.students.FindAsync(id);
            if (studentInDb != null)
            {
                studentInDb.Name = student.Name;
                studentInDb.Address = student.Address;
                studentInDb.Email = student.Email;
            }
            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Here we are getting single student record  from the database based on id
        /// </summary>
        /// <returns> single student record</returns>
        public async Task<Student> GetById(int id)
        {
            var student = await _dbContext.students.FindAsync(id);
            if (student != null)
                return student;
            else return null;
        }




        /// <summary>
        /// Getall method get all the student from the database.
        /// </summary>
        /// <returns>It returns a collection of students in that table.</returns>
        public async Task<IEnumerable<Student>> GetAllAsync()
        {
            // Async await ??  
            return await _dbContext.students.ToListAsync();
        }

        public async Task Delete(int id)
        {
            var studentInDb = await _dbContext.students.FindAsync(id);
            if (studentInDb != null)
                _dbContext.students.Remove(studentInDb);
            await _dbContext.SaveChangesAsync();

        }


    }
}
