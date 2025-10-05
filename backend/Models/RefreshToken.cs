using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Cycle2U.Models;

namespace Cycle2U.Models
{
    public class RefreshToken
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Token { get; set; }

        public DateTime Expires { get; set; }

        public bool IsExpired => DateTime.UtcNow >= Expires;

        public DateTime Created { get; set; }

        public DateTime? Revoked { get; set; }

        public bool IsActive => Revoked == null && !IsExpired;
        
        // The actual token string
        public string Token { get; set; } = Guid.NewGuid().ToString();

        // Expiration date of the refresh token
        public DateTime ExpiryDate { get; set; }

        // Navigation property to the ApplicationUser
        public ApplicationUser User { get; set; } = new ApplicationUser();

        public required string UserId { get; set; }
    }
}
