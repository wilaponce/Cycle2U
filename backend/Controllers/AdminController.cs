
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Cycle2U.Data;
using Cycle2U.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace Cycle2U.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        // USERS

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            return await _userManager.Users.ToListAsync();
        }

        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();
            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded ? NoContent() : BadRequest(result.Errors);
        }

        [HttpPost("users/{id}/assign-role")]
        public async Task<IActionResult> AssignRole(string id, [FromBody] string role)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
            var result = await _userManager.AddToRoleAsync(user, role);
            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }

        // DRIVERS

        [HttpGet("drivers")]
        public async Task<ActionResult<IEnumerable<Driver>>> GetDrivers()
        {
            return await _context.Drivers.ToListAsync();
        }

        [HttpPut("drivers/{id}/availability")]
        public async Task<IActionResult> UpdateDriverAvailability(int id, [FromBody] bool isAvailable)
        {
            var driver = await _context.Drivers.FindAsync(id);
            if (driver == null) return NotFound();
            driver.IsAvailable = isAvailable;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("drivers/{id}/location")]
        public async Task<IActionResult> UpdateDriverLocation(int id, [FromBody] LocationUpdateModel location)
        {
            var driver = await _context.Drivers.FindAsync(id);
            if (driver == null) return NotFound();
            driver.Latitude = location.Latitude;
            driver.Longitude = location.Longitude;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PICKUP REQUESTS

        [HttpGet("requests")]
        public async Task<ActionResult<IEnumerable<PickupRequest>>> GetPickupRequests()
        {
            return await _context.PickupRequests.ToListAsync();
        }

        [HttpPut("requests/{id}/status")]
        public async Task<IActionResult> UpdateRequestStatus(int id, [FromBody] string status)
        {
            var request = await _context.PickupRequests.FindAsync(id);
            if (request == null) return NotFound();
            request.Status = status;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("requests/{id}")]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            var request = await _context.PickupRequests.FindAsync(id);
            if (request == null) return NotFound();
            _context.PickupRequests.Remove(request);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        public class LocationUpdateModel
        {
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }
    }
}
