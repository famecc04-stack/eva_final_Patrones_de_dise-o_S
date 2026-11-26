const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, HeadingLevel, BorderStyle, ShadingType,
  Header, Footer, PageNumber, NumberFormat, PageBreak
} = require('docx');

// Definición de Paleta de Colores Corporativa / Académica
const COLOR_PRIMARY = "0F172A";    // Slate 900 (Azul Oscuro / Negro Corporativo)
const COLOR_SECONDARY = "1E40AF";  // Blue 800 (Azul Tecnológico)
const COLOR_ACCENT = "D90429";     // Crimson Zegel (Rojo institucional)
const COLOR_TEXT = "1E293B";       // Slate 800 (Texto Principal)
const COLOR_MUTED = "64748B";      // Slate 500 (Subtítulos y notas)
const COLOR_BG_LIGHT = "F8FAFC";   // Slate 50 (Fondo tarjetas y celdas alternas)
const COLOR_BG_HEADER = "1E293B";  // Encabezados de tabla
const COLOR_BORDER = "CBD5E1";     // Slate 300 (Bordes de tabla)

// Estilos de bordes estándar
const cellBorderStandard = {
  top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  left: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  right: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
};

const cellBorderHeader = {
  top: { style: BorderStyle.SINGLE, size: 1, color: "0F172A" },
  bottom: { style: BorderStyle.SINGLE, size: 2, color: COLOR_ACCENT },
  left: { style: BorderStyle.SINGLE, size: 1, color: "0F172A" },
  right: { style: BorderStyle.SINGLE, size: 1, color: "0F172A" },
};

function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    alignment: AlignmentType.LEFT,
    run: {
      size: 32, // 16pt
      bold: true,
      color: COLOR_SECONDARY,
      font: "Segoe UI",
    }
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    alignment: AlignmentType.LEFT,
    run: {
      size: 26, // 13pt
      bold: true,
      color: COLOR_PRIMARY,
      font: "Segoe UI",
    }
  });
}

function createHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
    alignment: AlignmentType.LEFT,
    run: {
      size: 22, // 11pt
      bold: true,
      color: COLOR_SECONDARY,
      font: "Segoe UI",
    }
  });
}

function createParagraph(text, options = {}) {
  const isBold = options.bold || false;
  const isItalic = options.italic || false;
  const align = options.align || AlignmentType.JUSTIFIED;
  const spaceAfter = options.spaceAfter !== undefined ? options.spaceAfter : 140;

  return new Paragraph({
    alignment: align,
    spacing: { before: 40, after: spaceAfter, line: 276 }, // 1.15 line spacing
    children: [
      new TextRun({
        text: text,
        size: 21, // 10.5pt
        font: "Segoe UI",
        color: COLOR_TEXT,
        bold: isBold,
        italics: isItalic,
      }),
    ],
  });
}

function createBullet(text, boldPrefix = "") {
  const children = [];
  if (boldPrefix) {
    children.push(new TextRun({
      text: boldPrefix + " ",
      bold: true,
      size: 21,
      font: "Segoe UI",
      color: COLOR_PRIMARY,
    }));
  }
  children.push(new TextRun({
    text: text,
    size: 21,
    font: "Segoe UI",
    color: COLOR_TEXT,
  }));

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 40, after: 80, line: 260 },
    alignment: AlignmentType.JUSTIFIED,
    children: children,
  });
}

function createCallout(title, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.SINGLE, size: 24, color: COLOR_SECONDARY },
      right: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            margins: { top: 120, bottom: 120, left: 180, right: 180 },
            shading: { fill: "EFF6FF", type: ShadingType.CLEAR, color: "auto" },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    size: 21,
                    font: "Segoe UI",
                    color: COLOR_SECONDARY,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 0, line: 260 },
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    text: text,
                    size: 20,
                    font: "Segoe UI",
                    color: COLOR_TEXT,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

console.log("Core helpers defined successfully.");
