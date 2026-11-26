package pe.techsolutions.pyme.grasp;

import pe.techsolutions.pyme.model.Order;
import pe.techsolutions.pyme.model.OrderItem;

import java.math.BigDecimal;

/**
 * GRASP Information Expert: Posee la informacion de calculo fiscal e impuestos (IGV 18%)
 */
public class OrderPriceExpert {
    private static final BigDecimal TASA_IGV = new BigDecimal("0.18");

    public static BigDecimal calculateIGV(Order order) {
        return order.getTotal().multiply(TASA_IGV);
    }

    public static BigDecimal calculateTotalWithIGV(Order order) {
        return order.getTotal().add(calculateIGV(order));
    }
}
