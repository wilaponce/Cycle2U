using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Cycle2U.Models;

namespace Cycle2U.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PickupRequest>()
                .HasOne(p => p.AssignedDriver)
                .WithMany()
                .HasForeignKey(p => p.AssignedDriverId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<PickupRequest> PickupRequests { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
    }
}
