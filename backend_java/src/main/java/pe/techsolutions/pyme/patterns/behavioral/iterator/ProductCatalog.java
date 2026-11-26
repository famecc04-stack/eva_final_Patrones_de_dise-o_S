package pe.techsolutions.pyme.patterns.behavioral.iterator;

import pe.techsolutions.pyme.model.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

/**
 * Concrete Aggregate: Catalogo de productos (RF12)
 * Encapsula la coleccion interna evitando exponer listas o estructuras directas al cliente.
 */
public class ProductCatalog {
    private final List<Product> internalStorage = new ArrayList<>();

    public void addProduct(Product product) {
        internalStorage.add(product);
    }

    public int totalCount() {
        return internalStorage.size();
    }

    // Retorna iterador estandar
    public Iterator<Product> createIterator() {
        return new ProductCatalogIterator(this.internalStorage, p -> true, 1, Integer.MAX_VALUE);
    }

    // Retorna iterador con filtro y paginacion (RF11)
    public Iterator<Product> createFilterPageIterator(Predicate<Product> filter, int page, int pageSize) {
        return new ProductCatalogIterator(this.internalStorage, filter, page, pageSize);
    }
}
