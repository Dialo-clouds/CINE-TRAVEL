"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useSupabaseQuery<T>(table: string, options?: { select?: string; eq?: [string, any]; order?: [string, { ascending: boolean }]; limit?: number }) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let query = supabase.from(table).select(options?.select || "*");

    if (options?.eq) query = query.eq(options.eq[0], options.eq[1]);
    if (options?.order) query = query.order(options.order[0], options.order[1]);
    if (options?.limit) query = query.limit(options.limit);

    query.then(({ data, error: err }) => {
      if (err) setError(err.message);
      else if (data) setData(data as T[]);
      setLoading(false);
    });
  }, [table, JSON.stringify(options)]);

  return { data, loading, error, refetch: () => setLoading(true) };
}

export function useSupabaseMutation(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insert = async (data: any) => {
    setLoading(true);
    const { error: err } = await supabase.from(table).insert(data);
    if (err) setError(err.message);
    setLoading(false);
    return !err;
  };

  const update = async (id: string, data: any) => {
    setLoading(true);
    const { error: err } = await supabase.from(table).update(data).eq("id", id);
    if (err) setError(err.message);
    setLoading(false);
    return !err;
  };

  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from(table).delete().eq("id", id);
    if (err) setError(err.message);
    setLoading(false);
    return !err;
  };

  return { insert, update, remove, loading, error };
}