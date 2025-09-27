
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Web;
using Cycle2U.Models;

namespace Cycle2U.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;

        public AccountController(UserManager<ApplicationUser> userManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _emailSender = emailSender;
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
