
using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Cycle2U.Migrations
{
    public partial class AddLocationAndScheduleFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Drivers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Drivers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "PickupRequests",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "PickupRequests",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ScheduledTime",
                table: "PickupRequests",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "PickupRequests");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "PickupRequests");

            migrationBuilder.DropColumn(
                name: "ScheduledTime",
                table: "PickupRequests");
        }
    }
}
