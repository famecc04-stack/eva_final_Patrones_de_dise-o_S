package pe.techsolutions.pyme.patterns.structural.adapter;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Adapter concreto para PayPal (RF1)
 */
public class PayPalAdapter implements PaymentGatewayTarget {
    private final PayPalService payPalService;
    private static final BigDecimal TIPO_CAMBIO_USD = new BigDecimal("3.75");

    public PayPalAdapter(PayPalService payPalService) {
        this.payPalService = payPalService;
    }

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        try {
            // Convierte PEN a USD si es necesario
            BigDecimal montoUsd = request.getMoneda().equalsIgnoreCase("PEN")
                    ? request.getMonto().divide(TIPO_CAMBIO_USD, 2, RoundingMode.HALF_UP)
                    : request.getMonto();

            String txId = payPalService.executePayPalPayment(
                    request.getClienteEmail(),
                    montoUsd.doubleValue(),
                    "SALE_ECOMMERCE"
            );

            return new PaymentResponse(true, txId, "PAYPAL", "Pago procesado via PayPal exitosamente en USD " + montoUsd);
        } catch (Exception e) {
            return new PaymentResponse(false, null, "PAYPAL", "Fallo al procesar con PayPal: " + e.getMessage());
        }
    }

    @Override
    public String getGatewayName() { return "PAYPAL"; }

    @Override
    public boolean isAvailable() { return true; }
}
