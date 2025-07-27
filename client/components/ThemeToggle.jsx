import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="bg-white text-black px-3 py-1 rounded shadow dark:bg-gray-700 dark:text-white"
    >
      {dark ? '☀ Light' : '🌙 Dark'}
    </button>
  );
}
