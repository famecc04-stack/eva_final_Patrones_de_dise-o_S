package pe.techsolutions.pyme.patterns.structural.adapter;

import java.util.HashMap;
import java.util.Map;

/**
 * Gestor de Pasarelas y Panel de Habilitacion/Deshabilitacion (RF2)
 */
public class PaymentGatewayManager {
    private final Map<String, PaymentGatewayTarget> gateways = new HashMap<>();
    private final Map<String, Boolean> enabledStatus = new HashMap<>();

    public void registerGateway(PaymentGatewayTarget gateway, boolean enabled) {
        gateways.put(gateway.getGatewayName().toUpperCase(), gateway);
        enabledStatus.put(gateway.getGatewayName().toUpperCase(), enabled);
    }

    public void setGatewayEnabled(String gatewayName, boolean enabled) {
        String key = gatewayName.toUpperCase();
        if (gateways.containsKey(key)) {
            enabledStatus.put(key, enabled);
            System.out.println("[Configuracion RF2] Pasarela " + key + " " + (enabled ? "HABILITADA" : "DESHABILITADA"));
        } else {
            throw new IllegalArgumentException("Pasarela no registrada: " + gatewayName);
        }
    }

    public boolean isGatewayEnabled(String gatewayName) {
        return enabledStatus.getOrDefault(gatewayName.toUpperCase(), false);
    }

    public PaymentResponse process(String gatewayName, PaymentRequest request) {
        String key = gatewayName.toUpperCase();
        if (!isGatewayEnabled(key)) {
            return new PaymentResponse(false, null, key, "La pasarela de pago seleccionada se encuentra deshabilitada temporalmente.");
        }
        PaymentGatewayTarget target = gateways.get(key);
        if (target == null) {
            return new PaymentResponse(false, null, key, "Pasarela no soportada en el sistema.");
        }
        return target.processPayment(request);
    }
}
