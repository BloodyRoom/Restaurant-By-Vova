using AutoMapper;
using Core.Commands.Account;
using Core.Constants;
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

public class RegisterCommandHandler
    : IRequestHandler<RegisterCommand, Result<AuthResponse>>
{
    private readonly UserManager<UserEntity> _userManager;
    private readonly SignInManager<UserEntity> _signInManager;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IMapper _mapper;
    private readonly RoleManager<RoleEntity> _roleManager;

    public RegisterCommandHandler(
        UserManager<UserEntity> userManager,
        SignInManager<UserEntity> signInManager,
        IJwtTokenService jwtTokenService,
        IMapper mapper,
        RoleManager<RoleEntity> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtTokenService = jwtTokenService;
        _mapper = mapper;
        _roleManager = roleManager;
    }

    public async Task<Result<AuthResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var user = _mapper.Map<UserEntity>(request.model);

        var result = await _userManager.CreateAsync(user, request.model.Password);

        if (!result.Succeeded)
        {
            var errors = string.Join("\n",
                result.Errors.Select(e => e.Description));
            
            return Result<AuthResponse>.Failure(errors);
        }

        if (!await _roleManager.RoleExistsAsync(Roles.User))
        {
            await _roleManager.CreateAsync(
                new RoleEntity { Name = Roles.User });
        }

        await _userManager.AddToRoleAsync(user, Roles.User);

        var token = await _jwtTokenService.CreateTokenAsync(user);
        return Result<AuthResponse>.Success(new AuthResponse(token));
    }
}
