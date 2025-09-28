using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Cycle2U.Models
{
    public class ApplicationUser: IdentityUser
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Name { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; } = new();
    }
}
