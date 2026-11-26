const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'prototipo_interactivo', 'wireframes_figma');

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getSidebarSVG(activeTab) {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard General', badge: '' },
    { id: 'productos', name: 'Catálogo Productos', badge: 'Iterator' },
    { id: 'inventario', name: 'Inventario & Stock', badge: 'Observer' },
    { id: 'pedidos', name: 'Gestión Pedidos', badge: 'Command' },
    { id: 'pagos', name: 'Pasarelas de Pago', badge: 'Adapter' },
    { id: 'precios', name: 'Estrategias Precios', badge: 'Strategy' },
    { id: 'reportes', name: 'Reportes Financieros', badge: 'Proxy' },
    { id: 'historial', name: 'Historial & Deshacer', badge: 'Memento' },
    { id: 'usuarios', name: 'Usuarios y Roles', badge: 'RBAC' },
    { id: 'configuracion', name: 'Configuración General', badge: '' },
  ];

  let tabY = 160;
  let tabsSVG = '';

  tabs.forEach(t => {
    const isActive = t.id === activeTab;
    const bgFill = isActive ? '#1e40af' : 'transparent';
    const textFill = isActive ? '#ffffff' : '#94a3b8';
    const fontWt = isActive ? 'bold' : 'normal';

    tabsSVG += `
      <g transform="translate(16, ${tabY})">
        <rect width="228" height="38" rx="8" fill="${bgFill}"/>
        <circle cx="20" cy="19" r="4.5" fill="${isActive ? '#60a5fa' : '#475569'}"/>
        <text x="36" y="24" fill="${textFill}" font-family="Segoe UI, Inter, sans-serif" font-size="12.5" font-weight="${fontWt}">${esc(t.name)}</text>
        ${t.badge ? `
          <rect x="${228 - 62}" y="10" width="54" height="18" rx="4" fill="#0f172a" stroke="#334155"/>
          <text x="${228 - 35}" y="22.5" text-anchor="middle" fill="#38bdf8" font-family="Segoe UI, Inter, sans-serif" font-size="8.5" font-weight="bold">${esc(t.badge)}</text>
        ` : ''}
      </g>
    `;
    tabY += 44;
  });

  return `
    <rect x="0" y="0" width="260" height="900" fill="#090d16"/>
    <rect x="259" y="0" width="1" height="900" fill="#1e293b"/>

    <g transform="translate(20, 24)">
      <rect width="40" height="40" rx="10" fill="#2563eb"/>
      <text x="20" y="25" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="16" font-weight="bold">TS</text>
      <text x="50" y="22" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="15" font-weight="bold">TechSolutions</text>
      <text x="50" y="36" fill="#38bdf8" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">GESTIÓN PYME S.A.</text>
    </g>

    <g transform="translate(16, 84)">
      <rect width="228" height="52" rx="10" fill="#1e293b" stroke="#334155"/>
      <circle cx="26" cy="26" r="14" fill="#3b82f6"/>
      <text x="26" y="30" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">EO</text>
      <text x="48" y="23" fill="#f8fafc" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Estefanía Orellana</text>
      <circle cx="52" cy="36" r="3" fill="#10b981"/>
      <text x="60" y="39" fill="#93c5fd" font-family="Segoe UI, Inter, sans-serif" font-size="11">Gerente General</text>
    </g>

    ${tabsSVG}

    <g transform="translate(20, 845)">
      <text x="0" y="0" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Zegel – Evaluación Final</text>
      <text x="0" y="16" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="10">Integrantes: Estefanía &amp; Fabiola</text>
    </g>
  `;
}

function getTopbarSVG(title, patternBadge = "") {
  return `
    <rect x="260" y="0" width="1180" height="70" fill="#ffffff"/>
    <rect x="260" y="69" width="1180" height="1" fill="#e2e8f0"/>

    <text x="290" y="42" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="18" font-weight="bold">${esc(title)}</text>
    
    ${patternBadge ? `
      <g transform="translate(580, 22)">
        <rect width="240" height="26" rx="13" fill="#eff6ff" stroke="#bfdbfe"/>
        <circle cx="16" cy="13" r="4" fill="#2563eb"/>
        <text x="28" y="17" fill="#1d4ed8" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">${esc(patternBadge)}</text>
      </g>
    ` : ''}

    <g transform="translate(1240, 20)">
      <rect width="32" height="32" rx="16" fill="#f1f5f9"/>
      <circle cx="16" cy="15" r="7" fill="none" stroke="#475569" stroke-width="2"/>
      <circle cx="23" cy="9" r="4" fill="#e11d48"/>
      <text x="23" y="12" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="8" font-weight="bold">2</text>
      
      <rect x="46" y="2" width="114" height="28" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="103" y="20" text-anchor="middle" fill="#334155" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Moneda: Soles (S/)</text>
    </g>
  `;
}

