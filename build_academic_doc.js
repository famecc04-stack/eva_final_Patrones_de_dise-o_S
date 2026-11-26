const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, HeadingLevel, BorderStyle, ShadingType,
  Header, Footer, PageNumber, NumberFormat, PageBreak
} = require('docx');

// PALETA DE COLORES PROFESIONAL
const C_NAVY = "0F172A";       // Slate 900
const C_BLUE = "1D4ED8";       // Blue 700
const C_BLUE_LIGHT = "EFF6FF"; // Blue 50
const C_CRIMSON = "E11D48";    // Rose/Red institucional Zegel
const C_TEXT = "1E293B";       // Slate 800
const C_MUTED = "475569";      // Slate 600
const C_BORDER = "CBD5E1";     // Slate 300
const C_BG_ALT = "F8FAFC";     // Slate 50
const C_WHITE = "FFFFFF";

const standardBorder = {
  top: { style: BorderStyle.SINGLE, size: 1, color: C_BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: C_BORDER },
  left: { style: BorderStyle.SINGLE, size: 1, color: C_BORDER },
  right: { style: BorderStyle.SINGLE, size: 1, color: C_BORDER },
};

const headerBorder = {
  top: { style: BorderStyle.SINGLE, size: 2, color: C_NAVY },
  bottom: { style: BorderStyle.SINGLE, size: 2, color: C_CRIMSON },
  left: { style: BorderStyle.SINGLE, size: 1, color: C_NAVY },
  right: { style: BorderStyle.SINGLE, size: 1, color: C_NAVY },
};

function pHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 140 },
    run: { size: 30, bold: true, color: C_BLUE, font: "Segoe UI" }
  });
}

function pHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 100 },
    run: { size: 24, bold: true, color: C_NAVY, font: "Segoe UI" }
  });
}

function pHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
    run: { size: 22, bold: true, color: C_BLUE, font: "Segoe UI" }
  });
}

function pBody(text, opts = {}) {
  const isBold = opts.bold || false;
  const isItalic = opts.italic || false;
  const align = opts.align || AlignmentType.JUSTIFIED;
  const spaceAfter = opts.spaceAfter !== undefined ? opts.spaceAfter : 120;

  return new Paragraph({
    alignment: align,
    spacing: { before: 40, after: spaceAfter, line: 276 },
    children: [
      new TextRun({
        text: text,
        size: 21, // 10.5pt
        font: "Segoe UI",
        color: C_TEXT,
        bold: isBold,
        italics: isItalic,
      }),
    ],
  });
}

function pBullet(boldPrefix, text) {
  const children = [];
  if (boldPrefix) {
    children.push(new TextRun({
      text: boldPrefix + " ",
      bold: true,
      size: 21,
      font: "Segoe UI",
      color: C_NAVY,
    }));
  }
  children.push(new TextRun({
    text: text,
    size: 21,
    font: "Segoe UI",
    color: C_TEXT,
  }));

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 30, after: 70, line: 260 },
    alignment: AlignmentType.JUSTIFIED,
    children: children,
  });
}

function pCallout(title, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.SINGLE, size: 28, color: C_CRIMSON },
      right: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            margins: { top: 120, bottom: 120, left: 180, right: 180 },
            shading: { fill: C_BLUE_LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [
              new Paragraph({
                spacing: { after: 50 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    size: 21,
                    font: "Segoe UI",
                    color: C_NAVY,
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
                    color: C_TEXT,
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

function makeCell(content, opts = {}) {
  const isHeader = opts.isHeader || false;
  const isAlt = opts.isAlt || false;
  const colWidth = opts.colWidth || null;
  const align = opts.align || AlignmentType.LEFT;

  let children = [];
  if (typeof content === 'string') {
    children = [
      new Paragraph({
        alignment: align,
        spacing: { before: 40, after: 40, line: 240 },
        children: [
          new TextRun({
            text: content,
            size: isHeader ? 20 : 19,
            bold: isHeader || opts.bold,
            font: "Segoe UI",
            color: isHeader ? C_WHITE : (opts.color || C_TEXT),
          }),
        ],
      }),
    ];
  } else if (Array.isArray(content)) {
    children = content;
  }

  const cellObj = {
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    borders: isHeader ? headerBorder : standardBorder,
    shading: {
      fill: isHeader ? C_NAVY : (isAlt ? C_BG_ALT : C_WHITE),
      type: ShadingType.CLEAR,
      color: "auto",
    },
    children: children,
  };

  if (colWidth) {
    cellObj.width = { size: colWidth, type: WidthType.PERCENTAGE };
  }

  return new TableCell(cellObj);
}

console.log("Core builders initialized.");
