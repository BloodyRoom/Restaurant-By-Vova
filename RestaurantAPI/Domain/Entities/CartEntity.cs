using Domain.Entities.Base;
using Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities;

[Table("Carts")]
public class CartEntity : BaseEntity<long>
{
    [ForeignKey(nameof(User))]
    public long UserId { get; set; }
    public UserEntity? User { get; set; }


    [ForeignKey(nameof(Product))]
    public long ProductId { get; set; }
    public ProductEntity? Product { get; set; }

    public int Count { get; set; }
}
