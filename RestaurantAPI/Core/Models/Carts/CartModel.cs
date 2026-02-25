using Core.Models.Products;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.Carts;

public class CartModel
{
    public long Id { get; set; }
    public ProductModel? Product { get; set; }
    public int Count { get; set; }
}
