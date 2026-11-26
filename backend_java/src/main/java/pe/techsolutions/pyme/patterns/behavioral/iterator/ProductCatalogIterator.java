package pe.techsolutions.pyme.patterns.behavioral.iterator;

import pe.techsolutions.pyme.model.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.Predicate;

/**
 * Concrete Iterator con soporte para filtros y paginacion (RF11, RF12)
 */
public class ProductCatalogIterator implements Iterator<Product> {

    private final List<Product> pageItems;
    private int cursor = 0;

    public ProductCatalogIterator(List<Product> allProducts, Predicate<Product> filter, int page, int pageSize) {
        // Filtra los elementos
        List<Product> filtered = new ArrayList<>();
        for (Product p : allProducts) {
            if (filter.test(p)) {
                filtered.add(p);
            }
        }

        // Aplica paginacion
        int fromIndex = Math.max(0, (page - 1) * pageSize);
        int toIndex = Math.min(filtered.size(), fromIndex + pageSize);

        if (fromIndex <= filtered.size()) {
            this.pageItems = new ArrayList<>(filtered.subList(fromIndex, toIndex));
        } else {
            this.pageItems = new ArrayList<>();
        }
    }

    @Override
    public boolean hasNext() {
        return cursor < pageItems.size();
    }

    @Override
    public Product next() {
        if (!hasNext()) {
            throw new NoSuchElementException("No hay mas productos en la pagina del iterador.");
        }
        return pageItems.get(cursor++);
    }
}
