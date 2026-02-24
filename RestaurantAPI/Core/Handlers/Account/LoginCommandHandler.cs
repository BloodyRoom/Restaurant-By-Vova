using Core.Commands.Account;
using Core.Interfaces;
using Core.Models;
using Core.Models.Account;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Account;

public class LoginCommandHandler
    : IRequestHandler<LoginCommand, Result<AuthResponse>>
{
    private readonly UserManager<UserEntity> _userManager;
    private readonly SignInManager<UserEntity> _signInManager;
    private readonly IJwtTokenService _jwtTokenService;

    public LoginCommandHandler(
        UserManager<UserEntity> userManager,
        SignInManager<UserEntity> signInManager,
        IJwtTokenService jwtTokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<Result<AuthResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.model.Email);

        if (user == null)
            return Result<AuthResponse>.Failure("wrong data");

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.model.Password, true);

        if (!result.Succeeded)
            return Result<AuthResponse>.Failure("wrong data");

        var token = await _jwtTokenService.CreateTokenAsync(user);

        return Result<AuthResponse>.Success(new AuthResponse(token));
    }
}
