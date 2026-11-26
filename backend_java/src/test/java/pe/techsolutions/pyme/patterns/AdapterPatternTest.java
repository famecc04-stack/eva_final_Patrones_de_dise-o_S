package pe.techsolutions.pyme.patterns;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.techsolutions.pyme.patterns.structural.adapter.*;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias para el Patron Adapter (RF1, RF2)
 */
@DisplayName("Pruebas del Patron Adapter - Pasarelas de Pago Multiples")
public class AdapterPatternTest {

    private PaymentGatewayManager manager;

    @BeforeEach
    void setUp() {
        manager = new PaymentGatewayManager();
        manager.registerGateway(new PayPalAdapter(new PayPalService()), true);
        manager.registerGateway(new YapeAdapter(new YapeService()), true);
        manager.registerGateway(new PlinAdapter(new PlinService()), true);
    }

    @Test
    @DisplayName("RF1: Procesamiento exitoso unificado mediante PayPalAdapter")
    void testPayPalPaymentSuccess() {
        PaymentRequest req = new PaymentRequest("ORD-101", new BigDecimal("375.00"), "PEN", "cliente@empresa.pe", null);
        PaymentResponse resp = manager.process("PAYPAL", req);

        assertTrue(resp.isExitoso(), "El pago via PayPal deberia ser exitoso");
        assertEquals("PAYPAL", resp.getPasarela());
        assertNotNull(resp.getTransaccionId());
        assertTrue(resp.getTransaccionId().startsWith("PAYPAL-TX-"));
    }

    @Test
    @DisplayName("RF1: Procesamiento exitoso unificado mediante YapeAdapter")
    void testYapePaymentSuccess() {
        PaymentRequest req = new PaymentRequest("ORD-102", new BigDecimal("85.50"), "PEN", null, "987654321");
        PaymentResponse resp = manager.process("YAPE", req);

        assertTrue(resp.isExitoso(), "El cobro via Yape deberia ser exitoso");
        assertEquals("YAPE", resp.getPasarela());
        assertNotNull(resp.getTransaccionId());
        assertTrue(resp.getTransaccionId().startsWith("YAPE-BCP-"));
    }

    @Test
    @DisplayName("RF1: Procesamiento exitoso unificado mediante PlinAdapter")
    void testPlinPaymentSuccess() {
        PaymentRequest req = new PaymentRequest("ORD-103", new BigDecimal("120.00"), "PEN", null, "912345678");
        PaymentResponse resp = manager.process("PLIN", req);

        assertTrue(resp.isExitoso(), "La transferencia via Plin deberia ser exitosa");
        assertEquals("PLIN", resp.getPasarela());
        assertNotNull(resp.getTransaccionId());
        assertTrue(resp.getTransaccionId().startsWith("PLIN-IBK-"));
    }

    @Test
    @DisplayName("RF2: Panel de configuracion - Deshabilitar y Habilitar pasarela")
    void testDisableGatewayRF2() {
        // Deshabilita PayPal
        manager.setGatewayEnabled("PAYPAL", false);
        assertFalse(manager.isGatewayEnabled("PAYPAL"));

        PaymentRequest req = new PaymentRequest("ORD-104", new BigDecimal("200.00"), "PEN", "cliente@empresa.pe", null);
        PaymentResponse resp = manager.process("PAYPAL", req);

        assertFalse(resp.isExitoso(), "No debe permitir procesar si la pasarela esta deshabilitada");
        assertTrue(resp.getMensaje().contains("deshabilitada"));

        // Vuelve a habilitar
        manager.setGatewayEnabled("PAYPAL", true);
        assertTrue(manager.isGatewayEnabled("PAYPAL"));
    }
}
