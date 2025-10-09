using Microsoft.EntityFrameworkCore;
using Cycle2U.Models;

namespace Cycle2U.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PickupRequest>()
                .HasOne(p => p.AssignedDriver)
                .WithMany()
                .HasForeignKey(p => p.AssignedDriverId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<PickupRequest> PickupRequests { get; set; } = null!;
        public DbSet<Driver> Drivers { get; set; } = null!;
    }
}
