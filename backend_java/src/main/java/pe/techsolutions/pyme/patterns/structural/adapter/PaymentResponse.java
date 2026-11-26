package pe.techsolutions.pyme.patterns.structural.adapter;

public class PaymentResponse {
    private boolean exitoso;
    private String transaccionId;
    private String pasarela;
    private String mensaje;

    public PaymentResponse(boolean exitoso, String transaccionId, String pasarela, String mensaje) {
        this.exitoso = exitoso;
        this.transaccionId = transaccionId;
        this.pasarela = pasarela;
        this.mensaje = mensaje;
    }

    public boolean isExitoso() { return exitoso; }
    public String getTransaccionId() { return transaccionId; }
    public String getPasarela() { return pasarela; }
    public String getMensaje() { return mensaje; }
}
