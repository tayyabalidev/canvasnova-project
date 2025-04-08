'use client'

import { useEffect } from 'react'
import { SleekArtworkCustomization } from "@/components/sleek-artwork-customization"
import { Suspense } from "react"

export default function Page() {
  useEffect(() => {
    // Funktion zur Ermittlung der Höhe
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      // Sende die neue Höhe an das übergeordnete Fenster
      window.parent.postMessage(
        { type: 'setHeight', height },
        '*' // Zum Testen: Später solltest du den Origin einschränken
      );
    };

    // Sende einmalig die aktuelle Höhe
    sendHeight();

    // Option 1: Nutze ResizeObserver, um bei Änderungen neu zu messen
    const resizeObserver = new ResizeObserver(() => {
      sendHeight();
    });
    resizeObserver.observe(document.documentElement);

    // Option 2 (zusätzlich): Bei Fenster-Resize neu senden
    window.addEventListener('resize', sendHeight);

    // Aufräumen bei unmount
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', sendHeight);
    };
  }, []);

  return (
    <Suspense fallback={<div>Lädt...</div>}>
      <SleekArtworkCustomization />
    </Suspense>
  )
}
