package pe.techsolutions.pyme.patterns.structural.adapter;

import java.math.BigDecimal;

public class PaymentRequest {
    private String codigoPedido;
    private BigDecimal monto;
    private String moneda; // PEN o USD
    private String clienteEmail;
    private String telefonoCelular; // Para Yape / Plin

    public PaymentRequest(String codigoPedido, BigDecimal monto, String moneda, String clienteEmail, String telefonoCelular) {
        this.codigoPedido = codigoPedido;
        this.monto = monto;
        this.moneda = moneda;
        this.clienteEmail = clienteEmail;
        this.telefonoCelular = telefonoCelular;
    }

    public String getCodigoPedido() { return codigoPedido; }
    public BigDecimal getMonto() { return monto; }
    public String getMoneda() { return moneda; }
    public String getClienteEmail() { return clienteEmail; }
    public String getTelefonoCelular() { return telefonoCelular; }
}
