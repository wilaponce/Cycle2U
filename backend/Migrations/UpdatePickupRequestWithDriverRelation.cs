using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cycle2U.Migrations
{
    public partial class UpdatePickupRequestWithDriverRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedDriverId",
                table: "PickupRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PickupRequests_AssignedDriverId",
                table: "PickupRequests",
                column: "AssignedDriverId");

            migrationBuilder.AddForeignKey(
                name: "FK_PickupRequests_Drivers_AssignedDriverId",
                table: "PickupRequests",
                column: "AssignedDriverId",
                principalTable: "Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PickupRequests_Drivers_AssignedDriverId",
                table: "PickupRequests");

            migrationBuilder.DropIndex(
                name: "IX_PickupRequests_AssignedDriverId",
                table: "PickupRequests");

            migrationBuilder.DropColumn(
                name: "AssignedDriverId",
                table: "PickupRequests");
        }
    }
}
 