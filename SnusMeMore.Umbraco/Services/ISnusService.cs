﻿
namespace SnusMeMore.Services
{
    public interface ISnusService
    {
        IResult GetAllSnus();
        IResult GetNavbar();
        IResult GetTopRatedSnus();
    }
}