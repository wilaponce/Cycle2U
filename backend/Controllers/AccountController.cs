using System.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Cycle2U.Models;
using Cycle2U.Data;
using Cycle2U.ViewModels;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Cycle2U.Services;
namespace Cycle2U.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailSender _emailSender;
        private readonly JwtTokenService _jwtService;
        private readonly ApplicationDbContext _context;

        public AccountController(UserManager<ApplicationUser> userManager,
                                 IEmailSender emailSender,
                                 SignInManager<ApplicationUser> signInManager,
                                 RoleManager<IdentityRole> roleManager,
                                 JwtTokenService jwtService,
                                 ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _emailSender = emailSender;
            _jwtService = jwtService;
            _context = context;
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

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized("Invalid credentials");

            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtService.GenerateAccessToken(user, roles);
            var refreshToken = _jwtService.GenerateRefreshToken();

            _context.RefreshTokens.Add(new RefreshToken
            {
                Token = refreshToken,
                ExpiryDate = DateTime.UtcNow.AddDays(7),
                UserId = user.Id
            });

            await _context.SaveChangesAsync();

            return Ok(new { accessToken, refreshToken });
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] string token)
        {
            var storedToken = await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == token);
            if (storedToken == null || storedToken.ExpiryDate < DateTime.UtcNow)
                return Unauthorized("Invalid or expired refresh token");

            var user = await _userManager.FindByIdAsync(storedToken.UserId);
            var roles = await _userManager.GetRolesAsync(user);
            var newAccessToken = _jwtService.GenerateAccessToken(user, roles);

            return Ok(new { accessToken = newAccessToken });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("AdminOnly")]
        public IActionResult AdminOnly() => Ok("Welcome Admin!");
        
        [HttpPost("RequestPasswordReset")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return NotFound("User not found");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var callbackUrl = $"https://yourfrontend.com/reset-password?email={WebUtility.UrlEncode(email)}&token={WebUtility.UrlEncode(token)}";

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

          [HttpPost("send-confirmation")]
        public async Task<IActionResult> SendConfirmationEmail([FromBody] ApplicationUser user)
        {
            await _emailSender.SendEmailAsync(user.Email ?? string.Empty, "Confirm your account", "Please confirm your account by clicking here.");
            return Ok("Confirmation email sent.");
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
        public required string Email { get; set; } = string.Empty;
        public required string Token { get; set; } = string.Empty;
        public required string NewPassword { get; set; } = string.Empty;
    }

    public class VerifyEmailModel
    {
        public required string Email { get; set; } = string.Empty;
        public required string Token { get; set; } = string.Empty;
    }
}
