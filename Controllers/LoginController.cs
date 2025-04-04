﻿using esemenyrendezo.DTOs;
using esemenyrendezo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace esemenyrendezo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost("GetSalt/{felhasznaloNev}")]
        public async Task<IActionResult> GetSalt(string felhasznaloNev)
        {
            using (var cx = new EsemenyrendezoContext())
            {
                try
                {
                    Felhasznalo? response = await cx.Felhasznalos
                        .FirstOrDefaultAsync(f => f.FelhasznaloNev == felhasznaloNev);

                    if (response == null)
                        return BadRequest("Felhasználó nem található");

                    return Ok(response.Salt);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            using (var cx = new EsemenyrendezoContext())
            {
                try
                {
                    if (string.IsNullOrEmpty(loginDTO.TmpHash))
                        return BadRequest("Hiányzó hash!");
                    string Hash = Program.CreateSHA256(loginDTO.TmpHash);
                    Felhasznalo? loggedUser = await cx.Felhasznalos
                        .FirstOrDefaultAsync(f => f.FelhasznaloNev == loginDTO.LoginName && f.Hash == Hash);

                    if (loggedUser != null && loggedUser.Aktiv == 1)
                    {
                        string token = Guid.NewGuid().ToString();
                        lock (Program.LoggedInUsers)
                        {
                            Program.LoggedInUsers.Add(token, loggedUser);
                        }

                        return Ok(new LoggedUser
                        {
                            Name = loggedUser.TeljesNev,
                            Email = loggedUser.Email,
                            Permission = loggedUser.Jogosultsag,
                            ProfilePicturePath = loggedUser.FenykepUtvonal,
                            Token = token
                        });
                    }

                    return BadRequest("Hibás név vagy jelszó/inaktív felhasználó!");
                }
                catch (Exception ex)
                {
                    return BadRequest(new LoggedUser
                    {
                        Permission = -1,
                        Name = ex.Message,
                        ProfilePicturePath = "",
                        Email = ""
                    });
                }
            }
        }
    }
}