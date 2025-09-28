
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Cycle2U.Models;
using Cycle2U.ViewModels;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace Cycle2U.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return Unauthorized();

            var isValid = await _userManager.CheckPasswordAsync(user, model.Password);
            return isValid ? Ok("Login successful") : Unauthorized();
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
}
