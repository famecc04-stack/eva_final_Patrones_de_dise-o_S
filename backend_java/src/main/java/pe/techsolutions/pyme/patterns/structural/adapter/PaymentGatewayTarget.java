package pe.techsolutions.pyme.patterns.structural.adapter;

/**
 * Interfaz Target del Patron Adapter (RF1)
 * Define el contrato unificado e independiente para cualquier pasarela de pago.
 */
public interface PaymentGatewayTarget {
    PaymentResponse processPayment(PaymentRequest request);
    String getGatewayName();
    boolean isAvailable();
}
