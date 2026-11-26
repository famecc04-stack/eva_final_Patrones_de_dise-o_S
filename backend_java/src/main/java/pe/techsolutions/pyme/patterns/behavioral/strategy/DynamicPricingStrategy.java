package pe.techsolutions.pyme.patterns.behavioral.strategy;

import pe.techsolutions.pyme.model.Product;

import java.math.BigDecimal;

/**
 * Estrategia 3: Precio Dinamico por Volumen o Temporada (RF9)
 */
public class DynamicPricingStrategy implements PricingStrategy {
    @Override
    public BigDecimal calculatePrice(Product product, int quantity) {
        BigDecimal base = product.getPrecioBase().multiply(BigDecimal.valueOf(quantity));
        if (quantity >= 50) {
            // Descuento mayorista agresivo 25%
            return base.multiply(new BigDecimal("0.75"));
        } else if (quantity >= 20) {
            // Descuento intermedio 15%
            return base.multiply(new BigDecimal("0.85"));
        } else if (quantity >= 10) {
            // Descuento inicial 10%
            return base.multiply(new BigDecimal("0.90"));
        }
        return base;
    }

    @Override
    public String getStrategyName() { return "PRECIO_DINAMICO_VOLUMEN"; }
}
