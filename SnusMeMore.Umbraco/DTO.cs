namespace SnusMeMore
{
    public record CartAddRequest
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
}
