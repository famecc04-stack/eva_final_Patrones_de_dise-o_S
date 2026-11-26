package pe.techsolutions.pyme.patterns.structural.adapter;

/**
 * Adapter concreto para Yape (RF1)
 */
public class YapeAdapter implements PaymentGatewayTarget {
    private final YapeService yapeService;

    public YapeAdapter(YapeService yapeService) {
        this.yapeService = yapeService;
    }

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        boolean ok = yapeService.payWithPhoneNumber(
                request.getTelefonoCelular(),
                request.getMonto().doubleValue(),
                "123456" // OTP simulado
        );

        if (ok) {
            String receipt = yapeService.generateReceiptNumber();
            return new PaymentResponse(true, receipt, "YAPE", "Cobro inmediato Yape exitoso por S/ " + request.getMonto());
        } else {
            return new PaymentResponse(false, null, "YAPE", "Numero celular invalido o saldo insuficiente en Yape");
        }
    }

    @Override
    public String getGatewayName() { return "YAPE"; }

    @Override
    public boolean isAvailable() { return true; }
}
