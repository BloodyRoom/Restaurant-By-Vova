using Core.Models.Account;
using Core.Models.Products;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.Delivery;

public class DeliveryWithUserModel
{
    public long Id { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public UserModel User { get; set; }
    public ICollection<ProductModel> Products { get; set; } = new List<ProductModel>();
}
