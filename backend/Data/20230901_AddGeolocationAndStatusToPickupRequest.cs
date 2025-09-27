
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cycle2U.Migrations
{
    public partial class AddGeolocationAndStatusToPickupRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "PickupRequests",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "PickupRequests",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "PickupRequests",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "PickupRequests");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "PickupRequests");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "PickupRequests");
        }
    }
}
