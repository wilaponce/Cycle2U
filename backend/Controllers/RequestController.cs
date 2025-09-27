
using Microsoft.AspNetCore.Mvc;
using Cycle2U.Models;
using System.Linq;

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
                var availableDriver = _context.Drivers.FirstOrDefault(d => d.IsAvailable);
                if (availableDriver != null)
                {
                    request.AssignedDriverId = availableDriver.Id;
                    availableDriver.IsAvailable = false;
                    _context.Update(availableDriver);
                }

                _context.PickupRequests.Add(request);
                _context.SaveChanges();
                return RedirectToAction("Confirmation");
            }

            return View(request);
        }

        public IActionResult Confirmation()
        {
            return View();
        }
    }
}
