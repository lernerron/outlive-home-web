import { useEffect, useMemo, useState } from 'react';
import {
  clearPendingLeads,
  getPendingLeads,
  retryPendingLeads
} from '@/api/leads';

const downloadBlob = (filename, content, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const toCsv = (rows) => {
  if (!rows.length) return '';
  const columns = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((key) => set.add(key));
      return set;
    }, new Set())
  );

  const escapeCsv = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const header = columns.map(escapeCsv).join(',');
  const lines = rows.map((row) => columns.map((col) => escapeCsv(row[col])).join(','));
  return [header, ...lines].join('\n');
};

export default function AdminLeadsQueue() {
  const [leads, setLeads] = useState([]);
  const [syncStatus, setSyncStatus] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const refresh = () => {
    setLeads(getPendingLeads());
  };

  useEffect(() => {
    refresh();
  }, []);

  const hasLeads = leads.length > 0;
  const queuedCount = leads.length;
  const lastQueuedAt = useMemo(() => {
    if (!hasLeads) return 'N/A';
    return leads
      .map((item) => item.queuedAt)
      .filter(Boolean)
      .sort()
      .at(-1) || 'N/A';
  }, [hasLeads, leads]);

  const handleExportJson = () => {
    const content = JSON.stringify(leads, null, 2);
    downloadBlob(`pending-leads-${Date.now()}.json`, content, 'application/json');
  };

  const handleExportCsv = () => {
    const csv = toCsv(leads);
    downloadBlob(`pending-leads-${Date.now()}.csv`, csv, 'text/csv;charset=utf-8;');
  };

  const handleClear = () => {
    clearPendingLeads();
    setSyncStatus('Cleared all queued leads from this browser.');
    refresh();
  };

  const handleRetry = async () => {
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      const result = await retryPendingLeads();
      setSyncStatus(`Retried queue: sent ${result.sent}, remaining ${result.remaining}.`);
      refresh();
    } catch (error) {
      setSyncStatus(`Retry failed: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Queued Leads Admin</h1>
        <p className="mt-2 text-sm text-slate-600">
          Local transition queue from browser storage key <code>pending_leads</code>.
        </p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Queued Leads</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{queuedCount}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 md:col-span-2">
          <p className="text-xs uppercase tracking-wide text-slate-500">Last Queued At</p>
          <p className="mt-2 text-sm font-medium text-slate-900 break-all">{lastQueuedAt}</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button onClick={refresh} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">
          Refresh
        </button>
        <button onClick={handleRetry} disabled={!hasLeads || isSyncing} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300">
          {isSyncing ? 'Retrying...' : 'Retry Send'}
        </button>
        <button onClick={handleExportJson} disabled={!hasLeads} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">
          Export JSON
        </button>
        <button onClick={handleExportCsv} disabled={!hasLeads} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">
          Export CSV
        </button>
        <button onClick={handleClear} disabled={!hasLeads} className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">
          Clear Queue
        </button>
      </div>

      {syncStatus && (
        <div className="mb-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          {syncStatus}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="max-h-[60vh] overflow-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="sticky top-0 bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">ZIP</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Source</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Queued At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hasLeads ? (
                leads.map((lead, index) => (
                  <tr key={`${lead.email || 'lead'}-${lead.queuedAt || index}`}>
                    <td className="px-4 py-3 text-sm text-slate-900">{lead.name || ''}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{lead.phone || ''}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{lead.email || ''}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{lead.zipCode || ''}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{lead.source || ''}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{lead.queuedAt || ''}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                    No queued leads found in this browser.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
