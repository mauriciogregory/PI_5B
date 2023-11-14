using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DGFweb.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreatedC : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Mensagem",
                table: "Log",
                newName: "mensagem");

            migrationBuilder.RenameColumn(
                name: "DataCreateAt",
                table: "Log",
                newName: "dataCreateAt");

            migrationBuilder.AddColumn<DateTime>(
                name: "code_expiration_time",
                table: "User",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "code_expiration_time",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "mensagem",
                table: "Log",
                newName: "Mensagem");

            migrationBuilder.RenameColumn(
                name: "dataCreateAt",
                table: "Log",
                newName: "DataCreateAt");
        }
    }
}
