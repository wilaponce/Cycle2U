using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Cycle2U.Models
{
    public class ApplicationUser: IdentityUser
    {
        
        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;
        public List<RefreshToken> RefreshTokens { get; set; } = new();
    }
}
