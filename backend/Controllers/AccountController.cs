
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Cycle2U.Models;
using Cycle2U.ViewModels;
using System.Threading.Tasks;

namespace Cycle2U.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(UserManager<ApplicationUser> userManager,IEmailSender emailSender,
                                 SignInManager<ApplicationUser> signInManager,
                                 RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _emailSender = emailSender;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync(model.Role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(model.Role));
                }

                await _userManager.AddToRoleAsync(user, model.Role);
                return Ok("User registered successfully.");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

            if (result.Succeeded)
            {
                return Ok("Login successful.");
            }

            return Unauthorized("Invalid login attempt.");
        }
     [HttpPost("RequestPasswordReset")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return NotFound("User not found");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var callbackUrl = $"https://yourfrontend.com/reset-password?email={HttpUtility.UrlEncode(email)}&token={HttpUtility.UrlEncode(token)}";

            await _emailSender.SendEmailAsync(email, "Reset Password", $"Reset your password using this link: {callbackUrl}");
            return Ok("Password reset email sent");
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return NotFound("User not found");

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
            if (result.Succeeded) return Ok("Password reset successful");

            return BadRequest(result.Errors);
        }

        [HttpPost("SendEmailVerification")]
        public async Task<IActionResult> SendEmailVerification([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return NotFound("User not found");

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = $"https://yourfrontend.com/verify-email?email={HttpUtility.UrlEncode(email)}&token={HttpUtility.UrlEncode(token)}";

            await _emailSender.SendEmailAsync(email, "Verify Email", $"Verify your email using this link: {callbackUrl}");
            return Ok("Verification email sent");
        }

        [HttpPost("VerifyEmail")]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return NotFound("User not found");

            var result = await _userManager.ConfirmEmailAsync(user, model.Token);
            if (result.Succeeded) return Ok("Email verified");

            return BadRequest(result.Errors);
        }
        
        // Redirect logic after password reset and email verification
        [HttpPost("ConfirmPasswordReset")]
        public IActionResult ConfirmPasswordReset(string token)
        {
            // Validate token and redirect
            return Redirect("/password-reset-success");
        }
        
        [HttpPost("ConfirmEmailVerification")]
        public IActionResult ConfirmEmailVerification(string token)
        {
            // Validate token and redirect
            return Redirect("/email-verification-success");
        }

        
    }
    public class ResetPasswordModel
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }

    public class VerifyEmailModel
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
