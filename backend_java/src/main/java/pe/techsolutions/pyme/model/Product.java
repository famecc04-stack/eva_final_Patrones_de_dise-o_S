package pe.techsolutions.pyme.model;

import java.math.BigDecimal;

public class Product {
    private String id;
    private String sku;
    private String nombre;
    private String categoria;
    private BigDecimal precioBase;
    private int stockActual;
    private int stockMinimo;

    public Product(String id, String sku, String nombre, String categoria, BigDecimal precioBase, int stockActual, int stockMinimo) {
        this.id = id;
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precioBase = precioBase;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
    }

    public String getId() { return id; }
    public String getSku() { return sku; }
    public String getNombre() { return nombre; }
    public String getCategoria() { return categoria; }
    public BigDecimal getPrecioBase() { return precioBase; }
    public int getStockActual() { return stockActual; }
    public int getStockMinimo() { return stockMinimo; }

    public void setStockActual(int stockActual) { this.stockActual = stockActual; }
    public void setStockMinimo(int stockMinimo) { this.stockMinimo = stockMinimo; }
    public void setPrecioBase(BigDecimal precioBase) { this.precioBase = precioBase; }
}
