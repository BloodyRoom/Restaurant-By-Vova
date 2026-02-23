using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.Categories;

public class CategoryUpdateModel
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public IFormFile? Image { get; set; }
}
