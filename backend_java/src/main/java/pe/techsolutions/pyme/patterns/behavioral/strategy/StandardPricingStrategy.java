package pe.techsolutions.pyme.patterns.behavioral.strategy;

import pe.techsolutions.pyme.model.Product;

import java.math.BigDecimal;

/**
 * Estrategia 1: Precio Estandar
 */
public class StandardPricingStrategy implements PricingStrategy {
    @Override
    public BigDecimal calculatePrice(Product product, int quantity) {
        return product.getPrecioBase().multiply(BigDecimal.valueOf(quantity));
    }

    @Override
    public String getStrategyName() { return "PRECIO_ESTANDAR"; }
}
