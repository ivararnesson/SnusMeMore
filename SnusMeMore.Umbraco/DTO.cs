﻿namespace SnusMeMore
{
    public record CartRequest
    {
        public string ItemId { get; set; }
    }
    public record UserIdRequest
    {
        public string UserId { get; set; }
    }
    public record LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public record SignupRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public record AddRating
    {
        public int Rating { get; set; }
        public string UserId { get; set; }
    }
    public class SnusDTO
    {
        public string SnusName { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string ImageUrl { get; set; }
        public string Brand { get; set; }
        public double Strength { get; set; }
        public double Rating { get; set; }
        public Guid SnusId { get; set; }
    }
    public class CartSnusDTO
    {
        public string SnusName { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string ImageUrl { get; set; }
        public string Brand { get; set; }
        public double Strength { get; set; }
        public double Rating { get; set; }
        public Guid SnusId { get; set; }
        public int Quantity { get; set; }
    }
}
