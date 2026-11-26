package pe.techsolutions.pyme.patterns.behavioral.strategy;

import pe.techsolutions.pyme.model.Product;

import java.math.BigDecimal;

/**
 * Contexto de Precios que permite al administrador cambiar la estrategia en runtime (RF10)
 */
public class PricingContext {
    private PricingStrategy strategy;

    public PricingContext(PricingStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(PricingStrategy strategy) {
        this.strategy = strategy;
        System.out.println("[PricingContext RF10] Estrategia de precios actualizada a: " + strategy.getStrategyName());
    }

    public BigDecimal executeCalculation(Product product, int quantity) {
        return strategy.calculatePrice(product, quantity);
    }

    public PricingStrategy getStrategy() { return strategy; }
}