function wrapSVG(content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1440" height="900" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1440" height="900" fill="#f8fafc"/>
  ${content}
</svg>`;
}

// 4. PANTALLA 4: INVENTARIO (OBSERVER)
const svg04 = `
  ${getSidebarSVG('inventario')}
  ${getTopbarSVG('Control de Inventario y Almacén', 'Patrón Observer (RF5, RF6)')}

  <g transform="translate(290, 95)">
    <!-- BANNER ALERTA OBSERVER -->
    <rect width="1100" height="60" rx="10" fill="#ea580c"/>
    <text x="24" y="26" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="bold">🔔 Sistema Reactivo de Alertas de Stock Mínimo (Observer)</text>
    <text x="24" y="46" fill="#ffedd5" font-family="Segoe UI, Inter, sans-serif" font-size="11.5">El umbral mínimo es configurable por producto (RF6). Cuando el stock cae por debajo, se notifica inmediatamente a Gerente y Compras (RF5).</text>
    <rect x="910" y="14" width="170" height="32" rx="6" fill="#ffffff"/>
    <text x="995" y="34" text-anchor="middle" fill="#c2410c" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">⚡ Simular Venta &amp; Alerta</text>

    <!-- INVENTORY TABLE -->
    <g transform="translate(0, 80)">
      <rect width="1100" height="540" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
      
      <!-- Table Header -->
      <rect x="0" y="0" width="1100" height="40" rx="12" fill="#f8fafc"/>
      <text x="24" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">PRODUCTO / SKU</text>
      <text x="320" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">STOCK FÍSICO ACTUAL</text>
      <text x="520" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">STOCK MÍNIMO (RF6)</text>
      <text x="720" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ESTADO SEMÁFORO</text>
      <text x="890" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">SUSCRIPTORES</text>
      <text x="1010" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ACCIÓN</text>

      <!-- Row 1 (Critical) -->
      <text x="24" y="75" fill="#1e293b" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Laptop HP Pavilion 15 (TECH-001)</text>
      <text x="320" y="75" fill="#e11d48" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">2 unidades</text>
      <rect x="520" y="58" width="60" height="26" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="550" y="75" text-anchor="middle" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">5</text>
      <rect x="720" y="60" width="130" height="22" rx="4" fill="#ffe4e6"/>
      <text x="785" y="75" text-anchor="middle" fill="#e11d48" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">⚠️ ALERTA ACTIVADA</text>
      <text x="890" y="75" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11">Gerente, Compras</text>
      <rect x="1000" y="60" width="70" height="24" rx="4" fill="#0f172a"/>
      <text x="1035" y="76" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">Guardar</text>

      <!-- Row 2 (Normal) -->
      <line x1="20" y1="105" x2="1080" y2="105" stroke="#f1f5f9"/>
      <text x="24" y="140" fill="#1e293b" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Monitor Curvo Samsung 27" (TECH-002)</text>
      <text x="320" y="140" fill="#10b981" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">12 unidades</text>
      <rect x="520" y="123" width="60" height="26" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="550" y="140" text-anchor="middle" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">4</text>
      <rect x="720" y="125" width="130" height="22" rx="4" fill="#ecfdf5"/>
      <text x="785" y="140" text-anchor="middle" fill="#047857" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">STOCK NORMAL</text>
      <text x="890" y="140" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11">Gerente, Compras</text>
      <rect x="1000" y="125" width="70" height="24" rx="4" fill="#0f172a"/>
      <text x="1035" y="141" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">Guardar</text>

      <!-- Row 3 (Critical) -->
      <line x1="20" y1="170" x2="1080" y2="170" stroke="#f1f5f9"/>
      <text x="24" y="205" fill="#1e293b" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Mouse Inalámbrico Logitech (ACC-001)</text>
      <text x="320" y="205" fill="#e11d48" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">4 unidades</text>
      <rect x="520" y="188" width="60" height="26" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="550" y="205" text-anchor="middle" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">10</text>
      <rect x="720" y="190" width="130" height="22" rx="4" fill="#ffe4e6"/>
      <text x="785" y="205" text-anchor="middle" fill="#e11d48" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">⚠️ ALERTA ACTIVADA</text>
      <text x="890" y="205" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11">Gerente, Compras</text>
      <rect x="1000" y="190" width="70" height="24" rx="4" fill="#0f172a"/>
      <text x="1035" y="206" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">Guardar</text>
    </g>
  </g>
`;
fs.writeFileSync(path.join(outDir, '04_Inventario_Alertas_Observer.svg'), wrapSVG(svg04));

// 5. PANTALLA 5: GESTIÓN DE PEDIDOS (COMMAND)
const svg05 = `
  ${getSidebarSVG('pedidos')}
  ${getTopbarSVG('Gestión de Pedidos', 'Patrón Command & Memento (RF7, RF8)')}

  <g transform="translate(290, 95)">
    <g transform="translate(0, 0)">
      <text x="0" y="24" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="16" font-weight="bold">Órdenes Comerciales Encapsuladas (Command)</text>
      <text x="0" y="42" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">Cada acción (Crear, Procesar, Cancelar) se ejecuta como un comando auditable y reversible.</text>
      <rect x="910" y="5" width="190" height="40" rx="8" fill="#2563eb"/>
      <text x="1005" y="30" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">+ Crear Nuevo Pedido</text>
    </g>

    <!-- ORDERS TABLE -->
    <g transform="translate(0, 65)">
      <rect width="1100" height="560" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
      
      <!-- Table Header -->
      <rect x="0" y="0" width="1100" height="40" rx="12" fill="#f8fafc"/>
      <text x="24" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">N° PEDIDO</text>
      <text x="160" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">CLIENTE</text>
      <text x="440" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">FECHA Y HORA</text>
      <text x="590" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">SUBTOTAL</text>
      <text x="700" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">DESCUENTO</text>
      <text x="810" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">TOTAL (S/)</text>
      <text x="910" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ESTADO</text>
      <text x="1010" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ACCIONES</text>

      <!-- Row 1 -->
      <text x="24" y="75" fill="#2563eb" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">ORD-2026-001</text>
      <text x="160" y="75" fill="#1e293b" font-family="Segoe UI, Inter, sans-serif" font-size="12">Inversiones San Isidro S.A.C.</text>
      <text x="440" y="75" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">18/11/2026 14:20</text>
      <text x="590" y="75" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 2,850.00</text>
      <text x="700" y="75" fill="#10b981" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 0.00</text>
      <text x="810" y="75" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">S/ 2,850.00</text>
      <rect x="900" y="60" width="84" height="22" rx="4" fill="#eff6ff"/>
      <text x="942" y="75" text-anchor="middle" fill="#1d4ed8" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">PROCESADO</text>
      <rect x="1000" y="60" width="70" height="24" rx="4" fill="#fee2e2"/>
      <text x="1035" y="76" text-anchor="middle" fill="#b91c1c" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">Cancelar</text>

      <!-- Row 2 -->
      <line x1="20" y1="105" x2="1080" y2="105" stroke="#f1f5f9"/>
      <text x="24" y="140" fill="#2563eb" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">ORD-2026-002</text>
      <text x="160" y="140" fill="#1e293b" font-family="Segoe UI, Inter, sans-serif" font-size="12">Distribuidora Los Olivos E.I.R.L.</text>
      <text x="440" y="140" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">18/11/2026 15:45</text>
      <text x="590" y="140" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 1,780.00</text>
      <text x="700" y="140" fill="#10b981" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 0.00</text>
      <text x="810" y="140" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">S/ 1,780.00</text>
      <rect x="900" y="125" width="84" height="22" rx="4" fill="#ecfdf5"/>
      <text x="942" y="140" text-anchor="middle" fill="#047857" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">PAGADO</text>
      <text x="1035" y="141" text-anchor="middle" fill="#94a3b8" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-style="italic">Cerrado</text>
    </g>
  </g>
`;
fs.writeFileSync(path.join(outDir, '05_Gestion_Pedidos_Command.svg'), wrapSVG(svg05));

// 6. PANTALLA 6: PAGOS (ADAPTER)
const svg06 = `
  ${getSidebarSVG('pagos')}
  ${getTopbarSVG('Pasarelas de Pago Digitales', 'Patrón Adapter (RF1, RF2)')}

  <g transform="translate(290, 95)">
    <!-- ADAPTER INTRO BANNER -->
    <rect width="1100" height="70" rx="12" fill="#0f172a"/>
    <text x="24" y="30" fill="#2dd4bf" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">PATRÓN ADAPTER EN PAGOS MULTICANAL (RF1)</text>
    <text x="24" y="52" fill="#f8fafc" font-family="Segoe UI, Inter, sans-serif" font-size="15" font-weight="bold">Unificación de PayPal, Yape y Plin mediante la interfaz IPaymentGateway</text>
    <text x="900" y="42" fill="#94a3b8" font-family="Segoe UI, Inter, sans-serif" font-size="11">Desacoplamiento Total</text>

    <!-- 3 GATEWAY TOGGLE CARDS (RF2) -->
    <g transform="translate(0, 90)">
      <!-- Yape -->
      <g transform="translate(0, 0)">
        <rect width="350" height="200" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
        <rect x="20" y="20" width="48" height="48" rx="12" fill="#7e22ce"/>
        <text x="44" y="50" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="bold">Yape</text>
        <circle cx="310" cy="44" r="14" fill="#10b981"/>
        <text x="310" y="48" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">ON</text>
        
        <text x="20" y="100" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="15" font-weight="bold">Yape (BCP / QR Dinámico)</text>
        <text x="20" y="120" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11.5">Pagos móviles por número de teléfono o QR.</text>
        <rect x="20" y="145" width="310" height="32" rx="6" fill="#f5f3ff"/>
        <text x="30" y="165" fill="#6b21a8" font-family="monospace" font-size="11">Clase: YapePaymentAdapter</text>
      </g>

      <!-- Plin -->
      <g transform="translate(375, 0)">
        <rect width="350" height="200" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
        <rect x="20" y="20" width="48" height="48" rx="12" fill="#0284c7"/>
        <text x="44" y="50" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="bold">Plin</text>
        <circle cx="310" cy="44" r="14" fill="#10b981"/>
        <text x="310" y="48" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">ON</text>
        
        <text x="20" y="100" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="15" font-weight="bold">Plin (Interbancario Perú)</text>
        <text x="20" y="120" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11.5">BBVA, Interbank y Scotiabank en línea.</text>
        <rect x="20" y="145" width="310" height="32" rx="6" fill="#f0f9ff"/>
        <text x="30" y="165" fill="#0369a1" font-family="monospace" font-size="11">Clase: PlinPaymentAdapter</text>
      </g>

      <!-- PayPal -->
      <g transform="translate(750, 0)">
        <rect width="350" height="200" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
        <rect x="20" y="20" width="48" height="48" rx="12" fill="#1e40af"/>
        <text x="44" y="50" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">PayPal</text>
        <circle cx="310" cy="44" r="14" fill="#10b981"/>
        <text x="310" y="48" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">ON</text>
        
        <text x="20" y="100" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="15" font-weight="bold">PayPal Express Checkout</text>
        <text x="20" y="120" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11.5">Tarjetas de crédito y compras internacionales.</text>
        <rect x="20" y="145" width="310" height="32" rx="6" fill="#eff6ff"/>
        <text x="30" y="165" fill="#1d4ed8" font-family="monospace" font-size="11">Clase: PayPalPaymentAdapter</text>
      </g>
    </g>

    <!-- SIMULADOR CHECKOUT ADAPTER -->
    <g transform="translate(0, 310)">
      <rect width="1100" height="330" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="24" y="36" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="15" font-weight="bold">Simulador Interactivo de Checkout (Prueba de Invocación Adapter)</text>
      
      <text x="24" y="80" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">MONTO A COBRAR (S/):</text>
      <rect x="24" y="92" width="280" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="40" y="118" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="bold">S/ 350.00</text>

      <text x="330" y="80" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">SELECCIONAR PASARELA:</text>
      <rect x="330" y="92" width="280" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="346" y="118" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">Yape (QR / Teléfono)</text>

      <rect x="640" y="92" width="240" height="42" rx="8" fill="#059669"/>
      <text x="760" y="118" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">Ejecutar Cobro con Adapter</text>

      <!-- RESULT BOX -->
      <g transform="translate(24, 160)">
        <rect width="1052" height="130" rx="8" fill="#ecfdf5" stroke="#a7f3d0"/>
        <text x="24" y="35" fill="#065f46" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="bold">✓ Respuesta Exitosa del Adaptador: YapePaymentAdapter</text>
        <text x="24" y="65" fill="#047857" font-family="Segoe UI, Inter, sans-serif" font-size="12">Transacción procesada correctamente por monto de <strong>S/ 350.00</strong>. Estado HTTP: 200 OK.</text>
        <text x="24" y="95" fill="#064e3b" font-family="monospace" font-size="11">Token: TXN-YAPE-948271 | Código de Aprobación: 771829 | Pasarela Verificada: ACTIVA</text>
      </g>
    </g>
  </g>
`;
fs.writeFileSync(path.join(outDir, '06_Procesamiento_Pagos_Adapter.svg'), wrapSVG(svg06));

// 7. PANTALLA 7: PRECIOS (STRATEGY)
const svg07 = `
  ${getSidebarSVG('precios')}
  ${getTopbarSVG('Estrategias de Precios', 'Patrón Strategy (RF9, RF10)')}

  <g transform="translate(290, 95)">
    <!-- HEADER -->
    <rect width="1100" height="70" rx="12" fill="#831843"/>
    <text x="24" y="30" fill="#fbcfe8" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">POLÍTICAS COMERCIALES INTERCAMBIABLES (RF9)</text>
    <text x="24" y="52" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="15" font-weight="bold">El administrador puede conmutar la estrategia de precios en tiempo de ejecución (RF10)</text>
    <rect x="940" y="20" width="130" height="30" rx="6" fill="#be185d"/>
    <text x="1005" y="40" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Activa: Estándar</text>

    <!-- 3 STRATEGY CARDS -->
    <g transform="translate(0, 90)">
      <!-- Strategy 1 -->
      <g transform="translate(0, 0)">
        <rect width="350" height="220" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
        <text x="20" y="35" fill="#2563eb" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">ESTRATEGIA 1 (ACTIVA)</text>
        <text x="20" y="65" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="16" font-weight="bold">Precio Estándar</text>
        <text x="20" y="90" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="12">Cálculo normal de catálogo sin modificaciones ni promociones.</text>
        <rect x="20" y="115" width="310" height="30" rx="6" fill="#ffffff" stroke="#bfdbfe"/>
        <text x="30" y="135" fill="#1d4ed8" font-family="monospace" font-size="11">Total = PrecioBase * Cantidad</text>
        <rect x="20" y="165" width="310" height="36" rx="8" fill="#2563eb"/>
        <text x="175" y="188" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">✓ Seleccionada como Activa</text>
      </g>

      <!-- Strategy 2 -->
      <g transform="translate(375, 0)">
        <rect width="350" height="220" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="20" y="35" fill="#059669" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">ESTRATEGIA 2</text>
        <text x="20" y="65" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="16" font-weight="bold">Descuento Porcentual (15%)</text>
        <text x="20" y="90" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="12">Campaña Cyber Zegel. Descuenta 15% al subtotal de la compra.</text>
        <rect x="20" y="115" width="310" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="30" y="135" fill="#047857" font-family="monospace" font-size="11">Total = Subtotal * 0.85</text>
        <rect x="20" y="165" width="310" height="36" rx="8" fill="#f1f5f9"/>
        <text x="175" y="188" text-anchor="middle" fill="#334155" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Activar Estrategia →</text>
      </g>

      <!-- Strategy 3 -->
      <g transform="translate(750, 0)">
        <rect width="350" height="220" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="20" y="35" fill="#7c3aed" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">ESTRATEGIA 3</text>
        <text x="20" y="65" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="16" font-weight="bold">Precio Dinámico (+10%)</text>
        <text x="20" y="90" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="12">Ajuste algorítmico por temporada alta o alta demanda en tienda.</text>
        <rect x="20" y="115" width="310" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="30" y="135" fill="#6d28d9" font-family="monospace" font-size="11">Total = Subtotal * 1.10</text>
        <rect x="20" y="165" width="310" height="36" rx="8" fill="#f1f5f9"/>
        <text x="175" y="188" text-anchor="middle" fill="#334155" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Activar Estrategia →</text>
      </g>
    </g>

    <!-- LIVE PRICING COMPARISON TABLE -->
    <g transform="translate(0, 330)">
      <rect width="1100" height="310" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="24" y="36" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="15" font-weight="bold">Comparativa de Precios Resultantes en Tiempo Real</text>
      
      <!-- Table Header -->
      <rect x="0" y="55" width="1100" height="36" fill="#f8fafc"/>
      <text x="24" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">PRODUCTO EJEMPLO</text>
      <text x="340" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">PRECIO BASE</text>
      <text x="520" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ESTÁNDAR (ACTIVO)</text>
      <text x="720" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">DESCUENTO 15%</text>
      <text x="910" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">DINÁMICO +10%</text>

      <!-- Row 1 -->
      <text x="24" y="125" fill="#1e293b" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Laptop HP Pavilion 15</text>
      <text x="340" y="125" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 2,850.00</text>
      <text x="520" y="125" fill="#1d4ed8" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">S/ 2,850.00</text>
      <text x="720" y="125" fill="#059669" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 2,422.50</text>
      <text x="910" y="125" fill="#7c3aed" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 3,135.00</text>

      <!-- Row 2 -->
      <line x1="20" y1="145" x2="1080" y2="145" stroke="#f1f5f9"/>
      <text x="24" y="180" fill="#1e293b" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Monitor Curvo Samsung 27"</text>
      <text x="340" y="180" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 890.00</text>
      <text x="520" y="180" fill="#1d4ed8" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">S/ 890.00</text>
      <text x="720" y="180" fill="#059669" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 756.50</text>
      <text x="910" y="180" fill="#7c3aed" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 979.00</text>
    </g>
  </g>
`;
fs.writeFileSync(path.join(outDir, '07_Configuracion_Precios_Strategy.svg'), wrapSVG(svg07));

// 8. PANTALLA 8: REPORTES (PROXY)
const svg08 = `
  ${getSidebarSVG('reportes')}
  ${getTopbarSVG('Reportes Financieros Confidenciales', 'Patrón Proxy (RF3, RF4)')}

  <g transform="translate(290, 95)">
    <!-- PROXY VERIFIED BANNER -->
    <rect width="1100" height="60" rx="10" fill="#1e1b4b"/>
    <text x="24" y="26" fill="#a5b4fc" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">CONTROL DE ACCESO Y EFICIENCIA (PROXY PATTERN)</text>
    <text x="24" y="46" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="bold">Acceso Autorizado por FinancialReportProxy | Rol Validado: Gerente General (RF4) | Caché Activa (300s TTL)</text>
    <rect x="940" y="15" width="130" height="30" rx="6" fill="#4338ca"/>
    <text x="1005" y="35" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Refrescar Caché</text>

    <!-- 4 FINANCIAL CARDS -->
    <g transform="translate(0, 80)">
      <g transform="translate(0, 0)">
        <rect width="260" height="90" rx="10" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="20" y="28" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">FACTURACIÓN BRUTA</text>
        <text x="20" y="58" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="20" font-weight="bold">S/ 245,600.00</text>
        <text x="20" y="78" fill="#10b981" font-family="Segoe UI, Inter, sans-serif" font-size="10">+14.2% vs mes anterior</text>
      </g>
      <g transform="translate(280, 0)">
        <rect width="260" height="90" rx="10" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="20" y="28" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">COSTO MERCADERÍA (COGS)</text>
        <text x="20" y="58" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="20" font-weight="bold">S/ 138,400.00</text>
        <text x="20" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="10">Margen comercial 43.6%</text>
      </g>
      <g transform="translate(560, 0)">
        <rect width="260" height="90" rx="10" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="20" y="28" fill="#059669" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">UTILIDAD NETA ESTIMADA</text>
        <text x="20" y="58" fill="#059669" font-family="Segoe UI, Inter, sans-serif" font-size="20" font-weight="bold">S/ 72,180.00</text>
        <text x="20" y="78" fill="#047857" font-family="Segoe UI, Inter, sans-serif" font-size="10">Deducido IGV 18%</text>
      </g>
      <g transform="translate(840, 0)">
        <rect width="260" height="90" rx="10" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="20" y="28" fill="#e11d48" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">COMISIONES PASARELAS</text>
        <text x="20" y="58" fill="#e11d48" font-family="Segoe UI, Inter, sans-serif" font-size="20" font-weight="bold">S/ 4,210.00</text>
        <text x="20" y="78" fill="#9f1239" font-family="Segoe UI, Inter, sans-serif" font-size="10">PayPal 3.9% / Yape 1.5%</text>
      </g>
    </g>

    <!-- FINANCIAL BREAKDOWN TABLE -->
    <g transform="translate(0, 190)">
      <rect width="1100" height="440" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="24" y="36" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="15" font-weight="bold">Desglose de Rentabilidad por Línea de Negocio (Noviembre 2026)</text>
      
      <!-- Table Header -->
      <rect x="0" y="55" width="1100" height="36" fill="#f8fafc"/>
      <text x="24" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">CATEGORÍA</text>
      <text x="260" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">UNIDADES VENDIDAS</text>
      <text x="460" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">INGRESOS BRUTOS (S/)</text>
      <text x="680" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">COSTO TOTAL (S/)</text>
      <text x="880" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">UTILIDAD BRUTA (S/)</text>
      <text x="1030" y="78" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">MARGEN</text>

      <!-- Row 1 -->
      <text x="24" y="125" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Tecnología &amp; Cómputo</text>
      <text x="260" y="125" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="12">124 unid.</text>
      <text x="460" y="125" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">S/ 168,400.00</text>
      <text x="680" y="125" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 98,200.00</text>
      <text x="880" y="125" fill="#059669" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">S/ 70,200.00</text>
      <text x="1030" y="125" fill="#2563eb" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">41.7%</text>

      <!-- Row 2 -->
      <line x1="20" y1="145" x2="1080" y2="145" stroke="#f1f5f9"/>
      <text x="24" y="180" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Accesorios &amp; Periféricos</text>
      <text x="260" y="180" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="12">340 unid.</text>
      <text x="460" y="180" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">S/ 45,200.00</text>
      <text x="680" y="180" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">S/ 22,100.00</text>
      <text x="880" y="180" fill="#059669" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">S/ 23,100.00</text>
      <text x="1030" y="180" fill="#2563eb" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">51.1%</text>
    </g>
  </g>
`;
fs.writeFileSync(path.join(outDir, '08_Reportes_Financieros_Proxy.svg'), wrapSVG(svg08));

// 9. PANTALLA 9: USUARIOS Y ROLES (RBAC)
const svg09 = `
  ${getSidebarSVG('usuarios')}
  ${getTopbarSVG('Usuarios y Roles', 'Control de Acceso RBAC')}

  <g transform="translate(290, 95)">
    <g transform="translate(0, 0)">
      <text x="0" y="24" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="16" font-weight="bold">Directorio de Colaboradores y Matriz de Permisos</text>
      <text x="0" y="42" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">Gobernanza de identidades y aplicación del principio de menor privilegio.</text>
      <rect x="930" y="5" width="170" height="40" rx="8" fill="#2563eb"/>
      <text x="1015" y="30" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">+ Nuevo Colaborador</text>
    </g>

    <!-- USERS TABLE -->
    <g transform="translate(0, 65)">
      <rect width="1100" height="560" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
      
      <!-- Table Header -->
      <rect x="0" y="0" width="1100" height="40" rx="12" fill="#f8fafc"/>
      <text x="24" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">COLABORADOR</text>
      <text x="260" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">CORREO INSTITUCIONAL</text>
      <text x="560" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ROL ASIGNADO</text>
      <text x="740" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ESTADO</text>
      <text x="860" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">PROXY FINANCIERO (RF4)</text>
      <text x="1040" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ACCIÓN</text>

      <!-- Row 1 -->
      <text x="24" y="75" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Estefanía Orellana</text>
      <text x="260" y="75" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">estefania.orellana@techsolutions.pe</text>
      <rect x="560" y="60" width="110" height="22" rx="4" fill="#f3e8ff"/>
      <text x="615" y="75" text-anchor="middle" fill="#7e22ce" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">Gerente General</text>
      <text x="740" y="75" fill="#10b981" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Activo</text>
      <text x="860" y="75" fill="#10b981" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Autorizado Total</text>
      <text x="1040" y="75" fill="#2563eb" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Editar</text>

      <!-- Row 2 -->
      <line x1="20" y1="105" x2="1080" y2="105" stroke="#f1f5f9"/>
      <text x="24" y="140" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Fabiola Cadillo</text>
      <text x="260" y="140" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">fabiola.cadillo@techsolutions.pe</text>
      <rect x="560" y="125" width="110" height="22" rx="4" fill="#eff6ff"/>
      <text x="615" y="140" text-anchor="middle" fill="#1d4ed8" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">Administrador TI</text>
      <text x="740" y="140" fill="#10b981" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Activo</text>
      <text x="860" y="140" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11">Solo Parámetros TI</text>
      <text x="1040" y="140" fill="#2563eb" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Editar</text>

      <!-- Row 3 -->
      <line x1="20" y1="170" x2="1080" y2="170" stroke="#f1f5f9"/>
      <text x="24" y="205" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Carlos Mendoza</text>
      <text x="260" y="205" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">contabilidad@techsolutions.pe</text>
      <rect x="560" y="190" width="110" height="22" rx="4" fill="#e0e7ff"/>
      <text x="615" y="205" text-anchor="middle" fill="#4338ca" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">Contador</text>
      <text x="740" y="205" fill="#10b981" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Activo</text>
      <text x="860" y="205" fill="#10b981" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Autorizado Total</text>
      <text x="1040" y="205" fill="#2563eb" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Editar</text>
    </g>
  </g>
`;
fs.writeFileSync(path.join(outDir, '09_Usuarios_Roles_RBAC.svg'), wrapSVG(svg09));

// 10. PANTALLA 10: HISTORIAL (MEMENTO)
const svg10 = `
  ${getSidebarSVG('historial')}
  ${getTopbarSVG('Historial Transaccional & Deshacer', 'Patrón Memento & Command (RF7, RF8)')}

  <g transform="translate(290, 95)">
    <!-- BANNER MEMENTO -->
    <rect width="1100" height="60" rx="10" fill="#0891b2"/>
    <text x="24" y="26" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="bold">↺ Historial Transaccional y Reversión de Estados (Memento Rollback)</text>
    <text x="24" y="46" fill="#cffafe" font-family="Segoe UI, Inter, sans-serif" font-size="11.5">Permite deshacer cancelaciones o modificaciones accidentales restituyendo el snapshot inmutable (RF8).</text>
    <rect x="930" y="15" width="140" height="30" rx="6" fill="#155e75"/>
    <text x="1000" y="35" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Caretaker Activo</text>

    <!-- AUDIT TABLE -->
    <g transform="translate(0, 80)">
      <rect width="1100" height="540" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
      
      <!-- Table Header -->
      <rect x="0" y="0" width="1100" height="40" rx="12" fill="#f8fafc"/>
      <text x="24" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ID LOG</text>
      <text x="130" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">FECHA Y HORA</text>
      <text x="280" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">COMANDO EJECUTADO</text>
      <text x="490" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">PEDIDO AFECTADO</text>
      <text x="660" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">USUARIO</text>
      <text x="860" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ESTADO PREVIO</text>
      <text x="1000" y="25" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">ROLLBACK</text>

      <!-- Row 1 (Cancelled order ready for rollback) -->
      <text x="24" y="75" fill="#64748b" font-family="monospace" font-size="12">CMD-103</text>
      <text x="130" y="75" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="12">18/11/2026 16:30</text>
      <text x="280" y="75" fill="#e11d48" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">CancelOrderCommand</text>
      <text x="490" y="75" fill="#2563eb" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">ORD-2026-001</text>
      <text x="660" y="75" fill="#334155" font-family="Segoe UI, Inter, sans-serif" font-size="12">Estefanía Orellana (Gerente)</text>
      <rect x="850" y="60" width="80" height="22" rx="4" fill="#eff6ff"/>
      <text x="890" y="75" text-anchor="middle" fill="#1d4ed8" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">PROCESADO</text>
      <rect x="970" y="60" width="110" height="26" rx="6" fill="#0891b2"/>
      <text x="1025" y="77" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">↺ Deshacer (Undo)</text>

      <!-- Row 2 -->
      <line x1="20" y1="105" x2="1080" y2="105" stroke="#f1f5f9"/>
      <text x="24" y="140" fill="#64748b" font-family="monospace" font-size="12">CMD-102</text>
      <text x="130" y="140" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="12">18/11/2026 15:45</text>
      <text x="280" y="140" fill="#059669" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">ProcessPaymentCommand</text>
      <text x="490" y="140" fill="#2563eb" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">ORD-2026-002</text>
      <text x="660" y="140" fill="#334155" font-family="Segoe UI, Inter, sans-serif" font-size="12">Ana Romero (Vendedor)</text>
      <rect x="850" y="125" width="80" height="22" rx="4" fill="#fffbeb"/>
      <text x="890" y="140" text-anchor="middle" fill="#b45309" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">PENDIENTE</text>
      <text x="1025" y="141" text-anchor="middle" fill="#94a3b8" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-style="italic">Inmutable</text>
    </g>
  </g>
`;
fs.writeFileSync(path.join(outDir, '10_Historial_Operaciones_Memento.svg'), wrapSVG(svg10));

// 11. PANTALLA 11: CONFIGURACIÓN GENERAL
const svg11 = `
  ${getSidebarSVG('configuracion')}
  ${getTopbarSVG('Configuración General del Sistema', 'Parámetros Globales')}

  <g transform="translate(290, 95)">
    <rect width="1100" height="620" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
    <text x="30" y="45" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="16" font-weight="bold">Parámetros de la Empresa y Preferencias del Sistema</text>
    <text x="30" y="68" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="12">Configuración fiscal para PYMES peruanas, conmutadores de módulos y valores por defecto.</text>
    <line x1="30" y1="90" x2="1070" y2="90" stroke="#f1f5f9"/>

    <!-- Form Fields -->
    <g transform="translate(30, 110)">
      <text x="0" y="20" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">RAZÓN SOCIAL:</text>
      <rect x="0" y="32" width="480" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="16" y="58" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">TechSolutions S.A.</text>

      <text x="540" y="20" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">N° DE RUC:</text>
      <rect x="540" y="32" width="480" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="556" y="58" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">20608976541</text>

      <text x="0" y="110" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">MONEDA BASE:</text>
      <rect x="0" y="122" width="480" height="42" rx="8" fill="#eff6ff" stroke="#bfdbfe"/>
      <text x="16" y="148" fill="#1d4ed8" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">Soles Peruanos (PEN - S/)</text>

      <text x="540" y="110" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">TASA DE IMPUESTO (IGV):</text>
      <rect x="540" y="122" width="480" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="556" y="148" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">18% (Vigente SUNAT)</text>

      <text x="0" y="200" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">TIEMPO DE EXPIRACIÓN DE CACHÉ PROXY:</text>
      <rect x="0" y="212" width="480" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="16" y="238" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="13">300 segundos (5 minutos)</text>

      <text x="540" y="200" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">MÉTODO DE PAGO POR DEFECTO:</text>
      <rect x="540" y="212" width="480" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="556" y="238" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="13">Yape (Billetera Móvil)</text>

      <rect x="780" y="380" width="240" height="46" rx="8" fill="#2563eb"/>
      <text x="900" y="408" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="bold">Guardar Configuración</text>
    </g>
  </g>
`;
fs.writeFileSync(path.join(outDir, '11_Configuracion_General.svg'), wrapSVG(svg11));

console.log("SVGs 4 to 11 generated successfully!");
