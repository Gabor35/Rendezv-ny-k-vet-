import React, { useState} from 'react';

export const EventList = () => {
    const [events] = useState([
        {
          EsemenyID: 1,
          Cime: "Koncert a parkban",
          Helyszin: "Budapest, Városliget",
          Datum: "2025-03-15T18:00:00",
          Leiras: "Egy fantasztikus szabadtéri koncert a legjobb zenekarokkal.",
        },
        {
          EsemenyID: 2,
          Cime: "Gasztrofesztivál",
          Helyszin: "Debrecen, Fő tér",
          Datum: "2025-04-10T12:00:00",
          Leiras: "Kóstold meg Magyarország legjobb ételeit és italait!",
        },
        {
          EsemenyID: 3,
          Cime: "Tech Meetup",
          Helyszin: "Szeged, Innovációs Központ",
          Datum: "2025-05-05T17:30:00",
          Leiras: "Találkozz más fejlesztőkkel és ismerd meg a legújabb technológiákat!",
        },
        {
          EsemenyID: 4,
          Cime: "Startup Konferencia",
          Helyszin: "Győr, Egyetemi Campus",
          Datum: "2025-06-20T09:00:00",
          Leiras: "Inspiráló előadások sikeres startup alapítóktól.",
        },
        {
          EsemenyID: 5,
          Cime: "Művészeti kiállítás",
          Helyszin: "Pécs, Művészetek Háza",
          Datum: "2025-07-08T15:00:00",
          Leiras: "Modern és klasszikus művészeti alkotások egy helyen.",
        },
        {
          EsemenyID: 6,
          Cime: "Sportnap",
          Helyszin: "Miskolc, Városi Stadion",
          Datum: "2025-08-12T10:00:00",
          Leiras: "Próbáld ki a legkülönbözőbb sportokat egy egész napos eseményen.",
        },
        {
          EsemenyID: 7,
          Cime: "Filmfesztivál",
          Helyszin: "Sopron, Mozi Kert",
          Datum: "2025-09-18T19:00:00",
          Leiras: "Premier előtti vetítések és közönségtalálkozók híres rendezőkkel.",
        },
        {
          EsemenyID: 8,
          Cime: "Könyvbemutató",
          Helyszin: "Eger, Városi Könyvtár",
          Datum: "2025-10-03T16:00:00",
          Leiras: "Beszélgetés az íróval és dedikálás a könyvbemutatón.",
        },
        {
          EsemenyID: 9,
          Cime: "Októberfeszt",
          Helyszin: "Békéscsaba, Sörkert",
          Datum: "2025-10-10T18:00:00",
          Leiras: "Kiváló sörök, élőzene és fantasztikus hangulat.",
        },
        {
          EsemenyID: 10,
          Cime: "Karácsonyi vásár",
          Helyszin: "Székesfehérvár, Fő tér",
          Datum: "2025-12-01T10:00:00",
          Leiras: "Karácsonyi ajándékok, forralt bor és ünnepi hangulat.",
        },
        {
          EsemenyID: 11,
          Cime: "Újévi koncert",
          Helyszin: "Budapest, Operaház",
          Datum: "2026-01-01T19:00:00",
          Leiras: "Köszöntsd az új évet egy felejthetetlen koncerttel!",
        },
        {
          EsemenyID: 12,
          Cime: "Tudományos előadás",
          Helyszin: "Szeged, Egyetemi Aula",
          Datum: "2026-02-15T14:00:00",
          Leiras: "Érdekes tudományos témák közérthetően bemutatva.",
        },
        {
          EsemenyID: 13,
          Cime: "Tavaszi futóverseny",
          Helyszin: "Veszprém, Városi Park",
          Datum: "2026-03-20T08:00:00",
          Leiras: "Nevezés minden távra! Fussa le az évet sportosan.",
        },
        {
          EsemenyID: 14,
          Cime: "Fotókiállítás",
          Helyszin: "Nyíregyháza, Galéria",
          Datum: "2026-04-05T15:00:00",
          Leiras: "Lenyűgöző fotók a világ minden tájáról.",
        },
        {
          EsemenyID: 15,
          Cime: "Jazz Est",
          Helyszin: "Pécs, Zenei Klub",
          Datum: "2026-05-10T20:00:00",
          Leiras: "Hangulatos este élő jazz zenével és koktélokkal.",
        },
        {
          EsemenyID: 16,
          Cime: "Hegymászó expedíció",
          Helyszin: "Mátra, Hegyi Menedékház",
          Datum: "2026-06-15T07:00:00",
          Leiras: "Izgalmas kihívás a természet szerelmeseinek.",
        },
        {
          EsemenyID: 17,
          Cime: "Kézműves vásár",
          Helyszin: "Győr, Piactér",
          Datum: "2026-07-22T09:00:00",
          Leiras: "Egyedi kézműves termékek és helyi alkotók bemutatkozása.",
        },
        {
          EsemenyID: 18,
          Cime: "Robotika bemutató",
          Helyszin: "Budapest, Tech Park",
          Datum: "2026-08-12T14:00:00",
          Leiras: "A legújabb robotok és mesterséges intelligencia megoldások.",
        },
        {
          EsemenyID: 19,
          Cime: "Autós találkozó",
          Helyszin: "Debrecen, Autópark",
          Datum: "2026-09-30T11:00:00",
          Leiras: "Veterán és modern autók kiállítása és bemutatója.",
        },
        {
          EsemenyID: 20,
          Cime: "Klasszikus zenei est",
          Helyszin: "Szeged, Koncertterem",
          Datum: "2026-10-20T19:00:00",
          Leiras: "Gyönyörű klasszikus művek élő előadásban.",
        },
      ]);
  return (
    <div className="container mt-4">
    <h2>Események</h2>
    <div className="row">
      {events.map(event => (
        <div className="col-md-4" key={event.EsemenyID}>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{event.Cime}</h5>
              <p className="card-text">Dátum: {event.Datum}</p>
              <p className="card-text">Helyszín: {event.Helyszin}</p>
              <p className="card-text">Leiras: {event.Leiras}</p>
              <button className="btn btn-primary">Részletek</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};