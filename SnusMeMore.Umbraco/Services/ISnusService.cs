namespace SnusMeMore.Services
{
    public interface ISnusService
    {
        IResult GetAllSnus();
        IResult GetNavbar();
        IResult AddRating(HttpContext context, Guid guid, AddRating ratingDto);
        IResult GetAverageRating(Guid guid);
        IResult SearchSnus(string query);
        IResult GetSnusByName(string snusName);
        IResult GetTopRatedSnus();
    }
}