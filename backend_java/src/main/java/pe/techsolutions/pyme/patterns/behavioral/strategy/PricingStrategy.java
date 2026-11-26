package pe.techsolutions.pyme.patterns.behavioral.strategy;

import pe.techsolutions.pyme.model.Product;

import java.math.BigDecimal;

/**
 * Strategy Interface (RF9)
 */
public interface PricingStrategy {
    BigDecimal calculatePrice(Product product, int quantity);
    String getStrategyName();
}
