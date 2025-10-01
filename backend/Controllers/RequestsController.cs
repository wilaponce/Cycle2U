
using Microsoft.AspNetCore.Mvc;

namespace Cycle2U.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetRequests()
        {
            var requests = new[]
            {
                new {
                    id = "1",
                    lat = 34.0522,
                    lng = -118.2437,
                    address = "123 Main St, Los Angeles, CA",
                    status = "pending"
                },
                new {
                    id = "2",
                    lat = 34.0407,
                    lng = -118.2468,
                    address = "456 Sunset Blvd, Los Angeles, CA",
                    status = "completed"
                }
            };

            return Ok(requests);
        }
    }
}
