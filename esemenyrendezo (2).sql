-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 25. 08:10
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

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
-- Tábla szerkezet ehhez a táblához `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `user` varchar(30) NOT NULL,
  `text` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `user`, `text`, `time`) VALUES
(1, 'ferenc', 'Szia, hogy vagy?', '2025-02-21 08:00:00'),
(2, 'maria', 'Jól vagyok, köszönöm!', '2025-02-21 08:01:00'),
(3, 'ferenc', 'Mi újság?', '2025-02-21 08:02:00'),
(4, 'maria', 'Éppen egy projekten dolgozom, te?', '2025-02-21 08:03:00'),
(5, 'ferenc', 'Én is, próbálok produktiv lenni.', '2025-02-21 08:04:00'),
(6, 'maria', 'Jó hallani! Van valami terved a hétvégére?', '2025-02-21 08:05:00'),
(7, 'ferenc', 'Még nem tudom, valószínűleg pihenek.', '2025-02-21 08:06:00'),
(8, 'maria', 'Jól hangzik, én is így tervezem.', '2025-02-21 08:07:00'),
(9, 'ferenc', 'Van valami hobbid, amit szeretsz csinálni?', '2025-02-21 08:08:00'),
(10, 'maria', 'Szeretek olvasni és sakkot játszani.', '2025-02-21 08:09:00'),
(11, 'ferenc', 'Én is szeretem a sakkot, tálan jatszhatnank egyszer!', '2025-02-21 08:10:00'),
(12, 'maria', 'Az nagyszeru lenne! Mindíg szívesen játszom.', '2025-02-21 08:11:00'),
(13, 'ferenc', 'Tervezzük meg akkor!', '2025-02-21 08:12:00'),
(14, 'maria', 'Szombat délutan szabad leszek.', '2025-02-21 08:13:00'),
(15, 'ferenc', 'Szombat jó nekem is. Tartsuk meg!', '2025-02-21 08:14:00'),
(16, 'maria', 'Szuper, küldom a részleteket.', '2025-02-21 08:15:00'),
(17, 'ferenc', 'Már alig várom!', '2025-02-21 08:16:00'),
(18, 'maria', 'Én is. Jó lesz!', '2025-02-21 08:17:00'),
(19, 'ferenc', 'Rendben, most vissza kell mennem dolgozni.', '2025-02-21 08:18:00'),
(20, 'maria', 'Én is. Késöbb beszélünk!', '2025-02-21 08:19:00'),
(21, 'ferenc', 'Beszelünk később!', '2025-02-21 08:20:00'),
(22, 'maria', 'Minden jókat!', '2025-02-21 08:21:00'),
(23, 'ferenc', 'Te is, viszlát!', '2025-02-21 08:22:00'),
(24, 'maria', 'Viszlát!', '2025-02-21 08:23:00'),
(25, 'ferenc', 'Késöbb majd folytatom!', '2025-02-21 08:24:00'),
(26, 'maria', 'Várom már!', '2025-02-21 08:25:00'),
(27, 'ferenc', 'Persze, addig viszontlátásra!', '2025-02-21 08:26:00'),
(28, 'maria', 'Viszlátátásra!', '2025-02-21 08:27:00'),
(29, 'ferenc', 'Addig minden jót!', '2025-02-21 08:28:00'),
(30, 'maria', 'Te is!', '2025-02-21 08:29:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `esemeny`
--

CREATE TABLE `esemeny` (
  `Id` int(11) NOT NULL,
  `Cime` varchar(255) NOT NULL,
  `Helyszin` varchar(255) NOT NULL,
  `Datum` datetime NOT NULL,
  `Leiras` text DEFAULT NULL,
  `Kepurl` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `esemeny`
--

INSERT INTO `esemeny` (`Id`, `Cime`, `Helyszin`, `Datum`, `Leiras`, `Kepurl`) VALUES
(1, 'Lovag torna', 'Miskolc Diósgyőri vár', '2025-11-25 07:37:00', 'A Lovagi tornák tere a Diósgyőri vár szomszédságában található. Napjainkban közösségi térként funkcionál, a lovas hagyományok ápolását segíti, továbbá különböző koncertek és rendezvények helyszínéül is szolgál.\r\n\r\nSzolgáltatások\r\nLovas sportesemények\r\nA Lovagi Tornák Terén időről időre megrendezésre kerülnek díjugrató és díjlovagló versenyek. A versenypálya mellett melegítőpálya is elérhető, az aréna talaja pedig tökéletesen alkalmas ezekre az eseményekre, hiszen bármilyen időjárás esetén használható és a lovak lábát is kíméli.\r\n\r\nTörténelmi játékok\r\nA Diósgyőri vár legkedveltebb programjai a fegyverbemutatók, csatajelenetek és párviadalok, amikor több lovagrend összecsapásának lehetünk tanúi. A hatalmas népszerűségnek örvendő Középkori Forgatag pontosan ezt a célt szolgálja, hiszen a nyári eseményen az érdeklődők betekintést nyerhetnek ezen kor világába.\r\n\r\nSzínházi előadások, koncertek\r\nAz akár 4000 fő befogadására is alkalmas aréna számos koncert és szabadtéri színházi előadás helyszínéül is szolgál a speciális mobilfedésnek és a mobil lelátóknak köszönhetően. A küzdőtéren több száz állóhely áll rendelkezésre és fedett lelátó is a vendégek kényelmét szolgálja.\r\n\r\nVásártér\r\nA Diósgyőri vár és a Lovagi Tornák Tere is időnként kiköltözik programjaival a Vásártérre, ahol alapvetően kézműves vásárok és utcai kiállítások kerülnek megrendezésre. A Lovagi Tornák Tere előtt kialakított tér hangulatos világításának és környezetének köszönhetően közösségi találkozóhelyként is funkcionál.\r\n\r\nKiállítótér\r\nAz északi lelátó építésekor egy kövezett medrű középkori csatornát találtak a régészek, melyet egy zsilip köt össze a vizesárokkal. Ezen a területen kiállítóteret hoztak létre, ahol a vízvezeték maradványain kívül időszaki kiállításokat is megtekinthetnek a látogatók.', '	lovagtorna.jpg'),
(2, 'Gasztrofesztivál', 'Debrecen, Fő tér', '2026-02-11 08:08:00', 'Kóstold meg Magyarország legjobb ételeit és italait! Debrecen híres ételeit és italait!!', '	gasztrofesztival.jpg'),
(3, 'Tech Meetup', 'Szeged, Innovációs Központ', '2027-05-14 09:09:00', 'Találkozz más fejlesztőkkel és ismerd meg a legújabb technológiákat!\r\n\r\n', 'techmeetup.jpg'),
(4, 'Sportnap', 'Miskolc, Városi Stadion', '2026-07-01 08:14:00', 'Próbáld ki a legkülönbözőbb sportokat egy egész napos eseményen. Minden érdeklődőt szívesen várunk.', 'sportnap.jpg'),
(5, 'Könyvbemutató', 'Eger, Városi Könyvtár\r\n\r\n', '2025-02-11 08:14:00', 'Beszélgetés az íróval és dedikálás a könyvbemutatón.\r\n\r\n', 'konyvbemutato.jpg'),
(6, 'Robotika bemutató', 'Budapest, Tech Park', '2025-02-27 08:18:00', 'A legújabb robotok és mesterséges intelligencia megoldások.', '	robotikabemutato.jpg'),
(7, 'Autós találkozó', 'Debrecen, Autópark', '2025-02-28 06:29:00', 'Veterán és modern autók kiállítása és bemutatója.', 'autostalalkozo.jpg'),
(8, 'Tavaszi futóverseny', 'Veszprém, Városi Park', '2025-02-08 15:59:00', 'Nevezés minden távra! Fussa le az évet sportosan.', 'tavaszifutoverszeny.jpg'),
(9, 'Karácsonyi vásár', 'Székesfehérvár, Fő tér', '2025-02-23 16:26:00', 'Karácsonyi ajándékok, forralt bor és ünnepi hangulat.', 'karacsonyivasar.jpg'),
(10, 'Októberfeszt', 'Békéscsaba, Sörkert', '2025-03-19 08:23:00', 'Kiváló sörök, élőzene és fantasztikus hangulat.', 'oktoberfest.jpg'),
(11, 'Tudományos előadás', 'Szeged, Egyetemi Aula', '2025-10-17 04:30:00', 'Érdekes tudományos témák közérthetően bemutatva.', 'tudomyanoseloadas.jpg'),
(12, 'Művészeti kiállítás', 'Pécs, Művészetek Háza', '2025-04-11 02:38:00', 'Modern és klasszikus művészeti alkotások egy helyen.', 'muveszetikialitas.jpg'),
(13, 'Gasztrofesztivál', 'Debrecen, Fő tér', '2025-03-21 10:49:00', 'Kóstold meg Magyarország legjobb ételeit és italait!', 'gasztrofesztival.jpg'),
(14, 'Filmfesztivál', 'Sopron, Mozi Kert', '2025-02-12 08:49:00', 'Premier előtti vetítések és közönségtalálkozók híres rendezőkkel.', '	filmfesztival.png'),
(15, 'Újévi koncert', 'Budapest, Operaház', '2025-07-07 08:55:00', 'Köszöntsd az új évet egy felejthetetlen koncerttel!', 'ujevikoncert.jpg'),
(16, 'Fotókiállítás', 'Nyíregyháza, Galéria', '2025-11-12 07:40:00', 'Lenyűgöző fotók a világ minden tájáról.', 'fotokialitas.jpg'),
(17, 'Hegymászó expedíció', 'Mátra, Hegyi Menedékház', '2025-09-01 15:54:00', 'Izgalmas kihívás a természet szerelmeseinek.', '	hegymaszoexpedicio.jpg'),
(18, 'Kézműves vásár', 'Győr, Piactér', '2025-04-12 09:08:00', 'Egyedi kézműves termékek és helyi alkotók bemutatkozása.', 'kezmuvesvasar.jpg');

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
-- A tábla indexei `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT a táblához `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT a táblához `esemeny`
--
ALTER TABLE `esemeny`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
