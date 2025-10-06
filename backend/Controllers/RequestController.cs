using Microsoft.AspNetCore.Mvc;
using Cycle2U.Models;
using System.Linq;
using Cycle2U.Data;

namespace Cycle2U.Controllers
{
    public class RequestController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RequestController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(PickupRequest request)
        {
            if (ModelState.IsValid)
            {
                var availableDriver = _context.Drivers.FirstOrDefault();
                if (availableDriver != null)
                {
                    // TODO: Assign driver and process request
                    // ...
                }
                // TODO: Additional logic for when no driver is available
                // ...
            }
            // TODO: Handle invalid model state
            // ...
            return View(request);
        }
    }
}                                                                                                                                                                                                                                                                                                                                                                                            
