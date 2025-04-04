using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using esemenyrendezo.Models;

[Route("api/user")]
[ApiController]
public class UserProfileController : ControllerBase
{
    private readonly EsemenyrendezoContext _context;

    public UserProfileController(EsemenyrendezoContext context)
    {
        _context = context;
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized("Felhasználó nem hitelesített.");

        var user = await _context.Felhasznalos
            .Where(u => u.Id == userId)
            .Select(u => new
            {
                Name = u.TeljesNev,
                Email = u.Email,
                Phone = u.FelhasznaloNev,
                ProfilePicture = u.FenykepUtvonal
            })
            .FirstOrDefaultAsync();

        if (user == null) return NotFound("Felhasználó nem található.");

        return Ok(user);
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileUpdateModel model)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized("Felhasználó nem hitelesített.");

        var user = await _context.Felhasznalos.FindAsync(userId);
        if (user == null) return NotFound("Felhasználó nem található.");

        user.TeljesNev = model.Name;
        user.FelhasznaloNev = model.Phone;
        user.FenykepUtvonal = model.ProfilePicture;

        if (!string.IsNullOrEmpty(model.Password))
        {
            user.Salt = GenerateSalt();
            user.Hash = HashPassword(model.Password, user.Salt);
        }

        await _context.SaveChangesAsync();
        return Ok("Profil frissítve.");
    }

    [HttpDelete("profile")]
    public async Task<IActionResult> DeleteProfile()
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized("Felhasználó nem hitelesített.");

        var user = await _context.Felhasznalos.FindAsync(userId);
        if (user == null) return NotFound("Felhasználó nem található.");

        _context.Felhasznalos.Remove(user);
        await _context.SaveChangesAsync();

        return Ok("Fiók törölve.");
    }

    private int? GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        return userIdClaim != null ? int.Parse(userIdClaim.Value) : (int?)null;
    }

    private string GenerateSalt()
    {
        return Guid.NewGuid().ToString();
    }

    private string HashPassword(string password, string salt)
    {
        return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(password + salt));
    }
}

public class ProfileUpdateModel
{
    public string? Name { get; set; }
    public string? Phone { get; set; }
    public string? ProfilePicture { get; set; }
    public string? Password { get; set; }
}
