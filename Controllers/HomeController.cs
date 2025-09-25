using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RecycLink.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();

        [Authorize(Roles = "Admin")]
        public IActionResult AdminPanel() => View();

        [Authorize(Roles = "Driver")]
        public IActionResult DriverDashboard() => View();

        [Authorize(Roles = "User")]
        public IActionResult UserDashboard() => View();
    }
}
