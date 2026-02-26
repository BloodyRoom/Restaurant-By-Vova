using Core.Constants;
using Domain.Entities.Base;
using Domain.Entities.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Delivery;

[Table("Delivery")]
public class DeliveryEntity : BaseEntity<long>
{
    [ForeignKey(nameof(User))]
    public long UserId { get; set; }
    public UserEntity User { get; set; }

    public string Address { get; set; } = string.Empty;

    public DeliveryStatus Status { get; set; } = DeliveryStatus.Created;

    public ICollection<DeliveryProductEntity> DeliveryProducts { get; set; } = new List<DeliveryProductEntity>();
}
