package pe.techsolutions.pyme.patterns.behavioral.iterator;

/**
 * Generic Iterator Interface (RF11)
 */
public interface Iterator<T> {
    boolean hasNext();
    T next();
}
