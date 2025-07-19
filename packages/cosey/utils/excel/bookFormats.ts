import type { ExportBookFormat, ExportBookType } from './type';

export const bookFormats: ExportBookFormat[] = [
  {
    type: 'csv',
    ext: '.csv',
    sheets: 'single',
    label: 'co.export.csvLabel',
    mime: 'text/csv',
  },
  {
    type: 'xlsx',
    ext: '.xlsx',
    sheets: 'multi',
    label: 'co.export.xlsxLabel',
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  {
    type: 'html',
    ext: '.html',
    sheets: 'single',
    label: 'co.export.htmlLabel',
    mime: 'text/html',
  },
  {
    type: 'xml',
    ext: '.xml',
    sheets: 'single',
    label: 'co.export.xmlLabel',
    mime: 'application/xml',
  },
  {
    type: 'txt',
    ext: '.txt',
    sheets: 'single',
    label: 'co.export.txtLabel',
    mime: 'text/plain',
  },
];

/**
 * 根据 bookType 获取扩展名
 */
export function getExtByBookType(bookType: ExportBookType) {
  return bookFormats.find((item) => item.type === bookType)!.ext;
}

/**
 * 根据 bookType 获取 mime 类型
 */
export function getMimeByBookType(bookType: ExportBookType) {
  return bookFormats.find((item) => item.type === bookType)!.mime;
}
