using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.Delivery;

public class DeliveryUpdateModel
{
    public long Id { get; set; }
    public string Status { get; set; } = string.Empty;
}
