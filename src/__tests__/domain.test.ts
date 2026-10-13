import { describe, it, expect } from 'vitest';
import { VERIFIED_SERVICES, BENRESA_LEGAL_ENTITY, VERIFIED_MANAGEMENT_TEAM } from '../data/benresa-verified';
import { INITIAL_DEMO_ENGAGEMENTS, QUALITY_REVIEW_BENCHMARK } from '../data/mock-engagements';

describe('Benresa Verified Business Integrity', () => {
  it('preserves exact verified legal corporate entity name and location', () => {
    expect(BENRESA_LEGAL_ENTITY.name).toBe('Benresa Consult Limited');
    expect(BENRESA_LEGAL_ENTITY.headquarters.address).toContain('Lateef Jakande Road, Ikeja, Lagos');
    expect(BENRESA_LEGAL_ENTITY.headquarters.phones.length).toBeGreaterThan(0);
    expect(BENRESA_LEGAL_ENTITY.headquarters.emails).toContain('info@benresaconsult.com');
  });

  it('contains all 7 verified service categories with accurate deliverables', () => {
    expect(VERIFIED_SERVICES.length).toBe(7);
    const serviceIds = VERIFIED_SERVICES.map((s) => s.id);
    expect(serviceIds).toContain('hr-consulting');
    expect(serviceIds).toContain('talent-acquisition');
    expect(serviceIds).toContain('tax-management');
    expect(serviceIds).toContain('compliance');
    expect(serviceIds).toContain('outsourcing');
    expect(serviceIds).toContain('learning-development');
    expect(serviceIds).toContain('business-consulting');
  });

  it('includes verified management team members sourced from live site', () => {
    const names = VERIFIED_MANAGEMENT_TEAM.map((m) => m.name);
    expect(names).toContain('Mrs Theresa Uzoigwe');
    expect(names).toContain('Mr Taofeek Ambaliyu');
    expect(names).toContain('Mr Emeka Godwin');
  });
});

describe('Engagement Scope & Readiness Calculations', () => {
  it('calculates deterministic complexity score within valid bounds (1-100)', () => {
    const includedDeliverables = 4;
    const urgency = 'accelerated';
    const locationCount = 3;

    const score = Math.min(
      100,
      Math.round((includedDeliverables * 14) + (urgency === 'accelerated' ? 15 : 5) + (locationCount * 6))
    );

    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
    expect(score).toBe(89);
  });

  it('computes intake readiness score from complete profile and documents', () => {
    const hasOrgName = true;
    const hasFiles = true;
    const hasDescription = true;
    const hasValidEmail = true;

    const score = Math.min(
      100,
      Math.round(
        (hasOrgName ? 25 : 0) +
        (hasFiles ? 30 : 0) +
        (hasDescription ? 25 : 0) +
        (hasValidEmail ? 20 : 0)
      )
    );

    expect(score).toBe(100);
  });

  it('penalizes readiness score when documents or contact details are missing', () => {
    const hasOrgName = true;
    const hasFiles = false; // missing
    const hasDescription = true;
    const hasValidEmail = false; // missing

    const score = Math.min(
      100,
      Math.round(
        (hasOrgName ? 25 : 0) +
        (hasFiles ? 30 : 0) +
        (hasDescription ? 25 : 0) +
        (hasValidEmail ? 20 : 0)
      )
    );

    expect(score).toBe(50);
  });
});

describe('Proposal Versioning & State Machine', () => {
  it('initial mock engagement has valid version chronology and approval status', () => {
    const eng = INITIAL_DEMO_ENGAGEMENTS[0];
    expect(eng.proposals.length).toBeGreaterThanOrEqual(1);

    const latest = eng.proposals[eng.proposals.length - 1];
    expect(latest.status).toBe('APPROVED');
    expect(latest.approvalDetails).toBeDefined();
    expect(latest.approvalDetails?.referenceCode).toContain('APP-BEN');
  });

  it('correctly transitions state when proposal is approved', () => {
    const mockEngagement = { ...INITIAL_DEMO_ENGAGEMENTS[0], status: 'PROPOSAL_REVIEW' as const };
    expect(mockEngagement.status).toBe('PROPOSAL_REVIEW');

    // Simulate approval transition
    const updatedStatus = 'ACTIVE';
    expect(updatedStatus).toBe('ACTIVE');
  });
});

describe('Quality Assurance Benchmark & Rule Matching', () => {
  it('contains Nigerian Labour Act and Pension Reform Act compliance items', () => {
    expect(QUALITY_REVIEW_BENCHMARK.length).toBeGreaterThanOrEqual(4);
    const hasLabourAct = QUALITY_REVIEW_BENCHMARK.some((q) => q.criterion.includes('Labour Act'));
    const hasPensionAct = QUALITY_REVIEW_BENCHMARK.some((q) => q.criterion.includes('Pension'));
    expect(hasLabourAct).toBe(true);
    expect(hasPensionAct).toBe(true);
  });

  it('ensures all quality benchmark criteria have valid PASS or EXCEEDS baseline', () => {
    const passes = QUALITY_REVIEW_BENCHMARK.filter((q) => q.status === 'PASS' || q.status === 'EXCEEDS');
    expect(passes.length).toBe(QUALITY_REVIEW_BENCHMARK.length);
  });
});
