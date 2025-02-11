-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 11. 08:37
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

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
CREATE DATABASE IF NOT EXISTS `esemenyrendezo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `esemenyrendezo`;

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
-- Tábla szerkezet ehhez a táblához `esemeny`
--

CREATE TABLE `esemeny` (
  `Id` int(11) NOT NULL,
  `Cime` varchar(255) NOT NULL,
  `Helyszin` varchar(255) NOT NULL,
  `Datum` datetime NOT NULL,
  `Leiras` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `esemeny`
--

INSERT INTO `esemeny` (`Id`, `Cime`, `Helyszin`, `Datum`, `Leiras`) VALUES
(1, 'Lovag torna', 'Miskolc Diósgyőri vár', '2025-11-25 07:37:38', 'A Lovagi tornák tere a Diósgyőri vár szomszédságában található. Napjainkban közösségi térként funkcionál, a lovas hagyományok ápolását segíti, továbbá különböző koncertek és rendezvények helyszínéül is szolgál.\r\n\r\nSzolgáltatások\r\nLovas sportesemények\r\nA Lovagi Tornák Terén időről időre megrendezésre kerülnek díjugrató és díjlovagló versenyek. A versenypálya mellett melegítőpálya is elérhető, az aréna talaja pedig tökéletesen alkalmas ezekre az eseményekre, hiszen bármilyen időjárás esetén használható és a lovak lábát is kíméli.\r\n\r\nTörténelmi játékok\r\nA Diósgyőri vár legkedveltebb programjai a fegyverbemutatók, csatajelenetek és párviadalok, amikor több lovagrend összecsapásának lehetünk tanúi. A hatalmas népszerűségnek örvendő Középkori Forgatag pontosan ezt a célt szolgálja, hiszen a nyári eseményen az érdeklődők betekintést nyerhetnek ezen kor világába.\r\n\r\nSzínházi előadások, koncertek\r\nAz akár 4000 fő befogadására is alkalmas aréna számos koncert és szabadtéri színházi előadás helyszínéül is szolgál a speciális mobilfedésnek és a mobil lelátóknak köszönhetően. A küzdőtéren több száz állóhely áll rendelkezésre és fedett lelátó is a vendégek kényelmét szolgálja.\r\n\r\nVásártér\r\nA Diósgyőri vár és a Lovagi Tornák Tere is időnként kiköltözik programjaival a Vásártérre, ahol alapvetően kézműves vásárok és utcai kiállítások kerülnek megrendezésre. A Lovagi Tornák Tere előtt kialakított tér hangulatos világításának és környezetének köszönhetően közösségi találkozóhelyként is funkcionál.\r\n\r\nKiállítótér\r\nAz északi lelátó építésekor egy kövezett medrű középkori csatornát találtak a régészek, melyet egy zsilip köt össze a vizesárokkal. Ezen a területen kiállítóteret hoztak létre, ahol a vízvezeték maradványain kívül időszaki kiállításokat is megtekinthetnek a látogatók.'),
(2, 'Gasztrofesztivál', 'Debrecen, Fő tér', '2026-02-11 08:08:41', 'Kóstold meg Magyarország legjobb ételeit és italait! Debrecen híres ételeit és italait!!'),
(3, 'Tech Meetup', 'Szeged, Innovációs Központ', '2027-05-14 09:09:41', 'Találkozz más fejlesztőkkel és ismerd meg a legújabb technológiákat!\r\n\r\n'),
(4, 'Sportnap', 'Miskolc, Városi Stadion', '2026-07-01 08:14:27', 'Próbáld ki a legkülönbözőbb sportokat egy egész napos eseményen. Minden érdeklődőt szívesen várunk.'),
(5, 'Könyvbemutató', 'Eger, Városi Könyvtár\r\n\r\n', '2025-02-11 08:14:27', 'Beszélgetés az íróval és dedikálás a könyvbemutatón.\r\n\r\n'),
(6, 'Robotika bemutató', 'Budapest, Tech Park', '2025-02-27 08:18:12', 'A legújabb robotok és mesterséges intelligencia megoldások.'),
(7, 'Autós találkozó', 'Debrecen, Autópark', '2025-02-28 06:29:47', 'Veterán és modern autók kiállítása és bemutatója.'),
(8, 'Tavaszi futóverseny', 'Veszprém, Városi Park', '2025-02-08 15:59:00', 'Nevezés minden távra! Fussa le az évet sportosan.'),
(9, 'Karácsonyi vásár', 'Székesfehérvár, Fő tér', '2025-02-23 16:26:49', 'Karácsonyi ajándékok, forralt bor és ünnepi hangulat.'),
(10, 'Októberfeszt', 'Békéscsaba, Sörkert', '2025-03-19 08:23:39', 'Kiváló sörök, élőzene és fantasztikus hangulat.'),
(11, 'Tudományos előadás', 'Szeged, Egyetemi Aula', '2025-10-17 04:30:12', 'Érdekes tudományos témák közérthetően bemutatva.'),
(12, 'Művészeti kiállítás', 'Pécs, Művészetek Háza', '2025-04-11 02:38:20', 'Modern és klasszikus művészeti alkotások egy helyen.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `Id` int(11) NOT NULL,
  `FelhasznaloNev` varchar(100) NOT NULL,
  `TeljesNev` varchar(60) NOT NULL,
  `SALT` varchar(64) NOT NULL,
  `HASH` varchar(64) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Jogosultsag` int(1) NOT NULL,
  `Aktiv` int(1) NOT NULL,
  `RegisztracioDatuma` datetime DEFAULT current_timestamp(),
  `FenykepUtvonal` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`Id`, `FelhasznaloNev`, `TeljesNev`, `SALT`, `HASH`, `Email`, `Jogosultsag`, `Aktiv`, `RegisztracioDatuma`, `FenykepUtvonal`) VALUES
