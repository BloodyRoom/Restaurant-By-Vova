using Core.Models;
using Core.Models.Account;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Commands.Account;

public record LoginCommand(LoginModel model)
    : IRequest<Result<AuthResponse>>;
