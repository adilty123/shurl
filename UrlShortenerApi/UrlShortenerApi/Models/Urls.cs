namespace UrlShortenerApi.Models
{
    public class Urls
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public string UserEmail { get; set; }
        public string OriginalUrl { get; set; }
        public string ShortUrl { get; set; }
        public string Code { get; set; }

    }
}
