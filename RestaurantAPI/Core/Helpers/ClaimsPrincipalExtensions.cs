using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Core.Helpers;

public static class ClaimsPrincipalExtensions
{
    public static long GetUserId(this ClaimsPrincipal user)
    {
        return long.Parse(user.FindFirst("id")!.Value);
    }
}