(1, 'LakatosI', 'Lakatos István', 'jQGX8grO1yjNqhiZbtROcseiqj1NVZJd2iqlfxPx1GKLJ9H8smnLJ9dloScCK6Zp', 'dcedbd2d352d19c6eae0dfb12271b74d985c825b8d774afd2abd0d101b6e57ef', 'lakatosi@gmail.com', 9, 1, '2024-11-25 07:33:49', 'lama.jpg'),
(2, 'TothB', 'Tóth Béla', 'e3wD2TNpdVUBmBOpj5ErZqjLrye9Kr4cjuCCb7MSW8V8Hgb6vd6IdOc98LS7mFpi', '63edcf4d138606e9258778d3c7a342f0ed24ac49cda7372c1712a89fa3d73ebc', 'sulla.spqr78@gmail.com', 9, 1, '2025-02-06 19:07:24', 'auris.jpg'),
(3, 'NagyV', 'Nagy Virág', '4540de2854ff8be8b4eb412b40ef0d83ce4c80eb2d8abc9512458ae6444c5fe0', '14fe5b31efd0ce0c378765e680de4590b4cd6041469209f9d40ea6af79684041', 'nagyv@gmail.com', 0, 0, '2024-11-25 07:36:46', ''),
(10, 'TothA', 'Toth Attila', 'OK6CKIRazwHb4A7jJUogeiSMxZqJuTqi5VMbsiq8BRHc19osWOBUQiTU6Y0h5ZW4', 'a13ec19d5697f88944e1b1d13ae9058faee2bf6f677370bef50a8347b81b9174', 'feherd@kkszki.hu', 1, 0, '2025-01-22 07:55:42', 'default.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reszvetel`
--

CREATE TABLE `reszvetel` (
  `Id` int(11) NOT NULL,
  `FelhasznaloId` int(11) NOT NULL,
  `EsemenyId` int(11) NOT NULL,
  `Visszajelzes` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `reszvetel`
--

INSERT INTO `reszvetel` (`Id`, `FelhasznaloId`, `EsemenyId`, `Visszajelzes`) VALUES
(1, 1, 1, 1),
(2, 3, 1, 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `esemeny`
--
ALTER TABLE `esemeny`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `FelhasznaloNev` (`FelhasznaloNev`);

--
-- A tábla indexei `reszvetel`
--
ALTER TABLE `reszvetel`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `FelhasznaloID` (`FelhasznaloId`,`EsemenyId`),
  ADD KEY `EsemenyID` (`EsemenyId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `esemeny`
--
ALTER TABLE `esemeny`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `reszvetel`
--
ALTER TABLE `reszvetel`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `reszvetel`
--
ALTER TABLE `reszvetel`
  ADD CONSTRAINT `reszvetel_ibfk_1` FOREIGN KEY (`FelhasznaloId`) REFERENCES `felhasznalo` (`Id`),
  ADD CONSTRAINT `reszvetel_ibfk_2` FOREIGN KEY (`EsemenyId`) REFERENCES `esemeny` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
