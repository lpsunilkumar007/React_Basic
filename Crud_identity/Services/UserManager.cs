using CRUD.Core.DataModel;
using CRUD.Core.RequestResponse;
using CRUD.Identity.dbContext;
using CRUD.Service.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;
using System;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace CRUD.Identity.Identity
{
    public class UserManager
    {
        #region Dependency Injection and Initialization
        private readonly UserDbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager; // Identity UserManager
        private readonly SignInManager<IdentityUser> _signInManager; // Identity SignInManager
        private readonly string _senderEmail;
        private readonly string _senderName;
        private readonly IConfiguration _configuration;
        public UserManager(UserDbContext dbContext, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _senderEmail = configuration["BrevoApiKey:SenderEmail"];
            _senderName = configuration["BrevoApiKey:SenderName"];
        }
        #endregion

        #region Registration

        // Registration method in used to register new user in the application,it take  

        public async Task<bool> Registration(UserRegisterationModel userRegisterationModel)
        {
            // Ensure that the user object is not null to prevent null reference errors.
            if (userRegisterationModel == null)
            {
                throw new ArgumentNullException(nameof(userRegisterationModel), "User object cannot be null.");
            }

            var isUniqueUserName = await _userManager.FindByNameAsync(userRegisterationModel.Name) == null;
            var isUniqueEmail = await _userManager.FindByEmailAsync(userRegisterationModel.Email) == null;

            var errors = new List<string>();

            if (!isUniqueUserName)
            {
                errors.Add("UserName already exists.");
            }
            if (!isUniqueEmail)
            {
                errors.Add("Email already exists.");
            }

            if (errors.Any())
            {
                return false;

            }

            // Create a new instance of ApplicationUser with the provided user details.
            var identityUser = new ApplicationUser
            {
                UserName = userRegisterationModel.Email,
                Email = userRegisterationModel.Email,
                Address = userRegisterationModel.Address,
                PhoneNumber = userRegisterationModel.PhoneNumber,
                Name = userRegisterationModel.Name,
            };

            // Ensure the password is provided before creating the user.
            if (string.IsNullOrEmpty(userRegisterationModel.Password))
            {
                throw new ArgumentException("Password cannot be null or empty.");
            }

            // Use the UserManager to create the user with the provided password.
            var result = await _userManager.CreateAsync(identityUser, userRegisterationModel.Password);

            return result.Succeeded;
        }



        #endregion

        #region Login
        //Login method is to login authorized user to the application , here we are passing two parameter to this method email and password.
        public async Task<bool> Login(UserLoginModel loginModel)
        {
            // Find the user in the database using their email.
            var user = await _userManager.FindByEmailAsync(loginModel.Email);

            // If no user is found with the provided email, return false (login failed).
            if (user == null)
            {
                return false;
            }

            try
            {
                // Check if the provided password matches the user's stored password.
                var result = await _userManager.CheckPasswordAsync(user, loginModel.Password);

                // Return the result of the password check (true if it matches, false otherwise).
                return result;
            }
            catch (Exception ex)
            {
                // Optionally log the exception for future debugging purposes.
                // _logger.LogError(ex, "An error occurred while checking the password.");

                // Return false in case of any exception.
                return false;
            }
        }
        #endregion

        #region ForgetPassword

        //Forget password method take one parameter email.In this email we will share token to reset the password.
        public async Task<bool> ForgetPassword(ForgetPasswordModel forgetPasswordModel)
        {
            var user = await _userManager.FindByEmailAsync(forgetPasswordModel.Email);
            if (user != null)
            {
                // Generate token and encode
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var validEmailToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

                // Construct the reset URL using the appsettings.json value for Appurl
                string url = $"{_configuration["Appurl"]}/ResetPassword?email={forgetPasswordModel.Email}&token={validEmailToken}";

                // Prepare email details
                string receiverEmail = user.Email;
                string receiverName = user.UserName;
                string subject = "Please Reset Your Password";
                string message = $"Follow the instructions to reset your password. To reset your password, click on the link: {url}";

                // Offload the email sending to a background thread to avoid blocking
                await Task.Run(() =>
                    EmailSender.SendEmail(_senderEmail, _senderName, receiverEmail, receiverName, subject, message)
                );

                return true;
            }

            return false;
        }


        #endregion

        #region ResetPassword
        //ResetPassword method used to reset the password of the user, in this method we are passing the following parameters email, token,password and confirm password.
        public async Task<bool> ResetPassword(ResetPasswordModel resetPassword)
        {
            var user = await _userManager.FindByEmailAsync(resetPassword.Email);

            if (user != null)
            {
                // Decode the token using Base64UrlDecode
                var decodedTokenBytes = WebEncoders.Base64UrlDecode(resetPassword.Token);
                var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

                // Reset password using decoded token
                var result = await _userManager.ResetPasswordAsync(user, decodedToken, resetPassword.Password!);

                if (!result.Succeeded)
                {
                    // Log the detailed errors for better debugging
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine($"Error: {error.Description}");
                    }

                    // Optionally log to a logging framework like Serilog, NLog, etc.
                    throw new Exception("Password reset failed.");
                }

                return true;
            }

            throw new Exception("User not found.");
        }


        #endregion
    }
}
