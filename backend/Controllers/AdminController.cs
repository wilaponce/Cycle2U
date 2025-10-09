using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cycle2U.Data;
using Cycle2U.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Cycle2U.ViewModels;

namespace Cycle2U.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // DRIVERS

        [HttpGet("drivers")]
        public async Task<ActionResult<IEnumerable<DriverViewModel>>> GetDrivers()
        {
            return await _context.Drivers.Select(d => new DriverViewModel
            {
                Id = d.Id,
                Name = d.Name,
                IsAvailable = d.IsAvailable,
                Latitude = d.Latitude,
                Longitude = d.Longitude
            }).ToListAsync();
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
        public async Task<ActionResult<IEnumerable<PickupRequestViewModel>>> GetPickupRequests()
        {
            return await _context.PickupRequests.Select(r => new PickupRequestViewModel
            {
                Id = r.Id,
                UserId = r.UserId,
                Status = r.Status,
                Location = r.Location,
                DriverId = r.DriverId,
                ScheduledTime = r.ScheduledTime,
                AssignedDriverId = r.AssignedDriverId
            }).ToListAsync();
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

        [HttpPut("requests/{id}/assign/{driverId}")]
        public async Task<IActionResult> AssignDriver(int id, int driverId)
        {
            var request = await _context.PickupRequests.FindAsync(id);
            var driver = await _context.Drivers.FindAsync(driverId);
            if (request == null || driver == null || !driver.IsAvailable)
                return BadRequest();

            request.DriverId = driverId;
            request.Status = "Driver Assigned";
            driver.IsAvailable = false;

            await _context.SaveChangesAsync();
            return Ok(request);
        }
    }
}