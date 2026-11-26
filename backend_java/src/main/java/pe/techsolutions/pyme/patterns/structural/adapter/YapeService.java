package pe.techsolutions.pyme.patterns.structural.adapter;

import java.util.UUID;

/**
 * Adaptee 2: API externa de Yape (BCP) con interfaz incompatible basada en celular y OTP.
 */
public class YapeService {
    public boolean payWithPhoneNumber(String phoneNumber, double amountPen, String otpCode) {
        System.out.println("[Yape BCP SDK] Validando OTP para celular " + phoneNumber + " por monto S/ " + amountPen);
        return phoneNumber != null && phoneNumber.length() >= 9;
    }

    public String generateReceiptNumber() {
        return "YAPE-BCP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
