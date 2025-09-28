using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cycle2U.Models
{
    public class PickupRequest
    {
        [Key]
        public int Id { get; set; }

       public required string UserId { get; set; } = string.Empty;
        public required string Status { get; set; } = "Pending";
        public required string Location { get; set; } = string.Empty;

        [Required]
        public DateTime ScheduledTime { get; set; }
        
        [Required]
        public int AssignedDriverId { get; set; } = 0;

        public Driver? AssignedDriver { get; set; } = null;

    }
}
