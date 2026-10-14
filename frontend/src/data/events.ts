import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Yapay Zeka ve Gelecek Semineri",
    category: "Seminer",
    capacity: 150,
    date: "2026-11-15",
    time: "14:00",
    location: "SDÜ Lütfü Çakmakçı Kültür Merkezi",
    description: "Yapay zeka alanındaki son gelişmeler ve kariyer fırsatları."
  },
  {
    id: "event-2",
    title: "React ve TypeScript Atölyesi",
    category: "Atölye",
    capacity: 50,
    date: "2026-11-20",
    time: "10:00",
    location: "Mühendislik Fakültesi Lab-3",
    description: "Modern web geliştirme teknikleri ile uygulamalı React eğitimi."
  },
  {
    id: "event-3",
    title: "Kariyer Sohbetleri: Sektör Liderleri",
    category: "Söyleşi",
    capacity: 200,
    date: "2026-11-25",
    time: "15:30",
    location: "Prof. Dr. M. Lütfü Çakmakçı Amfisi",
    description: "Yazılım sektöründeki tecrübeli isimlerle soru-cevap ve networking."
  },
  {
    id: "event-4",
    title: "Kampüs Hackathon Yarışması",
    category: "Yarışma",
    capacity: 80,
    date: "2026-12-01",
    time: "09:00",
    location: "Öğrenci Meydanı / Yenilikçi Fikirler Merkezi",
    description: "24 saatlik kodlama maratonu ve dereceye girenlere ödüller."
  }
];