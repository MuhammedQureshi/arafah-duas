"use client"
import { useEffect, useState } from 'react';

type Dua = {
  id: string;
  arabic: string;
  translation: string;
  transliteration: string;
};

const duas: Dua[] = [
  {
    id: 'dua1',
    arabic: "لَا إِلَٰهَ إِلَّا ٱللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ ٱلْمُلْكُ وَلَهُ ٱلْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: " La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa ʿala kulli shayʾin qadeer.",
    translation: "There is no deity except Allah, alone, without partner. To Him belongs all dominion and praise, and He is over all things competent.",
  },
  {
    id: 'dua2',
    arabic: "اللَّهُمَّ أَعْتِقْ رَقَبَتِي مِنَ النَّارِ، وَأَوْسِعْ لِي مِنَ الرِّزْقِ الْحَلَالِ، وَاصْرِفْ عَنِّي فَسَقَةَ الْجِنِّ وَالْإِنسِ",
    transliteration: 'Allahumma aʿtiq raqabatee min an-nar, wa awsiʿ lee min ar-rizq-il-halal, wasrif ʿannee fasaqat al-jinni wal-ins.',
    translation: "O Allah, free my neck from the Fire, expand my provision, grant me permissible sustenance, and keep away from me the wicked ones among the jinn and humankind."
  },
  {
    id: 'dua3',
    arabic: "اللَّهُمَّ اهْدِنِي بِالْهُدَى، وَقِنِي بِالتَّقْوَى، وَاغْفِرْ لِي فِي الْآخِرَةِ وَالْأُولَى",
    transliteration: 'Allahumma ihdini bil-huda, wa qini bi-t-taqwa, waghfir lee fil-akhirati wal-oola.',
    translation: "O Allah, guide me with Your guidance, protect me with Your piety, and forgive me in this life and the next."
  },
  {
    id: 'dua4',
    arabic: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَعَافِنِي وَارْزُقْنِي",
    transliteration: 'Allahummaghfir li, warhamni, wahdini, wa ‘afini, warzuqni.',
    translation: "O Allah, forgive me, have mercy upon me, guide me, grant me wellness, and provide for me."
  },
];

type Counts = {
  [key: string]: number;
};

export default function Home() {
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    const savedCounts = localStorage.getItem('duaCounts');
    if (savedCounts) {
      setCounts(JSON.parse(savedCounts));
    }
  }, []);

  const updateCount = (id: string, value: number) => {
    const newCounts = { ...counts, [id]: (counts[id] || 0) + value };
    setCounts(newCounts);
    localStorage.setItem('duaCounts', JSON.stringify(newCounts));
  };

  const resetCount = (id: string) => {
    const newCounts = { ...counts, [id]: 0 };
    setCounts(newCounts);
    localStorage.setItem('duaCounts', JSON.stringify(newCounts));
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🕋 Day of Arafah Duas</h1>
      <div className="space-y-6 max-w-xl mx-auto">
        {duas.map((dua) => (
          <div key={dua.id} className="border p-4 rounded-xl shadow-sm">
            <p className="text-xl text-right font-semibold">{dua.arabic}</p>
            <p className="text-sm text-gray-900 mt-2">{dua.transliteration}</p>
            <p className="text-sm text-gray-600 mt-2 italic">{dua.translation}</p>
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => updateCount(dua.id, 1)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                +1
              </button>
              <button
                onClick={() => resetCount(dua.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reset
              </button>
              <span className="ml-auto font-mono">Count: {counts[dua.id] || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
