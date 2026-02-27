using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.Account;

public class UserModel
{
    public long Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
