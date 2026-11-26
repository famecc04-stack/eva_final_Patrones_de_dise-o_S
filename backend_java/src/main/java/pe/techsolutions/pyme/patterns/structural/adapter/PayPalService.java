package pe.techsolutions.pyme.patterns.structural.adapter;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Adaptee 1: API externa de PayPal con interfaz incompatible.
 */
public class PayPalService {
    public String executePayPalPayment(String accountEmail, double amountInUsd, String intent) {
        System.out.println("[PayPal SDK] Procesando cargo a " + accountEmail + " por USD " + amountInUsd + " con intento " + intent);
        return "PAYPAL-TX-" + UUID.randomUUID().toString().substring(0, 8);
    }
}
