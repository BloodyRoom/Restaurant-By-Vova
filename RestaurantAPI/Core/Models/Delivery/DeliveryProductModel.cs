using Core.Models.Products;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.Delivery;

public class DeliveryProductModel
{
    public ProductModel Product { get; set; } = null!;
    public int Count { get; set; }
}