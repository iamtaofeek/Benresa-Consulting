import { jsPDF } from 'jspdf';
import { Engagement, ProposalVersion } from '@/types';
import { BENRESA_LEGAL_ENTITY } from '@/data/benresa-verified';

export function exportProposalPDF(engagement: Engagement, version: ProposalVersion) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header Bar (Brand Navy #102d73)
  doc.setFillColor(16, 45, 115);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('BENRESA CONSULT LIMITED', 14, 13);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 220, 255);
  doc.text('BUSINESS & PEOPLE ADVISORY | PROPOSAL DOCUMENT', 14, 20);

  // Concept Notice Badge
  doc.setFillColor(251, 156, 26); // Amber
  doc.rect(pageWidth - 62, 8, 48, 8, 'F');
  doc.setFontSize(7);
  doc.setTextColor(10, 23, 56);
  doc.setFont('helvetica', 'bold');
  doc.text('INDEPENDENT CONCEPT DEMO', pageWidth - 60, 13);

  y = 38;

  // Metadata Panel
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(14, y, pageWidth - 28, 32, 2, 2, 'F');
  doc.setDrawColor(220, 226, 235);
  doc.roundedRect(14, y, pageWidth - 28, 32, 2, 2, 'S');

  doc.setTextColor(16, 45, 115);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`REFERENCE: ${engagement.referenceCode}`, 20, y + 8);
  doc.text(`VERSION: ${version.versionLabel}`, 110, y + 8);

  doc.setTextColor(70, 80, 95);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Client Organization: ${engagement.clientName} (${engagement.clientIndustry})`, 20, y + 15);
  doc.text(`Lead Consultant: ${engagement.leadConsultant}`, 20, y + 22);
  doc.text(`Status: ${version.status}`, 110, y + 15);
  doc.text(`Date: ${new Date(version.createdAt).toLocaleDateString()}`, 110, y + 22);

  y += 42;

  // Service & Scope Title
  doc.setTextColor(16, 45, 115);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('1. ENGAGEMENT SCOPE & SERVICE OBJECTIVE', 14, y);
  y += 6;

  doc.setTextColor(40, 50, 70);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Service: ${engagement.serviceTitle}`, 14, y);
  y += 5;
  doc.text(`Delivery Method: ${engagement.scope.deliveryMethod.replace('_', ' ').toUpperCase()}`, 14, y);
  y += 5;
  doc.text(`Estimated Duration: ${engagement.scope.estimatedDurationWeeks} Weeks | Target Urgency: ${engagement.scope.urgency.toUpperCase()}`, 14, y);
  y += 10;

  // Deliverables Table Header
  doc.setFillColor(16, 45, 115);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('DELIVERABLE / SPECIFICATION', 18, y + 5);
  doc.text('CATEGORY', 120, y + 5);
  doc.text('EST. DAYS', 160, y + 5);
  y += 8;

  // Deliverables Rows
  engagement.scope.deliverables.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y - 1, pageWidth - 28, 8, 'F');
    }
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(item.title.substring(0, 55), 18, y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(item.category, 120, y + 4);
    doc.text(`${item.estimatedDays} days`, 160, y + 4);
    y += 8;
  });

  y += 8;

  // Milestones Timeline
  doc.setTextColor(16, 45, 115);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('2. OPERATIONAL MILESTONES & TIMELINE', 14, y);
  y += 7;

  engagement.milestones.forEach((m) => {
    doc.setFillColor(241, 245, 249);
    doc.circle(18, y + 2, 2, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(m.title, 24, y + 3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Due: ${m.dueDate} | Status: ${m.status} | Owner: ${m.owner}`, 24, y + 8);
    y += 12;
  });

  y += 6;

  // Approval Signature Block
  if (version.approvalDetails) {
    doc.setFillColor(236, 253, 245);
    doc.roundedRect(14, y, pageWidth - 28, 20, 2, 2, 'F');
    doc.setDrawColor(16, 185, 129);
    doc.roundedRect(14, y, pageWidth - 28, 20, 2, 2, 'S');

    doc.setTextColor(5, 150, 105);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ FORMAL DEMO APPROVAL RECORDED', 20, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(40, 50, 70);
    doc.text(`Approved By: ${version.approvalDetails.approvedBy}`, 20, y + 12);
    doc.text(`Timestamp: ${new Date(version.approvalDetails.approvedAt).toLocaleString()} | Code: ${version.approvalDetails.referenceCode}`, 20, y + 17);
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 12;
  doc.setFontSize(7);
  doc.setTextColor(140, 150, 165);
  doc.text(
    `Benresa Consult Limited | ${BENRESA_LEGAL_ENTITY.headquarters.address} | ${BENRESA_LEGAL_ENTITY.headquarters.phones[0]} | Prototype Demo`,
    14,
    footerY
  );
  doc.text('Page 1 of 1', pageWidth - 28, footerY);

  // Save File
  doc.save(`${engagement.referenceCode}_Proposal_V${version.versionNumber}.pdf`);
}
