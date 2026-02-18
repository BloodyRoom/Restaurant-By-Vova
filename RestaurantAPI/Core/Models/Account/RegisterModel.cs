namespace Core.Models.Account;

public class RegisterModel
{
    /// <summary>
    /// Пошта користувача
    /// </summary>
    /// <example>katyakubka@gmail.com</example>
    public string Email { get; set; } = "";
    /// <summary>
    /// Ім'я користувача
    /// </summary>
    /// <example>Катерина</example>
    public string FirstName { get; set; } = "";
    /// <summary>
    /// Прізвище
    /// </summary>
    /// <example>Кубка</example>
    public string LastName { get; set; } = "";
    /// <summary>
    /// Пароль
    /// </summary>
    /// <example>123456</example>
    public string Password { get; set; } = "";
}
