const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');

// ============================================================================
// 1. PATRÓN ADAPTER (RF1, RF2)
// ============================================================================
class PayPalService {
  executePayPalPayment(email, amountUsd, intent) {
    return `PAYPAL-TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  }
}

class YapeService {
  payWithPhoneNumber(phone, amountPen, otp) {
    return phone && phone.length >= 9;
  }
  generateReceiptNumber() {
    return `YAPE-BCP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  }
}

class PlinService {
  transferByQRorPhone(phone, amount, bankCode) {
    return `PLIN-IBK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  }
}

class PayPalAdapter {
  constructor(payPalService) {
    this.payPalService = payPalService;
    this.exchangeRate = 3.75;
  }
  getGatewayName() { return 'PAYPAL'; }
  processPayment(req) {
    const usd = req.moneda === 'PEN' ? Number((req.monto / this.exchangeRate).toFixed(2)) : req.monto;
    const txId = this.payPalService.executePayPalPayment(req.clienteEmail, usd, 'SALE_ECOMMERCE');
    return { exitoso: true, transaccionId: txId, pasarela: 'PAYPAL', mensaje: `Pago procesado via PayPal USD ${usd}` };
  }
}

class YapeAdapter {
  constructor(yapeService) {
    this.yapeService = yapeService;
  }
  getGatewayName() { return 'YAPE'; }
  processPayment(req) {
    const ok = this.yapeService.payWithPhoneNumber(req.telefonoCelular, req.monto, '123456');
    if (ok) {
      return { exitoso: true, transaccionId: this.yapeService.generateReceiptNumber(), pasarela: 'YAPE', mensaje: 'Cobro Yape exitoso' };
    }
    return { exitoso: false, transaccionId: null, pasarela: 'YAPE', mensaje: 'Numero celular invalido' };
  }
}

class PlinAdapter {
  constructor(plinService) {
    this.plinService = plinService;
  }
  getGatewayName() { return 'PLIN'; }
  processPayment(req) {
    const op = this.plinService.transferByQRorPhone(req.telefonoCelular, req.monto, 'INTERBANK');
    return { exitoso: true, transaccionId: op, pasarela: 'PLIN', mensaje: 'Transferencia Plin acreditada' };
  }
}

class PaymentGatewayManager {
  constructor() {
    this.gateways = new Map();
    this.enabledStatus = new Map();
  }
  registerGateway(adapter, enabled = true) {
    this.gateways.set(adapter.getGatewayName(), adapter);
    this.enabledStatus.set(adapter.getGatewayName(), enabled);
  }
  setGatewayEnabled(name, enabled) {
    if (!this.gateways.has(name)) throw new Error('Pasarela no existe');
    this.enabledStatus.set(name, enabled);
  }
  isGatewayEnabled(name) {
    return this.enabledStatus.get(name) === true;
  }
  process(name, req) {
    if (!this.isGatewayEnabled(name)) {
      return { exitoso: false, pasarela: name, mensaje: 'La pasarela de pago seleccionada se encuentra deshabilitada temporalmente.' };
    }
    return this.gateways.get(name).processPayment(req);
  }
}

// ============================================================================
// 2. PATRÓN PROXY (RF3, RF4)
// ============================================================================
class RealFinancialReportService {
  constructor() {
    this.initialized = true;
  }
  generateReport(user, month, year) {
    return {
      facturacionBruta: 245600.00,
      costoMercaderia: 138400.00,
      utilidadNeta: 72180.00,
      comisionesPasarelas: 4210.00,
      month,
      year,
      generadoPor: `${user.nombre} (${user.role})`
    };
  }
}

class FinancialReportProxy {
  constructor() {
    this.realService = null;
    this.cache = new Map();
    this.ttlMs = 300000; // 300s
  }
  generateReport(user, month, year) {
    if (!user || !user.activo) {
      throw new Error('Acceso denegado: Usuario no autenticado o inactivo.');
    }
    if (user.role !== 'GERENTE' && user.role !== 'CONTADOR') {
      throw new Error(`Acceso denegado (RF4): Solo usuarios con rol GERENTE o CONTADOR pueden acceder a los reportes financieros confidenciales. Rol actual: ${user.role}`);
    }

    const key = `${month}-${year}`;
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp < this.ttlMs)) {
      return { ...cached.data, fromCache: true };
    }

    if (!this.realService) {
      this.realService = new RealFinancialReportService();
    }

    const data = this.realService.generateReport(user, month, year);
    this.cache.set(key, { data, timestamp: Date.now() });
    return { ...data, fromCache: false };
  }
  getCacheSize() {
    return this.cache.size;
  }
}

// ============================================================================
// 3. PATRÓN OBSERVER (RF5, RF6)
// ============================================================================
class InventoryStockSubject {
  constructor() {
    this.observers = [];
    this.products = new Map();
  }
  attach(obs) { this.observers.push(obs); }
  detach(obs) { this.observers = this.observers.filter(o => o !== obs); }
  notify(product) {
    this.observers.forEach(o => o.onStockLow(product, product.stockActual, product.stockMinimo));
  }
  addProduct(p) { this.products.set(p.id, p); }
  configureMinimumStock(id, newMin) {
    const p = this.products.get(id);
    if (p) {
      p.stockMinimo = newMin;
      if (p.stockActual <= newMin) this.notify(p);
    }
  }
  reduceStock(id, qty) {
    const p = this.products.get(id);
    if (p) {
      p.stockActual -= qty;
      if (p.stockActual <= p.stockMinimo) this.notify(p);
    }
  }
}

class ManagerStockNotifier {
  constructor() { this.alerts = []; }
  onStockLow(product, current, min) {
    this.alerts.push(`[ALERTA GERENCIAL] ${product.nombre} stock critico: ${current} (Minimo: ${min})`);
  }
}

class ProcurementStockNotifier {
  constructor() { this.purchaseRequests = []; }
  onStockLow(product, current, min) {
    this.purchaseRequests.push(`[COMPRAS REPOSICION] Generada orden de compra para ${product.nombre}`);
  }
}

// ============================================================================
// 4. PATRÓN COMMAND (RF7) Y MEMENTO (RF8)
// ============================================================================
class Order {
  constructor(id, codigo, cliente, total = 0) {
    this.id = id;
    this.codigo = codigo;
    this.cliente = cliente;
    this.total = total;
    this.estado = 'CREADO';
    this.descuento = 0;
  }
}

class OrderOriginator {
  constructor(order) { this.order = order; }
  saveToMemento() {
    return {
      estado: this.order.estado,
      total: this.order.total,
      descuento: this.order.descuento,
      timestamp: Date.now()
    };
  }
  restoreFromMemento(memento) {
    this.order.estado = memento.estado;
    this.order.total = memento.total;
    this.order.descuento = memento.descuento;
  }
}

class OrderCaretaker {
  constructor() { this.history = []; }
  pushMemento(m) { this.history.push(m); }
  popMemento() { return this.history.pop() || null; }
  hasMementos() { return this.history.length > 0; }
}

class ProcessOrderCommand {
  constructor(originator, caretaker) {
    this.originator = originator;
    this.caretaker = caretaker;
    this.commandId = `CMD-PROC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    this.description = `Procesar Pedido ${originator.order.codigo}`;
  }
  execute() {
    this.caretaker.pushMemento(this.originator.saveToMemento());
    this.originator.order.estado = 'PROCESADO';
  }
  undo() {
    const m = this.caretaker.popMemento();
    if (m) this.originator.restoreFromMemento(m);
  }
}

