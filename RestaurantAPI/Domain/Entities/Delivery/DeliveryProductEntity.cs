using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities.Delivery;

[Table("DeliveryProducts")]
public class DeliveryProductEntity
{
    [ForeignKey(nameof(Delivery))]
    public long DeliveryId { get; set; }
    public DeliveryEntity Delivery { get; set; } = null!;

    [ForeignKey(nameof(Product))]
    public long ProductId { get; set; }
    public ProductEntity Product { get; set; } = null!;

    public int Count { get; set; }
}