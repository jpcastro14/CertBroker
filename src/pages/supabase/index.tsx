import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

type Example = {
  clients: string;
};

export function TestSupa() {
  const [examples, setExamples] = useState<Example[]>([]);

  useEffect(() => {
    fetchExamples();
  }, []);

  async function fetchExamples() {
    const { data, error } = await supabase.from("examples").select("*");

    if (error) {
      console.error("Error fetching examples:", error);
      return;
    }

    setExamples(data);

    console.log("Fetched examples:", data);
  }

  return (
    <div>
      <h1>Supabase Test</h1>
      <ul>
        {examples.map((example, index) => (
          <li key={index}>{example.clients}</li>
        ))}
      </ul>
    </div>
  );
}
