using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cycle2U.Models
{
    public class PickupRequest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; }

        [Required]
        public DateTime ScheduledTime { get; set; }

        [Required]
        [StringLength(200)]
        public string Location 
        
        [Required]
        public int AssignedDriverId { get; set; }
        
        public required Driver AssignedDriver { get; set; }

    }
}
