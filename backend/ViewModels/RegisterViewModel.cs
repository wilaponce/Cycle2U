using System.ComponentModel.DataAnnotations;

namespace Cycle2U.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public required string Password { get; set; }

        [Required]
        public required string Role { get; set; }
    }
}
