using CRUD.Core.DataModel;
using CRUD.Core.RequestResponse;
using CRUD.Identity.Identity;
using CRUD.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace Crud_operation_in_React.Controllers
{
    [Route("api/identityUser")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        #region Dependency Injection and initalization
        private readonly UserManager _userAccount;
        private readonly string _senderEmail;
        private readonly string _senderName;
        private readonly EmailSender _emailSender;


        public AccountController(UserManager userAccount, IConfiguration configuration, EmailSender emailSender)
        {
            _userAccount = userAccount;
            _emailSender = emailSender;
            _senderEmail = configuration["BrevoApiKey:SenderEmail"];
            _senderName = configuration["BrevoApiKey:SenderName"];
        }
        #endregion

        #region Registration
        /// <summary>
        /// Register endpoint for user, through this new user can register into the application.
        /// </summary>
        /// <param name="user"></param>
        /// <returns>return ok is user registeration is successful and if registration is not true then it will return badrequest error</returns>
        ///
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register( [Required][FromBody] UserRegisterationModel userRegisterationModel)
        {
            if (userRegisterationModel == null)
                return BadRequest("User object is null.");
            if (!ModelState.IsValid)
                return BadRequest();

            var registrationSuccess = await _userAccount.Registration(userRegisterationModel);
            /*if the registrationSuccess is true then we are setting up the some variable that we are going to pass through SendEmail method */
            string reciverEmail = userRegisterationModel.Email;
            string reciverName = userRegisterationModel.Name;
            string subject = "Please confirm your email address";
            string message = "Dear User " + reciverName + " Your email " + reciverEmail + " has been confirmed";
            if (registrationSuccess)
            {
                //here calling SendEmail method of EmailSender Class and passing some arguments to it.
                EmailSender.SendEmail(_senderEmail, _senderName, reciverEmail, reciverName, subject, message);
                return Ok("User registered successfully.");
            }
            return BadRequest("User registration failed.");
        }
        #endregion

        #region Login

        /// <summary>
        /// Login to user account using email and password, here we are calling a method LoginAsync that we have created on the identity class library project.
        /// </summary>
        /// <param name="email">User email that user enter while login</param>
        /// <param name="password">User Password that user enter while login</param>
        /// <returns>returning the status 200 if login is successfull and if result is not true means something went wrong while login then it will return statuscode of 500 which means internal servier error</returns>

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([Required][FromBody] UserLoginModel loginModel)
        {
            if (loginModel == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest("Invalid Email or password enter");
            var result = await _userAccount.Login(loginModel);
            if (result is true)
                return Ok("User Successfully Login");
            else
                return StatusCode(StatusCodes.Status500InternalServerError);
        }
        #endregion

        #region ForgetPassword
        /// <summary>
        /// Forget password endpoint is use to when user forget password by using user email address we can find the user the and generate token to reset password and that token link to user email.
        /// </summary>
        /// <param name="email"></param>
        /// <returns>Return ok if result is true means token in send to the user email account and if the the result is false then it will return bad request error.</returns>

        [HttpPost("forgetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgetPassword([Required] [FromBody]ForgetPasswordModel forgetPasswordModel)
        {
            if (forgetPasswordModel == null)
                return BadRequest();
            var result = await _userAccount.ForgetPassword(forgetPasswordModel);
            if (result)
                return Ok("Reset password link send to your email");
            return BadRequest("Something want wrong while sending email");
        }

        #endregion

        #region ResetPassword
        /// <summary>
        /// This endpoint allows users to reset their password by providing the registered email, new password, 
        /// confirm password, and a token. The token is generated in the ForgetPassword process and sent to the user's email.
        /// </summary>
        /// <param name="resetPassword">The model containing the user's email, new password, confirm password, and reset token.</param>
        /// <returns>
        /// Returns a 200 OK status if the password reset is successful, or 400 Bad Request if there's an issue with 
        /// the input or process. In case of an exception, returns a 500 Internal Server Error with an appropriate message.
        /// </returns>
        /// <remarks>
        /// Ensure that the provided token is valid and corresponds to the user who requested the password reset.
        /// </remarks>
        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([Required] [FromBody]  ResetPasswordModel resetPassword)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // Return validation errors

            try
            {
                var result = await _userAccount.ResetPassword(resetPassword);

                if (result)
                    return Ok("Password is reset now");

                return BadRequest("Something went wrong while resetting the password.");
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                Console.WriteLine(ex.Message);

                // Return a more meaningful error response
                return StatusCode(500, "An internal server error occurred. Please try again later.");
            }
        }
        #endregion

    }
}
