namespace Cycle2U.ViewModels
{
    public class DriverViewModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public bool IsAvailable { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
