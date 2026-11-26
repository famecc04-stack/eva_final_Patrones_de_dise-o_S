package pe.techsolutions.pyme.patterns.structural.adapter;

/**
 * Adapter concreto para Plin (RF1)
 */
public class PlinAdapter implements PaymentGatewayTarget {
    private final PlinService plinService;

    public PlinAdapter(PlinService plinService) {
        this.plinService = plinService;
    }

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        try {
            String opCode = plinService.transferByQRorPhone(
                    request.getTelefonoCelular(),
                    request.getMonto().doubleValue(),
                    "INTERBANK"
            );
            return new PaymentResponse(true, opCode, "PLIN", "Transferencia Plin acreditada correctamente.");
        } catch (Exception e) {
            return new PaymentResponse(false, null, "PLIN", "Error en red Plin: " + e.getMessage());
        }
    }

    @Override
    public String getGatewayName() { return "PLIN"; }

    @Override
    public boolean isAvailable() { return true; }
}