class CancelOrderCommand {
  constructor(originator, caretaker) {
    this.originator = originator;
    this.caretaker = caretaker;
    this.commandId = `CMD-CANC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    this.description = `Cancelar Pedido ${originator.order.codigo}`;
  }
  execute() {
    this.caretaker.pushMemento(this.originator.saveToMemento());
    this.originator.order.estado = 'CANCELADO';
  }
  undo() {
    const m = this.caretaker.popMemento();
    if (m) this.originator.restoreFromMemento(m);
  }
}

class OrderCommandInvoker {
  constructor() { this.executionHistory = []; }
  executeCommand(cmd) {
    cmd.execute();
    this.executionHistory.push(cmd);
  }
  undoLastCommand() {
    const cmd = this.executionHistory.pop();
    if (cmd) cmd.undo();
  }
}

// ============================================================================
// 5. PATRÓN STRATEGY (RF9, RF10)
// ============================================================================
class StandardPricingStrategy {
  getStrategyName() { return 'PRECIO_ESTANDAR'; }
  calculatePrice(product, qty) { return product.precioBase * qty; }
}

class PercentageDiscountStrategy {
  constructor(rate) { this.rate = rate; }
  getStrategyName() { return `DESCUENTO_PORCENTUAL_${this.rate * 100}%`; }
  calculatePrice(product, qty) {
    const subtotal = product.precioBase * qty;
    return subtotal - (subtotal * this.rate);
  }
}

class DynamicPricingStrategy {
  getStrategyName() { return 'PRECIO_DINAMICO_VOLUMEN'; }
  calculatePrice(product, qty) {
    const subtotal = product.precioBase * qty;
    if (qty >= 50) return subtotal * 0.75; // 25% descuento mayorista
    if (qty >= 20) return subtotal * 0.85; // 15%
    if (qty >= 10) return subtotal * 0.90; // 10%
    return subtotal;
  }
}

class PricingContext {
  constructor(strategy) { this.strategy = strategy; }
  setStrategy(strategy) { this.strategy = strategy; }
  getStrategy() { return this.strategy; }
  executeCalculation(product, qty) {
    return this.strategy.calculatePrice(product, qty);
  }
}

// ============================================================================
// 6. PATRÓN ITERATOR (RF11, RF12)
// ============================================================================
class ProductCatalog {
  constructor() {
    this._items = []; // Encapsulacion de la coleccion (RF12)
  }
  addProduct(p) { this._items.push(p); }
  totalCount() { return this._items.length; }
  createIterator() {
    return new ProductCatalogIterator(this._items, () => true, 1, Math.max(this._items.length, 1));
  }
  createFilterPageIterator(filterFn, page = 1, pageSize = 10) {
    return new ProductCatalogIterator(this._items, filterFn, page, pageSize);
  }
}

class ProductCatalogIterator {
  constructor(items, filterFn, page, pageSize) {
    const filtered = items.filter(filterFn);
    const start = Math.max(0, (page - 1) * pageSize);
    const end = Math.min(filtered.length, start + pageSize);
    this.pageItems = filtered.slice(start, end);
    this.cursor = 0;
  }
  hasNext() {
    return this.cursor < this.pageItems.length;
  }
  next() {
    if (!this.hasNext()) throw new Error('No more items');
    return this.pageItems[this.cursor++];
  }
}

// ============================================================================
// 7. PATRONES GRASP (Controller, Expert, Creator, Pure Fabrication)
// ============================================================================
class OrderFactory {
  static createOrder(codigo, cliente, total = 0) {
    return new Order(`ORD-${Date.now()}`, codigo, cliente, total);
  }
}

class OrderPriceExpert {
  static calculateIGV(order) {
    return Number((order.total * 0.18).toFixed(2));
  }
  static calculateTotalWithIGV(order) {
    return Number((order.total * 1.18).toFixed(2));
  }
}

class OrderController {
  constructor(paymentManager) {
    this.paymentManager = paymentManager;
    this.invoker = new OrderCommandInvoker();
  }
  createOrder(codigo, cliente, total) {
    return OrderFactory.createOrder(codigo, cliente, total);
  }
  processAndPay(order, pasarela, celular) {
    const orig = new OrderOriginator(order);
    const care = new OrderCaretaker();
    const proc = new ProcessOrderCommand(orig, care);
    this.invoker.executeCommand(proc);

    const resp = this.paymentManager.process(pasarela, {
      codigoPedido: order.codigo,
      monto: order.total,
      moneda: 'PEN',
      clienteEmail: `${order.cliente.replace(/\s+/g, '')}@pyme.pe`,
      telefonoCelular: celular
    });

    if (resp.exitoso) {
      order.estado = 'PAGADO';
      order.pasarelaPago = pasarela;
    }
    return resp;
  }
}


// ============================================================================
// SUITE DE PRUEBAS UNITARIAS (TEST RUNNER NATIVO NODE.JS)
// ============================================================================

describe('TECHSOLUTIONS EVALUACIÓN FINAL - TEST SUITE DE PATRONES', () => {

  describe('1. Patron Adapter (RF1, RF2)', () => {
    let mgr;
    beforeEach(() => {
      mgr = new PaymentGatewayManager();
      mgr.registerGateway(new PayPalAdapter(new PayPalService()), true);
      mgr.registerGateway(new YapeAdapter(new YapeService()), true);
      mgr.registerGateway(new PlinAdapter(new PlinService()), true);
    });

    test('RF1: Procesamiento exitoso unificado mediante PayPalAdapter', () => {
      const resp = mgr.process('PAYPAL', { codigoPedido: 'ORD-101', monto: 375, moneda: 'PEN', clienteEmail: 'cliente@pyme.pe' });
      assert.equal(resp.exitoso, true);
      assert.equal(resp.pasarela, 'PAYPAL');
      assert.match(resp.transaccionId, /^PAYPAL-TX-/);
    });

    test('RF1: Procesamiento exitoso unificado mediante YapeAdapter', () => {
      const resp = mgr.process('YAPE', { codigoPedido: 'ORD-102', monto: 85.50, telefonoCelular: '987654321' });
      assert.equal(resp.exitoso, true);
      assert.equal(resp.pasarela, 'YAPE');
      assert.match(resp.transaccionId, /^YAPE-BCP-/);
    });

    test('RF1: Procesamiento exitoso unificado mediante PlinAdapter', () => {
      const resp = mgr.process('PLIN', { codigoPedido: 'ORD-103', monto: 120, telefonoCelular: '912345678' });
      assert.equal(resp.exitoso, true);
      assert.equal(resp.pasarela, 'PLIN');
      assert.match(resp.transaccionId, /^PLIN-IBK-/);
    });

    test('RF2: Panel de configuracion - Deshabilitar y Habilitar pasarela', () => {
      mgr.setGatewayEnabled('PAYPAL', false);
      assert.equal(mgr.isGatewayEnabled('PAYPAL'), false);

      const resp = mgr.process('PAYPAL', { codigoPedido: 'ORD-104', monto: 200, clienteEmail: 'test@pyme.pe' });
      assert.equal(resp.exitoso, false);
      assert.match(resp.mensaje, /deshabilitada/);

      mgr.setGatewayEnabled('PAYPAL', true);
      assert.equal(mgr.isGatewayEnabled('PAYPAL'), true);
    });
  });

  describe('2. Patron Proxy (RF3, RF4)', () => {
    let proxy;
    const gerente = { nombre: 'Estefania Orellana', role: 'GERENTE', activo: true };
    const contador = { nombre: 'Carlos Mendoza', role: 'CONTADOR', activo: true };
    const vendedor = { nombre: 'Ana Romero', role: 'VENDEDOR', activo: true };
    const compras = { nombre: 'Jorge Linares', role: 'COMPRAS', activo: true };

    beforeEach(() => {
      proxy = new FinancialReportProxy();
    });

    test('RF4: Acceso autorizado completo para Gerente y Contador', () => {
      const repG = proxy.generateReport(gerente, 11, 2026);
      assert.equal(repG.facturacionBruta, 245600.00);
      assert.match(repG.generadoPor, /GERENTE/);

      const repC = proxy.generateReport(contador, 12, 2026);
      assert.equal(repC.facturacionBruta, 245600.00);
      assert.match(repC.generadoPor, /CONTADOR/);
    });

    test('RF3, RF4: Denegacion estricta a roles no autorizados', () => {
      assert.throws(() => proxy.generateReport(vendedor, 11, 2026), /Acceso denegado \(RF4\)/);
      assert.throws(() => proxy.generateReport(compras, 11, 2026), /Acceso denegado \(RF4\)/);
    });

    test('Eficiencia Proxy: Almacenamiento en Cache y Reutilizacion', () => {
      assert.equal(proxy.getCacheSize(), 0);
      const rep1 = proxy.generateReport(gerente, 11, 2026);
      assert.equal(rep1.fromCache, false);
      assert.equal(proxy.getCacheSize(), 1);

      const rep2 = proxy.generateReport(contador, 11, 2026);
      assert.equal(rep2.fromCache, true);
    });
  });

  describe('3. Patron Observer (RF5, RF6)', () => {
    let inv, mgrObs, procObs, prod;
    beforeEach(() => {
      inv = new InventoryStockSubject();
      mgrObs = new ManagerStockNotifier();
      procObs = new ProcurementStockNotifier();
      inv.attach(mgrObs);
      inv.attach(procObs);

      prod = { id: 'P1', nombre: 'Laptop Dell Vostro', stockActual: 15, stockMinimo: 5 };
      inv.addProduct(prod);
    });

    test('RF5: Notificacion automatica simultanea a Gerente y Compras al caer stock por debajo del minimo', () => {
      inv.reduceStock('P1', 12); // 15 - 12 = 3 (Minimo = 5)
      assert.equal(mgrObs.alerts.length, 1);
      assert.equal(procObs.purchaseRequests.length, 1);
      assert.match(mgrObs.alerts[0], /stock critico: 3/);
      assert.match(procObs.purchaseRequests[0], /Laptop Dell Vostro/);
    });

    test('RF6: Nivel minimo de stock configurable por producto', () => {
      inv.configureMinimumStock('P1', 20); // 15 <= 20 -> Alerta inmediata
      assert.equal(prod.stockMinimo, 20);
      assert.equal(mgrObs.alerts.length, 1);
      assert.equal(procObs.purchaseRequests.length, 1);
    });

    test('Observer: No dispara alertas cuando el stock es saludable', () => {
      inv.reduceStock('P1', 2); // 15 - 2 = 13 (Minimo = 5)
      assert.equal(mgrObs.alerts.length, 0);
      assert.equal(procObs.purchaseRequests.length, 0);
    });
  });

  describe('4. Patron Command (RF7) y Memento (RF8)', () => {
    let order, orig, care, invoker;
    beforeEach(() => {
      order = new Order('ORD-1', 'ORD-2026-001', 'Mineria Andina', 2400);
      orig = new OrderOriginator(order);
      care = new OrderCaretaker();
      invoker = new OrderCommandInvoker();
    });

    test('RF7: Encapsulacion y registro de acciones de pedido en historial', () => {
      assert.equal(order.estado, 'CREADO');
      const cmd = new ProcessOrderCommand(orig, care);
      invoker.executeCommand(cmd);

      assert.equal(order.estado, 'PROCESADO');
      assert.equal(invoker.executionHistory.length, 1);
      assert.match(invoker.executionHistory[0].description, /Procesar Pedido/);
    });

    test('RF8: Reversion de cancelacion mediante restauracion de Memento (Rollback / Undo)', () => {
      const proc = new ProcessOrderCommand(orig, care);
      invoker.executeCommand(proc);
      assert.equal(order.estado, 'PROCESADO');

      const canc = new CancelOrderCommand(orig, care);
      invoker.executeCommand(canc);
      assert.equal(order.estado, 'CANCELADO');

      canc.undo();
      assert.equal(order.estado, 'PROCESADO', 'Debe regresar a PROCESADO tras undo');
    });
  });

  describe('5. Patron Strategy (RF9, RF10)', () => {
    const prod = { nombre: 'Impresora Epson', precioBase: 800 };
    let ctx;
    beforeEach(() => {
      ctx = new PricingContext(new StandardPricingStrategy());
    });

    test('RF9: Estrategia de Precio Estandar', () => {
      assert.equal(ctx.executeCalculation(prod, 2), 1600);
    });

    test('RF9: Estrategia de Descuento Porcentual (15%)', () => {
      ctx.setStrategy(new PercentageDiscountStrategy(0.15));
      assert.equal(ctx.executeCalculation(prod, 2), 1360);
    });

    test('RF9: Estrategia de Precio Dinamico por Volumen (Mayorista)', () => {
      ctx.setStrategy(new DynamicPricingStrategy());
      assert.equal(ctx.executeCalculation(prod, 5), 4000);  // Sin descuento
      assert.equal(ctx.executeCalculation(prod, 10), 7200); // 10% descuento
      assert.equal(ctx.executeCalculation(prod, 50), 30000); // 25% descuento
    });

    test('RF10: Conmutacion de estrategia en runtime desde configuracion', () => {
      assert.equal(ctx.getStrategy().getStrategyName(), 'PRECIO_ESTANDAR');
      ctx.setStrategy(new PercentageDiscountStrategy(0.20));
      assert.equal(ctx.getStrategy().getStrategyName(), 'DESCUENTO_PORCENTUAL_20%');
    });
  });

  describe('6. Patron Iterator (RF11, RF12)', () => {
    let cat;
    beforeEach(() => {
      cat = new ProductCatalog();
      cat.addProduct({ id: 'P1', nombre: 'Laptop HP', categoria: 'Tecnologia' });
      cat.addProduct({ id: 'P2', nombre: 'Teclado Logitech', categoria: 'Accesorios' });
      cat.addProduct({ id: 'P3', nombre: 'Mouse Ergonomico', categoria: 'Accesorios' });
      cat.addProduct({ id: 'P4', nombre: 'Monitor Dell 4K', categoria: 'Tecnologia' });
      cat.addProduct({ id: 'P5', nombre: 'Audifonos Bluetooth', categoria: 'Accesorios' });
    });

    test('RF12: Recorrido secuencial sin exponer coleccion interna', () => {
      const it = cat.createIterator();
      const names = [];
      while (it.hasNext()) {
        names.push(it.next().nombre);
      }
      assert.equal(names.length, 5);
      assert.equal(names[0], 'Laptop HP');
    });

    test('RF11: Filtrado de catalogo por categoria Accesorios', () => {
      const it = cat.createFilterPageIterator(p => p.categoria === 'Accesorios');
      const items = [];
      while (it.hasNext()) items.push(it.next());
      assert.equal(items.length, 3);
      assert.ok(items.every(p => p.categoria === 'Accesorios'));
    });

    test('RF11: Paginacion de catalogo (Pagina 1 y 2 con tamano 2)', () => {
      const it1 = cat.createFilterPageIterator(() => true, 1, 2);
      const p1 = [];
      while (it1.hasNext()) p1.push(it1.next().nombre);
      assert.deepEqual(p1, ['Laptop HP', 'Teclado Logitech']);

      const it2 = cat.createFilterPageIterator(() => true, 2, 2);
      const p2 = [];
      while (it2.hasNext()) p2.push(it2.next().nombre);
      assert.deepEqual(p2, ['Mouse Ergonomico', 'Monitor Dell 4K']);
    });
  });

  describe('7. Patrones GRASP (Controller, Expert, Creator)', () => {
    let ctrl, mgr;
    beforeEach(() => {
      mgr = new PaymentGatewayManager();
      mgr.registerGateway(new YapeAdapter(new YapeService()), true);
      ctrl = new OrderController(mgr);
    });

    test('GRASP Creator: OrderFactory crea instancias validas', () => {
      const o = OrderFactory.createOrder('ORD-500', 'Cliente SAC', 100);
      assert.equal(o.codigo, 'ORD-500');
      assert.equal(o.estado, 'CREADO');
    });

    test('GRASP Information Expert: Calculo de IGV 18% SUNAT', () => {
      const o = { total: 1000 };
      assert.equal(OrderPriceExpert.calculateIGV(o), 180.00);
      assert.equal(OrderPriceExpert.calculateTotalWithIGV(o), 1180.00);
    });

    test('GRASP Controller: Coordina venta, comando y pago sin acoplar UI', () => {
      const o = ctrl.createOrder('ORD-502', 'Distribuidora Sur', 200);
      const resp = ctrl.processAndPay(o, 'YAPE', '987654321');
      assert.equal(resp.exitoso, true);
      assert.equal(o.estado, 'PAGADO');
      assert.equal(o.pasarelaPago, 'YAPE');
    });
  });

});
