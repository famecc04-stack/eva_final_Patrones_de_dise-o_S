package pe.techsolutions.pyme.patterns.behavioral.strategy;

import pe.techsolutions.pyme.model.Product;

import java.math.BigDecimal;

/**
 * Estrategia 2: Descuento Porcentual
 */
public class PercentageDiscountStrategy implements PricingStrategy {
    private final BigDecimal discountRate; // Ej: 0.15 para 15%

    public PercentageDiscountStrategy(BigDecimal discountRate) {
        this.discountRate = discountRate;
    }

    @Override
    public BigDecimal calculatePrice(Product product, int quantity) {
        BigDecimal subtotal = product.getPrecioBase().multiply(BigDecimal.valueOf(quantity));
        BigDecimal descuento = subtotal.multiply(discountRate);
        return subtotal.subtract(descuento);
    }

    @Override
    public String getStrategyName() { return "DESCUENTO_PORCENTUAL_" + discountRate.multiply(BigDecimal.valueOf(100)).intValue() + "%"; }
}
