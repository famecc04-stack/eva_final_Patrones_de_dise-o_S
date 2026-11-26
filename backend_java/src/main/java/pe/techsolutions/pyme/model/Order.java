package pe.techsolutions.pyme.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Order {
    public enum EstadoPedido { CREADO, PROCESADO, PAGADO, CANCELADO }

    private String id;
    private String codigo;
    private LocalDateTime fecha;
    private String cliente;
    private List<OrderItem> items;
    private BigDecimal subtotal;
    private BigDecimal descuento;
    private BigDecimal total;
    private EstadoPedido estado;
    private String pasarelaPago;

    public Order(String id, String codigo, String cliente) {
        this.id = id;
        this.codigo = codigo;
        this.fecha = LocalDateTime.now();
        this.cliente = cliente;
        this.items = new ArrayList<>();
        this.subtotal = BigDecimal.ZERO;
        this.descuento = BigDecimal.ZERO;
        this.total = BigDecimal.ZERO;
        this.estado = EstadoPedido.CREADO;
    }

    public Order(Order other) {
        this.id = other.id;
        this.codigo = other.codigo;
        this.fecha = other.fecha;
        this.cliente = other.cliente;
        this.items = new ArrayList<>(other.items);
        this.subtotal = other.subtotal;
        this.descuento = other.descuento;
        this.total = other.total;
        this.estado = other.estado;
        this.pasarelaPago = other.pasarelaPago;
    }

    public void addItem(OrderItem item) {
        this.items.add(item);
        recalcularTotales();
    }

    public void recalcularTotales() {
        this.subtotal = items.stream()
                .map(OrderItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        this.total = this.subtotal.subtract(this.descuento).max(BigDecimal.ZERO);
    }

    public String getId() { return id; }
    public String getCodigo() { return codigo; }
    public LocalDateTime getFecha() { return fecha; }
    public String getCliente() { return cliente; }
    public List<OrderItem> getItems() { return items; }
    public BigDecimal getSubtotal() { return subtotal; }
    public BigDecimal getDescuento() { return descuento; }
    public BigDecimal getTotal() { return total; }
    public EstadoPedido getEstado() { return estado; }
    public String getPasarelaPago() { return pasarelaPago; }

    public void setDescuento(BigDecimal descuento) {
        this.descuento = descuento;
        recalcularTotales();
    }

    public void setEstado(EstadoPedido estado) { this.estado = estado; }
    public void setPasarelaPago(String pasarelaPago) { this.pasarelaPago = pasarelaPago; }
}
