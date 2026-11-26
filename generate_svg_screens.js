const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'prototipo_interactivo', 'wireframes_figma');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getSidebarSVG(activeTab) {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard General', badge: '' },
    { id: 'productos', name: 'Catálogo Productos', badge: 'Iterator' },
    { id: 'inventario', name: 'Inventario & Stock', badge: '' },
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
        <rect width="228" height="40" rx="8" fill="${bgFill}"/>
        <circle cx="20" cy="20" r="5" fill="${isActive ? '#60a5fa' : '#475569'}"/>
        <text x="36" y="24" fill="${textFill}" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="${fontWt}">${esc(t.name)}</text>
        ${t.badge ? `
          <rect x="${228 - 60}" y="10" width="52" height="20" rx="4" fill="#0f172a" stroke="#334155"/>
          <text x="${228 - 34}" y="23" text-anchor="middle" fill="#38bdf8" font-family="Segoe UI, Inter, sans-serif" font-size="9" font-weight="bold">${esc(t.badge)}</text>
        ` : ''}
      </g>
    `;
    tabY += 46;
  });

  return `
    <!-- SIDEBAR BACKGROUND -->
    <rect x="0" y="0" width="260" height="900" fill="#090d16"/>
    <rect x="259" y="0" width="1" height="900" fill="#1e293b"/>

    <!-- LOGO TECHSOLUTIONS -->
    <g transform="translate(20, 24)">
      <rect width="40" height="40" rx="10" fill="#2563eb"/>
      <text x="20" y="25" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="18" font-weight="bold">TS</text>
      <text x="50" y="22" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="16" font-weight="bold">TechSolutions</text>
      <text x="50" y="36" fill="#38bdf8" font-family="Segoe UI, Inter, sans-serif" font-size="10" font-weight="bold">GESTIÓN PYME S.A.</text>
    </g>

    <!-- USER STRIP -->
    <g transform="translate(16, 84)">
      <rect width="228" height="54" rx="10" fill="#1e293b" stroke="#334155"/>
      <circle cx="28" cy="27" r="16" fill="#3b82f6"/>
      <text x="28" y="31" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">FC</text>
      <text x="52" y="23" fill="#f8fafc" font-family="Segoe UI, Inter, sans-serif" font-size="12" font-weight="bold">Fabiola Cadillo</text>
      <circle cx="56" cy="36" r="3.5" fill="#10b981"/>
      <text x="64" y="39" fill="#93c5fd" font-family="Segoe UI, Inter, sans-serif" font-size="11">Administrador TI</text>
    </g>

    <!-- MENU TABS -->
    ${tabsSVG}

    <!-- FOOTER INFO -->
    <g transform="translate(20, 850)">
      <text x="0" y="0" fill="#64748b" font-family="Segoe UI, Inter, sans-serif" font-size="11">Zegel – Evaluación Final</text>
      <text x="0" y="16" fill="#475569" font-family="Segoe UI, Inter, sans-serif" font-size="10">Integrantes: Estefanía &amp; Fabiola</text>
    </g>
  `;
}

function getTopbarSVG(title, patternBadge = "") {
  return `
    <!-- TOPBAR BACKGROUND -->
    <rect x="260" y="0" width="1180" height="70" fill="#ffffff"/>
    <rect x="260" y="69" width="1180" height="1" fill="#e2e8f0"/>

    <text x="290" y="42" fill="#0f172a" font-family="Segoe UI, Inter, sans-serif" font-size="18" font-weight="bold">${esc(title)}</text>
    
    ${patternBadge ? `
      <g transform="translate(560, 22)">
        <rect width="210" height="26" rx="13" fill="#eff6ff" stroke="#bfdbfe"/>
        <circle cx="16" cy="13" r="4" fill="#2563eb"/>
        <text x="28" y="17" fill="#1d4ed8" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">${esc(patternBadge)}</text>
      </g>
    ` : ''}

    <!-- TOPBAR RIGHT NOTIFICATIONS & PROFILE -->
    <g transform="translate(1240, 20)">
      <!-- Bell Alert Observer Icon -->
      <rect width="32" height="32" rx="16" fill="#f1f5f9"/>
      <circle cx="16" cy="15" r="7" fill="none" stroke="#475569" stroke-width="2"/>
      <circle cx="23" cy="9" r="4" fill="#e11d48"/>
      <text x="23" y="12" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Inter, sans-serif" font-size="8" font-weight="bold">2</text>
      
      <!-- Role Badge -->
      <rect x="46" y="2" width="110" height="28" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="101" y="20" text-anchor="middle" fill="#334155" font-family="Segoe UI, Inter, sans-serif" font-size="11" font-weight="bold">Lima, S/ (PEN)</text>
    </g>
  `;
}

console.log("SVG layout helpers compiled.");
