'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lead } from '@/types/database';
import { motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/components/ToastContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      const result = await response.json();

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (result.success) {
        setLeads(result.data);
      }
    } catch (error) {
      showToast('error', 'Ошибка загрузки заявок');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id: number, newStatus: Lead['status']) => {
    console.log('Updating lead with ID:', id, 'Type:', typeof id);
    
    try {
      // Убедимся, что ID - число
      const numericId = Number(id);
      console.log('Numeric ID:', numericId);
      
      const response = await fetch(`/api/admin/leads/${numericId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();

      if (result.success) {
        setLeads(leads.map(lead => 
          lead.id === id ? { ...lead, status: newStatus } : lead
        ));
        showToast('success', 'Статус обновлен');
      } else {
        console.error('Error response:', result);
        showToast('error', result.error || 'Ошибка при обновлении статуса');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      showToast('error', 'Ошибка при обновлении статуса');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        router.push('/admin/login');
      } else {
        showToast('error', 'Ошибка при выходе');
      }
    } catch {
      showToast('error', 'Ошибка при выходе');
    }
  };

  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[var(--muted-foreground)]">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Шапка */}
      <header className="bg-[var(--muted)] border-b border-[var(--border)] sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-semibold text-[var(--foreground)]">
            Админ-панель
          </h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors dark:bg-red-600 dark:hover:bg-red-700"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Заявки с сайта</h2>
          <button
            onClick={fetchLeads}
            className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Обновить
          </button>
        </div>

        {leads.length > 0 ? (
          <div className="bg-[var(--muted)] rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--border)]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted-foreground)]">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted-foreground)]">Дата</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted-foreground)]">Имя</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted-foreground)]">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted-foreground)]">Статус</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted-foreground)]">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
  {leads.map((lead) => (
    <motion.tr
      key={lead.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hover:bg-[var(--border)]/50 transition-colors"
    >
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">{lead.id}</td>
      <td className="px-6 py-4 text-sm text-[var(--muted-foreground)]">
        {new Date(lead.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-[var(--foreground)]">{lead.name}</td>
      <td className="px-6 py-4 text-sm text-[var(--muted-foreground)]">{lead.email}</td>
      
      <td className="px-6 py-4">
  <select
    value={lead.status}
    onChange={(e) => {
      const newStatus = e.target.value as Lead['status'];
      updateLeadStatus(lead.id, newStatus);
    }}
    className={`
      px-3 py-1.5 text-sm rounded-lg font-medium outline-none cursor-pointer
      transition-all duration-200 border-2 font-bold
      ${lead.status === 'new' 
        ? 'bg-green-400 text-white border-green-600 hover:bg-green-500 dark:bg-green-500 dark:text-white dark:border-green-300' 
        : lead.status === 'read'
        ? 'bg-yellow-400 text-white border-yellow-600 hover:bg-yellow-500 dark:bg-yellow-500 dark:text-white dark:border-yellow-300'
        : 'bg-blue-400 text-white border-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:text-white dark:border-blue-300'
      }
    `}
  >
    <option value="new" className="bg-green-400 text-white">
      Новая
    </option>
    <option value="read" className="bg-yellow-400 text-white">
      Прочитана
    </option>
    <option value="contacted" className="bg-blue-400 text-white">
      Связались
    </option>
  </select>
</td>
      
      <td className="px-6 py-4">
        <button
          onClick={() => openLeadDetails(lead)}
          className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors font-medium"
        >
          Детали
        </button>
      </td>
    </motion.tr>
  ))}
</tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-[var(--muted)] rounded-xl border border-[var(--border)] p-12 text-center">
            <p className="text-[var(--muted-foreground)]">Пока нет заявок</p>
          </div>
        )}
      </main>

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Детали заявки"
        size="md"
      >
        {selectedLead && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--muted-foreground)]">Имя</label>
              <p className="text-lg text-[var(--foreground)]">{selectedLead.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--muted-foreground)]">Email</label>
              <p className="text-lg text-[var(--foreground)]">{selectedLead.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--muted-foreground)]">Сообщение</label>
              <p className="text-lg text-[var(--foreground)] whitespace-pre-wrap">{selectedLead.message}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--muted-foreground)]">Дата</label>
              <p className="text-lg text-[var(--foreground)]">{new Date(selectedLead.created_at).toLocaleString()}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}