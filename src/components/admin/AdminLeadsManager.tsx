import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  MessageSquare,
  Trash2,
  Edit,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  ChevronDown,
  X,
  Send,
  Sparkles,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { StoredPmsInquiry, InquiryStatus } from '../../types';

export const AdminLeadsManager: React.FC = () => {
  const {
    inquiries,
    addInquiry,
    updateInquiryStatus,
    updateInquiryDetails,
    deleteInquiry,
    addInquiryNote,
    setActiveTab,
  } = useCms();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<StoredPmsInquiry | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Form for Manual Lead Creation
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    eventDetails: '',
    serviceCategory: 'Corporate Event Management',
    scale: '200-500 Guests',
    duration: 'Full Day Event',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    estimatedValue: '',
  });

  const statuses = [
    'All',
    'New Lead',
    'In Review',
    'Contacted',
    'Proposal Sent',
    'Won / Confirmed',
    'Closed / Archived',
  ];

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.eventDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.serviceCategory && inq.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone || !newLeadForm.eventDetails) {
      alert('Please fill in Client Name, Phone, and Requirement Details.');
      return;
    }

    addInquiry({
      name: newLeadForm.name,
      phone: newLeadForm.phone,
      email: newLeadForm.email || 'client@corporate.in',
      eventDetails: newLeadForm.eventDetails,
      serviceCategory: newLeadForm.serviceCategory,
      scale: newLeadForm.scale,
      duration: newLeadForm.duration,
    });

    setIsAddModalOpen(false);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      eventDetails: '',
      serviceCategory: 'Corporate Event Management',
      scale: '200-500 Guests',
      duration: 'Full Day Event',
      priority: 'Medium',
      estimatedValue: '',
    });
  };

  const handleWhatsAppContact = (inquiry: StoredPmsInquiry) => {
    const cleanPhone = inquiry.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${inquiry.name}, this is Team PMS INNOVATION SOLUTIONS regarding your inquiry for ${inquiry.serviceCategory || 'Corporate Marketing & Event Services'}. We have reviewed your requirement and would like to share the formal scope/quotation.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Service', 'Scale', 'Status', 'Date', 'Details'];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.phone}"`,
      `"${i.email}"`,
      `"${i.serviceCategory || ''}"`,
      `"${i.scale || ''}"`,
      `"${i.status}"`,
      `"${new Date(i.createdAt).toLocaleDateString()}"`,
      `"${i.eventDetails.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pms-leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAddNoteToSelected = () => {
    if (!selectedLead || !newNote.trim()) return;
    addInquiryNote(selectedLead.id, newNote);
    setNewNote('');
    // refresh selected lead object
    const updated = inquiries.find((i) => i.id === selectedLead.id);
    if (updated) {
      setSelectedLead({
        ...updated,
        notes: [`[${new Date().toLocaleDateString()}] ${newNote.trim()}`, ...(updated.notes || [])],
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Inquiries & CRM Lead Manager
          </h2>
          <p className="text-xs text-slate-500">
            Track customer requests, assign statuses, update pipeline value, and communicate via WhatsApp/Email.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Offline Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client name, phone number, email, or requirement..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs text-slate-900"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-medium whitespace-nowrap">
            Showing <strong className="text-slate-900">{filteredInquiries.length}</strong> of {inquiries.length} leads
          </div>
        </div>

        {/* Status Tab Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {st}
              {st !== 'All' && (
                <span className="ml-1.5 text-[10px] opacity-80">
                  ({inquiries.filter((i) => i.status === st).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-16 px-4 text-slate-400">
            <Users className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-600">No matching inquiries found.</p>
            <p className="text-xs text-slate-400">Try changing your search term or filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Lead ID & Client</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Requirement & Scale</th>
                  <th className="py-3.5 px-4">Pipeline Status</th>
                  <th className="py-3.5 px-4">Est. Value</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => setSelectedLead(inq)}
                  >
                    {/* ID & Client */}
                    <td className="py-4 px-4 align-top">
                      <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        {inq.name}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold">
                          {inq.id}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-1">
                        <a
                          href={`tel:${inq.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-slate-800 hover:text-blue-600 font-medium"
                        >
                          <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                          {inq.phone}
                        </a>
                        <a
                          href={`mailto:${inq.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 line-clamp-1"
                        >
                          <Mail className="w-3 h-3 text-blue-600 shrink-0" />
                          {inq.email}
                        </a>
                      </div>
                    </td>

                    {/* Requirement & Scale */}
                    <td className="py-4 px-4 align-top max-w-xs">
                      <div className="font-semibold text-slate-900 text-xs">
                        {inq.serviceCategory || '360° Corporate Solution'}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {inq.eventDetails}
                      </p>
                      {inq.scale && (
                        <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          {inq.scale}
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td
                      className="py-4 px-4 align-top"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer transition-colors ${
                          inq.status === 'Won / Confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : inq.status === 'Proposal Sent'
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : inq.status === 'In Review'
                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                            : inq.status === 'Contacted'
                            ? 'bg-purple-50 text-purple-700 border-purple-300'
                            : inq.status === 'Closed / Archived'
                            ? 'bg-slate-100 text-slate-500 border-slate-300'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="In Review">In Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Won / Confirmed">Won / Confirmed</option>
                        <option value="Closed / Archived">Closed / Archived</option>
                      </select>
                    </td>

                    {/* Est. Value */}
                    <td
                      className="py-4 px-4 align-top"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        defaultValue={inq.estimatedValue || ''}
                        placeholder="e.g. ₹ 5L"
                        onBlur={(e) => updateInquiryDetails(inq.id, { estimatedValue: e.target.value })}
                        className="w-24 px-2 py-1 rounded bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:bg-white focus:border-blue-400 outline-none"
                      />
                    </td>

                    {/* Actions */}
                    <td
                      className="py-4 px-4 align-top text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleWhatsAppContact(inq)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                          title="Message on WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setSelectedLead(inq)}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
                          title="View Details & Notes"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete inquiry for "${inq.name}"?`)) {
                              deleteInquiry(inq.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Lead Drawer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 text-slate-900">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                  {selectedLead.id}
                </span>
                <span className="text-xs text-slate-400">
                  Received on {new Date(selectedLead.createdAt).toLocaleString()}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-slate-900 mt-1">
                {selectedLead.name}
              </h3>
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <button
                onClick={() => handleWhatsAppContact(selectedLead)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Client</span>
              </button>
              <a
                href={`tel:${selectedLead.phone}`}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call ({selectedLead.phone})</span>
              </a>
              <a
                href={`mailto:${selectedLead.email}?subject=PMS Innovation Solutions - Proposal for ${selectedLead.serviceCategory || 'Event Scope'}`}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Spec Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 uppercase font-semibold text-[10px] block">Service Category</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{selectedLead.serviceCategory || '360° Marketing'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 uppercase font-semibold text-[10px] block">Scale / Guest Count</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{selectedLead.scale || 'Standard Corporate Tier'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 uppercase font-semibold text-[10px] block">Event Duration</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{selectedLead.duration || 'Custom Schedule'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 uppercase font-semibold text-[10px] block">Estimated Value</span>
                <span className="font-bold text-blue-700 text-sm mt-0.5 block">{selectedLead.estimatedValue || 'Pending Quote'}</span>
              </div>
            </div>

            {/* Full Requirement */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Client Requirement Details
              </h4>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-normal whitespace-pre-wrap">
                {selectedLead.eventDetails}
              </div>
            </div>

            {/* Notes & Activity Log */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Internal CRM Notes ({selectedLead.notes?.length || 0})
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNoteToSelected()}
                  placeholder="Add note (e.g. Sent hotel contract, follow up Tuesday)..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleAddNoteToSelected}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Add Note
                </button>
              </div>

              {selectedLead.notes && selectedLead.notes.length > 0 && (
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {selectedLead.notes.map((n, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-slate-700">
                      {n}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Manual Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 text-slate-900">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                Add Offline Lead / Client Inquiry
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Record inquiries received via direct phone call, WhatsApp, or offline meeting.
              </p>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Client / Company Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  placeholder="e.g. Tata Steel / Dr. Mukherjee"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="+91 98316 30072"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="client@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Service Category</label>
                <select
                  value={newLeadForm.serviceCategory}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, serviceCategory: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                >
                  <option value="Corporate Event Management">Corporate Event Management</option>
                  <option value="MICE Services">MICE Services</option>
                  <option value="Brand Activation & Experiential">Brand Activation & Experiential</option>
                  <option value="Retail Shop Branding">Retail Shop Branding</option>
                  <option value="Hoarding & Outdoor Advertising">Hoarding & Outdoor Advertising</option>
                  <option value="Digital Marketing & Campaigns">Digital Marketing & Campaigns</option>
                  <option value="Merchandising & Corporate Gifting">Merchandising & Corporate Gifting</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Requirement Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newLeadForm.eventDetails}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, eventDetails: e.target.value })}
                  placeholder="Details regarding event dates, venue preferences, stagecraft requirements..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
