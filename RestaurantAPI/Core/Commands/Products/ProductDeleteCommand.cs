using Core.Models;
using Core.Models.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Commands.Products;

public record ProductDeleteCommand(ProductDeleteModel model)
    : IRequest<bool>;