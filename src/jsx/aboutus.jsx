import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <motion.h1
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Rólunk
      </motion.h1>

      <motion.div
        className="card shadow-lg p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-3">A csapatunk dinamikája</h2>
        <p>
          A mi csapatunk egy igazi tech-műhely, ahol mindenki a saját
          erősségeire támaszkodva viszi előre a projektet.
        </p>
        <ul>
          <li>
            <strong>Frontend fejlesztők:</strong> A React szakértői, akik a
            modern, reszponzív és könnyen kezelhető felhasználói felületért
            felelnek.
          </li>
          <li>
            <strong>Backend fejlesztők:</strong> Az API-k mesterei, akik
            biztosítják a gyors és hatékony adatkezelést.
          </li>
          <li>
            <strong>Adatbázis szakértők:</strong> Akik gondoskodnak az adatok
            megbízhatóságáról és biztonságáról.
          </li>
        </ul>
      </motion.div>

      <motion.div
        className="card shadow-lg p-4 mt-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-3">A projektünk kihívásai és sikerei</h2>
        <p>
          Egy ilyen összetett projekt során mindig akadnak kihívások. A
          frontend és a backend összehangolása, az adatbiztonság vagy a
          teljesítményoptimalizálás mind-mind fontos szerepet játszanak.
          Mindenki a saját területén hozza ki a legjobbat, és a folyamatos
          együttműködés biztosítja a sikerünket.
        </p>
      </motion.div>

      <motion.div
        className="card shadow-lg p-4 mt-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-3">A végcél</h2>
        <p>
          Legyen szó egy új startup építéséről, egy ügyfél számára készített
          platformról vagy egy saját ötlet megvalósításáról – egy biztos: ebből
          a projektből mindenki rengeteget tanul és fejlődik.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
