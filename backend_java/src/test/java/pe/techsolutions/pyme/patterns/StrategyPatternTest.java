package pe.techsolutions.pyme.patterns;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.techsolutions.pyme.model.Product;
import pe.techsolutions.pyme.patterns.behavioral.strategy.*;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias para el Patron Strategy (RF9, RF10)
 */
@DisplayName("Pruebas del Patron Strategy - Politicas Dinamicas de Precios")
public class StrategyPatternTest {

    private Product product;
    private PricingContext context;

    @BeforeEach
    void setUp() {
        product = new Product("P1", "SKU-IMP-01", "Impresora Epson L3250", "Tecnologia", new BigDecimal("800.00"), 20, 3);
        context = new PricingContext(new StandardPricingStrategy());
    }

    @Test
    @DisplayName("RF9: Estrategia de Precio Estandar")
    void testStandardPricing() {
        BigDecimal total = context.executeCalculation(product, 2);
        assertEquals(new BigDecimal("1600.00"), total);
    }

    @Test
    @DisplayName("RF9: Estrategia de Descuento Porcentual (15%)")
    void testPercentageDiscountPricing() {
        context.setStrategy(new PercentageDiscountStrategy(new BigDecimal("0.15")));
        BigDecimal total = context.executeCalculation(product, 2);
        // 800 * 2 = 1600 - 15% (240) = 1360.00
        assertEquals(0, new BigDecimal("1360.00").compareTo(total));
    }

    @Test
    @DisplayName("RF9: Estrategia de Precio Dinamico por Volumen (Descuento Mayorista)")
    void testDynamicPricingByVolume() {
        context.setStrategy(new DynamicPricingStrategy());

        // 1 a 9 unidades: Precio base
        BigDecimal total5 = context.executeCalculation(product, 5);
        assertEquals(new BigDecimal("4000.00"), total5);

        // >= 10 unidades: 10% descuento
        BigDecimal total10 = context.executeCalculation(product, 10);
        // 800 * 10 = 8000 * 0.90 = 7200.00
        assertEquals(0, new BigDecimal("7200.00").compareTo(total10));

        // >= 50 unidades: 25% descuento mayorista
        BigDecimal total50 = context.executeCalculation(product, 50);
        // 800 * 50 = 40000 * 0.75 = 30000.00
        assertEquals(0, new BigDecimal("30000.00").compareTo(total50));
    }

    @Test
    @DisplayName("RF10: Conmutacion de estrategia en runtime desde configuracion")
    void testSwitchStrategyAtRuntimeRF10() {
        assertEquals("PRECIO_ESTANDAR", context.getStrategy().getStrategyName());

        context.setStrategy(new PercentageDiscountStrategy(new BigDecimal("0.20")));
        assertEquals("DESCUENTO_PORCENTUAL_20%", context.getStrategy().getStrategyName());
    }
}
