
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cycle2U.Models;
using System;
using System.Threading.Tasks;

namespace Cycle2U.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PickupRequestsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PickupRequestsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // PUT: api/PickupRequests/{id}/cancel
        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> CancelPickupRequest(int id)
        {
            var request = await _context.PickupRequests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            request.Status = "Cancelled";
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/PickupRequests/{id}/reschedule
        [HttpPut("{id}/reschedule")]
        public async Task<IActionResult> ReschedulePickupRequest(int id, [FromBody] DateTime newTime)
        {
            var request = await _context.PickupRequests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            request.ScheduledTime = newTime;
            request.Status = "Rescheduled";
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class DriverLocationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DriverLocationController(ApplicationDbContext context)
        {
            _context = context;
        }

        // PUT: api/DriverLocation/{driverId}
        [HttpPut("{driverId}")]
        public async Task<IActionResult> UpdateDriverLocation(string driverId, [FromBody] LocationUpdateModel location)
        {
            var driver = await _context.Drivers.FirstOrDefaultAsync(d => d.DriverId == driverId);
            if (driver == null)
            {
                return NotFound();
            }

            driver.Latitude = location.Latitude;
            driver.Longitude = location.Longitude;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class LocationUpdateModel
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
