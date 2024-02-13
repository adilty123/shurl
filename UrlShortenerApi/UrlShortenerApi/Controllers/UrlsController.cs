using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrlShortenerApi.Models;

namespace UrlShortenerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UrlsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Urls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Urls>>> GetUrls()
        {
            return await _context.Urls.ToListAsync();
        }

        // GET: api/Urls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Urls>> GetUrls(int id)
        {
            var urls = await _context.Urls.FindAsync(id);

            if (urls == null)
            {
                return NotFound();
            }

            return urls;
        }

        // PUT: api/Urls/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUrls(int id, Urls urls)
        {
            if (id != urls.Id)
            {
                return BadRequest();
            }

            _context.Entry(urls).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UrlsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Urls
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Urls>> PostUrls(Urls urls)
        {
            DateTime myDateTime = DateTime.Now;
            string uniqueCode = RandomString();
            string shortUrl = "";
            Debug.WriteLine("POST INPUT: " + urls.Id);
            Debug.WriteLine("POST INPUT: " + urls.DateCreated);
            Debug.WriteLine("POST INPUT: " + urls.UserEmail);
            Debug.WriteLine("POST INPUT: " + urls.OriginalUrl);
            Debug.WriteLine("POST INPUT: " + urls.ShortUrl);
            Debug.WriteLine("POST INPUT: " + urls.Code);

            shortUrl = "https://localhost:7087/" + uniqueCode;
            urls.ShortUrl = shortUrl;
            urls.Code = uniqueCode;
            urls.DateCreated = myDateTime;

            Debug.WriteLine("SQL INPUT: " + urls.Id);
            Debug.WriteLine("SQL INPUT: " + urls.DateCreated);
            Debug.WriteLine("SQL INPUT: " + urls.UserEmail);
            Debug.WriteLine("SQL INPUT: " + urls.OriginalUrl);
            Debug.WriteLine("SQL INPUT: " + urls.ShortUrl);
            Debug.WriteLine("SQL INPUT: " + urls.Code);

            _context.Urls.Add(urls);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUrls", new { id = urls.Id }, urls);
        }

        private static Random random = new Random();
        public static string RandomString()
        {
            int length = 6;

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        // DELETE: api/Urls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUrls(int id)
        {
            var urls = await _context.Urls.FindAsync(id);
            if (urls == null)
            {
                return NotFound();
            }

            _context.Urls.Remove(urls);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UrlsExists(int id)
        {
            return _context.Urls.Any(e => e.Id == id);
        }
    }
}
