import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Typography Design System Conformance', () => {
  const globalsCss = fs.readFileSync(path.join(__dirname, '../app/globals.css'), 'utf-8');
  const layoutTsx = fs.readFileSync(path.join(__dirname, '../app/layout.tsx'), 'utf-8');
  const pageTsx = fs.readFileSync(path.join(__dirname, '../app/page.tsx'), 'utf-8');

  it('imports Google Fonts for Manrope, DM Sans, and Inter', () => {
    expect(globalsCss).toContain('family=Manrope');
    expect(globalsCss).toContain('family=Inter');
    expect(globalsCss).toContain('family=DM+Sans');

    expect(layoutTsx).toContain('fonts.googleapis.com');
    expect(layoutTsx).toContain('family=Manrope');
    expect(layoutTsx).toContain('family=Inter');
  });

  it('configures big-text with exact specifications', () => {
    expect(globalsCss).toContain('88px');
    expect(globalsCss).toContain('92.4px');
    expect(globalsCss).toContain('700');
    expect(globalsCss).toContain('rgb(245, 247, 250)');
    expect(globalsCss).toContain('Manrope');
  });

  it('configures small-text with exact specifications', () => {
    expect(globalsCss).toContain('21.6px');
    expect(globalsCss).toContain('33.48px');
    expect(globalsCss).toContain('400');
    expect(globalsCss).toContain('rgb(167, 175, 188)');
    expect(globalsCss).toContain('Inter');
  });

  it('sets body font to Inter and heading font to Manrope', () => {
    expect(globalsCss).toMatch(/body\s*\{[^}]*font-family:\s*Inter/);
    expect(globalsCss).toMatch(/h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*\{[^}]*font-family:\s*Manrope/);
  });

  it('supports both light mode and dark mode contrast properly', () => {
    // Light mode colors
    expect(globalsCss).toContain('#0a1738');
    expect(globalsCss).toContain('#475569');
    // Dark mode colors
    expect(globalsCss).toContain('rgb(245, 247, 250)');
    expect(globalsCss).toContain('rgb(167, 175, 188)');
  });

  it('applies big-text and small-text to hero elements with dark and light mode support in page.tsx', () => {
    expect(pageTsx).toContain('big-text');
    expect(pageTsx).toContain('small-text');
    expect(pageTsx).toContain('rgb(245,247,250)');
    expect(pageTsx).toContain('rgb(167,175,188)');
    expect(pageTsx).toContain('text-slate-900');
    expect(pageTsx).toContain('text-slate-600');
  });
});
