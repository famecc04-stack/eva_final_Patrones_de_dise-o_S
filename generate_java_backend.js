const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'backend_java');
const srcMain = path.join(baseDir, 'src', 'main', 'java', 'pe', 'techsolutions', 'pyme');
const srcTest = path.join(baseDir, 'src', 'test', 'java', 'pe', 'techsolutions', 'pyme');

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('Creado: ' + path.relative(baseDir, filePath));
}

// 1. pom.xml
writeFile(path.join(baseDir, 'pom.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    <groupId>pe.techsolutions</groupId>
    <artifactId>techsolutions-platform</artifactId>
    <version>1.0.0-FINAL</version>
    <name>TechSolutions Platform</name>
    <description>Plataforma de Gestion Empresarial Integral para PYMES - Zegel Evaluacion Final</description>
    <properties>
        <java.version>17</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.2.2</version>
            </plugin>
        </plugins>
    </build>
</project>`);

// 2. Main Application
writeFile(path.join(srcMain, 'TechSolutionsApplication.java'), `package pe.techsolutions.pyme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * TechSolutions S.A. - Plataforma de Gestion Empresarial para PYMES
 * Curso: Patrones de Diseno de Software - Zegel
 * Integrantes:
 * - Orellana del Castillo, Estefania
 * - Cadillo Cordova, Fabiola
 */
@SpringBootApplication
public class TechSolutionsApplication {
    public static void main(String[] args) {
        SpringApplication.run(TechSolutionsApplication.class, args);
        System.out.println(">>> TechSolutions S.A. Backend iniciado exitosamente.");
    }
}
`);

// 3. Models
writeFile(path.join(srcMain, 'model', 'Role.java'), `package pe.techsolutions.pyme.model;

public enum Role {
    ADMINISTRADOR("Administrador de Sistemas"),
    GERENTE("Gerente General"),
    CONTADOR("Contador Principal"),
    COMPRAS("Especialista de Compras"),
    VENDEDOR("Operador de Ventas");

    private final String descripcion;

    Role(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
`);

writeFile(path.join(srcMain, 'model', 'User.java'), `package pe.techsolutions.pyme.model;

public class User {
    private String id;
    private String nombre;
    private String email;
    private Role role;
    private boolean activo;

    public User(String id, String nombre, String email, Role role, boolean activo) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.role = role;
        this.activo = activo;
    }

    public String getId() { return id; }
    public String getNombre() { return nombre; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public boolean isActivo() { return activo; }
}
`);

writeFile(path.join(srcMain, 'model', 'Product.java'), `package pe.techsolutions.pyme.model;

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
`);

writeFile(path.join(srcMain, 'model', 'OrderItem.java'), `package pe.techsolutions.pyme.model;

import java.math.BigDecimal;

public class OrderItem {
    private Product producto;
    private int cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;

    public OrderItem(Product producto, int cantidad, BigDecimal precioUnitario) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subtotal = precioUnitario.multiply(BigDecimal.valueOf(cantidad));
    }

    public Product getProducto() { return producto; }
    public int getCantidad() { return cantidad; }
    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public BigDecimal getSubtotal() { return subtotal; }
}
`);

writeFile(path.join(srcMain, 'model', 'Order.java'), `package pe.techsolutions.pyme.model;

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
`);

writeFile(path.join(srcMain, 'model', 'FinancialReportData.java'), `package pe.techsolutions.pyme.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

public class FinancialReportData {
    private BigDecimal facturacionBruta;
    private BigDecimal costoMercaderia;
    private BigDecimal utilidadNeta;
    private BigDecimal comisionesPasarelas;
    private Map<String, BigDecimal> margenPorCategoria;
    private LocalDateTime fechaGeneracion;
    private String generadoPor;

    public FinancialReportData(BigDecimal facturacionBruta, BigDecimal costoMercaderia, BigDecimal utilidadNeta,
                               BigDecimal comisionesPasarelas, Map<String, BigDecimal> margenPorCategoria, String generadoPor) {
        this.facturacionBruta = facturacionBruta;
        this.costoMercaderia = costoMercaderia;
        this.utilidadNeta = utilidadNeta;
        this.comisionesPasarelas = comisionesPasarelas;
        this.margenPorCategoria = margenPorCategoria;
        this.fechaGeneracion = LocalDateTime.now();
        this.generadoPor = generadoPor;
    }

    public BigDecimal getFacturacionBruta() { return facturacionBruta; }
    public BigDecimal getCostoMercaderia() { return costoMercaderia; }
    public BigDecimal getUtilidadNeta() { return utilidadNeta; }
    public BigDecimal getComisionesPasarelas() { return comisionesPasarelas; }
    public Map<String, BigDecimal> getMargenPorCategoria() { return margenPorCategoria; }
    public LocalDateTime getFechaGeneracion() { return fechaGeneracion; }
    public String getGeneradoPor() { return generadoPor; }
}
`);

console.log('Modelos creados correctamente.');
