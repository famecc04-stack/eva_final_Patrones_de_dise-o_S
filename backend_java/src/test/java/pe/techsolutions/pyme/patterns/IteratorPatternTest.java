package pe.techsolutions.pyme.patterns;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pe.techsolutions.pyme.model.Product;
import pe.techsolutions.pyme.patterns.behavioral.iterator.Iterator;
import pe.techsolutions.pyme.patterns.behavioral.iterator.ProductCatalog;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas Unitarias para el Patron Iterator (RF11, RF12)
 */
@DisplayName("Pruebas del Patron Iterator - Recorrido, Filtro y Paginacion")
public class IteratorPatternTest {

    private ProductCatalog catalog;

    @BeforeEach
    void setUp() {
        catalog = new ProductCatalog();
        catalog.addProduct(new Product("P1", "SKU-01", "Laptop HP ProBook", "Tecnologia", new BigDecimal("3200.00"), 10, 2));
        catalog.addProduct(new Product("P2", "SKU-02", "Teclado Mecanico Logitech", "Accesorios", new BigDecimal("250.00"), 40, 5));
        catalog.addProduct(new Product("P3", "SKU-03", "Mouse Ergonomico Inalambrico", "Accesorios", new BigDecimal("120.00"), 25, 4));
        catalog.addProduct(new Product("P4", "SKU-04", "Monitor Dell 27 4K", "Tecnologia", new BigDecimal("1850.00"), 8, 2));
        catalog.addProduct(new Product("P5", "SKU-05", "Audifonos Bluetooth Sony", "Accesorios", new BigDecimal("380.00"), 18, 3));
    }

    @Test
    @DisplayName("RF12: Recorrido secuencial sin exponer coleccion interna")
    void testSequentialIteration() {
        Iterator<Product> it = catalog.createIterator();
        int count = 0;
        while (it.hasNext()) {
            Product p = it.next();
            assertNotNull(p.getNombre());
            count++;
        }
        assertEquals(5, count);
    }

    @Test
    @DisplayName("RF11: Filtrado de catalogo por categoria 'Accesorios'")
    void testFilterByCategory() {
        Iterator<Product> it = catalog.createFilterPageIterator(
                p -> p.getCategoria().equalsIgnoreCase("Accesorios"),
                1, 10
        );

        List<Product> accesorios = new ArrayList<>();
        while (it.hasNext()) {
            accesorios.add(it.next());
        }

        assertEquals(3, accesorios.size());
        assertTrue(accesorios.stream().allMatch(p -> p.getCategoria().equals("Accesorios")));
    }

    @Test
    @DisplayName("RF11: Paginacion de catalogo (Pagina 1 y Pagina 2 con tamano 2)")
    void testPagination() {
        // Pagina 1 con 2 elementos
        Iterator<Product> page1 = catalog.createFilterPageIterator(p -> true, 1, 2);
        List<Product> p1List = new ArrayList<>();
        while (page1.hasNext()) p1List.add(page1.next());
        assertEquals(2, p1List.size());
        assertEquals("Laptop HP ProBook", p1List.get(0).getNombre());

        // Pagina 2 con 2 elementos
        Iterator<Product> page2 = catalog.createFilterPageIterator(p -> true, 2, 2);
        List<Product> p2List = new ArrayList<>();
        while (page2.hasNext()) p2List.add(page2.next());
        assertEquals(2, p2List.size());
        assertEquals("Mouse Ergonomico Inalambrico", p2List.get(0).getNombre());
    }
}
