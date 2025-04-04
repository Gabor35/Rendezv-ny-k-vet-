using esemenyrendezo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Threading.Tasks;

namespace esemenyrendezo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        private readonly EsemenyrendezoContext _context;

        public ImageUploadController(EsemenyrendezoContext context)
        {
            _context = context;
        }

        [HttpPost("upload")]
        public IActionResult Upload([FromBody] EventData eventData)
        {
            // Implementation for uploading an image
            // Assuming some logic here
            return Ok("Image uploaded successfully.");
        }

        [HttpPost("addEvent")]
        public async Task<IActionResult> AddEvent([FromBody] EventData eventData)
        {
            try
            {
                // Add logic to save the event data to your database
                await _context.Events.AddAsync(eventData);
                await _context.SaveChangesAsync();

                // Return the ID of the created event
                return Ok(new { message = "Event added successfully.", eventId = eventData.EventId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
