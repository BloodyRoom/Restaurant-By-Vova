using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.Carts;

public class CartCreateModel
{
    public long ProductId { get; set; }
    public int Count { get; set; }
}
