
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

        public DbSet<PickupRequest> PickupRequests { get; set; }
        public DbSet<Driver> Drivers { get; set; }
    }
}
