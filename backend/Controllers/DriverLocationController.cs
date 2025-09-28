using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Cycle2U.Models;

namespace Cycle2U.Controllers
{
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
        public async Task<IActionResult> UpdateLocation(string driverId, [FromBody] DriverLocationUpdateModel model)
        {
            var driver = await _context.Drivers.FirstOrDefaultAsync(d => d.Id == driverId);
            if (driver == null)
            {
                return NotFound();
            }

            driver.Latitude = model.Latitude;
            driver.Longitude = model.Longitude;

            _context.Drivers.Update(driver);
            await _context.SaveChangesAsync();

            return NoContent();
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
    public class DriverLocationUpdateModel
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
    
}