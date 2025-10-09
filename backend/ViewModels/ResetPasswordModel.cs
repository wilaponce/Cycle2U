using System.ComponentModel.DataAnnotations;

namespace Cycle2U.ViewModels
{
    public class ResetPasswordModel
    {
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Token { get; set; }
        [Required]
        public required string NewPassword { get; set; }
    }
}
