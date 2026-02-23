using Core.Models.Categories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Commands.Categories;

public record CategoryDeleteCommand(CategoryDeleteModel model)
    : IRequest<bool>;
