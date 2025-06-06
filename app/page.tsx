"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  MapPin,
  Calendar,
  Clock,
  Users,
  ChurchIcon as Mosque,
  Star,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PengajianInvitation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Event date - 2 days from now
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 2);
  eventDate.setHours(14, 0, 0, 0); // Set to 2 PM

  const galleryImages = ["/albidayah.jpeg"];

  const rundownItems = [
    { time: "07:00 - 07:15", activity: "Pengkondisian santri Angkatan 30" },
    { time: "07:15 - 07:45", activity: "Penyambutan santri Angkatan 30" },
    { time: "07:45 - 08:00", activity: "Pembukaan MC" },
    { time: "08:00 - 08:10", activity: "Tawassul" },
    { time: "08:10 - 08:20", activity: "Pembacaan ayat suci Al-Qur’an" },
    { time: "08:20 - 08:30", activity: "Sholawat angkatan dan lagu 30 Putra" },
    { time: "08:30 - 08:40", activity: "Paduan suara" },
    { time: "08:40 - 08:45", activity: "Laporan ketua pelaksana" },
    {
      time: "08:45 - 08:55",
      activity: "Sambutan perwakilan orang tua santri Angkatan 30",
    },
    {
      time: "08:55 - 09:05",
      activity: "Sambutan Kepala Madrasah Aliyah Albidayah",
    },
    {
      time: "09:05 - 09:20",
      activity: "Sambutan Ketua Dewan Pembina Santri sekaligus simbolis",
    },
    { time: "09:20 - 09:30", activity: "Pembacaan doa bersama" },
    { time: "09:30 - 09:45", activity: "Pidato 5 bahasa" },
    { time: "09:45 - 10:00", activity: "Angklung: Senada" },
    { time: "10:00 - 10:15", activity: "Qosidah Putri: Nailul Hana" },
    { time: "10:15 - 10:30", activity: "Ratoh Jaroe" },
    { time: "10:30 - 10:45", activity: "Pagar Nusa" },
    { time: "11:00 - 11:15", activity: "Qosidah Putra: Jawahirul Fata" },
    { time: "11:15 - 11:30", activity: "Marawis Putra: El-Lathief" },
    { time: "11:30 - 11:45", activity: "Hadroh: Mahabbatul Karimah" },
    { time: "11:45 - 12:05", activity: "Break Sholat Zuhur" },
    { time: "12:05 - 12:15", activity: "Persiapan" },
    {
      time: "12:15 - 12:45",
      activity: "Pengumuman santri berprestasi oleh ketua Dewan Pembina Santri",
    },
    { time: "12:45 - 13:15", activity: "Ramah Tamah" },
    {
      time: "13:15 - 14:15",
      activity: "Penyematan Medali & Foto Bersama Santri Angkatan 30",
    },
  ];

  const getNextSundayAt7AM = () => {
    const now = new Date();
    const day = now.getDay();
    const daysUntilSunday = (7 - day) % 7 || 7;

    const nextSunday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + daysUntilSunday,
      7,
      0,
      0,
      0
    );

    return nextSunday;
  };

  // Countdown timer
  useEffect(() => {
    const eventDate = getNextSundayAt7AM();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const startPlayback = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowWelcome(false);
        })
        .catch((error) => {
          console.error("Gagal memutar audio:", error);
        });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.log);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showWelcome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showWelcome]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/sholawatan.mpeg" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {showWelcome && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-80 h-screen flex items-center justify-center overflow-hidden">
          <section
            id="header"
            className="relative px-6 py-8 text-center flex-1 h-full w-full overflow-hidden flex items-center justify-center m-auto max-w-[480px]"
          >
            <div className="animate-fade-in">
              {/* Enhanced Decorative Border with Islamic Patterns */}
              <div className="relative border-2 border-yellow-400 rounded-lg p-6 mx-4 bg-gradient-to-b from-blue-800/50 to-blue-900/50 backdrop-blur-sm overflow-hidden">
                {/* Islamic geometric border pattern */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top border pattern */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 400 16"
                      preserveAspectRatio="none"
                    >
                      <pattern
                        id="topPattern"
                        x="0"
                        y="0"
                        width="40"
                        height="16"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M20 2 L30 8 L20 14 L10 8 Z"
                          fill="#FFD700"
                          fillOpacity="0.4"
                        />
                        <circle
                          cx="20"
                          cy="8"
                          r="3"
                          fill="none"
                          stroke="#FFD700"
                          strokeWidth="0.5"
                          strokeOpacity="0.6"
                        />
                      </pattern>
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#topPattern)"
                      />
                    </svg>
                  </div>

                  {/* Bottom border pattern */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 400 16"
                      preserveAspectRatio="none"
                    >
                      <pattern
                        id="bottomPattern"
                        x="0"
                        y="0"
                        width="40"
                        height="16"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M20 14 L30 8 L20 2 L10 8 Z"
                          fill="#FFD700"
                          fillOpacity="0.4"
                        />
                        <circle
                          cx="20"
                          cy="8"
                          r="3"
                          fill="none"
                          stroke="#FFD700"
                          strokeWidth="0.5"
                          strokeOpacity="0.6"
                        />
                      </pattern>
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#bottomPattern)"
                      />
                    </svg>
                  </div>

                  {/* Left border pattern */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 16 400"
                      preserveAspectRatio="none"
                    >
                      <pattern
                        id="leftPattern"
                        x="0"
                        y="0"
                        width="16"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M2 20 L8 10 L14 20 L8 30 Z"
                          fill="#FFD700"
                          fillOpacity="0.4"
                        />
                        <circle
                          cx="8"
                          cy="20"
                          r="3"
                          fill="none"
                          stroke="#FFD700"
                          strokeWidth="0.5"
                          strokeOpacity="0.6"
                        />
                      </pattern>
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#leftPattern)"
                      />
                    </svg>
                  </div>

                  {/* Right border pattern */}
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 16 400"
                      preserveAspectRatio="none"
                    >
                      <pattern
                        id="rightPattern"
                        x="0"
                        y="0"
                        width="16"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M14 20 L8 10 L2 20 L8 30 Z"
                          fill="#FFD700"
                          fillOpacity="0.4"
                        />
                        <circle
                          cx="8"
                          cy="20"
                          r="3"
                          fill="none"
                          stroke="#FFD700"
                          strokeWidth="0.5"
                          strokeOpacity="0.6"
                        />
                      </pattern>
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#rightPattern)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Corner decorative elements */}
                <div className="absolute top-2 left-2 w-8 h-8 opacity-60">
                  <svg
                    viewBox="0 0 32 32"
                    className="w-full h-full text-yellow-400"
                  >
                    <path
                      d="M16 4 L20 12 L28 16 L20 20 L16 28 L12 20 L4 16 L12 12 Z"
                      fill="currentColor"
                      fillOpacity="0.5"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeOpacity="0.7"
                    />
                  </svg>
                </div>

                <div className="absolute top-2 right-2 w-8 h-8 opacity-60">
                  <svg
                    viewBox="0 0 32 32"
                    className="w-full h-full text-yellow-400"
                  >
                    <path
                      d="M16 4 L20 12 L28 16 L20 20 L16 28 L12 20 L4 16 L12 12 Z"
                      fill="currentColor"
                      fillOpacity="0.5"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeOpacity="0.7"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-2 left-2 w-8 h-8 opacity-60">
                  <svg
                    viewBox="0 0 32 32"
                    className="w-full h-full text-yellow-400"
                  >
                    <path
                      d="M16 4 L20 12 L28 16 L20 20 L16 28 L12 20 L4 16 L12 12 Z"
                      fill="currentColor"
                      fillOpacity="0.5"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeOpacity="0.7"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-2 right-2 w-8 h-8 opacity-60">
                  <svg
                    viewBox="0 0 32 32"
                    className="w-full h-full text-yellow-400"
                  >
                    <path
                      d="M16 4 L20 12 L28 16 L20 20 L16 28 L12 20 L4 16 L12 12 Z"
                      fill="currentColor"
                      fillOpacity="0.5"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeOpacity="0.7"
                    />
                  </svg>
                </div>

                {/* Logos */}
                <div className="flex justify-center space-x-4 mb-6">
                  <img src="/albidayah.png" className="w-24 h-24" />
                </div>

                <h1 className="text-4xl font-bold text-yellow-400 mb-2 tracking-wide">
                  Undangan
                </h1>
                {/* Enhanced decorative dividers */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
                  <div className="mx-4">
                    <svg
                      width="40"
                      height="20"
                      viewBox="0 0 40 20"
                      className="text-yellow-400"
                    >
                      <circle cx="10" cy="10" r="3" fill="currentColor" />
                      <circle cx="20" cy="10" r="4" fill="currentColor" />
                      <circle cx="30" cy="10" r="3" fill="currentColor" />
                      <path
                        d="M5 10 Q10 5 15 10 Q20 15 25 10 Q30 5 35 10"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        strokeOpacity="0.6"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent to-yellow-400"></div>
                </div>

                <h2 className="text-5xl font-bold text-yellow-300 mb-2 tracking-wider">
                  Tasyakuran Angkatan 30
                </h2>
                <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
                  <div className="mx-4">
                    <svg
                      width="60"
                      height="20"
                      viewBox="0 0 60 20"
                      className="text-yellow-400"
                    >
                      <path
                        d="M10 10 L15 5 L20 10 L25 5 L30 10 L35 5 L40 10 L45 5 L50 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx="30" cy="10" r="2" fill="currentColor" />
                      <path
                        d="M5 10 Q30 2 55 10"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="none"
                        strokeOpacity="0.5"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent to-yellow-400"></div>
                </div>
                <Button
                  onClick={startPlayback}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-lg transition-all duration-300 transform rounded-full"
                >
                  Buka Undangan
                </Button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Enhanced Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        {/* Main geometric pattern */}
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFD700' fillOpacity='0.2'%3E%3Cpath d='M60 60l30-30v60l-30-30zm0 0l-30-30v60l30-30zm0 0l30 30h-60l30-30zm0 0l-30 30h60l-30-30z'/%3E%3Ccircle cx='60' cy='60' r='20' fill='none' stroke='%23FFD700' strokeWidth='1' strokeOpacity='0.3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Secondary star pattern */}
        <div
          className="absolute inset-0 bg-repeat opacity-60"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFD700' fillOpacity='0.15'%3E%3Cpath d='M40 10l6 18h18l-15 11 6 18-15-11-15 11 6-18-15-11h18z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
            backgroundPosition: "40px 40px",
          }}
        />
      </div>

      {/* Decorative Corner Patterns */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-50">
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
          <path
            d="M0 0 Q50 0 50 50 Q50 0 100 0 L100 50 Q50 50 50 100 Q50 50 0 50 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.7"
          />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 opacity-50 transform rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
          <path
            d="M0 0 Q50 0 50 50 Q50 0 100 0 L100 50 Q50 50 50 100 Q50 50 0 50 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.7"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-50 transform rotate-270">
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
          <path
            d="M0 0 Q50 0 50 50 Q50 0 100 0 L100 50 Q50 50 50 100 Q50 50 0 50 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.7"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-50 transform rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
          <path
            d="M0 0 Q50 0 50 50 Q50 0 100 0 L100 50 Q50 50 50 100 Q50 50 0 50 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.7"
          />
        </svg>
      </div>

      {/* Music Toggle Button */}
      <Button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-lg transition-all duration-300 transform hover:scale-110"
        size="icon"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-blue-900" />
        ) : (
          <Play className="h-5 w-5 text-blue-900" />
        )}
      </Button>

      {/* Floating Islamic Pattern Element */}
      <div className="fixed top-10 left-4 z-30 w-16 h-16 opacity-50 animate-pulse">
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full text-yellow-400 animate-spin-slow"
        >
          <path
            d="M32 8 L40 20 L52 24 L44 32 L52 40 L40 44 L32 56 L24 44 L12 40 L20 32 L12 24 L24 20 Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
          <circle
            cx="32"
            cy="32"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.8"
          />
          <circle
            cx="32"
            cy="32"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.6"
          />
          <path
            d="M16 32 L48 32 M32 16 L32 48"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      <div className="fixed bottom-40 right-4 z-30 w-16 h-16 opacity-50 animate-pulse">
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full text-yellow-400 animate-spin-slow"
        >
          <path
            d="M32 8 L40 20 L52 24 L44 32 L52 40 L40 44 L32 56 L24 44 L12 40 L20 32 L12 24 L24 20 Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
          <circle
            cx="32"
            cy="32"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.8"
          />
          <circle
            cx="32"
            cy="32"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.6"
          />
          <path
            d="M16 32 L48 32 M32 16 L32 48"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* Another floating element on the right */}
      <div className="fixed bottom-32 right-4 z-30 w-12 h-12 opacity-15 animate-bounce-slow">
        <svg viewBox="0 0 48 48" className="w-full h-full text-yellow-400">
          <path
            d="M24 4 L30 14 L40 18 L34 24 L40 30 L30 34 L24 44 L18 34 L8 30 L14 24 L8 18 L18 14 Z"
            fill="currentColor"
            fillOpacity="0.5"
          />
          <circle
            cx="24"
            cy="24"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.7"
          />
        </svg>
      </div>

      {/* Header Section */}
      <section id="header" className="relative px-6 py-8 text-center">
        <div className="animate-fade-in">
          {/* Enhanced Decorative Border with Islamic Patterns */}
          <div className="relative border-2 border-yellow-400 rounded-lg p-6 mx-4 bg-gradient-to-b from-blue-800/50 to-blue-900/50 backdrop-blur-sm overflow-hidden">
            {/* Islamic geometric border pattern */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top border pattern */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 16"
                  preserveAspectRatio="none"
                >
                  <pattern
                    id="topPattern"
                    x="0"
                    y="0"
                    width="40"
                    height="16"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M20 2 L30 8 L20 14 L10 8 Z"
                      fill="#FFD700"
                      fillOpacity="0.4"
                    />
                    <circle
                      cx="20"
                      cy="8"
                      r="3"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="0.5"
                      strokeOpacity="0.6"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#topPattern)" />
                </svg>
              </div>

              {/* Bottom border pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 16"
                  preserveAspectRatio="none"
                >
                  <pattern
                    id="bottomPattern"
                    x="0"
                    y="0"
                    width="40"
                    height="16"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M20 14 L30 8 L20 2 L10 8 Z"
                      fill="#FFD700"
                      fillOpacity="0.4"
                    />
                    <circle
                      cx="20"
                      cy="8"
                      r="3"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="0.5"
                      strokeOpacity="0.6"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#bottomPattern)" />
                </svg>
              </div>

              {/* Left border pattern */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 16 400"
                  preserveAspectRatio="none"
                >
                  <pattern
                    id="leftPattern"
                    x="0"
                    y="0"
                    width="16"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M2 20 L8 10 L14 20 L8 30 Z"
                      fill="#FFD700"
                      fillOpacity="0.4"
                    />
                    <circle
                      cx="8"
                      cy="20"
                      r="3"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="0.5"
                      strokeOpacity="0.6"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#leftPattern)" />
                </svg>
              </div>

              {/* Right border pattern */}
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 16 400"
                  preserveAspectRatio="none"
                >
                  <pattern
                    id="rightPattern"
                    x="0"
                    y="0"
                    width="16"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M14 20 L8 10 L2 20 L8 30 Z"
                      fill="#FFD700"
                      fillOpacity="0.4"
                    />
                    <circle
                      cx="8"
                      cy="20"
                      r="3"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="0.5"
                      strokeOpacity="0.6"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#rightPattern)" />
                </svg>
              </div>
            </div>

            {/* Corner decorative elements */}
            <div className="absolute top-2 left-2 w-8 h-8 opacity-60">
              <svg
                viewBox="0 0 32 32"
                className="w-full h-full text-yellow-400"
              >
                <path
                  d="M16 4 L20 12 L28 16 L20 20 L16 28 L12 20 L4 16 L12 12 Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
              </svg>
            </div>

            <div className="absolute top-2 right-2 w-8 h-8 opacity-60">
              <svg
                viewBox="0 0 32 32"
                className="w-full h-full text-yellow-400"
              >
                <path
                  d="M16 4 L20 12 L28 16 L20 20 L16 28 L12 20 L4 16 L12 12 Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
              </svg>
            </div>

            <div className="absolute bottom-2 left-2 w-8 h-8 opacity-60">
              <svg
                viewBox="0 0 32 32"
                className="w-full h-full text-yellow-400"
              >
                <path
                  d="M16 4 L20 12 L28 16 L20 20 L16 28 L12 20 L4 16 L12 12 Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
              </svg>
            </div>

            <div className="absolute bottom-2 right-2 w-8 h-8 opacity-60">
              <svg
                viewBox="0 0 32 32"
                className="w-full h-full text-yellow-400"
              >
                <path
                  d="M16 4 L20 12 L28 16 L20 20 L16 28 L12 20 L4 16 L12 12 Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
              </svg>
            </div>

            {/* Logos */}
            <div className="flex justify-center space-x-4 mb-6">
              <img src="/albidayah.png" className="w-24 h-24" />
            </div>

            <h1 className="text-4xl font-bold text-yellow-400 mb-2 tracking-wide">
              Undangan
            </h1>
            {/* Enhanced decorative dividers */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <div className="mx-4">
                <svg
                  width="40"
                  height="20"
                  viewBox="0 0 40 20"
                  className="text-yellow-400"
                >
                  <circle cx="10" cy="10" r="3" fill="currentColor" />
                  <circle cx="20" cy="10" r="4" fill="currentColor" />
                  <circle cx="30" cy="10" r="3" fill="currentColor" />
                  <path
                    d="M5 10 Q10 5 15 10 Q20 15 25 10 Q30 5 35 10"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    strokeOpacity="0.6"
                  />
                </svg>
              </div>
              <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>

            <h2 className="text-5xl font-bold text-yellow-300 mb-2 tracking-wider">
              Tasyakuran Angkatan 30
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <div className="mx-4">
                <svg
                  width="60"
                  height="20"
                  viewBox="0 0 60 20"
                  className="text-yellow-400"
                >
                  <path
                    d="M10 10 L15 5 L20 10 L25 5 L30 10 L35 5 L40 10 L45 5 L50 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="30" cy="10" r="2" fill="currentColor" />
                  <path
                    d="M5 10 Q30 2 55 10"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    fill="none"
                    strokeOpacity="0.5"
                  />
                </svg>
              </div>
              <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>

            <p className="text-lg text-yellow-200 mb-4">
              Pesantren Terpadu Albidayah
            </p>

            <div className="text-white">
              <p className="text-lg mb-2">
                Ahad, 8 Juni 2025/12 Dzulhijjah 1446 H
              </p>
              <p className="text-lg">
                Aula Gedung Serba Guna (GSG) Pesantren Terpadu Albidayah
              </p>
            </div>

            <div className="mt-6">
              <p className="text-yellow-200 mb-2">Kepada Yth.</p>
              <p className="text-2xl font-bold text-yellow-400">
                Orang Tua/Wali Santri Angkatan 30
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="px-6 py-8">
        <div className="text-center animate-slide-up">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6">
            Countdown to Event
          </h3>
          <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
            <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg p-4 text-blue-900">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-xs">Hari</div>
            </div>
            <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg p-4 text-blue-900">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs">Jam</div>
            </div>
            <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg p-4 text-blue-900">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs">Menit</div>
            </div>
            <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg p-4 text-blue-900">
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs">Detik</div>
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Pattern Section Divider */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center">
          <svg
            width="300"
            height="40"
            viewBox="0 0 300 40"
            className="text-yellow-400 opacity-60"
          >
            <defs>
              <pattern
                id="sectionPattern1"
                x="0"
                y="0"
                width="60"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M30 5 L40 15 L35 25 L25 25 L20 15 Z"
                  fill="currentColor"
                  fillOpacity="0.3"
                />
                <circle
                  cx="30"
                  cy="20"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <path
                  d="M15 20 L45 20 M30 5 L30 35"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sectionPattern1)" />
            <path
              d="M0 20 Q75 10 150 20 Q225 30 300 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* Photo Gallery */}
      <section id="gallery" className="px-6 py-8">
        <div className="animate-fade-in">
          <div className="relative max-w-sm mx-auto">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={galleryImages[currentImageIndex] || "/placeholder.svg"}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="w-full h-48 object-cover transition-transform duration-500"
              />
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Pattern Section Divider */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center">
          <svg
            width="300"
            height="40"
            viewBox="0 0 300 40"
            className="text-yellow-400 opacity-60"
          >
            <defs>
              <pattern
                id="sectionPattern2"
                x="0"
                y="0"
                width="50"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M25 10 L35 20 L25 30 L15 20 Z"
                  fill="currentColor"
                  fillOpacity="0.3"
                />
                <circle
                  cx="25"
                  cy="20"
                  r="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <path
                  d="M10 20 L40 20"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeOpacity="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sectionPattern2)" />
            <path
              d="M0 20 Q150 5 300 20"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeOpacity="0.7"
            />
          </svg>
        </div>
      </div>

      {/* Event Description */}
      <section id="description" className="px-6 py-8">
        <Card className="bg-gradient-to-b from-blue-800/50 to-blue-900/50 border-yellow-400 border-2 relative overflow-hidden">
          {/* Islamic pattern overlay for the card */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <defs>
                <pattern
                  id="cardPattern"
                  x="0"
                  y="0"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M40 10 L60 30 L50 50 L30 50 L20 30 Z"
                    fill="#FFD700"
                    fillOpacity="0.4"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="15"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="8"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="0.5"
                    strokeOpacity="0.5"
                  />
                  <path
                    d="M10 40 L70 40 M40 10 L40 70"
                    stroke="#FFD700"
                    strokeWidth="0.3"
                    strokeOpacity="0.3"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cardPattern)" />
            </svg>
          </div>

          {/* Corner decorative elements */}
          <div className="absolute top-2 left-2 w-6 h-6 opacity-40">
            <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400">
              <path
                d="M12 2 L16 8 L22 12 L16 16 L12 22 L8 16 L2 12 L8 8 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="absolute top-2 right-2 w-6 h-6 opacity-40">
            <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400">
              <path
                d="M12 2 L16 8 L22 12 L16 16 L12 22 L8 16 L2 12 L8 8 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <CardContent className="p-6 relative z-10">
            <p className="text-white text-center leading-relaxed">
              Dengan ini kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri
              Tasyakuran Santri Angkatan 30 Pesantren Terpadu Albidayah.
            </p>
            <h4 className="text-xl font-bold text-yellow-400 text-center mb-4">
              Yang Diselenggarakan Pada
            </h4>
            <div className="flex items-center gap-2">
              <Calendar className="h-16 w-16 text-yellow-400" />
              <div className="flex flex-col">
                <p className="text-white leading-relaxed">AHAD</p>
                <div className="flex items-center gap-1">
                  <h3 className="text-[3rem] leading-none shrink-0">08</h3>
                  <p className="text-white leading-relaxed leading-none">
                    Juni <br /> 2025
                  </p>
                </div>
                <p className="text-white leading-relaxed">Pukul 07.00 WIB</p>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-yellow-400 pt-4 mt-4">
              <Map className="h-16 w-16 text-yellow-400 shrink-0" />
              <div className="flex flex-col">
                <p className="text-white leading-relaxed font-bold text-sm">
                  Aula Gedung Serba Guna (GSG) Pesantren Terpadu Albidayah
                </p>

                <p className="text-white leading-relaxed text-xs">
                  Jl. Raya Batujajajar No.13 Rt.003/008 Desa Giriasih Kec.
                  Batujajar 40561
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Islamic Pattern Section Divider */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center">
          <svg
            width="300"
            height="40"
            viewBox="0 0 300 40"
            className="text-yellow-400 opacity-60"
          >
            <defs>
              <pattern
                id="sectionPattern3"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 8 L28 16 L24 24 L16 24 L12 16 Z"
                  fill="currentColor"
                  fillOpacity="0.25"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeOpacity="0.6"
                />
                <path
                  d="M5 20 L35 20 M20 5 L20 35"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  strokeOpacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sectionPattern3)" />
            <path
              d="M0 20 Q100 30 200 20 Q250 10 300 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.5"
            />
          </svg>
        </div>
      </div>

      {/* Event Rundown */}
      <section id="rundown" className="px-6 py-8">
        <div className="animate-slide-up">
          <h3 className="text-2xl font-bold text-yellow-400 text-center mb-6">
            Rundown Acara
          </h3>
          <div className="space-y-4">
            {rundownItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-gradient-to-r from-blue-800/50 to-blue-900/50 rounded-lg p-4 border-l-4 border-yellow-400"
              >
                <div className="text-yellow-400 font-bold text-sm min-w-[80px] text-nowrap">
                  {item.time}
                </div>
                <div className="text-white text-sm">{item.activity}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Islamic Pattern Section Divider */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center">
          <svg
            width="300"
            height="40"
            viewBox="0 0 300 40"
            className="text-yellow-400 opacity-60"
          >
            <defs>
              <pattern
                id="sectionPattern4"
                x="0"
                y="0"
                width="45"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M22.5 5 L32.5 15 L27.5 25 L17.5 25 L12.5 15 Z"
                  fill="currentColor"
                  fillOpacity="0.3"
                />
                <circle
                  cx="22.5"
                  cy="20"
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <path
                  d="M7.5 20 L37.5 20"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeOpacity="0.4"
                />
                <circle
                  cx="22.5"
                  cy="20"
                  r="3"
                  fill="currentColor"
                  fillOpacity="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sectionPattern4)" />
            <path
              d="M0 20 Q75 15 150 20 Q225 25 300 20"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeOpacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* Location Map */}
      <section id="location" className="px-6 py-8">
        <div className="animate-fade-in">
          <h3 className="text-2xl font-bold text-yellow-400 text-center mb-6">
            Lokasi Acara
          </h3>
          <Card className="bg-gradient-to-b from-blue-800/50 to-blue-900/50 border-yellow-400 border-2 relative overflow-hidden">
            {/* Islamic pattern overlay for location card */}
            <div className="absolute inset-0 opacity-8">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <pattern
                    id="locationPattern"
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M30 5 L45 20 L40 35 L20 35 L15 20 Z"
                      fill="#FFD700"
                      fillOpacity="0.3"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="12"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="6"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="0.5"
                      strokeOpacity="0.6"
                    />
                    <path
                      d="M5 30 L55 30 M30 5 L30 55"
                      stroke="#FFD700"
                      strokeWidth="0.3"
                      strokeOpacity="0.2"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#locationPattern)" />
              </svg>
            </div>

            <CardContent className="p-6 relative z-10">
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-yellow-400">
                  Aula Gedung Serba Guna (GSG) Pesantren Terpadu Albidayah
                </h4>
                <p className="text-white">
                  Jl. Raya Batujajajar No.13 Rt.003/008 Desa Giriasih Kec.
                  Batujajar 40561
                </p>
              </div>
              <div className="bg-gray-300 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d733.5127684119271!2d107.50119012576846!3d-6.900618457873268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTQnMDEuNSJTIDEwN8KwMzAnMDcuMCJF!5e0!3m2!1sen!2sid!4v1749211274377!5m2!1sen!2sid"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <p>Google Maps akan ditampilkan di sini</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 font-bold"
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/q8P9jjvcunpZucey7",
                      "_blank"
                    )
                  }
                >
                  Buka di Google Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl">
        <div className="flex justify-around items-center py-3 px-2">
          <button
            onClick={() => scrollToSection("header")}
            className="flex flex-col items-center text-blue-900 hover:text-blue-700 transition-all duration-300 transform hover:scale-110 p-2 rounded-lg hover:bg-yellow-300/20"
          >
            <div className="w-8 h-8 bg-blue-900/10 rounded-full flex items-center justify-center mb-1">
              <Calendar className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold">Opening</span>
          </button>
          <button
            onClick={() => scrollToSection("countdown")}
            className="flex flex-col items-center text-blue-900 hover:text-blue-700 transition-all duration-300 transform hover:scale-110 p-2 rounded-lg hover:bg-yellow-300/20"
          >
            <div className="w-8 h-8 bg-blue-900/10 rounded-full flex items-center justify-center mb-1">
              <Clock className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold">Countdown</span>
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="flex flex-col items-center text-blue-900 hover:text-blue-700 transition-all duration-300 transform hover:scale-110 p-2 rounded-lg hover:bg-yellow-300/20"
          >
            <div className="w-8 h-8 bg-blue-900/10 rounded-full flex items-center justify-center mb-1">
              <Star className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold">Gallery</span>
          </button>
          <button
            onClick={() => scrollToSection("rundown")}
            className="flex flex-col items-center text-blue-900 hover:text-blue-700 transition-all duration-300 transform hover:scale-110 p-2 rounded-lg hover:bg-yellow-300/20"
          >
            <div className="w-8 h-8 bg-blue-900/10 rounded-full flex items-center justify-center mb-1">
              <Users className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold">Rundown</span>
          </button>
          <button
            onClick={() => scrollToSection("location")}
            className="flex flex-col items-center text-blue-900 hover:text-blue-700 transition-all duration-300 transform hover:scale-110 p-2 rounded-lg hover:bg-yellow-300/20"
          >
            <div className="w-8 h-8 bg-blue-900/10 rounded-full flex items-center justify-center mb-1">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold">Maps</span>
          </button>
        </div>

        {/* Islamic decorative pattern on navigation */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 4"
            preserveAspectRatio="none"
          >
            <pattern
              id="navPattern"
              x="0"
              y="0"
              width="40"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 1 L25 2 L20 3 L15 2 Z"
                fill="#1e3a8a"
                fillOpacity="0.4"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#navPattern)" />
          </svg>
        </div>
      </nav>

      {/* Footer */}
      <footer className="px-6 py-8 pb-24 text-center">
        <div className="border-t border-yellow-400 pt-6">
          <p className="text-yellow-200 mb-2">Jazakumullahu Khairan</p>
          <p className="text-white text-sm">
            Atas kehadiran dan partisipasi Bapak/Ibu/Saudara/i dalam acara ini
          </p>
          <div className="mt-4">
            <p className="text-yellow-400 font-bold">
              Pesantren Terpadu Albidayah
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
