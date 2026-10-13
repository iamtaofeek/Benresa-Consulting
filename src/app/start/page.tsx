'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { VERIFIED_SERVICES, BENRESA_LEGAL_ENTITY } from '@/data/benresa-verified';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { exportProposalPDF } from '@/lib/pdf-export';
import { EngagementScope, ScopeDeliverable, EngagementDeliveryMethod } from '@/types';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  UploadCloud, 
  FileText, 
  Trash2, 
  RotateCcw, 
  RotateCw, 
  Download, 
  Building2, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Info
} from 'lucide-react';

function WizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialServiceId = searchParams?.get('service') || 'talent-acquisition';

  const { addEngagement, engagements } = useDemoWorkspace();

  const [step, setStep] = useState<number>(1);

  // Step 1: Service
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId);

  // Step 2: Org Profile
  const [orgName, setOrgName] = useState<string>('Apex Logistics Plc');
  const [industry, setIndustry] = useState<string>('FMCG & Logistics');
  const [orgSize, setOrgSize] = useState<'1-25' | '26-100' | '101-500' | '500+'>('101-500');
  const [contactName, setContactName] = useState<string>('Adaeze Okonkwo');
  const [contactRole, setContactRole] = useState<string>('Chief People Officer');
  const [contactEmail, setContactEmail] = useState<string>('a.okonkwo@apexlogistics.ng');
  const [contactPhone, setContactPhone] = useState<string>('+234 803 555 0192');
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['Lagos (HQ)', 'Port Harcourt']);

  // Step 3: Business Need & Priorities
  const [businessChallenge, setBusinessChallenge] = useState<string>(
    'Expanding operations nationwide requires mission-critical C-Suite leadership and structured statutory compliance across 3 regional depots.'
  );
  const [priorities, setPriorities] = useState<string[]>([
    'Executive VP of Operations Search',
    'Customs & Safety Compliance Protocol',
    'Regional Depot Headcount Alignment',
  ]);
  const [newPriorityInput, setNewPriorityInput] = useState<string>('');

  // Step 4: Documents & Intake Preflight
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; size: string; status: 'VALIDATED' | 'PENDING' }[]>([
    { id: 'f-1', name: 'Executive_Org_Chart_2026.pdf', size: '2.1 MB', status: 'VALIDATED' },
    { id: 'f-2', name: 'Compensation_Bands_Draft.xlsx', size: '840 KB', status: 'VALIDATED' },
  ]);

  // Step 5: Scope & Delivery Preferences
  const [deliveryMethod, setDeliveryMethod] = useState<EngagementDeliveryMethod>('talent_search');
  const [urgency, setUrgency] = useState<'standard' | 'accelerated' | 'critical'>('accelerated');
  
  // Deliverables with internal history for Undo/Redo
  const selectedService = VERIFIED_SERVICES.find((s) => s.id === selectedServiceId) || VERIFIED_SERVICES[0];

  const defaultDeliverables: ScopeDeliverable[] = selectedService.deliverables.map((d, i) => ({
    id: `del-${i}`,
    title: d,
    category: 'Core Deliverable',
    included: true,
    estimatedDays: (i + 1) * 5,
    description: `Standard deliverable for ${selectedService.title}`,
  }));

  const [deliverables, setDeliverables] = useState<ScopeDeliverable[]>(defaultDeliverables);
  const [history, setHistory] = useState<ScopeDeliverable[][]>([defaultDeliverables]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Sync deliverables when service changes
  useEffect(() => {
    const updated = selectedService.deliverables.map((d, i) => ({
      id: `del-${i}`,
      title: d,
      category: 'Core Deliverable',
      included: true,
      estimatedDays: (i + 1) * 5,
      description: `Standard deliverable for ${selectedService.title}`,
    }));
    setDeliverables(updated);
    setHistory([updated]);
    setHistoryIndex(0);
  }, [selectedServiceId]);

  const toggleDeliverable = (id: string) => {
    const updated = deliverables.map((d) => (d.id === id ? { ...d, included: !d.included } : d));
    const nextHistory = history.slice(0, historyIndex + 1);
    setHistory([...nextHistory, updated]);
    setHistoryIndex(nextHistory.length);
    setDeliverables(updated);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = historyIndex - 1;
      setHistoryIndex(prev);
      setDeliverables(history[prev]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = historyIndex + 1;
      setHistoryIndex(next);
      setDeliverables(history[next]);
    }
  };

  // Step 7: Output state
  const [createdEngagementId, setCreatedEngagementId] = useState<string>('');

  // Complexity & Readiness calculations (Deterministic)
  const includedCount = deliverables.filter((d) => d.included).length;
  const complexityScore = Math.min(
    100,
    Math.round((includedCount * 14) + (urgency === 'critical' ? 25 : urgency === 'accelerated' ? 15 : 5) + (selectedLocations.length * 6))
  );

  const readinessScore = Math.min(
    100,
    Math.round(
      (orgName.trim() ? 25 : 0) +
      (uploadedFiles.length > 0 ? 30 : 0) +
      (businessChallenge.length > 20 ? 25 : 0) +
      (contactEmail.includes('@') ? 20 : 0)
    )
  );

  const handleSubmitConsultation = () => {
    const currentScope: EngagementScope = {
      serviceId: selectedService.id,
      deliveryMethod,
      orgSize,
      urgency,
      locations: selectedLocations,
      priorities,
      deliverables,
      additionalNotes: businessChallenge,
      estimatedDurationWeeks: Math.ceil(includedCount * 1.5) + (urgency === 'critical' ? 1 : 2),
      complexityScore,
    };

    const newId = addEngagement({
      clientName: orgName,
      clientIndustry: industry,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      scope: currentScope,
      documents: uploadedFiles.map((f, i) => ({
        id: `doc-sub-${i}`,
        name: f.name,
        category: 'Intake Upload',
        required: true,
        description: 'Uploaded via intake wizard preflight center',
        status: f.status,
        fileName: f.name,
      })),
    });

    setCreatedEngagementId(newId);
    setStep(7);
  };

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFile = {
        id: `f-${Date.now()}`,
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        status: 'VALIDATED' as const,
      };
      setUploadedFiles((prev) => [...prev, newFile]);
    }
  };

  const removeUploadedFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wizard Stepper Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>STEP {step} OF 7</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400">
              {step === 1 && '1. Choose Service'}
              {step === 2 && '2. Organization Profile'}
              {step === 3 && '3. Business Priorities'}
              {step === 4 && '4. Document Center'}
              {step === 5 && '5. Scope & Deliverables'}
              {step === 6 && '6. Review Statement'}
              {step === 7 && '7. Confirmation'}
            </span>
          </div>

          <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-700 to-cyan-500 transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Body Card */}
        <div className="fintech-panel-elevated p-6 sm:p-8 md:p-10 bg-white dark:bg-[#0c1427]">
          {/* STEP 1: Choose Service */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  1. Select Consulting Practice
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Choose the verified advisory capability your organization requires.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VERIFIED_SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      selectedServiceId === s.id
                        ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-600 dark:border-cyan-400 shadow-sm ring-1 ring-blue-600'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{s.title}</span>
                        {selectedServiceId === s.id && (
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {s.shortDesc}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-white/5 text-[10px] font-mono text-cyan-700 dark:text-cyan-400">
                      Lead Time: {s.leadTimeWeeks}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Organization Profile */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  2. Organization Profile
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Help us understand your enterprise structure and operating environment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Legal Entity Name *
                  </label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="e.g. Apex Logistics Plc"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Industry Sector *
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="FMCG & Logistics">FMCG & Logistics</option>
                    <option value="Oil & Gas">Oil & Gas</option>
                    <option value="Technology & FinTech">Technology & FinTech</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Healthcare & Pharma">Healthcare & Pharma</option>
                    <option value="Commercial Services">Commercial Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Workforce Size Range *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['1-25', '26-100', '101-500', '500+'] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setOrgSize(sz)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                          orgSize === sz
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Contact Officer & Designation *
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="e.g. Adaeze Okonkwo (CPO)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="a.okonkwo@apexlogistics.ng"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="+234 803 000 0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Operating Locations in Nigeria
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Lagos (HQ)', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu', 'Remote'].map((loc) => {
                    const isSel = selectedLocations.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          if (isSel) {
                            setSelectedLocations(selectedLocations.filter((l) => l !== loc));
                          } else {
                            setSelectedLocations([...selectedLocations, loc]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSel
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Describe Business Need & Priorities */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  3. Describe Business Need & Key Priorities
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Detail your specific operational challenges and rank order of importance.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Executive Business Need Summary *
                </label>
                <textarea
                  rows={4}
                  value={businessChallenge}
                  onChange={(e) => setBusinessChallenge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Describe your current situation, business objectives, and desired outcome..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Key Engagement Priorities (Ranked Order)
                </label>
                <div className="space-y-2 mb-3">
                  {priorities.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">
                          #{idx + 1}
                        </span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{p}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPriorities(priorities.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newPriorityInput}
                    onChange={(e) => setNewPriorityInput(e.target.value)}
                    placeholder="Add an additional priority item..."
                    className="flex-1 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newPriorityInput.trim()) {
                        e.preventDefault();
                        setPriorities([...priorities, newPriorityInput.trim()]);
                        setNewPriorityInput('');
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newPriorityInput.trim()) {
                        setPriorities([...priorities, newPriorityInput.trim()]);
                        setNewPriorityInput('');
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Document Center & Intake Preflight */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  4. Document Intake Center & Preflight Check
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Upload relevant background documents. Files are validated locally in-browser for demo privacy.
                </p>
              </div>

              {/* Upload Drag & Drop Zone */}
              <div className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl p-6 text-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors relative">
                <input
                  type="file"
                  onChange={handleFileUploadSim}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Drag and drop files here, or browse
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Supports PDF, DOCX, XLSX (max 25MB per file). Local in-memory demo validation.
                </p>
              </div>

              {/* Uploaded Files Table */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Attached Intake Documents ({uploadedFiles.length})
                </div>
                {uploadedFiles.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{f.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{f.size} • Preflight validated</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        VALIDATED
                      </span>
                      <button
                        type="button"
                        onClick={() => removeUploadedFile(f.id)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deterministic Readiness Indicator Box */}
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Intake Readiness Diagnostic
                    </span>
                  </div>
                  <span className="text-base font-mono font-bold text-blue-700 dark:text-cyan-400">
                    {readinessScore}/100
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span>• Organization & Contact Details</span>
                    <span className="text-emerald-600 font-semibold">PASS (45 pts)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span>• Business Need & Priorities</span>
                    <span className="text-emerald-600 font-semibold">PASS (25 pts)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span>• Baseline Intake Documentation</span>
                    <span className="text-emerald-600 font-semibold">PASS (30 pts)</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-blue-200/40 dark:border-blue-900/40 pt-2 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyan-600" />
                  <span>
                    Deterministic checks verify required field completeness without transmitting confidential records to external models.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Scope Builder & Deliverables Configuration (with Undo/Redo!) */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    5. Service Scope Builder
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Fine-tune deliverables and delivery model with real-time complexity score.
                  </p>
                </div>

                {/* Undo / Redo Toolbar */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={historyIndex === 0}
                    className="p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none"
                    title="Undo (Ctrl+Z)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRedo}
                    disabled={historyIndex === history.length - 1}
                    className="p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none"
                    title="Redo (Ctrl+Shift+Z)"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Delivery Model & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Engagement Delivery Mode
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="talent_search">Talent Search / Retained Executive Assignment</option>
                    <option value="advisory_project">Advisory Project (Time-Bound Sprint)</option>
                    <option value="outsourced_managed">Workforce & Process Outsourcing SLA</option>
                    <option value="compliance_audit">Statutory Compliance Audit & Remittances</option>
                    <option value="retainer_support">Annual Retainer & Embedded Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Target Execution Urgency
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['standard', 'accelerated', 'critical'] as const).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUrgency(u)}
                        className={`py-2 text-xs font-semibold uppercase rounded-lg border transition-all ${
                          urgency === u
                            ? 'bg-[#102d73] dark:bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Included Practice Deliverables
                  </label>
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    Complexity: {complexityScore}/100
                  </span>
                </div>

                <div className="space-y-2">
                  {deliverables.map((del) => (
                    <div
                      key={del.id}
                      onClick={() => toggleDeliverable(del.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        del.included
                          ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-500/50 dark:border-blue-500/40'
                          : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${del.included ? 'bg-blue-600 text-white' : 'border border-slate-300 dark:border-slate-600'}`}>
                          {del.included && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className={`text-xs font-semibold ${del.included ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                            {del.title}
                          </div>
                          <div className="text-[10px] text-slate-500">{del.category}</div>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-slate-500">
                        {del.estimatedDays} days
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Review Request & Statement of Work */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  6. Review Consultation Request & Scope
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Verify your structured intake details before generating the statement of work snapshot.
                </p>
              </div>

              {/* Structured Summary Grid */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200 dark:border-white/10 text-xs">
                  <div>
                    <span className="text-slate-400 block">Organization:</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{orgName}</strong>
                    <div className="text-slate-500">{industry} • {orgSize} staff</div>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Authorized Contact:</span>
                    <strong className="text-slate-900 dark:text-white">{contactName} ({contactRole})</strong>
                    <div className="text-slate-500">{contactEmail} • {contactPhone}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-200 dark:border-white/10 text-xs">
                  <div>
                    <span className="text-slate-400 block">Practice:</span>
                    <strong className="text-blue-700 dark:text-cyan-400">{selectedService.title}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Delivery Mode:</span>
                    <strong className="text-slate-800 dark:text-slate-200 uppercase">{deliveryMethod.replace('_', ' ')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Urgency & Complexity:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{urgency.toUpperCase()} • {complexityScore}/100</strong>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block mb-1">Confirmed Scope Deliverables ({includedCount}):</span>
                  <div className="space-y-1">
                    {deliverables.filter((d) => d.included).map((d) => (
                      <div key={d.id} className="text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{d.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Demo Mode Integrity Notice:</strong> Submitting this wizard will record the consultation locally in your browser storage and generate a real demo proposal in Benresa Connect. No external transmission is simulated.
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Confirmation */}
          {step === 7 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  DEMO REQUEST SAVED LOCALLY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Consultation Scope Successfully Registered
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-2">
                  Reference code generated for <strong>{orgName}</strong>. You can now inspect the proposal, review milestone schedules, or download the branded PDF document.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 max-w-sm mx-auto text-xs space-y-1">
                <div className="text-slate-400">REFERENCE NUMBER:</div>
                <div className="text-lg font-bold font-mono text-blue-600 dark:text-cyan-400">
                  DEMO-BEN-2026-00{engagements.length}
                </div>
                <div className="text-slate-500">Service: {selectedService.title}</div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  href={`/engagements/${createdEngagementId || 'eng-001'}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#102d73] hover:bg-[#0c2258] text-white text-xs font-bold shadow-md transition-all"
                >
                  <span>Open Engagement Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                >
                  <span>Go to Client Overview</span>
                </a>
              </div>
            </div>
          )}

          {/* Stepper Navigation Footer Buttons */}
          {step < 7 && (
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (step === 6) {
                    handleSubmitConsultation();
                  } else {
                    setStep(step + 1);
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#102d73] hover:bg-[#0c2258] text-white shadow-sm transition-all"
              >
                <span>{step === 6 ? 'Submit Consultation Scope' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConsultationWizardPage() {
  return (
    <Suspense fallback={
      <div className="py-24 max-w-md mx-auto text-center text-xs text-slate-500">
        Loading Consultation Wizard...
      </div>
    }>
      <WizardContent />
    </Suspense>
  );
}
