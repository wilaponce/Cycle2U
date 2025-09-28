using System.Collections.Generic;

namespace Cycle2U.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Name { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; } = new();
    }
}
