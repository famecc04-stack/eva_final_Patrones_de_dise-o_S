package pe.techsolutions.pyme.grasp;

import pe.techsolutions.pyme.model.Order;
import pe.techsolutions.pyme.model.OrderItem;
import pe.techsolutions.pyme.model.Product;

import java.util.UUID;

/**
 * GRASP Creator: Centraliza la creacion de entidades complejas (Order, OrderItem)
 * manteniendo bajo acoplamiento y alta cohesion.
 */
public class OrderFactory {
    public static Order createOrder(String codigo, String cliente) {
        return new Order(UUID.randomUUID().toString(), codigo, cliente);
    }

    public static OrderItem createItem(Product product, int cantidad) {
        return new OrderItem(product, cantidad, product.getPrecioBase());
    }
}
