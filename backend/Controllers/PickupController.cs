using Microsoft.AspNetCore.Mvc;
using Cycle2U.Models;
using Cycle2U.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System;

namespace Cycle2U.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PickupController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PickupController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> RequestPickup([FromBody] PickupRequest request)
        {
            _context.PickupRequests.Add(request);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Pickup scheduled!" });
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
}
