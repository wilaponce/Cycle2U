
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RecycLink.Models;
using System.Linq;
using System.Threading.Tasks;

namespace RecycLink.Controllers
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

        // POST: api/PickupRequests
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CreateRequest([FromBody] PickupRequest request)
        {
            request.Status = "Searching for Driver";
            _context.PickupRequests.Add(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        // GET: api/PickupRequests/{id}
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetRequestStatus(int id)
        {
            var request = await _context.PickupRequests.FindAsync(id);
            if (request == null)
                return NotFound();
            return Ok(request);
        }

        // PUT: api/PickupRequests/{id}/assign/{driverId}
        [HttpPut("{id}/assign/{driverId}")]
        [Authorize(Roles = "Admin")]
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

        // PUT: api/PickupRequests/{id}/status
        [HttpPut("{id}/status")]
        [Authorize(Roles = "Driver")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            var request = await _context.PickupRequests.FindAsync(id);
            if (request == null)
                return NotFound();

            request.Status = status;
            await _context.SaveChangesAsync();
            return Ok(request);
        }
    }
}
