using Microsoft.AspNetCore.Mvc;
using Cycle2U.Models;

namespace Cycle2U.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PickupController : ControllerBase
    {
        [HttpPost]
        public IActionResult RequestPickup([FromBody] PickupRequest request)
        {
            return Ok(new { message = "Pickup scheduled!" });
        }
    }
}
