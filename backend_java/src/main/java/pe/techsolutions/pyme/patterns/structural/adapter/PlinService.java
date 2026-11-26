package pe.techsolutions.pyme.patterns.structural.adapter;

import java.util.UUID;

/**
 * Adaptee 3: API externa de Plin (Interbank/BBVA/Scotiabank) con QR y celular.
 */
public class PlinService {
    public String transferByQRorPhone(String phone, double amount, String bankCode) {
        System.out.println("[Plin Interbancario] Transferencia via banco " + bankCode + " hacia " + phone + " por S/ " + amount);
        return "PLIN-IBK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
