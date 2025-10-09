using System.ComponentModel.DataAnnotations;

namespace Cycle2U.ViewModels
{
    public class VerifyEmailModel
    {
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Token { get; set; }
    }
}
