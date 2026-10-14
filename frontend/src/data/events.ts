import type { CampusEvent } from "../types/campus-event";

// Sprint 3'teki data.js'in 6 etkinliği (tarih YYYY-AA-GG: localeCompare ile doğru sıralanır)
export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla söyleşiler ve kariyer fırsatları hakkında bilgilendirici seminer.",
    capacity: 120,
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:00",
    location: "Lab 2",
    description: "Robotik ve teknoloji üzerine uygulamalı atölye.",
    capacity: 30
  },
  {
    id: "event-3",
    title: "Yapay Zeka Semineri",
    category: "Seminer",
    date: "2026-10-25",
    time: "13:00",
    location: "B Blok 101",
    description: "Yapay zeka teknolojileri ve güncel uygulamaları üzerine seminer.",
    capacity: 80
  },
  {
    id: "event-4",
    title: "Web Geliştirme Atölyesi",
    category: "Atölye",
    date: "2026-10-28",
    time: "11:00",
    location: "Bilgisayar Labı",
    description: "HTML, CSS ve JavaScript ile web geliştirme uygulamaları.",
    capacity: 25
  },
  {
    id: "event-5",
    title: "Siber Güvenlik Konferansı",
    category: "Seminer",
    date: "2026-11-03",
    time: "15:00",
    location: "Konferans Salonu",
    description: "Siber güvenlik tehditleri ve güvenli internet kullanımı üzerine konferans.",
    capacity: 150
  },
  {
    id: "event-6",
    title: "Veri Bilimi Atölyesi",
    category: "Atölye",
    date: "2026-11-08",
    time: "14:00",
    location: "Lab 3",
    description: "Veri analizi ve veri biliminin temel uygulamaları üzerine atölye.",
    capacity: 35
  }
];
