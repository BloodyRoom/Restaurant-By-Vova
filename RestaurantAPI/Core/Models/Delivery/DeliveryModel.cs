using Core.Models.Products;
using Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.Delivery;

public class DeliveryModel
{
    public long Id { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public ICollection<ProductModel> Products { get; set; } = new List<ProductModel>();
}
