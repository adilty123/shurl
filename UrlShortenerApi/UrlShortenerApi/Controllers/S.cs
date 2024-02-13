using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using UrlShortenerApi.Models;

namespace UrlShortenerApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class S : ControllerBase
    {
        private readonly AppDbContext _context;

        public S(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("/{code}")]
        public async Task<ActionResult> RedirectUrl(string code)
        {
            string originalUrl = await GetUrlsByCode(code);

            if (originalUrl != null)
            {
                // Redirect to the original URL
                return Redirect(originalUrl);
            }
            else
            {
                // Return a 404 Not Found response if the shortened URL is not found
                return NotFound();
            }
        }

        private async Task<string> GetUrlsByCode(string code) 
        {
            var urls = await _context.Urls.FirstOrDefaultAsync(u => u.Code == code);

            if (urls == null)
            {
                return "Not Found";
            }
            string res = urls.OriginalUrl;

            return res;

        }
    }
}
