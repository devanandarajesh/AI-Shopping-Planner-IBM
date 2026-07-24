import { useCallback, useEffect, useState } from 'react';
import type { PlannerInput, SearchHistoryEntry } from '@/services';

const STORAGE_KEY = 'ai_shopping_search_history';
const MAX_ENTRIES = 5;

function loadHistory(): SearchHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SearchHistoryEntry[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_ENTRIES) : [];
  } catch {
    return [];
  }
}

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const addEntry = useCallback(
    (input: PlannerInput, resultCount: number, topMatch: number) => {
      setHistory((prev) => {
        const entry: SearchHistoryEntry = {
          id: `${Date.now()}`,
          timestamp: Date.now(),
          input,
          resultCount,
          topMatch,
        };
        const next = [entry, ...prev].slice(0, MAX_ENTRIES);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* storage may be unavailable */
        }
        return next;
      });
    },
    [],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { history, addEntry, clearHistory };
}
