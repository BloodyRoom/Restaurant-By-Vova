using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.Delivery;

public class DeliveryUpdateModel
{
    public long Id { get; set; }
    public DeliveryStatus Status { get; set; }
}
