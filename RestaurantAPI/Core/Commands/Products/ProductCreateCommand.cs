using Core.Models;
using Core.Models.Categories;
using Core.Models.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Commands.Products;

public record ProductCreateCommand(ProductCreateModel model)
    : IRequest<Result<ProductModel>>;
