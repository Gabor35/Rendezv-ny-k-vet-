-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 06. 22:16
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `esemenyrendezo`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bejelentkezes`
--

CREATE TABLE `bejelentkezes` (
  `BejelentkezesID` int(11) NOT NULL,
  `FelhasznaloID` int(11) NOT NULL,
  `BejelentkezesDatuma` datetime DEFAULT current_timestamp(),
  `IPAddress` varchar(45) DEFAULT NULL,
  `Sikeres` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `esemenyek`
--

CREATE TABLE `esemenyek` (
  `EsemenyID` int(11) NOT NULL,
  `Cime` varchar(255) NOT NULL,
  `Helyszin` varchar(255) NOT NULL,
  `Datum` datetime NOT NULL,
  `Leiras` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `id` int(11) NOT NULL,
  `felhasznaloNev` varchar(255) NOT NULL,
  `teljesNev` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `jogosultsag` int(1) NOT NULL,
  `aktiv` int(1) NOT NULL,
  `regisztracioDatuma` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fenykepUtvonal` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `felhasznaloNev`, `teljesNev`, `salt`, `hash`, `email`, `jogosultsag`, `aktiv`, `regisztracioDatuma`, `fenykepUtvonal`) VALUES
(2, 'a', 'Németh Bence', 'e3wD2TNpdVUBmBOpj5ErZqjLrye9Kr4cjuCCb7MSW8V8Hgb6vd6IdOc98LS7mFpi', '63edcf4d138606e9258778d3c7a342f0ed24ac49cda7372c1712a89fa3d73ebc', 'sulla.spqr78@gmail.com', 9, 1, '2025-02-06 19:07:24', 'auris.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `FelhasznaloID` int(11) NOT NULL,
  `Nev` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Jelszo` varchar(255) NOT NULL,
  `RegisztracioDatuma` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalotorles`
--

CREATE TABLE `felhasznalotorles` (
  `TorlesID` int(11) NOT NULL,
  `FelhasznaloID` int(11) NOT NULL,
  `TorlesDatuma` datetime DEFAULT current_timestamp(),
  `IPAddress` varchar(45) DEFAULT NULL,
  `Ok` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kijelentkezes`
--

CREATE TABLE `kijelentkezes` (
  `KijelentkezesID` int(11) NOT NULL,
  `FelhasznaloID` int(11) NOT NULL,
  `KijelentkezesDatuma` datetime DEFAULT current_timestamp(),
  `IPAddress` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reszvetel`
--

CREATE TABLE `reszvetel` (
  `ReszvetelID` int(11) NOT NULL,
  `FelhasznaloID` int(11) NOT NULL,
  `EsemenyID` int(11) NOT NULL,
  `Visszajelzes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bejelentkezes`
--
ALTER TABLE `bejelentkezes`
  ADD PRIMARY KEY (`BejelentkezesID`),
  ADD KEY `FelhasznaloID` (`FelhasznaloID`);

--
-- A tábla indexei `esemenyek`
--
ALTER TABLE `esemenyek`
  ADD PRIMARY KEY (`EsemenyID`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`FelhasznaloID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- A tábla indexei `felhasznalotorles`
--
ALTER TABLE `felhasznalotorles`
  ADD PRIMARY KEY (`TorlesID`),
  ADD KEY `FelhasznaloID` (`FelhasznaloID`);

--
-- A tábla indexei `kijelentkezes`
--
ALTER TABLE `kijelentkezes`
  ADD PRIMARY KEY (`KijelentkezesID`),
  ADD KEY `FelhasznaloID` (`FelhasznaloID`);

--
-- A tábla indexei `reszvetel`
--
ALTER TABLE `reszvetel`
  ADD PRIMARY KEY (`ReszvetelID`),
  ADD UNIQUE KEY `FelhasznaloID` (`FelhasznaloID`,`EsemenyID`),
  ADD KEY `EsemenyID` (`EsemenyID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bejelentkezes`
--
ALTER TABLE `bejelentkezes`
  MODIFY `BejelentkezesID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `esemenyek`
--
ALTER TABLE `esemenyek`
  MODIFY `EsemenyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `FelhasznaloID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalotorles`
--
ALTER TABLE `felhasznalotorles`
  MODIFY `TorlesID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kijelentkezes`
--
ALTER TABLE `kijelentkezes`
  MODIFY `KijelentkezesID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `reszvetel`
--
ALTER TABLE `reszvetel`
  MODIFY `ReszvetelID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bejelentkezes`
--
ALTER TABLE `bejelentkezes`
  ADD CONSTRAINT `bejelentkezes_ibfk_1` FOREIGN KEY (`FelhasznaloID`) REFERENCES `felhasznalok` (`FelhasznaloID`);

--
-- Megkötések a táblához `felhasznalotorles`
--
ALTER TABLE `felhasznalotorles`
  ADD CONSTRAINT `felhasznalotorles_ibfk_1` FOREIGN KEY (`FelhasznaloID`) REFERENCES `felhasznalok` (`FelhasznaloID`);

--
-- Megkötések a táblához `kijelentkezes`
--
ALTER TABLE `kijelentkezes`
  ADD CONSTRAINT `kijelentkezes_ibfk_1` FOREIGN KEY (`FelhasznaloID`) REFERENCES `felhasznalok` (`FelhasznaloID`);

--
-- Megkötések a táblához `reszvetel`
--
ALTER TABLE `reszvetel`
  ADD CONSTRAINT `reszvetel_ibfk_1` FOREIGN KEY (`FelhasznaloID`) REFERENCES `felhasznalok` (`FelhasznaloID`),
  ADD CONSTRAINT `reszvetel_ibfk_2` FOREIGN KEY (`EsemenyID`) REFERENCES `esemenyek` (`EsemenyID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
