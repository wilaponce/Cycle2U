using System;

namespace Cycle2U.ViewModels
{
    public class PickupRequestViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int DriverId { get; set; }
        public DateTime ScheduledTime { get; set; }
        public int AssignedDriverId { get; set; }
    }
}
